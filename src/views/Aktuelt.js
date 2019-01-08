import React, {Component} from 'react';

import {Platform, StyleSheet, Text, View, SafeAreaView, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import SideMenu from 'react-native-side-menu';
import Menu from '../components/Menu';
const COLOR = require('../assets/colors');

export default class Within10Minutes extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    // this.props.navigation.setParams({ handleSave: this.toggle });
    this.state = {
      isOpen: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return {
      title:"Indenfor10minutter",
      gesturesEnabled: false,
      headerLeft: <Button title={"MENU"} onPress={() => params.handleSave()} />
    }
  }

  componentDidMount() {
    
    this.props.navigation.setParams({ handleSave: this.toggle });
    console.log('Her sker det')
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

          <Text>Og her sker det så</Text>

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
      backgroundColor: COLOR.maroon,
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
  