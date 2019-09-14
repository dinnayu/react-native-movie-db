import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, FlatList } from 'react-native';
import { fetchAiringTvList, fetchOnTheAirTvList, fetchPopularTvList } from '../../actions/TvActions';
import Constant from '../../common/Constant';
import Styles from '../movies/Styles';
import Color from '../../common/Color';

class TVShowListScreen extends React.Component {

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
        if (type === Constant.TV_SHOWS_TYPE.AIRING_TODAY){
            this.props.fetchAiringTvList(page, true);
        } else if (type === Constant.TV_SHOWS_TYPE.POPULAR_TV){
            this.props.fetchPopularTvList(page, true);
        } else {
            this.props.fetchOnTheAirTvList(page, true)
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
        const totalPage = this.props.tvShow.tvList.total_pages;

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

    gotoDetailsScreen(item){
        if (item) {
            this.props.navigation.navigate('MovieDetails', { data: item });
        }
    }

    getFlatListItem(index, item){
        const imageSource = item.poster_path ? {uri: Constant.BASE_URL_IMAGE+item.poster_path} : require('../../assets/default_image.png');

        return (
            <TouchableOpacity onPress={() => this.gotoDetailsScreen(item)}>
                <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Image style={[Styles.imageMovieList, item.poster_path ? null : Styles.imageBorder]}
                        source={imageSource} />
                    <View style={{flex: 1, marginLeft: 12}}>
                        <Text style={Styles.textMovieListTitle}>{item.title}</Text>
                        {this.getRating(item.vote_average)}
                    </View>
                </View>
            </TouchableOpacity>
            
        )
    }

    render() {
        if (this.props.tvShow.tvList) {
            const tvList = this.props.tvShow.tvList;
            return (
                <View style={Styles.containerMovieDetails}>
                    <View style={Styles.containerPagination}>
                        {this.getPagination()}
                    </View>
                    <FlatList
                        style={Styles.flatlistMovie}
                        data={tvList.results}
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
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchAiringTvList, fetchOnTheAirTvList, fetchPopularTvList}, dispatch);


/** Map common and book state to redux components */
const mapStateToProps = state => ({
    tvShow: state.tvshow,
    movies: state.movies
});

/** Connect mapStateToProps to Movie Details Screen */
export default connect(mapStateToProps, mapDispatchToProps)(TVShowListScreen);