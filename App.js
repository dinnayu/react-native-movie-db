/**
 * MovieDB App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
  View
} from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import MovieApp from './MovieApp';
import RootReducer from './src/reducers/RootReducer';

/** Register global state to redux store */
const store = createStore(RootReducer, applyMiddleware(thunk));

/** Base class for MovieDB Application. */
export default class App extends Component {

  render() {
      return (
          <Provider store={store} >
              <MovieApp />
          </Provider>
      )
  }
}
