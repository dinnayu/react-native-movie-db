import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import Constant from '../../common/Constants';
import Styles from './Styles';

export default class Card extends React.Component {

    getTitle(){
        const title = this.props.titleKey ? this.props.data[this.props.titleKey] : this.props.data.title;
        return (
            <Text numberOfLines={3} style={{fontSize: 14, fontWeight: 'bold'}}>{title}</Text>
        )
    }

    onPressAction() {
        if (this.props.onPressAction !== undefined) {
            this.props.onPressAction(this.props.data, this.props.navigation);
        }
    }

    render(){
        return <TouchableOpacity onPress={() => this.onPressAction()}>
            <View style={[Styles.containerCard, { marginLeft: this.props.index === 0 ? 24 : 8, marginRight: this.props.index === this.props.size - 1 ? 24 : 0 }]}>
                    <Image style={Styles.movieImage} source={{uri: Constant.BASE_URL_IMAGE+this.props.data.poster_path}} />
                    {this.getTitle()}
                </View>
        </TouchableOpacity>
    }
}