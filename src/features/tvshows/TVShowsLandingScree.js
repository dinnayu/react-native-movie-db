import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, FlatList } from 'react-native';
import { fetchAiringTvList, fetchPopularTvList, fetchOnTheAirTvList } from '../../actions/TvActions';
import Constant from '../../common/Constants';
import Carousel from '../common/Carousel';
import Styles from './Styles';

class TVShowsLandingScree extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return { headerTitle: Constant.TITLE.TV_SHOWS};
    }

    componentDidMount() {
        this.props.fetchAiringTvList();
        this.props.fetchPopularTvList();
        this.props.fetchOnTheAirTvList();
    }

    getObjectData(type, data) {
        return {
            "type": type,
            "result": data
        }
    }

    getFlatListItem(index, item){
        return <View style={{marginBottom: 16}}>
            <Carousel
                data={item}
                navigation={this.props.navigation}
                titleKey={"name"}
                onPressChevron={this.onPressChevron}
                onPressAction={this.gotoScreen}
                />
        </View>
    }

    gotoScreen = (item, navigation) => {
        if (item) {
            navigation.navigate('TvDetails', { data: item });
        }
    }

    onPressChevron = (type) => {
        this.props.navigation.navigate("TvList", {type: type});
    }

    render() {
        var data = [];
        if (this.props.tvShow && this.props.tvShow.airingTv && this.props.tvShow.airingTv.results.length > 0) {
            data.push(this.getObjectData(Constant.TV_SHOWS_TYPE.AIRING_TODAY, this.props.tvShow.airingTv.results));
        }

        if (this.props.tvShow && this.props.tvShow.popularTv && this.props.tvShow.popularTv.results.length > 0) {
            data.push(this.getObjectData(Constant.TV_SHOWS_TYPE.POPULAR_TV, this.props.tvShow.popularTv.results));
        }

        if (this.props.tvShow && this.props.tvShow.onTheAirTv && this.props.tvShow.onTheAirTv.results.length > 0) {
            data.push(this.getObjectData(Constant.TV_SHOWS_TYPE.ON_THE_AIR_TV, this.props.tvShow.onTheAirTv.results));
        }

        return (
            <View style={Styles.containerTv}>
                <FlatList
                    style={Styles.flatlistTv}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => this.getFlatListItem(index, item)}
                />
            </View>
        );
    }
}

/** Map to redux components. */
const mapDispatchToProps = dispatch => bindActionCreators({ fetchAiringTvList, fetchPopularTvList, fetchOnTheAirTvList }, dispatch);


/** Map common and tvShow state to redux components */
const mapStateToProps = state => ({
    tvShow: state.tvshow,
    common: state.common
});

/** Connect mapStateToProps to TV Show Landing Screen */
export default connect(mapStateToProps, mapDispatchToProps)(TVShowsLandingScree);
