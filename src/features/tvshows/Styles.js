import {StyleSheet, Dimensions} from 'react-native';
const { width } = Dimensions.get('window');
import Color from '../../common/Colors';

export default StyleSheet.create({

    containerTv: {
        flex: 1,
        justifyContent: 'center'
    },

    flatlistTv: {
        flex: 1,
        paddingTop: 12
    },

    imageTvDetails: {
        width: width / 3,
        aspectRatio: 3 / 4,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0
    },

    containerTvDetails: {
        flex: 1,
        paddingTop: 12,
        paddingBottom: 12
    },
    
    containerTvDetailsSeasons: {
        marginTop: 18,
        borderTopWidth: 1,
        borderTopColor: Color.LIGHT_GREY,
        marginLeft: 8,
        marginRight: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12
    },

    titleTvShowDetails: {
        fontSize: 16,
        color: Color.ORANGE,
        fontWeight: 'bold',
        marginBottom: 12
    },

    textKeyTvDetails: {
        fontSize: 14,
        fontWeight: '500',
        color: Color.PURPLE
    },

    textValueTvDetails: {
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

    textSeasonName: {
        fontSize: 14,
        color: Color.GREY,
        letterSpacing: 0.33,
        fontWeight: 'bold'
    },

    textOverviewSeason:{
        fontSize: 12,
        color: Color.GREY
    }

})