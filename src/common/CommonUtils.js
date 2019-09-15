import React from 'react';
import { Alert } from 'react-native';
import Constants from "./Constants";

/**
  This class contains common functionality which can be used for multiple components.
 */
const CommonUtils = {

    showErrorModal(positiveAction){
        Alert.alert(
            Constants.ERROR_MODAL.TITLE,
            Constants.ERROR_MODAL.MESSAGE,
            [
                {   text: Constants.ERROR_MODAL.CANCEL,
                    onPress: () => null},
                {   text: Constants.ERROR_MODAL.OK,
                    onPress: positiveAction}
            ], { cancelable: false });
    }
}
export default CommonUtils;