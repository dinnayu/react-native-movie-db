import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { Header } from 'react-navigation';
const { width } = Dimensions.get('window');

export default EStyleSheet.create({

    containerCard: {
        width: width/3,
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

    textCarouselTitle: {
        paddingLeft: 24,
        marginBottom: 16
    }

})