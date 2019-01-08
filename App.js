import MainLoad from './src/views/MainLoad';
import Aktuelt from './src/views/Aktuelt';
import Within10Minutes from './src/views/Within10min';
import AnimatedMarkers from './src/views/AnimatedMarkers';
import Menu from './src/components/Menu';

import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
  MainLoad: {
    screen: MainLoad
  },
  Within10: {
    screen: Within10Minutes
  },
  Aktuelt: {
    screen: Aktuelt
  },
  AnimatedMarkers:{
    screen: AnimatedMarkers
  },
  Menu:{
    screen: Menu
  }
});

export default createAppContainer(AppNavigator);