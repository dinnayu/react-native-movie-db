import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';

class TVShowsLandingScree extends React.Component {

    render() {
        return (
            <View>
                <Text>TV Shows Landing Screen</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(TVShowsLandingScree);
