import BaseService, { BASE_URL, API_KEY, API, LANGUAGE } from '../services/BaseService';
import Constant from '../common/Constants';
import {isLoadingOverlayAction, fetchRequestFailure} from './CommonActions';

export const updateNowPlayingAction = nowPlaying => ({
    type: Constant.REDUX_ACTION_TYPE.NOW_PLAYING_ACTION,
    payload: nowPlaying
});

export const updatePopularAction = popular => ({
    type: Constant.REDUX_ACTION_TYPE.POPULAR_ACTION,
    payload: popular
});

export const updateUpcomingAction = upcoming => ({
    type: Constant.REDUX_ACTION_TYPE.UPCOMING_ACTION,
    payload: upcoming
});

export const updateMovieDetailsAction = movieDetails => ({
    type: Constant.REDUX_ACTION_TYPE.MOVIE_DETAILS_ACTION,
    payload: movieDetails
});

export const updateMovieListAction = movieList => ({
    type: Constant.REDUX_ACTION_TYPE.MOVIE_LIST_ACTION,
    payload: movieList
});

export function fetchNowPlayingMovie(page = 1, isRequestList = false){
    const URL = `${BASE_URL}/movie/now_playing${API}${API_KEY}&${LANGUAGE}&page=${page}`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                console.log("REPONSE >>>>" ,response)
                if (isRequestList){
                    dispatch(updateMovieListAction(response));
                } else {
                    dispatch(updateNowPlayingAction(response));
                }
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(fetchRequestFailure(error))
            })
    };
}

export function fetchPopularMovie(page = 1, isRequestList = false){
    const URL = `${BASE_URL}/movie/popular${API}${API_KEY}&${LANGUAGE}&page=${page}`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                if (isRequestList){
                    dispatch(updateMovieListAction(response));
                } else {
                    dispatch(updatePopularAction(response));
                }
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(fetchRequestFailure(error))
            })
    };
}

export function fetchUpcomingMovie(page = 1, isRequestList = false){
    const URL = `${BASE_URL}/movie/upcoming${API}${API_KEY}&${LANGUAGE}&page=${page}`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                if (isRequestList){
                    dispatch(updateMovieListAction(response));
                } else {
                    dispatch(updateUpcomingAction(response));
                }
                
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(fetchRequestFailure(error))
            })
    };
}

export function fetchMovieDetails(movieId){
    const URL = `${BASE_URL}/movie/${movieId}${API}${API_KEY}&${LANGUAGE}`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                dispatch(updateMovieDetailsAction(response));
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(fetchRequestFailure(error))
            })
    };
}