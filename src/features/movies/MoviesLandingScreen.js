import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import { fetchMovieList } from '../../actions/MoviesActions';
import Constant from '../../common/Constant';
import Carousel from '../common/Carousel';

class MoviesLandingScreen extends React.Component {

    componentDidMount(){
        this.props.fetchMovieList();
    }

    getObjectData(type, data){
        return {
            "type": type,
            "result": data
        }
    }

    getFlatListItem(index, item){
        return <Carousel data={item} />
    }

    render() {
        var data = [];
        if (this.props.movies && this.props.movies.nowPlaying && this.props.movies.nowPlaying.results.length > 0){
            data.push(this.getObjectData(Constant.MOVIES_TYPE.NOW_PLAYING, this.props.movies.nowPlaying.results));
        }

        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <FlatList
                    style={{flex: 1}}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => this.getFlatListItem(index, item)}
                />
            </View>
        );
    }
}

/** Map to redux components. */
const mapDispatchToProps = dispatch => bindActionCreators({ fetchMovieList }, dispatch);


/** Map common and book state to redux components */
const mapStateToProps = state => ({
    movies: state.movies
});

/** Connect mapStateToProps to BookScreen */
export default connect(mapStateToProps, mapDispatchToProps)(MoviesLandingScreen);
