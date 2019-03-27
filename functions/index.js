// Firebase Admin SDK
var admin = require("firebase-admin");
var serviceAccount = require("./notnik-app-firebase-adminsdk-q9w2k-b0e95eb940.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notnik-app.firebaseio.com"
});
//

// Imports
const functions = require('firebase-functions');
const {Storage} = require('@google-cloud/storage');
const os = require('os');
const path = require('path');
//

// Google Cloud Storage 
const projectId = 'notnik-app';
const storage = new Storage({
	projectId: projectId
});
//

// #1 - GetURLPath
exports.specifyURL = functions.storage.object().onFinalize(object => {
	const bucket = object.bucket;
	const fileName = object.name;
	const destinationBucket = storage.bucket(bucket);
	const uniqueId = Math.floor(Math.random(0, 999999));


	if(path.basename(fileName).startsWith(`id:${uniqueId}-`)) {
		console.log("hey! we already renamed that file!");
		return;
	}

	console.log('#########> object');
	console.log(object);
	console.log('#########> storage');
	console.log(storage);
	console.log('#########> destinationBucket');
	console.log(destinationBucket);
	console.log("#########> path");
	console.log(path);

	return file.getSignedUrl({
		action: 'read',
		expires: '03-09-2491'
	}).then(signedUrls => {
		console.log('###SignedURL');
		console.log(signedUrls[0]);
		return signedUrls[0];
	});
});

// But what do we even want to do here?

// 1.1 -- GetURL of an img
// 1.2 -- Rename that img to sth unique
// 2.0 -- 

exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed"
      });
    }
    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
      const bucket = storage.bucket("gs://notnik-app.appspot.com/note-img"); // this the destination folder
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
          res.status(200).json({
            message: "It worked!"
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
    busboy.end(req.rawBody);
  });
});