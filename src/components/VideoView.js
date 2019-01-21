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
      paused: true,
      showControls: false
    };
  }

  componentWillMount(){
    console.log("SOmething");
  }

  componentDidMount() {
    console.log("Component did mount method is working.");
    console.log(this.state.paused);
    if (this.state.paused) {
      return (
        //      play Video button...
        < View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', position: 'absolute' }
        }>
          <Icon
            raised
            name='play'
            type='font-awesome'
            color='#f50'
            onPress={this.playVideo} />
        </View >

      );
    }else{
      return(
        <View>
          <Text>This is not fair</Text>
        </View>
      );
    }
  }

  playVideo = () => {
    this.setState({
      paused: false,
      showControls: true
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
          // source={{ uri: "https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4" }}   // Can be a URL or a local file.
          source={{ uri: "https://firebasestorage.googleapis.com/v0/b/within1hour-1483711039788.appspot.com/o/video%2FtestAll%2F10%20Minutter%20-%20Hovedbanega%CC%8Arden%20-%20Ra%CC%8Adhuspladsen.m4v?alt=media&token=3cb9a2fd-2380-419f-a01a-49e8927721d8" }}   // Can be a URL or a local file.
          navigator={this.props.navigator}
          toggleResizeModeOnFullscreen={true}
          controls={this.state.showControls}
          paused={this.state.paused}
        />

      </View >
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