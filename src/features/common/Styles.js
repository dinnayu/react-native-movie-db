import {StyleSheet, Dimensions } from 'react-native';
import Color from '../../common/Colors';
const { width } = Dimensions.get('window');

export default StyleSheet.create({

    containerCard: {
        width: width/3,
    },

    containerCarouselTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingRight: 24
    },

    movieImage: {
        width: width/3,
        aspectRatio: 3/4,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0
    },

    arrowImage: {
        width: 15,
        height: 18,
        alignSelf: 'flex-end'
    },

    textCarouselTitle: {
        paddingLeft: 24,
        alignSelf: 'center',
        color: Color.ORANGE,
        fontSize: 18,
        fontWeight: '500'
    }

})