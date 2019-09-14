import BaseService, { BASE_URL, API_KEY, API, LANGUAGE } from '../services/BaseService';
import Constant from '../common/Constant';

export const updateNowPlayingAction = nowPlaying => ({
    type: Constant.REDUX_ACTION_TYPE.NOW_PLAYING_ACTION,
    payload: nowPlaying
});

export function fetchMovieList(){
    const URL = `${BASE_URL}/movie/now_playing${API}${API_KEY}&${LANGUAGE}&page=1`;
    console.log("URL >>>> ", URL)
    return dispatch => {
        return BaseService.doGet(URL)
            .then((response) => {
                dispatch(updateNowPlayingAction(response))
            })
            .catch(error => {
                console.warn(error)
            })
    };
}