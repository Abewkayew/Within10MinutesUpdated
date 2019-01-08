import React, { Component } from 'react';
import { AppRegistry, Text, View, Dimensions, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { Icon } from 'react-native-elements';

import VideoPlayer from 'react-native-video-controls';


export default class VideoView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routeCoordinates: [],
      markers: [],
      prevLatLng: {},
      showVideo: false,
      paused: false
    };
  }
  playVideo = () => {
    this.setState({
      paused: false
    });

  }
  render() {
    let dimensions = Dimensions.get("window");
    let mapHeight = dimensions.height;
    let mapWidth = dimensions.width;

    return (
      <View style={{
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: "center",
        height: mapHeight - 400,
        flex: 1,
        flexDirection: 'row'
      }}>

        <VideoPlayer
           source={{ uri: "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4" }}   // Can be a URL or a local file.
           navigator={this.props.navigator}
           toggleResizeModeOnFullscreen={true}
           showOnStart={false}
           paused = {this.state.paused}
        />

        {/* play button */}
        {/* <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute' }}>
          <Icon
            raised
            name='play'
            type='font-awesome'
            color='#f50'
            onPress={this.playVideo} />
        </View> */}

      </View>
    );
  }

}

const styles = StyleSheet.create({
  video_style: {
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

});