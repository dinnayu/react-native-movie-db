import React from 'react';
import { TouchableOpacity, Text, View, Image, FlatList } from 'react-native';

export default class Carousel extends React.Component {

    getTitle(){
        return (
            <Text>{this.props.data.type}</Text>
        )
    }

    render(){
        return <View style={{flex: 1}}>
                {this.getTitle()}
            </View>
    }
}