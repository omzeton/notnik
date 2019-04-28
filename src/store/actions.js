import axios from 'axios';

import firebase from '@firebase/app';
// eslint-disable-next-line
import { auth } from '@firebase/auth';
// eslint-disable-next-line
import { database } from '@firebase/database';

import firstEntry from '../introduction';
import backup from '../safetyMeasure';

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
		let userId;

		if (isSignin) {
			axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCVggrVx3OPHRM6sJim1dqa9lWYNnM704A', authData)
				.then(response => {
					dispatch(authSuccess(response.data.idToken, response.data.localId));
					dispatch(checkAuthTimeout(response.data.expiresIn));
					return response;
				})
				.catch(err => {
					console.log(err);
					dispatch(authFail(err.response.data.error));
					return err;
				})
		} else {
			firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password).then(res => {
				// firstEntry.fKey = key; key needs to be equal to what Firebase assigns
				userId = res.user.uid;
				firebase.database().ref('notes').child('users').child(userId).push(firstEntry).then(data => {
					firebase.database().ref('notes').child('users').child(userId).push(backup);
					return firebase.database().ref('notes').child('users').child(userId).child(data.key).update({ fKey: data.key, userId: userId });
				}).catch(err => console.log(err));
				console.log(res);
				return res;
			}).then(() => {
				return axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCVggrVx3OPHRM6sJim1dqa9lWYNnM704A', authData)
				.then(response => {
					dispatch(authSuccess(response.data.idToken, response.data.localId));
					dispatch(checkAuthTimeout(response.data.expiresIn));
					return response;
				})
				.catch(err => {
					console.log(err);
					dispatch(authFail(err.response.data.error));
					return err;
				})
			})
			.catch(err => {
				console.log(err);
				return err;
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