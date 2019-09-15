import React from 'react';
import { Alert } from 'react-native';
import Constants from "./Constants";

/**
  This class contains common functionality which can be used for multiple components.
 */
const CommonUtils = {

    /**
     * Method to show error modal
     * @param {function} positiveAction 
     */
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
    },

    /**
     * Method to return image source
     * @param {Object} source 
     */
    getImageSource(uriSource){
        return uriSource ? {uri: Constants.BASE_URL_IMAGE + uriSource} : require('../assets/default_image.png')
    }
}
export default CommonUtils;