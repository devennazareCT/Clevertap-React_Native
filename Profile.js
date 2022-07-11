import React, { Component } from 'react';
import { Button, View, Text,ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer,navigation } from 'react-navigation';
import { WebView } from 'react-native-webview';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
        
        };
        //...whatever construction you need
      }
    
  render() {
   // const text =  this.props.navigation.getParam('paramKey', 'nothing sent')
    return (
      <View style={{ flex: 1  }}>
        <Text>Webview screen</Text>
        <WebView
        source={{
          uri: 'https://infinitival-floor.000webhostapp.com/pwa/index.html'
        }}
        style={{ marginTop: 20 }}
        javaScriptEnabled
      />
    
      </View>
    );
  }
}
export default Profile;