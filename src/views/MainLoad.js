import React from 'react';
import { 
  View, 
  ActivityIndicator, 
  Text
 } from 'react-native';

 const COLOR = require('../assets/colors');

 export default class MainLoad extends React.Component {
    static navigationOptions = {
      header: null
    };
  
    componentDidMount() {
        setTimeout(()=> {
            this.props.navigation.navigate('Within10');
        }, 500);
    }

    render() {
      return(
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor:COLOR.yellowSandy}}>
        {/* <Image style={styles.logo} source={require('../img/HF_logo_4F.png')} /> */}
        <ActivityIndicator size="large" color={COLOR.darkSandBackground}/>
      </View>
      );
    }

}  