import Constant from '../common/Constant';

/** Initial state of movie reducer */
const initialState = {
    nowPlaying: null
}

/** Movie reducer to set movies state */
const Reducer = (state = initialState, action) => {
    if (action.type === Constant.REDUX_ACTION_TYPE.NOW_PLAYING_ACTION) {
        return { ...state, nowPlaying: action.payload};
    }
    return state;
}

/** Combine all available reducers in MoviesReducer */
export default Reducer;
