import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MoviesLandingScreen from '../features/movies/MoviesLandingScreen';
import TvShowsLandingScreen from '../features/tvshows/TVShowsLandingScree';

const AppNavigator = createBottomTabNavigator({
    Movies: { screen: MoviesLandingScreen },
    TVShows: { screen: TvShowsLandingScreen}
});

export default createAppContainer(AppNavigator);