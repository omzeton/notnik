import * as actionTypes from './actions';

const initialState = {
	import: null,
	export: {
      year: 'xx',
      month: 'xx',
      day: 'xx',
      hour: 'xx:xx',
      textBody: 'xx',
      img: 'xx'
    },
    error: false,
    currentIndex: null,
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
		case actionTypes.SET_INDEX: {
			return {
				...state,
				currentIndex: action.payLoad
			}
		}
		case actionTypes.GET_NEW_TEXT_BODY: {
			return {
				...state,
				export: {
					...state.export,
					textBody: action.payLoad
				}
			}
		}
		default: {
			return state
		}
	}
}

export default reducer;