import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Dimensions,
  Button
} from "react-native";
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE } from "react-native-maps";
import { Icon } from 'react-native-elements'
import VideoView from '../components/VideoView';//'./app/components/VideoView';
import EStyleSheet from 'react-native-extended-stylesheet';

const LATITUDE = 9.0397084;
const LONGITUDE = 38.7624379;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

const dimensions = Dimensions.get("window");
const mapHeight = dimensions.height;
const mapWidth = dimensions.width;


class AnimatedMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      width: mapWidth,
      markers: [],
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE
      }),
      showVideo: false
    };
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      position => { },
      error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 50000
      }
    );
  }

  componentDidMount() {
    const { coordinate } = this.state;
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { coordinate, routeCoordinates } = this.state;
        const { latitude, longitude } = position.coords;
        const newCoordinate = {
          latitude,
          longitude
        };
        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }
        const width = Dimensions.get('window').width;
        this.setState({
          width,
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate])
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }


  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  buttonClickListener = () => {
    alert("works fine");
  }

  playVideo = () => {
    alert("works fine");
  }
  render() {

    video = this.state.showVideo ? 'Video is not playing' : 'Video is playing';

    return (
      <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
        <ScrollView vertical={true} pagingEnabled >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            <View style={{
              flex: 1,
              height: mapHeight - 200,
              justifyContent: 'center',
              alignItems: 'stretch',
              flexDirection: 'row',
              alignSelf: 'auto'
            }}>

              <MapView
                style={{ height: mapHeight - 200, width: mapWidth }}
                showUserLocation
                followUserLocation
                loadingEnabled
                region={this.getMapRegion()}>
                {this.state.markers.map(marker => (
                  <Marker
                    coordinate={marker.coordinate}
                    title={marker.title}
                    description={marker.description}
                    image={require('../../assets/circle_play.png')}>
                    <MapView.Callout tooltip style={styles.customView}>
                      <TouchableHighlight onPress={this.playVideo} underlayColor='#dddddd'>
                        <View style={styles.calloutText}>
                          <Text>{marker.title}{"\n"}{marker.description}</Text>
                        </View>
                      </TouchableHighlight>
                    </MapView.Callout>
                  </Marker>

                ))}

                <Marker.Animated
                  ref={marker => {
                    this.marker = marker;
                  }}
                  coordinate={this.state.coordinate} />
              </MapView>
            </View>
          </ScrollView>
          <View style={{
            backgroundColor: '#e6e6e6',
            justifyContent: "center",
            alignItems: "center",
            height: mapHeight - 560,
            flex: 1,
            flexDirection: 'column',
          }}>


            <Text style={{ color: "black", width: 100, textAlign: 'center', fontSize: 16, fontFamily: "verdana" }}>
              AAiT building
            </Text>
            <Text style={{ color: "black", textAlign: 'center', fontSize: 20 }}>
              King George Street 1000
            </Text>
          </View>

          {/* video view lies here... */}
          <VideoView />
          <View style={{
            backgroundColor: '#FFEBCD',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            height: mapHeight - 560,
            paddingVertical: 10
          }}>
            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 2 }}>
              <View style={styles.buttonContainer}>
                <Text style={{ color: "black", fontSize: 18 }}>
                  More info
                  </Text>
                <TouchableOpacity
                  onPress={this.playVideo}>
                  <Text style={styles.text}>
                    Fun Facts
                          </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={this.playVideo}>
                  <Text style={styles.text}>
                    Links
                          </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: "#FFEBCD" }}>
            <View style={styles.buttonContainer}>
              <Text style={{ color: "black", fontSize: 18, paddingHorizontal: 10 }}>
                Find vej
                  </Text>
              <TouchableOpacity
                onPress={this.playVideo}
                style={{}}>
                <Icon
                  raised
                  name='bicycle'
                  type='font-awesome'
                  color='gray'
                  onPress={() => console.log('hello')} />

              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={this.playVideo}
                style={{}}>
                {/* <Text style={styles.text}>
                    Links
                          </Text> */}
                <Icon
                  raised
                  name='car'
                  type='font-awesome'
                  color='gray'
                  onPress={() => console.log('hello')} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ backgroundColor: '#c18ff0', flex: 1, flexDirection: 'row', height: 70, paddingBottom: 10 }}>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ color: 'white', fontSize: 17, paddingTop: 10, marginLeft: 10, textAlign: 'left' }}>Find andet i naeheden(Google)</Text>
            </View>
            <View style={{ justifyContent: 'flex-end', borderColor: 'white' }}>
              <Button
                onPress={this.playVideo}
                title="Sydsjaeland"
                color="#841584"
              />
            </View>
          </View>

          <View style={{ backgroundColor: '#A52A2A', flex: 1, flexDirection: 'row', height: 70, paddingBottom: 10 }}>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ color: 'white', fontSize: 17, paddingTop: 10, marginLeft: 10, textAlign: 'left' }}>Find andet i naeheden(Google)</Text>
            </View>
            <View style={{ justifyContent: 'flex-end', marginHorizontal: 50 }}>
              <Icon
                name='angle-right'
                type='font-awesome'
                color='white' />
            </View>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#A9A9A9',
    backgroundColor: '#B8860B',
    marginHorizontal: 20,
    color: 'white'
  },
  video_style: {
    position: 'absolute',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  facts_style: {
    flex: 1,
    flexDirection: 'row',
    textAlign: "center"
  },
  links_style: {
    flex: 1,
    flexDirection: 'row',
    textAlign: "center",
    alignItems: "flex-end"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 10
  }
});
// define extended styles 
const eStyles = EStyleSheet.create({
  column: {
    width: '80%'                                    // 80% of screen width
  },
  mapView: {
    width: 100,
    height: 100
  },
  '@media (min-width: 350) and (max-width: 500)': { // media queries
    mapView: {
      width: '100%',
    }
  },
  '@media (min-width: 150) and (max-width: 350)': { // media queries
    mapView: {
      width: '100%',
    }
  },
  '@media (min-width: 500) and (max-width: 650)': { // media queries
    mapView: {
      width: '100%',
    }
  }

});

export default AnimatedMarkers;