import React from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment, { isDuration } from 'moment';
import Constant from '../../common/Constants';
import { fetchMovieDetails } from '../../actions/MoviesActions';
import Styles from './Styles';
import CommonUtils from '../../common/CommonUtils';

/**
 * A class of TV Shows Details
 * This class is arranging TV Shows Details UI
 * In this screen, user will see TV Show information
 * Contains poster image, rating, overview, all seasons, etc
 */
class MovieDetailsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return { headerTitle: navigation.state.params.data.title};
    }

    componentDidMount() {
        this.callMovieDetailsService()
    }

    componentDidUpdate(){
        if (this.props.movie.movieDetails && this.props.movie.movieDetails.error){
            CommonUtils.showErrorModal(() => this.callMovieDetailsService());
            this.props.movie.movieDetails = null;
        }
    }

    componentWillUnmount(){
        this.props.movie.movieDetails = null;
    }

    /**
     * Method to call tv details service
     */
    callMovieDetailsService(){
        var id = this.props.navigation.state.params.data.id;
        if (id){
            this.props.fetchMovieDetails(id);
        }
    }

    /**
     * Method to return a view based on type of selected tv show
     * @param {ArrayObject} itemList 
     */
    getType(itemList, keyType){
        var itemString = "";
        itemList.forEach((item, i) => {
            if (item.name){
                itemString += item.name;
                if (i < itemList.length - 1){
                    itemString += ", ";
                }
            }
        });

        return <View style={{marginBottom: 12}}>
                    <Text style={Styles.textKeyMovieDetails}>{keyType}: </Text>
                    <Text style={Styles.textValueMovieDetails}>{itemString}</Text>
                </View>;
    }

    /**
     * Method to return a view of movies rating
     * @param {String} rating 
     */
    getRating(rating){
        if (rating){
            return (
                <View style={{flexDirection: 'row', marginBottom: 12, alignItems: 'center'}}>
                    <Text style={Styles.textRating}>{rating}</Text>
                    <Image style={Styles.ratingIcon} source={require("../../assets/star.png")} />
                </View>
            )
        }
    }

    /**
     * Method to get a view of movie title
     * @param {Object} movieDetails 
     */
    getMovieTitle(movieDetails){
        var title = movieDetails.original_title ? movieDetails.original_title : "";
        var releasedYear = movieDetails.release_date ? `(${moment(movieDetails.release_date).year()})` : "";

        return (
            <Text style={Styles.titleMovieDetails}>{title} {releasedYear}</Text>
        )
    }

    /**
     * Method to return a view from object
     * @param {Object} item 
     * @param {String} type 
     */
    getViewObject(item, type){
        return <View style={{marginBottom: 12}}>
                    <Text style={Styles.textKeyMovieDetails}>{type}: </Text>
                    <Text style={Styles.textValueMovieDetails}>{item}</Text>
                </View>
    }

    /**
     * Method to return formatted date
     * @param {String} item 
     */
    getReleaseDate(item){
        var date = item ? moment(item) : "";
        return date ? `${date.date()} ${date.format("MMM")} ${date.year()}` : "";
    }

    /**
     * Method to convert duration from minutes to hours
     * @param {int} duration 
     */
    getDurationTime(duration){
        if (duration){
            var time = moment.duration(duration, 'minutes');
            var durationTime = time ? `${time.hours()}h ${time.minutes()}m` : "";
            return durationTime;
        }

        return "";
    }

    render() {
        if (this.props.movie.movieDetails && this.props.movie.movieDetails.body) {
            const movieDetails = this.props.movie.movieDetails.body;

            return (
                <ScrollView style={{flex: 1}}>
                    <View style={Styles.containerMovieDetails}>
                        {this.getMovieTitle(movieDetails)}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Image style={Styles.imageMovieDetails}
                                source={{ uri: Constant.BASE_URL_IMAGE + movieDetails.poster_path }} />
                            <View style={{flex: 1, marginLeft: 12}}>
                                {this.getRating(movieDetails.vote_average)}
                                {this.getType(movieDetails.genres, Constant.MOVIE_DETAILS.GENRES)}
                                {this.getViewObject(this.getReleaseDate(movieDetails.release_date), Constant.MOVIE_DETAILS.RELEASE_DATE)}
                                {this.getType(movieDetails.spoken_languages, Constant.MOVIE_DETAILS.SPOKEN_LANGUAGE)}
                                {this.getViewObject(this.getDurationTime(movieDetails.runtime), Constant.MOVIE_DETAILS.DURATION)}
                            </View>
                        </View>

                        <View>
                            <Text style={Styles.textOverviewKey}>Overview</Text>
                            <Text style={Styles.textOverviewValue}>{movieDetails.overview}</Text>
                        </View>
                    </View>
                </ScrollView>
            )
        } else {
            return <View />
        }
    }

}


/** Map to redux components. */
const mapDispatchToProps = dispatch => bindActionCreators({ fetchMovieDetails }, dispatch);


/** Map common and movies state to redux components */
const mapStateToProps = state => ({
    movie: state.movies,
    common: state.common
});

/** Connect mapStateToProps to Movie Details Screen */
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsScreen);