import React, {Component} from 'react';

import {Platform, StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import SideMenu from 'react-native-side-menu';
import Menu from '../components/Menu';
// const COLOR = require('../assets/colors');

export default class Within10Minutes extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    // this.props.navigation.setParams({ handleSave: this.toggle });
    this.state = {
      isOpen: false,
        latitude: 39.15132,
        longitude: -104.4135,
        error:null,
      // selectedItem: 'About',
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return {
      title:"Indenfor10minutter",
      gesturesEnabled: false,
      headerLeft: <Button title={"MENU"} onPress={() => params.handleMenu()} />
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleMenu: this.toggle });

    navigator.geolocation.getCurrentPosition(
       (position) => {
         console.log("wokeeey");
         console.log(position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
   }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item => {
  this.setState({
    isOpen: false
  })
  console.log(item)
  this.props.navigation.navigate(item);
  }

    render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
      return (
        <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
      
        <SafeAreaView style={styles.container}>
          <View style={{
            width:'100%',
            height:'100%',
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          
          <MapView 
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
					showsMyLocationButton={true}
					showsCompass={true}
					followsUserLocation={true}
					// loadingEnabled={true}
					toolbarEnabled={true}
					zoomEnabled={true}
					rotateEnabled={true}
          initialRegion={{
            latitude:       this.state.latitude,
            longitude:      this.state.longitude,
            latitudeDelta:  1,
            longitudeDelta: 1
            // latitude:       39.15132,
            // longitude:      -104.4135,
            // latitudeDelta:  0.0922,
            // longitudeDelta: 0.0421
          }}
          />
          <Text>Og her sker det så</Text>
          </View>
        </SafeAreaView>
        </SideMenu>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    map:{
      width:'100%',
      height:'100%'
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    }
  });
  