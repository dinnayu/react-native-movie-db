import React from 'react';
import { TouchableOpacity, Text, View, Image, FlatList } from 'react-native';
import Card from './Card';
import Styles from './Styles';

export default class Carousel extends React.Component {

    getTitle(){
        return (
            <View style={Styles.containerCarouselTitle}>
                <Text style={Styles.textCarouselTitle}>{this.props.data.type}</Text>
                <TouchableOpacity>
                    <Image style={Styles.arrowImage} source={require('../../assets/right_arrow_orange.png')} />
                </TouchableOpacity>
            </View>
            
        )
    }

    getFlatListItem(index, item, size){
        return <Card onPressAction={this.props.onPressAction} data={item} index={index} size={size} navigation={this.props.navigation}/>
    }

    render(){
        return (
            <View style={{flex: 1}}>
                {this.getTitle()}
                <FlatList
                    style={{ paddingRight: this.props.data.result.length > 1 ? 0 : 24 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.props.data.result}
                    scrollEnabled={this.props.data.result.length > 1}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => this.getFlatListItem(index, item, this.props.data.result.length)}
                />
            </View>
        )
    }
}