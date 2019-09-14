import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import Constant from '../../common/Constant';
import Carousel from '../common/Carousel';

class MovieDetailsScreen extends React.Component {

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center' }}>Movie Details Landing Screen</Text>
            </View>
        )
    }

}


/** Map to redux components. */
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);


/** Map common and book state to redux components */
const mapStateToProps = state => ({
    movies: state.movies
});

/** Connect mapStateToProps to Movie Details Screen */
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsScreen);