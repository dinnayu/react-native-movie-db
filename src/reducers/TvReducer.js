import Constant from '../common/Constant';

/** Initial state of movie reducer */
const initialState = {
    tvShow: null
}

/** Movie reducer to set movies state */
const Reducer = (state = initialState, action) => {
    if (action.type === Constant.REDUX_ACTION_TYPE.TV_SHOW_ACTION) {
        return { ...state, tvShow: action.payload};
    }
    return state;
}

/** Combine all available reducers in MoviesReducer */
export default Reducer;
