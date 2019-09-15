import Constant from '../common/Constants';

/** Initial state of common reducer */
const initialState = {
    isLoading: false,
    error: null
}

/** Common reducer to set common state */
const Reducer = (state = initialState, action) => {
    if (action.type === Constant.REDUX_ACTION_TYPE.IS_LOADING_OVERLAY_ACTION) {
        return { ...state, isLoading: action.payload};
    } else if (action.type === Constant.REDUX_ACTION_TYPE.REQUEST_FAILURE) {
        return { ...state, error: action.payload};
    }
    return state;
}

/** Combine all available reducers in MoviesReducer */
export default Reducer;
