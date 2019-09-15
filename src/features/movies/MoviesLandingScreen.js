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

    getMovieList() {
        this.props.fetchNowPlayingMovie();
        this.props.fetchPopularMovie();
        this.props.fetchUpcomingMovie();
    }

    getObjectData(type, data) {
        return {
            "type": type,
            "result": data
        }
    }

    gotoScreen = (item, navigation) => {
        if (item) {
            navigation.navigate('MovieDetails', { data: item });
        }
    }

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

    onPressChevron = (type) => {
        this.props.navigation.navigate("MovieList", {type: type});
    }

    render() {
        var data = [];
        if (this.props.movies && this.props.movies.nowPlaying && this.props.movies.nowPlaying.results.length > 0) {
            data.push(this.getObjectData(Constant.MOVIES_TYPE.NOW_PLAYING, this.props.movies.nowPlaying.results));
        }

        if (this.props.movies && this.props.movies.popular && this.props.movies.popular.results.length > 0) {
            data.push(this.getObjectData(Constant.MOVIES_TYPE.POPULAR, this.props.movies.popular.results));
        }

        if (this.props.movies && this.props.movies.upcoming && this.props.movies.upcoming.results.length > 0) {
            data.push(this.getObjectData(Constant.MOVIES_TYPE.UPCOMING, this.props.movies.upcoming.results));
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


/** Map common and book state to redux components */
const mapStateToProps = state => ({
    movies: state.movies,
    common: state.common
});

/** Connect mapStateToProps to BookScreen */
export default connect(mapStateToProps, mapDispatchToProps)(MoviesLandingScreen);
