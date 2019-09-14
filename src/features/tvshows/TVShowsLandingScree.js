import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import { fetchTvList } from '../../actions/TvActions';

class TVShowsLandingScree extends React.Component {

    componentDidMount() {
        this.props.fetchTvList();
    }
    
    componentDidUpdate() {
        console.warn(this.props.tvShow)
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center' }}>TV Shows Landing Screen</Text>
            </View>
        );
    }
}

/** Map to redux components. */
const mapDispatchToProps = dispatch => bindActionCreators({ fetchTvList }, dispatch);


/** Map common and book state to redux components */
const mapStateToProps = state => ({
    tvShow: state.tvshow
});

/** Connect mapStateToProps to BookScreen */
export default connect(mapStateToProps, mapDispatchToProps)(TVShowsLandingScree);
