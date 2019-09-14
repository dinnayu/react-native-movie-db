import { combineReducers } from 'redux';
import MoviesReducer from '../reducers/MoviesReducer';

/** Combine all available reducers which will be accessible from all components */
export default combineReducers({
    movies: MoviesReducer
});
