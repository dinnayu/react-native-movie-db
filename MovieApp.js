import React from 'react';
import {
    View, Image, StatusBar, DeviceEventEmitter,
    Platform, Text, TouchableOpacity, AppState,
    ActivityIndicator, Alert, Linking, NativeModules, TouchableWithoutFeedback
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppNavigator from './src/navigator/AppNavigator';

class MovieApp extends React.Component {

    render(){
        return (
            <AppNavigator />
        )
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieApp);