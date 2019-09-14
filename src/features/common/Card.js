import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import Constant from '../../common/Constant';
import Styles from './Styles';

export default class Card extends React.Component {

    getTitle(){
        return (
            <Text>{this.props.data.type}</Text>
        )
    }

    render(){
        return <TouchableOpacity onPress={() => this.props.navigation.navigate("MovieDetails")}>
            <View style={[Styles.containerCard, { marginLeft: this.props.index === 0 ? 24 : 8, marginRight: this.props.index === this.props.size - 1 ? 24 : 0 }]}>
                    <Image style={Styles.movieImage} source={{uri: Constant.BASE_URL_IMAGE+this.props.data.poster_path}} />
                    <Text numberOfLines={3} style={{fontSize: 14, fontWeight: 'bold'}}>{this.props.data.title}</Text>
                </View>
        </TouchableOpacity>
    }
}