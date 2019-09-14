import Constant from '../common/Constant';

/** Initial state of movie reducer */
const initialState = {
    airingTv: null,
    popularTv: null,
    onTheAirTv: null
}

/** Movie reducer to set movies state */
const Reducer = (state = initialState, action) => {
    if (action.type === Constant.REDUX_ACTION_TYPE.AIRING_TV_ACTION) {
        return { ...state, airingTv: action.payload};
    } else if (action.type === Constant.REDUX_ACTION_TYPE.POPULAR_TV_ACTION) {
        return { ...state, popularTv: action.payload};
    } else if (action.type === Constant.REDUX_ACTION_TYPE.ON_THE_AIR_TV_ACTION) {
        return { ...state, onTheAirTv: action.payload};
    }
    return state;
}

/** Combine all available reducers in MoviesReducer */
export default Reducer;
