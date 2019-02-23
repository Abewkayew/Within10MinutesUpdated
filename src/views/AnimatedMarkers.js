import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Button,
  AsyncStorage,
  Animated,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import MapView, { Callout, Marker, AnimatedRegion } from "react-native-maps";
import { Icon } from 'react-native-elements'
import VideoView from '../components/VideoView';//'./app/components/VideoView';
import Firebase from '../utils/Firebase';

import styles from '../styles/styles';
import Modal from "react-native-modal";
var user_location_ref = Firebase.database().ref("locations");
const markerImage = require("../assets/images/icon_video.png");

const dimensions = Dimensions.get("window");
const mapHeight = dimensions.height;
const mapWidth = dimensions.width;

class AnimatedMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actual_location: 'Admiral Hotel',
      location_region: 'Storkøbenhavn',
      animating: true,
      pause_state: true,
      modalVisible: true,
      loc_object_one: [],
      local_data_obj: [],
      locationObj: [],
      video_URL: [],
      locationVideoURL: 'https://firebasestorage.googleapis.com/v0/b/within1hour-1483711039788.appspot.com/o/video%2FtestAll%2FAdmiral%20Hotel-1-1.m4v?alt=media&token=7001028b-0c56-4b10-a79b-23e36bcf0fbd',
      markers: [
        {
          coordinate: {
            latitude: 55.6819184,
            longitude: 12.5938208
          },
          title: "Admiral Hotel",
          description: "The best hotel in Copenhagen",
        }
      ],
      region: {
        latitude: 55.6819184,
        longitude: 12.5938208,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068
      }
    };

    user_location_ref.once('value').then(snapshot => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let data = snapshot.val();
          let location_datas =  Object.values(data);
          this.setState({
            loc_object_one: location_datas
          });
          var non_validate = false;
          if(!non_validate){
            resolve(location_datas);
          }else{
            reject("There is an error to fetch the data");
          }
        }, 1000);
      });
    }).then(datas =>{
      this.setState({animating: false, modalVisible: false, pause_state: false});
      this.saveAsyncData(datas);
      this.displayAsyncData();
      // var data_ob = JSON.parse(datas);
      // var data_stringified = JSON.stringify(datas);
    
      var parseData = JSON.parse(datas);
      alert(parseData);
      setTimeout(() => {
        // alert(data_stringified);
      }, 1000);

      }
    );


  }

  saveAsyncData(data){
    AsyncStorage.setItem("locationObject", JSON.stringify(data));
  }

  displayAsyncData = async () => {
      try{
        let locationObject = await AsyncStorage.getItem('locationObject');
        // let parsedData = JSON.stringify(locationObject);
        // let againParse = JSON.parse(parsedData);
        let locationArray = [];
        locationArray.push(locationObject);
        this.setState({
          local_data_obj: locationArray
        });
      }catch(error){
        console.log("Async Storage Error: ", error);
      }
  }


  getVidURL = async () =>{
    const store = Firebase.storage();
   setTimeout(() => {
      this.state.loc_object_one.map((vid_url, index) => {
        var local_url = vid_url.videourl;
        var locationFirebaseUrl = "gs://within1hour-1483711039788.appspot.com/video/testAll/" + local_url;
        let index_one = local_url.indexOf(local_url[local_url.length - 4]);
        let mySubstring = local_url.substr(index_one);
        var that = this;
        
        if (mySubstring != ".mp4") {
          locationFirebaseUrl += ".m4v"
        }
        locaReferenceUrl = store.refFromURL(locationFirebaseUrl);
      
        locaReferenceUrl.getDownloadURL().then(url => {

            // Insert url into an <Video> tag to "download"
            that.setState({
              video_URL: url
            });
            var video_URL = {
                videoUrl: url
            };
            console.log("GENERATED VIDEURL IS: ", video_URL);
      });        
    });
   }, 1000);

};
  
  playVideo(locationObject){
    const store = Firebase.storage();
    const local_url = locationObject.videourl;  
    setTimeout(() => {
        var locationFirebaseUrl = "gs://within1hour-1483711039788.appspot.com/video/testAll/" + local_url;
        let index_one = local_url.indexOf(local_url[local_url.length - 4]);
        let mySubstring = local_url.substr(index_one);
        var that = this;
        
        if (mySubstring != ".mp4") {
          locationFirebaseUrl += ".m4v"
        }
        locaReferenceUrl = store.refFromURL(locationFirebaseUrl);
      
        locaReferenceUrl.getDownloadURL().then(url => {

            // Insert url into an <Video> tag to "download"
            
            // insert the generated video url into the object.
            this.setState({
              locationVideoURL: url,
              actual_location:locationObject.lokation,
              location_region: locationObject.region
            });
        });
   }, 1000);

 }

  componentWillMount() {
    this.animation = new Animated.Value(0);
    navigator.geolocation.getCurrentPosition(
      position => {},
      error => console.log(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  componentDidMount() {

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { coordinate, routeCoordinates } = this.state;
        const { latitude, longitude } = position.coords;
        
        this.setState({
          latitude,
          longitude
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

  }

  componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
  }


  checkIt = () => {
    alert("works fine");
  }
  

  render() {
    return (
      <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
        <ScrollView vertical={true}>

          <Modal isVisible={this.state.modalVisible}>
          <View style = {{alignSelf: 'center', alignItems: 'center'}}>
                <ActivityIndicator animating = {this.state.animating}
                style = {styles.activityIndicator} size = "large"/>
            </View>
          </Modal>

              <MapView
                style={{ height: mapHeight-200, width: mapWidth }}
                showUserLocation
                followUserLocation
                loadingEnabled
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={true}
                followsUserLocation={true}
                // loadingEnabled={true}
                toolbarEnabled={true}
                zoomEnabled={true}
                rotateEnabled={true}
                ref={map => (this.map = map)}
                initialRegion={this.state.region}>
                {this.state.loc_object_one.map((marker, index) => {

            
            return (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(marker.altitude),
                  longitude: parseFloat(marker.longitude),
                }}
                onCalloutPress={() => this.playVideo(marker) }
                image={markerImage}>
              
              <MapView.Callout>
                  <TouchableHighlight
                    style={styles.customView}
                    // onPress={() => this.markerClick('this is a video url')}
                    underlayColor="#000"
                  >
                    <View style={styles.calloutText}>
                      
                      <Text style={styles.style_marker_text}>
                        {marker.lokation}
                        {"\n"}
                        Click to play video
                      </Text>
                    </View>
                  </TouchableHighlight>
                </MapView.Callout>
              </MapView.Marker>
            );
          })}

              </MapView>
          <View style={{
            backgroundColor: '#e6e6e6',
            justifyContent: "center",
            alignItems: "center",
            height: mapHeight - 560,
            flex: 1,
            flexDirection: 'column',
          }}>

            <Text style={{ color: "black", textAlign: 'center', fontSize: 18, fontFamily: "verdana" }}>
              {this.state.actual_location}
            </Text>
            <Text style={{ color: "black", textAlign: 'center', fontSize: 20 }}>
              {this.state.location_region}
            </Text>
          </View>
          <VideoView videoUrl={this.state.locationVideoURL} pause_state={this.state.pause_state}/>
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
                  onPress={() => this.checkIt}>
                  <Text style={styles.text}>
                    Fun Facts
                          </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={this.checkIt}>
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
                onPress={this.checkIt}
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
                onPress={this.checkIt}
                style={{}}>
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
                onPress={this.checkIt}
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

export default AnimatedMarkers;