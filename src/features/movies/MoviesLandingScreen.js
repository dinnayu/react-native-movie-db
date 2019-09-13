import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';

class MoviesLandingScreen extends React.Component {

    render() {
        return (
            <View>
                <Text>Movies Landing Screen</Text>
            </View>
        );
    }
}

/** Map to redux components. */
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);


/** Map common and book state to redux components */
const mapStateToProps = state => ({
});

/** Connect mapStateToProps to BookScreen */
export default connect(mapStateToProps, mapDispatchToProps)(MoviesLandingScreen);
