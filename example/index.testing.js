import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './app/App';

global.TEST_MODE = true;

AppRegistry.registerComponent(appName, () => App);
