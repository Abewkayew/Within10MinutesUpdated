import React, {StyleSheet} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
export default StyleSheet.create({

    style_marker_text: {
      color: '#373535',
      fontSize: 16
    },
    customView: { 
    backgroundColor: "#FAF2F2", 
    padding: 10 
  },
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