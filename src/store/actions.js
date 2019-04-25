import axios from 'axios';

import firebase from '@firebase/app';
// eslint-disable-next-line
import { auth } from '@firebase/auth';
// eslint-disable-next-line
import { database } from '@firebase/database';

export const SET_SAMPLES = 'SET_SAMPLES';
export const FETCH_SAMPLES_FAILED = 'FETCH_SAMPLES_FAILED';
export const SET_INDEX = 'SET_INDEX';
export const GET_NEW_TEXT_BODY = 'GET_NEW_TEXT_BODY';
export const GET_NEW_YEAR = 'GET_NEW_YEAR';
export const GET_NEW_MONTH = 'GET_NEW_MONTH';
export const GET_NEW_DAY = 'GET_NEW_DAY';
export const GET_NEW_HOUR = 'GET_NEW_HOUR';
export const GET_ID = 'GET_ID';
export const GET_FKEY = "GET_FKEY";
export const GET_NEW_HEADER = 'GET_NEW_HEADER';
export const GET_IMG = "GET_IMG";

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

let date = new Date(),
	day = date.getDate(),
	hour = date.getHours(),
	minutes = date.getMinutes(),
	month = date.getMonth();

if (hour < 9) {
	hour = '0' + hour;
}
hour += ":";
if (minutes < 9) {
	minutes = '0' + minutes;
}
hour += minutes;

// Add 0 if day is less than 9
if (day < 9) {
	day = '0' + day;
}
// Add 0 if month is less than 9
if (month < 9) {
	month = '0' + month;
}

const firstEntry = {
	day: day.toString(),
	fKey: null,
	header: "Welcome!",
	hour: hour.toString(),
	id: '00000',
	img: 'https://firebasestorage.googleapis.com/v0/b/notnik-app.appspot.com/o/assets%2Fsample-bg.jpg?alt=media&token=c040c1be-cc24-4caa-b709-bbb7dd8b0b52',
	month: month.toString(),
	textBody: "<div>Thank you for registering in Notnik!</div><div>To create a new entry press the plush button in the main view.<div>To edit an entry simply click on the desired element and start typing.<div>For background image press the small button in top right corner when you're viewing full entry.</div><div>To save all your changes press the middle blue button on the sidebar.</div><div>To delete an entry click the cross sign located in the top right corner of every entry.</div><div>That's it!</div><div>I hope that you enjoy using this app and that it will become useful. Happy writing!</div>",
	userId: null,
	year: date.getFullYear().toString()
}


export const setSamples = (samples) => {
	return {
		type: SET_SAMPLES,
		samples: samples
	};
};

export const fetchSamplesFailed = () => {
	return {
		type: FETCH_SAMPLES_FAILED
	};
};

export const fetchSamples = (token) => {
	return dispatch => {
		axios.get('https://notnik-app.firebaseio.com/notes.json?auth=' + token)
			.then(response => {
				dispatch(setSamples(response.data));
			})
			.catch(error => {
				dispatch(fetchSamplesFailed());
			});
	};
};

export const setIndex = (index) => {
	return {
		type: SET_INDEX,
		payLoad: index
	}
}

export const getNewTextBody = (payLoad) => {
	return {
		type: GET_NEW_TEXT_BODY,
		payLoad: payLoad
	}
}

export const getNewYear = (payLoad) => {
	return {
		type: GET_NEW_YEAR,
		payLoad: payLoad
	}
}

export const getNewMonth = (payLoad) => {
	return {
		type: GET_NEW_MONTH,
		payLoad: payLoad
	}
}

export const getNewDay = (payLoad) => {
	return {
		type: GET_NEW_DAY,
		payLoad: payLoad
	}
}

export const getNewHour = (payLoad) => {
	return {
		type: GET_NEW_HOUR,
		payLoad: payLoad
	}
}

export const getId = (payLoad) => {
	return {
		type: GET_ID,
		payLoad: payLoad
	}
}

export const getfKey = (payLoad) => {
	return {
		type: GET_FKEY,
		payLoad: payLoad
	}
}

export const getNewHeader = (payLoad) => {
	return {
		type: GET_NEW_HEADER,
		payLoad: payLoad
	}
}

export const getImg = (payLoad) => {
	return {
		type: GET_IMG,
		payLoad: payLoad
	}
}

export const authStart = () => {
	return {
		type: AUTH_START
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: AUTH_SUCCESS,
		idToken: token,
		userId: userId
	};
};

export const authFail = (error) => {
	return {
		type: AUTH_FAIL,
		error: error
	};
};

export const logout = () => {
	return {
		type: AUTH_LOGOUT
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const authenticate = (email, password, isSignin) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};

		if (isSignin) {
			axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCVggrVx3OPHRM6sJim1dqa9lWYNnM704A', authData)
				.then(response => {
					dispatch(authSuccess(response.data.idToken, response.data.localId));
					dispatch(checkAuthTimeout(response.data.expiresIn));
				})
				.catch(err => {
					console.log(err);
					dispatch(authFail(err.response.data.error));
				})
		} else {
			firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password).then(res => {
				// firstEntry.fKey = key; key needs to be equal to what Firebase assigns
				firstEntry.userId = res.user.uid;
				firebase.database().ref('notes').child('users').child(res.user.uid).push(firstEntry);
				console.log(res);
			}).then(() => {
				axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCVggrVx3OPHRM6sJim1dqa9lWYNnM704A', authData)
				.then(response => {
					dispatch(authSuccess(response.data.idToken, response.data.localId));
					dispatch(checkAuthTimeout(response.data.expiresIn));
				})
				.catch(err => {
					console.log(err);
					dispatch(authFail(err.response.data.error));
				})
			})
			.catch(err => {
				console.log(err);
			})
		}

	};
};

/*
// Creates new entry
firebase.database().ref('notes').child('users').child(this.props.userId).push(entry)
.then((data) => {
	key = data.key
	newFirebaseKey = data.key
	return key
})
.then(key => {
	const filename = entry.img.name
	const ext = filename.slice(filename.lastIndexOf('.'))
	return firebase.storage().ref('note-img/' + key + '.' + ext).put(entry.img)
})
.then(fileData => {
	imageUrl = firebase.storage().ref(fileData.metadata.fullPath).getDownloadURL()
	return imageUrl
})
.then(url => {
	console.log("Note created! <3");
	return firebase.database().ref('notes').child('users').child(this.props.userId).child(key).update({ img: url, fKey: newFirebaseKey })
})
.catch((error) => {
	this.setState({ error: true })
	console.log(error);
});
*/