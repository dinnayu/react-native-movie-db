import Constant from "../common/Constants";

export const isLoadingOverlayAction = isLoading => ({
    type: Constant.REDUX_ACTION_TYPE.IS_LOADING_OVERLAY_ACTION,
    payload: isLoading
});

export const updateRequestFailure = error => ({
    type: Constant.REDUX_ACTION_TYPE.REQUEST_FAILURE,
    payload: error
});

export function fetchRequestFailure(error){
    return dispatch => {
        dispatch(isLoadingOverlayAction(false));
        dispatch(updateRequestFailure(error));
    };
}