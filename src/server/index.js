const mongoose = require("mongoose");

const initServer = require("./initServer");
const router = require("./routes");

const app = initServer(router);

mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-p7rod.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Listening on port ${port}`));
    })
    .catch(err => {
        console.log(err);
    });
