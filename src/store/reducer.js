import * as actionTypes from './actions';

const initialState = {
	import: null,
	export: {
	  header: undefined,
      year: undefined,
      month: undefined,
      day: undefined,
      hour: undefined,
      textBody: undefined,
      img: undefined,
      id: undefined
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
		case actionTypes.GET_NEW_YEAR: {
			return {
				...state,
				export: {
					...state.export,
					year: action.payLoad
				}
			}
		}
		case actionTypes.GET_NEW_MONTH: {
			return {
				...state,
				export: {
					...state.export,
					month: action.payLoad
				}
			}
		}
		case actionTypes.GET_NEW_DAY: {
			return {
				...state,
				export: {
					...state.export,
					day: action.payLoad
				}
			}
		}
		case actionTypes.GET_NEW_HOUR: {
			return {
				...state,
				export: {
					...state.export,
					hour: action.payLoad
				}
			}
		}
		case actionTypes.GET_ID: {
			return {
				...state,
				export: {
					...state.export,
					id: action.payLoad
				}
			}
		}
		case actionTypes.GET_NEW_HEADER: {
			return {
				...state,
				export: {
					...state.export,
					header: action.payLoad
				}
			}
		}
		case actionTypes.GET_IMG: {
			return {
				...state,
				export: {
					...state.export,
					img: action.payLoad
				}
			}
		}
		default: {
			return state
		}
	}
}

export default reducer;