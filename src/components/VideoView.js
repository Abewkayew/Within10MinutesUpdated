import React, { Component } from 'react';
import { AppRegistry, Text, View, Dimensions, StyleSheet } from 'react-native';
// import Video from 'react-native-video';
// import { Icon } from 'react-native-elements';

import VideoPlayer from 'react-native-video-controls';

export default class VideoView extends Component {

  componentWillMount(){
    console.log("SOmething");
  }

  componentDidMount() {
    console.log("Component did mount method is working.");
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
          // source={{ uri: "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4" }}   // Can be a URL or a local file.
          source={{uri: this.props.videoUrl}}   // Can be a URL or a local file.
          navigator={this.props.navigator}
          toggleResizeModeOnFullscreen={true}
          controls={true}
          paused={true}
        />

      </View >
    );
  }

}

