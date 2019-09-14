import React from 'react';
import { Image, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Constant from '../../common/Constant';
import { fetchMovieDetails } from '../../actions/MoviesActions';
import Styles from './Styles';

class MovieDetailsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return { headerTitle: navigation.state.params.data.title};
    }

    componentDidMount() {
        this.props.fetchMovieDetails(this.props.navigation.state.params.data.id);
    }

    componentWillUnmount(){
        this.props.movie.movieDetails = null;
    }

    getMovieSynopsis(movieData) {
        return (
            <Text style={Styles.textSynopsis}>{movieData.overview}</Text>
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
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={Styles.textMovieDetails} numberOfLines={3}>GENRES : {movieGenre}</Text>
                <Text style={Styles.textMovieDetails}>RATING : {movieData.vote_average}</Text>
            </View>
        )
    }

    getMovieTitle(movieDetails){
        var title = movieDetails.original_title ? movieDetails.original_title : "";
        var releasedYear = movieDetails.release_date ? `(${moment(movieDetails.release_date).year()})` : "";

        return (
            <Text style={Styles.titleMovieDetails}>{title} {releasedYear}</Text>
        )
    }

    render() {
        if (this.props.movie.movieDetails) {
            const movieDetails = this.props.movie.movieDetails;

            return (
                <View style={Styles.containerMovieDetails}>
                    {this.getMovieTitle(movieDetails)}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image style={Styles.imageMovieDetails}
                            source={{ uri: Constant.BASE_URL_IMAGE + movieDetails.poster_path }} />
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