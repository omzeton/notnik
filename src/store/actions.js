import axios from 'axios';
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

export const getNewTextBody = (cargo) => {
	return {
		type: GET_NEW_TEXT_BODY,
		payLoad: cargo
	}
}

export const getNewYear = (cargo) => {
	return {
		type: GET_NEW_YEAR,
		payLoad: cargo
	}
}

export const getNewMonth = (cargo) => {
	return {
		type: GET_NEW_MONTH,
		payLoad: cargo
	}
}

export const getNewDay = (cargo) => {
	return {
		type: GET_NEW_DAY,
		payLoad: cargo
	}
}

export const getNewHour = (cargo) => {
	return {
		type: GET_NEW_HOUR,
		payLoad: cargo
	}
}

export const getId = (cargo) => {
	return {
		type: GET_ID,
		payLoad: cargo
	}
}

export const getfKey = (cargo) => {
	return {
		type: GET_FKEY,
		payLoad: cargo
	}
}

export const getNewHeader = (cargo) => {
	return {
		type: GET_NEW_HEADER,
		payLoad: cargo
	}
}

export const getImg = (cargo) => {
	return {
		type: GET_IMG,
		payLoad: cargo
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

export const auth = (email, password, isSignin) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCVggrVx3OPHRM6sJim1dqa9lWYNnM704A';
		if (!isSignin) {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCVggrVx3OPHRM6sJim1dqa9lWYNnM704A';
		}
		axios.post(url, authData)
			.then(response => {
				console.log(response)
				dispatch(authSuccess(response.data.idToken, response.data.localId));
				dispatch(checkAuthTimeout(response.data.expiresIn));
			})
			.catch(err => {
				console.log(err);
				dispatch(authFail(err.response.data.error));
			})
	};
};