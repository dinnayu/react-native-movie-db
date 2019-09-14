import React from 'react';
import {Image} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import MoviesLandingScreen from '../features/movies/MoviesLandingScreen';
import MovieDetailsScreen from '../features/movies/MovieDetailsScreen';
import TvShowsLandingScreen from '../features/tvshows/TVShowsLandingScree';

/**
 * Configure or create Tabbar menu properties
 * @param {TabBar Menu Title} menuName
 * @param {active tabbar image} activeImage
 * @param {inactive tabbar image} inactiveImage
 */
const getTabBarMenu = (menuName, activeImage, inactiveImage) => {
    return {
      tabBarLabel: menuName,
      tabBarIcon: ({ focused }) => (
        <Image
          source={focused ? activeImage : inactiveImage} style={{width: 25, height: 25}}
        />
      )
  }
}

const MovieStack = createStackNavigator({
    MoviesLanding: { screen: MoviesLandingScreen },
    MovieDetails: { screen: MovieDetailsScreen }
});
let imageFooterSelected = require('../assets/movie_orange.png')
let imageFooter = require('../assets/movie_grey.png')

MovieStack.navigationOptions = getTabBarMenu("Movies", imageFooterSelected, imageFooter);

const TvStack = createStackNavigator({
    MoviesLanding: { screen: MoviesLandingScreen },
    TvShows: { screen: TvShowsLandingScreen}
});
let tvSelected = require('../assets/tv_orange.png')
let tvUnselected = require('../assets/tv_grey.png')

TvStack.navigationOptions = getTabBarMenu("TV Shows", tvSelected, tvUnselected);

const AppNavigator = createMaterialBottomTabNavigator({
    MovieStack,
    TvStack
  });

export default createAppContainer(AppNavigator);