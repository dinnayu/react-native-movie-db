import { combineReducers } from 'redux';
import MoviesReducer from '../reducers/MoviesReducer';
import CommonReducer from '../reducers/CommonReducer';

/** Combine all available reducers which will be accessible from all components */
export default combineReducers({
    movies: MoviesReducer,
    common: CommonReducer
});
