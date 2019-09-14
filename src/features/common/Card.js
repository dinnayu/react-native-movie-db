import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

export default class Card extends React.Component {

    getTitle(){
        return (
            <Text>{this.props.data.type}</Text>
        )
    }

    render(){
        return <View />
    }
}