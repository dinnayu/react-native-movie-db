import Constant from '../common/Constant';

/** Initial state of auth reducer */
const initialState = {
    nowPlaying: null
}

/** Auth reducer to set authentication state */
const Reducer = (state = initialState, action) => {
    if (action.type === Constant.REDUX_ACTION_TYPE.NOW_PLAYING_ACTION) {
        return { ...state, nowPlaying: action.payload};
    }
    return state;
}

/** Combine all available reducers in AuthReducer */
export default Reducer;
