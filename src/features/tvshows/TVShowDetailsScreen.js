import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import { fetchTvDetails } from '../../actions/TvActions';
import Styles from './Styles';
import Constants from '../../common/Constants';
import Colors from '../../common/Colors';
import moment from 'moment';
import CommonUtils from '../../common/CommonUtils';

class TVShowDetailsScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            isViewPreviousSeasons: false
        }
    }

    componentDidMount() {
        this.callTvDetailsService()
    }

    componentDidUpdate(){
        if (this.props.tvShow.tvDetails && this.props.tvShow.tvDetails.error){
            CommonUtils.showErrorModal(() => this.callTvDetailsService());
            this.props.tvShow.tvDetails = null;
        }
    }

    componentWillUnmount(){
         /** Clear redux for tv details */
         this.props.tvShow.tvDetails = null;
    }

    /**
     * Method to call tv details service
     */
    callTvDetailsService(){
        var id = this.props.navigation.state.params.data.id;
        if (id){
            this.props.fetchTvDetails(id);
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
                    <Text style={Styles.textKeyTvDetails}>{keyType}: </Text>
                    <Text style={Styles.textValueTvDetails}>{itemString}</Text>
                </View>;
    }

    /**
     * Method to return a view of original language of selected tv show
     * @param {String} language 
     */
    getOriginalLanguage(language){
        return <View style={{marginBottom: 12}}>
                    <Text style={Styles.textKeyTvDetails}>{Constants.TV_DETAILS.ORIGINAL_LANGUAGE}: </Text>
                    <Text style={Styles.textValueTvDetails}>{language}</Text>
                </View>  
    }

    /**
     * Method to return a view of all seasons
     * @param {Object} seasons 
     */
    getAllSeasons(seasons){
        if (seasons.length > 0){
            return (
                <View>
                    {this.getCurrentSeason(seasons[seasons.length - 1])}
                    {seasons.length > 1 ? this.getViewPreviousSeasonButton() : null}
                    {this.state.isViewPreviousSeasons ? this.getPreviousSeason(seasons) : null}
                </View>
            )
        }
    }

    /**
     * Method to get View Previous Button
     */
    getViewPreviousSeasonButton(){
        var actionType = this.state.isViewPreviousSeasons ? "Hide" : "View";
        return (
            <TouchableOpacity  onPress={() => this.setState({isViewPreviousSeasons: !this.state.isViewPreviousSeasons})}>
                <Text style={[Styles.textSeasonName, {borderBottomColor: Colors.GREY, borderBottomWidth: 1, marginTop: 10}]}>{actionType} Previous Seasons</Text>
            </TouchableOpacity>
        )
    }

    /**
     * Method to get a view of current season
     * @param {Object} currentSeason 
     */
    getCurrentSeason(currentSeason){
        var year = currentSeason.air_date ? moment(currentSeason.air_date).year() : ""
        return (
            <View>
                <Text style={Styles.textOverviewKey}>Current Season</Text>
                <View>
                    <Text style={Styles.textSeasonName}>{currentSeason.name}</Text>
                    <Text style={Styles.textSeasonName}>{year} | {currentSeason.episode_count}</Text>
                    <Text style={[Styles.textOverviewSeason, {marginTop: 8}]}>{currentSeason.overview}</Text>
                </View>
            </View>
        )
    }

    /**
     * Method to get a view of previous season list
     * @param {ArrayObject} seasons 
     */
    getPreviousSeason(seasons){
        var seasonsView = [];
        {seasons.forEach((season, i) => {
            if (i < seasons.length - 1){
                seasonsView.push(this.getSeason(season, i));    
            }
        })}

        return (
            <View style={{backgroundColor: Colors.LIGHT_GREY, padding: 12}}>
                {seasonsView}
            </View>
        )
    }

    /**
     * Method to get a view of previous season
     * @param {Object} season 
     * @param {int} index 
     */
    getSeason(season, index){
        var date = moment(season.air_date);
        var releasedDate = `${date.date()} ${date.format("MMM")} ${date.year()}`
        return (
            <View key={index} style={{marginBottom: 12}}>
                <Text style={Styles.textSeasonName}>{season.name}</Text>
                <Text style={[Styles.textOverviewSeason, {fontWeight: '400'}]}>Premiered on: {releasedDate}</Text>
                <Text style={[Styles.textOverviewSeason, {fontWeight: '400'}]}>Total episodes: {season.episode_count}</Text>
                <Text style={[Styles.textOverviewSeason, {marginTop: 8}]}>{season.overview}</Text>
            </View>
        )
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
     * Method to return a view of selected tv show details
     * Will be invoked after service get tv details returns success
     */
    getDetails(){
        var tvDetails = this.props.tvShow.tvDetails;
        var sourceImage = CommonUtils.getImageSource(tvDetails.poster_path);
        
        return (
            <ScrollView style={{flex: 1}}>
                <View style={Styles.containerTvDetails}>
                    <View style={{paddingLeft: 24, paddingRight: 24}}>
                        <Text style={Styles.titleTvShowDetails}>{tvDetails.name}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
                            <Image style={Styles.imageTvDetails} source={sourceImage} />
                            <View style={{flex: 1, marginLeft: 12}}>
                                {this.getRating(tvDetails.vote_average)}
                                {this.getType(tvDetails.genres, Constants.TV_DETAILS.GENRES)}
                                {this.getOriginalLanguage(tvDetails.original_language)}
                                {this.getType(tvDetails.created_by, Constants.TV_DETAILS.CREATED_BY)}
                            </View>
                        </View>
                        <View>
                            <Text style={Styles.textOverviewKey}>Overview</Text>
                            <Text style={Styles.textOverviewValue}>{tvDetails.overview}</Text>
                        </View>
                    </View>

                    <View style={Styles.containerTvDetailsSeasons}>
                        {this.getAllSeasons(tvDetails.seasons)}
                    </View>
                    
                </View>
            </ScrollView>
        )
    }

    render() {
        var screen = this.props.tvShow.tvDetails && !this.props.tvShow.tvDetails.error ? this.getDetails() : <View style={Styles.containerTv} />
        return screen
    }
}

/** Map to redux components. */
const mapDispatchToProps = dispatch => bindActionCreators({ fetchTvDetails }, dispatch);


/** Map common and tvShow state to redux components */
const mapStateToProps = state => ({
    tvShow: state.tvshow
});

/** Connect mapStateToProps to TV Show Details Screen */
export default connect(mapStateToProps, mapDispatchToProps)(TVShowDetailsScreen);