import Constant from '../common/Constants';

/** Initial state of movie reducer */
const initialState = {
    nowPlaying: null,
    popular: null,
    upcoming: null,
    movieDetails: null,
    movieList: null
}

/** Movie reducer to set movies state */
const Reducer = (state = initialState, action) => {
    if (action.type === Constant.REDUX_ACTION_TYPE.NOW_PLAYING_ACTION) {
        return { ...state, nowPlaying: action.payload};
    } else if (action.type === Constant.REDUX_ACTION_TYPE.POPULAR_ACTION) {
        return { ...state, popular: action.payload};
    } else if (action.type === Constant.REDUX_ACTION_TYPE.UPCOMING_ACTION) {
        return { ...state, upcoming: action.payload};
    } else if (action.type === Constant.REDUX_ACTION_TYPE.MOVIE_DETAILS_ACTION) {
        return { ...state, movieDetails: action.payload};
    } else if (action.type === Constant.REDUX_ACTION_TYPE.MOVIE_LIST_ACTION) {
        return { ...state, movieList: action.payload};
    } 
    return state;
}

/** Combine all available reducers in MoviesReducer */
export default Reducer;
