import BaseService, { BASE_URL, API_KEY, API, LANGUAGE } from '../services/BaseService';
import Constant from '../common/Constant';
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

export function fetchNowPlayingMovie(){
    const URL = `${BASE_URL}/movie/now_playing${API}${API_KEY}&${LANGUAGE}&page=1`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                dispatch(updateNowPlayingAction(response));
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(fetchRequestFailure(error))
            })
    };
}

export function fetchPopularMovie(){
    const URL = `${BASE_URL}/movie/popular${API}${API_KEY}&${LANGUAGE}&page=1`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                dispatch(updatePopularAction(response));
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(fetchRequestFailure(error))
            })
    };
}

export function fetchUpcomingMovie(){
    const URL = `${BASE_URL}/movie/upcoming${API}${API_KEY}&${LANGUAGE}&page=1`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                dispatch(updateUpcomingAction(response));
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(fetchRequestFailure(error))
            })
    };
}