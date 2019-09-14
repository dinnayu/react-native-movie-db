import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { Header } from 'react-navigation';
const { width } = Dimensions.get('window');

export default EStyleSheet.create({

    movieImage: {
        width: width - 48,
        aspectRatio: 4/3,
        resizeMode: 'cover',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }

})