import {StyleSheet, Dimensions} from 'react-native';
import Color from '../../common/Colors';
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
        paddingTop: 12,
        paddingBottom: 12

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

    textKeyMovieDetails: {
        fontSize: 14,
        fontWeight: '500',
        color: Color.PURPLE
    },

    textValueMovieDetails: {
        fontSize: 14, 
        fontWeight: '400', 
        letterSpacing: 0.33, 
        color: Color.ORANGE
    },

    textOverviewKey: {
        fontSize: 18,
        color: Color.DARK_GREY,
        marginBottom: 8,
        letterSpacing: 0.2
    },

    textOverviewValue: {
        fontSize: 16,
        color: Color.GREY,
        letterSpacing: 0.33
    },

    textRating: {
        fontSize: 16,
        color: Color.GREY,
        fontWeight: 'bold'
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
        alignSelf: 'center',
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