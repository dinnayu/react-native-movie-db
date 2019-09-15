import BaseService, { BASE_URL, API_KEY, API, LANGUAGE } from '../services/BaseService';
import Constant from '../common/Constants';
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

export const updateTvListAction = tvList => ({
    type: Constant.REDUX_ACTION_TYPE.TV_LIST_ACTION,
    payload: tvList
});

export const updateTvDetails = tvDetails => ({
    type: Constant.REDUX_ACTION_TYPE.TV_DETAILS_ACTION,
    payload: tvDetails
});

export function fetchAiringTvList(page, isRequestList = false){
    const URL = `${BASE_URL}/tv/airing_today${API}${API_KEY}&${LANGUAGE}&page=${page}`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                if (isRequestList){
                    dispatch(updateTvListAction(response))
                } else {
                    dispatch(updateAiringTvAction(response));
                }
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(fetchRequestFailure(error))
            })
    };
}

export function fetchPopularTvList(page, isRequestList = false){
    const URL = `${BASE_URL}/tv/popular${API}${API_KEY}&${LANGUAGE}&page=${page}`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                if (isRequestList){
                    dispatch(updateTvListAction(response))
                } else {
                    dispatch(updatePopularTvAction(response));
                }
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(fetchRequestFailure(error))
            })
    };
}

export function fetchOnTheAirTvList(page, isRequestList = false){
    const URL = `${BASE_URL}/tv/on_the_air${API}${API_KEY}&${LANGUAGE}&page=1`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                if (isRequestList){
                    dispatch(updateTvListAction(response))
                } else {
                    dispatch(updateOnTheAirTvAction(response));
                }
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(fetchRequestFailure(error))
            })
    };
}

export function fetchTvDetails(tvId){
    const URL = `${BASE_URL}/tv/${tvId}${API}${API_KEY}&${LANGUAGE}`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                dispatch(updateTvDetails(response));
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(updateTvDetails(error));
                dispatch(isLoadingOverlayAction(false));
            })
    };
}