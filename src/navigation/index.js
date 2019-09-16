import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoadingDataScreen from '../screens/LoadingData';
import HomeScreen from '../screens/Home';
import CameraScreen from '../screens/Camera';

const appStack = createStackNavigator({
  LoadingDataScreen: {
    key: 'Loading',
    screen: LoadingDataScreen,
  },
  Home: {
    key: 'Home',
    screen: HomeScreen,
  },
  Camera: {
    key: 'Camera',
    screen: CameraScreen
  }
}, 
{
  headerMode: 'none'
}) 

export default createAppContainer(appStack);