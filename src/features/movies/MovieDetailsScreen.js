import React from 'react';
import { ScrollView, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import Constant from '../../common/Constant';
import { fetchMovieDetails } from '../../actions/DetailsAction';
const { width } = Dimensions.get('window');

class MovieDetailsScreen extends React.Component {

    componentDidMount() {
        this.props.fetchMovieDetails(this.props.navigation.state.params.movieId);
    }

    componentDidUpdate() {
        console.warn(this.props.movie.movieDetails)
    }

    getMovieSynopsis(movieData) {
        return (
            <Text>{movieData.overview}</Text>
        )
    }

    getMovieRating(movieData) {
        var movieGenre = "";
        for (var i = 0; i < movieData.genres.length; i++) {
            movieGenre = movieGenre + movieData.genres[i].name
            if (i < movieData.genres.length - 1) {
                movieGenre += ", "
            }
        }
        return (
            <View style={{ flex: 1 }}>
                <Text>POPULARITY : {movieData.popularity}</Text>
                <Text numberOfLines={3}>GENRES : {movieGenre}</Text>
                <Text>RATING : {movieData.vote_average}</Text>
            </View>
        )
    }

    render() {
        if (this.props.movie.movieDetails) {

            const movieDetails = this.props.movie.movieDetails
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image style={{
                            width: width / 3,
                            aspectRatio: 3 / 4,
                            resizeMode: 'cover',
                            borderRadius: 10,
                            marginBottom: 12,
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: 0
                        }} source={{ uri: Constant.BASE_URL_IMAGE + movieDetails.poster_path }} />
                        {this.getMovieRating(movieDetails)}
                    </View>
                    {this.getMovieSynopsis(movieDetails)}
                </View>
            )
        } else {
            return <View />
        }
    }

}


/** Map to redux components. */
const mapDispatchToProps = dispatch => bindActionCreators({ fetchMovieDetails }, dispatch);


/** Map common and book state to redux components */
const mapStateToProps = state => ({
    movie: state.movies
});

/** Connect mapStateToProps to Movie Details Screen */
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsScreen);