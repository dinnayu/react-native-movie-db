import BaseService, { BASE_URL, API_KEY, API, LANGUAGE } from '../services/BaseService';
import Constant from '../common/Constant';
import {isLoadingOverlayAction, fetchRequestFailure} from './CommonActions';

export const updateAiringTvAction = tvShow => ({
    type: Constant.REDUX_ACTION_TYPE.AIRING_TV_ACTION,
    payload: tvShow
});

export const updatePopularTvAction = popular => ({
    type: Constant.REDUX_ACTION_TYPE.POPULAR_TV_ACTION,
    payload: popular
});

export const updateOnTheAirTvAction = onTheAir => ({
    type: Constant.REDUX_ACTION_TYPE.ON_THE_AIR_TV_ACTION,
    payload: onTheAir
});

export function fetchAiringTvList(){
    const URL = `${BASE_URL}/tv/airing_today${API}${API_KEY}&${LANGUAGE}&page=1`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                dispatch(updateAiringTvAction(response));
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(fetchRequestFailure(error))
            })
    };
}

export function fetchPopularTvList(){
    const URL = `${BASE_URL}/tv/popular${API}${API_KEY}&${LANGUAGE}&page=1`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                dispatch(updatePopularTvAction(response));
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(fetchRequestFailure(error))
            })
    };
}

export function fetchOnTheAirTvList(){
    const URL = `${BASE_URL}/tv/on_the_air${API}${API_KEY}&${LANGUAGE}&page=1`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                dispatch(updateOnTheAirTvAction(response));
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(fetchRequestFailure(error))
            })
    };
}