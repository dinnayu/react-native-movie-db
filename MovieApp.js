import React from 'react';
import {
    View, StyleSheet, StatusBar, ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppNavigator from './src/navigator/AppNavigator';

/** Basic styles configuration */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    mask: {
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        opacity: 0.6,
        position: 'absolute'
    },
    maskOverlay: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

class MovieApp extends React.Component {

    /**
    *   To mask the whole screen when doing a service call
    */
    getMaskingOverlay() {
        return (
            <View style={styles.maskOverlay}>
                <ActivityIndicator />
                <View style={styles.mask} />
            </View>
        )
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <AppNavigator />
                {this.props.common.isLoading ? this.getMaskingOverlay() : null}
            </View>
            
        )
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
const mapStateToProps = state => ({
    common: state.common
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieApp);