import * as actionTypes from './actions';
import { updateObject } from './utility';

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
      id: undefined,
      fKey: undefined
    },
    error: false,
    currentIndex: null,
    auth: {
    	token: null,
		userId: null,
		error: null,
		loading: false,
		isSignedIn: null
    }
		
}

const authStart = ( state, action ) => {
	return updateObject(state, { auth: {error: null, loading: true }});
};

const authSuccess = (state, action) => {
	return updateObject( state, { 
		auth: {
			token: action.idToken,
			userId: action.userId,
			error: false, 
			loading: false,
			isSignedIn: true
		}
	});
};

const authFail = ( state, action ) => {
	return updateObject(state, {
		auth: {
			error: action.error,
			loading: false,
			isSignedIn: false
		}
	});
};

const authLogout = (state, action) => {
	return updateObject(state, { auth: {token:null, userId: null} })
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
		case actionTypes.GET_FKEY: {
			return {
				...state,
				export: {
					...state.export,
					fKey: action.payLoad
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
		case actionTypes.AUTH_START: return authStart(state, action);
		case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
		case actionTypes.AUTH_FAIL: return authFail(state, action);
		case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
		default: {
			return state
		}
	}
}

export default reducer;