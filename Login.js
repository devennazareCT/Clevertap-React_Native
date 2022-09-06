import React, { Component } from 'react';
const CleverTap = require('clevertap-react-native');

import { Button, View, Text,StyleSheet,TextInput ,TouchableOpacity} from 'react-native';
import { TOUCHABLE_STATE } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            identity:'',
            name:''
        };
        //...whatever construction you need
      }

      componentDidMount() {
        CleverTap.setDebugLevel(3);
        CleverTap.enablePersonalization();

      }


      //function for onuserlogin
      loginpress(){
        CleverTap.onUserLogin({ 'Name': this.state.name, 'Identity': this.state.identity, 'Email': this.state.email, 'Phone': '+916281919001', 'Gender': 'M','birthdate': new Date('2020-03-03T06:35:31'), 'MSG-push': true ,'MSG-email' : true,
        'MSG-sms' : true,
        'MSG-whatsapp' : true})
      
      this.props.navigation.navigate('Home')
    console.log("email is"+this.state.email+"identity is"+this.state.identity)
    }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor:'#fff'}}>
         <View style={{paddingTop:20}} >
      <TextInput
        placeholder="Name"
        returnKeyType="done"x
        style={{borderWidth:1,width:250,borderRadius:20,fontSize:15}}
        onChangeText={(text2) =>this.setState({name:text2})}
      />
      </View>
      <View style={{paddingTop:20}} >

        <TextInput
        placeholder="Enter Email"
        returnKeyType="next"
        style={{borderWidth:1,width:250,borderRadius:20,fontSize:15}}
        onChangeText={(text) =>this.setState({email:text})}
       
      />
      </View>
      <View style={{paddingTop:20}} >
      <TextInput
        placeholder="Identity"
        returnKeyType="done"
        style={{borderWidth:1,width:250,borderRadius:20,fontSize:15}}
        onChangeText={(text1) =>this.setState({identity:text1})}
      />
      </View>
     <View style={{paddingTop:50}} >
      <Button onPress={() => this.loginpress()} title ='Login'/>
    </View>
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    forgot: {
      fontSize: 13,
      color: '#000',
    },
    link: {
      fontWeight: 'bold',
      color:'#000',
    },
  })
export default Login;