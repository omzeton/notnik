import * as actionTypes from './actions';

const initialState = {
	import: null,
	export: {
      year: '',
      month: '',
      day: '',
      hour: '',
      textBody: '',
      img: ''
    },
    error: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_SAMPLES: {
			return {
				...state,
				import: action.samples,
				error: false
			};
		}
		case actionTypes.FETCH_SAMPLES_FAILED: {
			return {
				...state,
				error: true
			};
		}
		default: {
			return state;
		}
	}
}

export default reducer;