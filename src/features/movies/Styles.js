import {StyleSheet, Dimensions} from 'react-native';
import Color from '../../common/Color';
const { width } = Dimensions.get('window');

export default StyleSheet.create({

    containerMovie: {
        flex: 1,
        justifyContent: 'center'
    },

    containerMovieDetails: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 12
    },

    flatlistMovie: {
        flex: 1,
        paddingTop: 12
    },

    imageMovieDetails: {
        width: width / 3,
        aspectRatio: 3 / 4,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0
    },

    titleMovieDetails: {
        fontSize: 16,
        color: Color.ORANGE,
        fontWeight: 'bold',
        marginBottom: 12
    },

    textMovieDetails: {
        fontSize: 12,
        marginBottom: 10,
        letterSpacing: 0.1
    },

    textSynopsis: {
        fontSize: 14,
        letterSpacing: 0.3
    }

})