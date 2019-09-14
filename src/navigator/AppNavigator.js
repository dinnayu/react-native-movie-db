import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import MoviesLandingScreen from '../features/movies/MoviesLandingScreen';
import TvShowsLandingScreen from '../features/tvshows/TVShowsLandingScree';

const MovieStack = createStackNavigator({
    MoviesLanding: { screen: MoviesLandingScreen },
    TvShows: { screen: TvShowsLandingScreen}
});

const AppNavigator = createMaterialBottomTabNavigator({
    MovieStack
  });

export default createAppContainer(AppNavigator);