import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, FlatList } from 'react-native';
import { fetchAiringTvList, fetchOnTheAirTvList, fetchPopularTvList } from '../../actions/TvActions';
import Constant from '../../common/Constants';
import Styles from '../movies/Styles';
import Color from '../../common/Colors';

/**
 * A class of TV Shows List
 * This class is arranging TV Shows List UI
 * In this screen, user will see list of selected TV Show category
 * If user tap on tv show card, user will navigate to TV Show Details screen of selected TV Show
 */
class TVShowListScreen extends React.Component {

    constructor(){
        super();
        this.state = {
            page: 1,
            totalPage: 1
        }
    }

    componentDidMount(){
        this.getList(this.state.page, this.props.navigation.state.params.type);
    }

    componentDidUpdate(){
        if ( this.props.tvShow && this.props.tvShow.tvList && this.props.tvShow.tvList.body &&
            this.props.tvShow.tvList.body.total_pages && this.state.totalPage !== this.props.tvShow.tvList.body.total_pages){
                this.setState({
                    totalPage: this.props.tvShow.tvList.body.total_pages
                })
            }
    }

    /**
     * Method to call service by selected tv show category
     * @param {int} page 
     * @param {String} type 
     */
    getList(page, type){
        this.props.tvShow.tvList = null;
        if (type === Constant.TV_SHOWS_TYPE.AIRING_TODAY){
            this.props.fetchAiringTvList(page, true);
        } else if (type === Constant.TV_SHOWS_TYPE.POPULAR_TV){
            this.props.fetchPopularTvList(page, true);
        } else {
            this.props.fetchOnTheAirTvList(page, true)
        }
    }

    /**
     * This method will be invoked if user tap on arrow of pagination
     * @param {boolean} isIncrease 
     */
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

    /**
     * Method to return a view of pagination
     * Contains left arrow button, current page, total pages, and right arrow button
     */
    getPagination(){
        const leftArrowEnable = require('../../assets/left_arrow.png');
        const leftArrowDisable = require('../../assets/left_arrow_disable.png')
        const rightArrowEnable = require('../../assets/right_arrow.png');
        const rightArrowDisable = require('../../assets/right_arrow_disable.png')
        const totalPage = this.state.totalPage;

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

    /**
     * Method to return a view of tv show rating
     * @param {String} rating 
     */
    getRating(rating){
        if (rating){
            return (
                <View style={{flexDirection: 'row'}}>
                        <Text>{rating}</Text>
                        <Image style={Styles.ratingIcon} source={require("../../assets/star.png")} />
                    </View>
            )
        }
    }

    /**
     * This method will navigate user to TV Details screen
     * This method will be invoked if user tap on tv show card
     * @param {Object} item 
     */
    gotoDetailsScreen(item){
        if (item) {
            this.props.navigation.navigate('TvDetails', { data: item });
        }
    }

    /**
     * Method to return a flat list item
     * @param {int} index 
     * @param {Object} item 
     */
    getFlatListItem(index, item){
        const imageSource = item.poster_path ? {uri: Constant.BASE_URL_IMAGE+item.poster_path} : require('../../assets/default_image.png');

        return (
            <TouchableOpacity onPress={() => this.gotoDetailsScreen(item)}>
                <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Image style={[Styles.imageMovieList, item.poster_path ? null : Styles.imageBorder]}
                        source={imageSource} />
                    <View style={{flex: 1, marginLeft: 12}}>
                        <Text style={Styles.textMovieListTitle}>{item.original_name}</Text>
                        {this.getRating(item.vote_average)}
                    </View>
                </View>
            </TouchableOpacity>
            
        )
    }

    render() {
        var content = this.props.tvShow.tvList && this.props.tvShow.tvList.body ? <FlatList
            style={Styles.flatlistMovie}
            data={this.props.tvShow.tvList.body.results}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => this.getFlatListItem(index, item)}
        /> : null;

        return (
            <View style={Styles.containerMovieDetails}>
                <View style={Styles.containerPagination}>
                    {this.getPagination()}
                </View>
                {content}
            </View>
        )
    }

}


/** Map to redux components. */
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAiringTvList, fetchOnTheAirTvList, fetchPopularTvList}, dispatch);


/** Map common, tvShow, and movies state to redux components */
const mapStateToProps = state => ({
    tvShow: state.tvshow,
    movies: state.movies,
    common: state.common
});

/** Connect mapStateToProps to TV Show List Screen */
export default connect(mapStateToProps, mapDispatchToProps)(TVShowListScreen);