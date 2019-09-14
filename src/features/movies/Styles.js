import {StyleSheet, Dimensions} from 'react-native';
import Color from '../../common/Color';
const { width } = Dimensions.get('window');

export default StyleSheet.create({

    /** MOVIES LANDING SCREEN */
    
    containerMovie: {
        flex: 1,
        justifyContent: 'center'
    },

    flatlistMovie: {
        flex: 1,
        paddingTop: 12
    },

    /** MOVIE DETAILS */

    containerMovieDetails: {
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24,
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
    },

    /** MOVIE LIST */
    containerPagination: {
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    imageMovieList: {
        width: 120,
        height: 180,
        alignItems: 'flex-start',
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 12
    },
    imageBorder: {
        borderWidth: 1,
        borderColor: Color.ORANGE
    },
    imageIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    ratingIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    textPagination: {
        marginLeft: 5,
        marginRight: 5
    },
    textMovieListTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12
    }

})