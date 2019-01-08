import React, { Component } from 'react';
import { AppRegistry, Text, View, Dimensions, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';


export default class VideoPlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routeCoordinates: [],
      markers: [],
      prevLatLng: {}
    };
  }
  render(){
      return(
        <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute' }}>
            <Icon
                raised
                name='pausecircle'
                type='font-awesome'
                color='#f50'
                onPress={this.playVideo} />
      </View>

      ); 
  }

}  
