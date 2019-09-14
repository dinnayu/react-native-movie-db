import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, FlatList } from 'react-native';
import { fetchNowPlayingMovie, fetchUpcomingMovie, fetchPopularMovie } from '../../actions/MoviesActions';
import Constant from '../../common/Constant';
import Styles from './Styles';
import Color from '../../common/Color';

class MovieListScreen extends React.Component {

    constructor(){
        super();
        this.state = {
            page: 1
        },
        this.totalPage = 0,
        this.totalResult = 0;
    }

    componentDidMount(){
        this.getList(this.state.page, this.props.navigation.state.params.type);
    }

    getList(page, type){
        this.props.movies.movieList = null;
        if (type === Constant.MOVIES_TYPE.UPCOMING){
            this.props.fetchUpcomingMovie(page, true);
        } else if (type === Constant.MOVIES_TYPE.POPULAR){
            this.props.fetchPopularMovie(page, true);
        } else {
            this.props.fetchNowPlayingMovie(page, true)
        }
    }

    onPressArrow(isIncrease){
        var page = this.state.page;
        if (isIncrease){
            page += 1;
        } else {
            page -= 1;
        }

        this.setState({page: page});
        this.getList(page, this.props.navigation.state.params.type);
    }

    getPagination(){
        const leftArrowEnable = require('../../assets/left_arrow.png');
        const leftArrowDisable = require('../../assets/left_arrow_disable.png')
        const rightArrowEnable = require('../../assets/right_arrow.png');
        const rightArrowDisable = require('../../assets/right_arrow_disable.png')
        const totalPage = this.props.movies.movieList.total_pages;

        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => this.onPressArrow(false)}
                    disabled={this.state.page <= 1}>
                        <Image style={Styles.imageIcon} source={this.state.page > 1 ? leftArrowEnable : leftArrowDisable} />
                </TouchableOpacity>
                <Text style={Styles.textPagination}>
                    <Text style={{color: Color.ORANGE}}>{this.state.page}</Text>/{totalPage}</Text>
                <TouchableOpacity onPress={() => this.onPressArrow(true)}
                    disabled={this.state.page === totalPage}
                >
                    <Image style={Styles.imageIcon} source={this.state.page === totalPage ? rightArrowDisable : rightArrowEnable} />
                </TouchableOpacity>
            </View>
        )
    }

    getFlatListItem(index, item){
        const imageSource = item.poster_path ? {uri: Constant.BASE_URL_IMAGE+item.poster_path} : require('../../assets/left_arrow.png');
        return (
            <View>
                <Image style={Styles.imageMovieList} source={imageSource} />
                <Text>{item.title}</Text>
            </View>
        )
    }

    render() {
        if (this.props.movies.movieList) {
            const movieList = this.props.movies.movieList;
            return (
                <View style={Styles.containerMovieDetails}>
                    <View style={Styles.containerPagination}>
                        {this.getPagination()}
                    </View>
                    <FlatList
                        style={Styles.flatlistMovie}
                        data={this.props.movies.movieList.results}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => this.getFlatListItem(index, item)}
                    />
                </View>
            )
        } else {
            return <View />
        }
    }

}


/** Map to redux components. */
const mapDispatchToProps = dispatch => bindActionCreators({fetchNowPlayingMovie, fetchUpcomingMovie, fetchPopularMovie}, dispatch);


/** Map common and book state to redux components */
const mapStateToProps = state => ({
    movies: state.movies
});

/** Connect mapStateToProps to Movie Details Screen */
export default connect(mapStateToProps, mapDispatchToProps)(MovieListScreen);