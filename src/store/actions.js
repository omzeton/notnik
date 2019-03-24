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
export const GET_NEW_HEADER = 'GET_NEW_HEADER';


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

export const fetchSamples = () => {
	return dispatch => {
		axios.get('https://notnik-app.firebaseio.com/notes.json')
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

export const getNewHeader = (cargo) => {
	return {
		type: GET_NEW_HEADER,
		payLoad: cargo
	}
}