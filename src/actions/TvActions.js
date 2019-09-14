import BaseService, { BASE_URL, API_KEY, API, LANGUAGE } from '../services/BaseService';
import Constant from '../common/Constant';
import {isLoadingOverlayAction, fetchRequestFailure} from './CommonActions';

export const updateTvShowAction = tvShow => ({
    type: Constant.REDUX_ACTION_TYPE.TV_SHOW_ACTION,
    payload: tvShow
});

export function fetchTvList(){
    const URL = `${BASE_URL}/tv/airing_today${API}${API_KEY}&${LANGUAGE}&page=1`;
    return dispatch => {
        dispatch(isLoadingOverlayAction(true));
        return BaseService.doGet(URL)
            .then((response) => {
                dispatch(updateTvShowAction(response));
                dispatch(isLoadingOverlayAction(false));
            })
            .catch(error => {
                dispatch(fetchRequestFailure(error))
            })
    };
}