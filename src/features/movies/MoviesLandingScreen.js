import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import { fetchNowPlayingMovie, fetchPopularMovie, fetchUpcomingMovie } from '../../actions/MoviesActions';
import Constant from '../../common/Constants';
import Carousel from '../common/Carousel';
import Styles from './Styles';
import CommonUtils from '../../common/CommonUtils';

/**
 * A class of Movies Landing
 * This class is arranging Movies Landing UI
 * In this screen, user will see list of Airing Now Playing movies, Popular movies, and Upcoming movies
 * If user tap on chevron button, user will navigate to Movie List screen of selected category.
 * If user tap on movie card, user will navigate to Movie Details screen of selected movie.
 */
class MoviesLandingScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return { headerTitle: Constant.TITLE.MOVIES };
    }

    constructor(){
        super();
        this.isErrorModalShown = false;
    }

    componentDidMount() {
        this.getMovieList();
    }

    componentDidUpdate(){
        if (this.props.common.error && !this.isErrorModalShown){
            CommonUtils.showErrorModal(() => {
                this.getMovieList();
                this.isErrorModalShown = false;
            })
            this.isErrorModalShown = true;
        }
    }

    /**
     * Method to call movie service
     */
    getMovieList() {
        this.props.fetchNowPlayingMovie().then();
        this.props.fetchPopularMovie();
        this.props.fetchUpcomingMovie();
    }

    /**
     * Method will return an object that contains type and data
     * @param {String} type 
     * @param {Object} data 
     */
    getObjectData(type, data) {
        return {
            "type": type,
            "result": data
        }
    }

    /**
     * This method will navigate to Movie Details screen
     * Will be invoked if user tap on movie card
     */
    gotoScreen = (item, navigation) => {
        if (item) {
            navigation.navigate('MovieDetails', { data: item });
        }
    }

    /**
     * Method to return a view of flat list item
     * @param {int} index 
     * @param {Object} item 
     */
    getFlatListItem(index, item){
        return <View style={{marginBottom: 16}}>
            <Carousel
                data={item}
                navigation={this.props.navigation}
                onPressChevron={this.onPressChevron}
                onPressAction={this.gotoScreen}
                titleKey={"title"}
                />
        </View>
    }

    /**
     * This method will navigate to Movie List screen
     * Will be invoked if user tap on chevron button
     */
    onPressChevron = (type) => {
        this.props.navigation.navigate("MovieList", {type: type});
    }

    render() {
        var data = [];
        if (this.props.movies && this.props.movies.nowPlaying && this.props.movies.nowPlaying.body.results.length > 0) {
            data.push(this.getObjectData(Constant.MOVIES_TYPE.NOW_PLAYING, this.props.movies.nowPlaying.body.results));
        }

        if (this.props.movies && this.props.movies.popular && this.props.movies.popular.body.results.length > 0) {
            data.push(this.getObjectData(Constant.MOVIES_TYPE.POPULAR, this.props.movies.popular.body.results));
        }

        if (this.props.movies && this.props.movies.upcoming && this.props.movies.upcoming.body.results.length > 0) {
            data.push(this.getObjectData(Constant.MOVIES_TYPE.UPCOMING, this.props.movies.upcoming.body.results));
        }

        return (
            <View style={Styles.containerMovie}>
                <FlatList
                    style={Styles.flatlistMovie}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => this.getFlatListItem(index, item)}
                />
            </View>
        );
    }
}

/** Map to redux components. */
const mapDispatchToProps = dispatch => bindActionCreators({ fetchNowPlayingMovie, fetchPopularMovie, fetchUpcomingMovie }, dispatch);


/** Map common and movies state to redux components */
const mapStateToProps = state => ({
    movies: state.movies,
    common: state.common
});

/** Connect mapStateToProps to MoviesLandingScreen */
export default connect(mapStateToProps, mapDispatchToProps)(MoviesLandingScreen);
