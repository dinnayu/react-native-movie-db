import BaseService, { BASE_URL, API_KEY, API, LANGUAGE } from '../services/BaseService';
import Constant from '../common/Constant';
import {isLoadingOverlayAction, fetchRequestFailure} from './CommonActions';

export const updateNowPlayingAction = nowPlaying => ({
    type: Constant.REDUX_ACTION_TYPE.NOW_PLAYING_ACTION,
    payload: nowPlaying
});

export function fetchMovieList(){
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