import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableHighlight,
  Dimensions,
  Animated,
  Alert,
  ActivityIndicator,
  Modal
} from "react-native";
import VideoPlayer from 'react-native-video-controls';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import SideMenu from "react-native-side-menu";
import Menu from "../components/Menu";
import UserLocationManager from "../utils/UserLocationManager";
import videoManager from '../utils/videoManage';
import Loading from './Loading';
import Firebase from '../utils/Firebase'
var user_location_ref = Firebase.database().ref("locations");
        

//begin checkup...
const markerImage = require("../assets/images/icon_video.png");

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class screens extends Component {
  // Begin the object retrieval from the Firebase API...
  constructor(props) {
    super(props);

    this.markerClick = this.markerClick.bind(this);

    this.state = {
      animating: true,
      modalVisible: true,
      loc_object_one: [],
      locationObj: [],
      video_URL: [],
      markers: [
        {
          coordinate: {
            latitude: 55.6819184,
            longitude: 12.5938208
          },
          title: "Admiral Hotel",
          description: "This is the best place in Copenhagen",
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
      this.setState({animating: false, modalVisible: false});
      this.state.loc_object_one.map((vid_url, index) => {
          
          // Starting...
               const store = Firebase.storage();
               var local_url = vid_url.videourl;
               var locationFirebaseUrl = "gs://within1hour-1483711039788.appspot.com/video/testAll/" + local_url;
               let index_one = local_url.indexOf(local_url[local_url.length - 4]);
               let mySubstring = local_url.substr(index_one);
               var that = this;
               
               if (mySubstring != ".mp4") {
                 locationFirebaseUrl += ".m4v"
               }
               locaReferenceUrl = store.refFromURL(locationFirebaseUrl);
             
            //    locaReferenceUrl.getDownloadURL().then(function (url) {
            //        //Insert url into an <Video> tag to "download"
            //       //  console.log("GENERATED VIDEO URL AT " + index + " IS: ", url);
            //  });
     
          // Ending of the getDownloadURL...

      });
        this.setState({ 
            locationObj: datas
          });
      }
    );


  }

  getVidURL = () =>{
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
        
          locaReferenceUrl.getDownloadURL().then(function (url) {

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
     }, 100);

};
  // End the Object retrieval from the firebae API...
   
  markerClick = (local_url) => {
    alert("Local URL is: ", local_url);
    // var vid_manager = new videoManager("10_minutter_albertslund_station.mp4");
    // var vd_man = vid_manager.getLocationVideoUrl();
    // // Get the download URL

    // vd_man.then(data => {
    //   setTimeout(() => {
    //     console.log("TIME OUT DATAS ARE: ", data);
    //     alert("Video url is: ", data);
    //   }, 1000);
    // });
  };

  closeActivityIndicator() {
    setTimeout(() => {
    //  this.setState({animating: false, modalVisible: false});
    }, 4000);

  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
    let user_location_ob = [];
    // startings of data retrieval from Firebase API....
    UserLocationManager();
    //end of data retrieval from Firebase API...

  }


  componentDidMount() {
   
    this.closeActivityIndicator();
    
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      // const inputRange = [
      //   (index - 1) * CARD_WIDTH,
      //   index * CARD_WIDTH,
      //   (index + 1) * CARD_WIDTH
      // ];
      // const scale = this.animation.interpolate({
      //   inputRange,
      //   outputRange: [1, 2.5, 1],
      //   extrapolate: "clamp"
      // });
      // const opacity = this.animation.interpolate({
      //   inputRange,
      //   outputRange: [0.35, 1, 0.35],
      //   extrapolate: "clamp"
      // });
      // return { scale, opacity };
    });

    return (
      <View style={styles.container}>

        <Modal
            animationType = {"slide"}
            transparent = {false}
            visible = {this.state.modalVisible}
            onRequestClose = {() => {alert("Modal has been closed.")}}
            >
            <View style = {styles.modal}>
                <Text>Loading Location Information</Text>
                <ActivityIndicator animating = {this.state.animating}
                style = {styles.activityIndicator} size = "large"/>
            </View>
        </Modal>

        {/* {
          this.state.locationObj.map((location_datas, index) => {
            console.log("VIDDDDDD: " + location_datas.videourl);
          })
        } */}
        {
          this.state.loc_object_one.map((marker, index) => {
              <Text>{marker.lokation}</Text>
          })
        }
        <MapView
          ref={map => (this.map = map)}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.loc_object_one.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  // scale: interpolations[index].scale
                }
              ]
            };
            // var vid_manager = new videoManager(marker.videourl);
            // var vd_man = vid_manager.getLocationVideoUrl();
            // // Get the download URL
            
            // Promise.all(vd_man).then(data => {
            //   // Do something with the data here
            //   console.log("First Datas are: ", data);
            // });


            // vd_man.then(data => {
            //   console.log("DATA: ", data);
            // });
            // console.log("DOWNLOAD URLS ARE: ", vd_man);




            const store = Firebase.storage();
            var local_url = marker.videourl;
            var locationFirebaseUrl = "gs://within1hour-1483711039788.appspot.com/video/testAll/" + local_url;
            let index_one = local_url.indexOf(local_url[local_url.length - 4]);
            let mySubstring = local_url.substr(index_one);

            
            if (mySubstring != ".mp4") {
              locationFirebaseUrl += ".m4v"
            }
            locaReferenceUrl = store.refFromURL(locationFirebaseUrl);
            var location_video_url = "";
          //   locaReferenceUrl.getDownloadURL().then(function (url) {
          //       //Insert url into an <Video> tag to "download"
          //       location_video_url = url;
          // });

            return (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: parseFloat(marker.altitude),
                  longitude: parseFloat(marker.longitude),
                }}
                onCalloutPress={() => Alert.alert(
                                'Denmarke',
                                "URL IS: " + locaReferenceUrl,
                                [
                                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                                  {text: 'OK', onPress: () => console.log("OK pressed")},
                                ],
                                { cancelable: false }
                              )}
                image={markerImage}
              >
                {/* <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    <Animated.View style={[styles.ring, scaleStyle]} />
                    <View style={styles.marker} />
                </Animated.View> */}
                <MapView.Callout tooltip style={styles.customView}>
                  <TouchableHighlight
                    style={{ backgroundColor: "#008B8B", padding: 10 }}
                    onPress={() => this.markerClick}
                    underlayColor="#000"
                  >
                    <View style={styles.calloutText}>
                      <Text style={{ color: "white" }}>
                        {marker.lokation}
                        {"\n"}
                        {marker.altitude}
                        {"\n"}
                        {marker.videourl}
                        {"\n"}
                        Play Video
                      </Text>
                    </View>
                  </TouchableHighlight>
                </MapView.Callout>
              </MapView.Marker>
            );
          })}
        </MapView>
        {/* <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'silver'
  },
  container: {
    flex: 1
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden"
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  cardDescription: {
    fontSize: 12,
    color: "#444"
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  }
});

//end checkup...

// const COLOR = require('../assets/colors');

// export default class Within10Minutes extends Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     // this.props.navigation.setParams({ handleSave: this.toggle });
//     this.state = {
//         isOpen: false,
//         latitude: 39.15132,
//         longitude: -104.4135,
//         error:null,
//         markers: [{
//           title: 'FINISH',
//           description: 'You have found me!',
//           coordinate: {
//             latitude: 39.15132,
//             longitude: -104.4135
//         },
//        }]
//       // selectedItem: 'About',
//     };
//   }

//   static navigationOptions = ({ navigation }) => {
//     const { params = {} } = navigation.state

//     return {
//       title:"Indenfor10minutter",
//       gesturesEnabled: false,
//       headerLeft: <Button title={"MENU"} onPress={() => params.handleMenu()} />
//     }
//   }

//   markerClick = () => {

//     alert("MARKER click works fine");
//     // 1. set the video urls dynamically

//     // 2. Display infos about the map

//   }

//   takeObject = (locationObject) => {
//     // console.log(JSON.parse(JSON.stringify(locationObject)));
//   }

//   componentWillMount(){
//     UserLocationManager().then(data => {

//       var location_obj = [];

//       for(var i = 0; i < data.length; i++){
//         // console.log("OBJECTS are: ", data[i]);
//         loc_obj = {
//           lokation: data[i].lokation,
//           latitude: data[i].altitude,
//           longitude: data[i].longitude
//         }
//         location_obj.push(loc_obj);
//         // console.log("++++++++++++", data[i].lokation);
//         // this.takeObject(location_obj);

//       // this.setState({
//         //   markers: [{
//         //     title: data[i].lokation,
//         //     description: data[i].info,
//         //     coordinate: {
//         //       latitude: parseFloat(data[i].altitude),
//         //       longitude: parseFloat(data[i].longitude)
//         //     }
//         //   }]
//         // });
//       }

//       console.log("--------------", location_obj);

//       console.log("=============================================================================================================");
//       // console.log("OUTSIDE are: ", location_obj);
//       console.log("OUTSIDE OBJECT COUNT: ", location_obj.length);

//       console.log("----------------------------------- AFTER FINISH -------------------------------");
//       }).
//       catch(error=>{
//           console.log("The error is: " + error);
//       });

//   }

//   componentDidMount() {

//     this.props.navigation.setParams({ handleMenu: this.toggle });

//     navigator.geolocation.getCurrentPosition(
//        (position) => {
//          console.log("wokeeey");
//          console.log(position);
//          this.setState({
//            latitude: position.coords.latitude,
//            longitude: position.coords.longitude,
//            error: null,
//          });
//        },
//        (error) => this.setState({ error: error.message }),
//        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
//      );
//    }

//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen,
//     });
//   }

//   updateMenuState(isOpen) {
//     this.setState({ isOpen });
//   }

//   onMenuItemSelected = item => {
//   this.setState({
//     isOpen: false
//   })
//   console.log(item)
//   this.props.navigation.navigate(item);
//   }

//     render() {
//     const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
//       return (
//         <SideMenu
//         menu={menu}
//         isOpen={this.state.isOpen}
//         onChange={isOpen => this.updateMenuState(isOpen)}
//       >

//         <SafeAreaView style={styles.container}>
//           <View style={{
//             width:'100%',
//             height:'100%',
//             backgroundColor: 'blue',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>

//           <MapView
//           provider={PROVIDER_GOOGLE}
//           style={styles.map}
//           showsUserLocation={true}
// 					showsMyLocationButton={true}
// 					showsCompass={true}
// 					followsUserLocation={true}
// 					// loadingEnabled={true}
// 					toolbarEnabled={true}
// 					zoomEnabled={true}
// 					rotateEnabled={true}
//           initialRegion={{
//             latitude:  this.state.latitude,
//             longitude: this.state.longitude,
//             latitudeDelta:  1,
//             longitudeDelta: 1
//             // latitude:       39.15132,
//             // longitude:      -104.4135,
//             // latitudeDelta:  0.0922,
//             // longitudeDelta: 0.0421
//           }}>
//             {this.state.markers.map((marker) => (
//                   <MapView.Marker
//                     coordinate={marker.coordinate}
//                     title={marker.title}
//                     description={marker.description}
//                     onCalloutPress={this.markerClick}>
//                       <MapView.Callout tooltip style={styles.customView}>
//                           <TouchableHighlight style={{backgroundColor: "#00f"}} onPress= {()=>this.markerClick} underlayColor='#000'>
//                               <View style={styles.calloutText}>
//                                   <Text>{marker.title}{"\n"}{marker.description}</Text>
//                               </View>
//                           </TouchableHighlight>
//                       </MapView.Callout>
//                    </MapView.Marker>
//                 ))}
//           </MapView>
//             <Text>Og her sker det så</Text>
//           </View>
//         </SafeAreaView>
//         </SideMenu>
//       );
//     }
//   }

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#F5FCFF',
//     },
//     map:{
//       width:'100%',
//       height:'100%'
//     },
//     welcome: {
//       fontSize: 20,
//       textAlign: 'center',
//       margin: 10,
//     },
//     instructions: {
//       textAlign: 'center',
//       color: '#333333',
//       marginBottom: 5,
//     }
//   });
