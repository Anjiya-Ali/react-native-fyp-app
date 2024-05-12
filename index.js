/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react'; // Add this line
import { Provider } from 'react-redux';
import store from './redux/store';
import { register } from '@videosdk.live/react-native-sdk';

const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

register();

AppRegistry.registerComponent(appName, () => Main);
