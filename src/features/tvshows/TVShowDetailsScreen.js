import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {View, Text} from 'react-native';
import Styles from './Styles';

class TVShowDetailsScreen extends React.Component {

    componentDidMount() {
    }

    render() {

        return (
            <View style={Styles.containerTv}>
                <Text>TV Show Details Screen</Text>
            </View>
        );
    }
}

/** Map to redux components. */
const mapDispatchToProps = dispatch => bindActionCreators({ }, dispatch);


/** Map common and tvShow state to redux components */
const mapStateToProps = state => ({
    tvShow: state.tvshow,
    common: state.common
});

/** Connect mapStateToProps to TV Show Details Screen */
export default connect(mapStateToProps, mapDispatchToProps)(TVShowDetailsScreen);