import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import { fetchMovieList } from '../../actions/MoviesActions';

class MoviesLandingScreen extends React.Component {

    componentDidMount(){
        this.props.fetchMovieList();
    }

    componentDidUpdate(){
        console.warn(this.props.movies)
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center' }}>Movies Landing Screen</Text>
            </View>
        );
    }
}

/** Map to redux components. */
const mapDispatchToProps = dispatch => bindActionCreators({ fetchMovieList }, dispatch);


/** Map common and book state to redux components */
const mapStateToProps = state => ({
    movies: state.movies
});

/** Connect mapStateToProps to BookScreen */
export default connect(mapStateToProps, mapDispatchToProps)(MoviesLandingScreen);
