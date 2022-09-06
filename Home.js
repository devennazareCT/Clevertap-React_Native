import React from 'react';
import { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Button, Image, FlatList, TouchableOpacity, TextInput
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const data = {
  "1549969678424": "26.092242876805436"
}

const keys = Object.keys(data);
const values = Object.values(data);
//Initialize Clevertap
const CleverTap = require('clevertap-react-native');
class Greenwood extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      datasource: [], //To store native display payload
      title: '--------', //To store native display title
      message: '-------', //To Store Native display message
      uri: 'https://reactnative.dev/img/tiny_logo.png',
      inbox: [],
      token: '',
      data: [],
      refreshing: true,
      discountkey: '',
      feature_flag: false,
      color: '#FF5733',
      event_name: '',
      prop_name: [],
      textInput: [],
      propvals: [],
      proptext: '',
      identity: '',
      nativekey: '',//To store Native Display Unit id,
      name: '',
      email: '',
      identity: ''
    };
    //...whatever construction you need
  }


  addTextInput = (key) => {
    let textInput = this.state.textInput;
    textInput.push(<View style={{ flexDirection: 'row', borderWidth: 2, alignItems: 'center' }}><TextInput style={{ height: 50, fontSize: 20 }} key={key} placeholder="Enter Prop Name" onChangeText={(text) => this.setState({ proptext: text })}
    /><Text style={{ height: 50, fontSize: 20, alignSelf: 'center', marginTop: 20 }}>{this.state.proptext}</Text></View>);

    this.state.propvals.push(this.state.proptext)

    this.setState({ textInput })

  }
  componentDidMount() {
    CleverTap.setDebugLevel(3);

    CleverTap.createNotificationChannel("111", "111", "CT React Native Testing", 1, true); //To create notification channel
    CleverTap.initializeInbox(); //For initializing Appinbox 

    //For Fetching User Properties 
    CleverTap.enablePersonalization();
    this.profile_getProperty();

    //handling callback for Appinbox buttons
    CleverTap.addListener(CleverTap.CleverTapInboxMessageButtonTapped, (event) => {
      console.log("insidelistner")

      //call the handle clevertapappinbox method here 
      this.handleCleverTapInbox(CleverTap.CleverTapInboxMessageButtonTapped, event);
      console.log("endoflistener")
    });

    CleverTap.addListener(CleverTap.CleverTapDisplayUnitsLoaded, (event) => {
      console.log("insidenative")

      this.handleCleverTapDisplayUnitsLoaded(CleverTap.CleverTapDisplayUnitsLoaded, event);
      console.log("ALL Display for Native is "+JSON.stringify(event)+"eventname is")
      console.log("outsidenative")

  });
  }


  //Declare the handle clevertapappinbox method 
  handleCleverTapInbox(eventName, event) {
    console.log('handleCleverTapInbox', eventName, event);
    console.log("eventname is" + eventName);

    //Fetch the app inbox button kv here 
    console.log("APP INbox EVENT KV IS- ", JSON.stringify(event))

  }

  handleCleverTapDisplayUnitsLoaded(eventName, event) {
    console.log('CleverTap Display Unit Event -:____ ',  JSON.stringify(event),'eventname is------',eventName);
}






  pushInputEvent() {
    if (this.state.event_name == "") {
      alert("Enter Event Name Above")
    }
    else {
      CleverTap.recordEvent(this.state.event_name);
      alert("event pushed " + this.state.event_name)
    }
  }
  profile_getProperty = () => {

    CleverTap.profileGetProperty('Email', (err, res) => {
      this.setState({ email: res })

      console.log('CleverTap Identity : ', res, err);
    });
    CleverTap.profileGetProperty('Identity', (err, res) => {
      this.setState({ identity: res })

      console.log('CleverTap Identity : ', res, err);
    });
    //CleverTap Profile Name:
    CleverTap.profileGetProperty('Name', (err, res) => {
      console.log('CleverTap Profile Name: ', res, err);
      this.setState({ name: res })
    });


  };
  pushcustomevent() {
    CleverTap.recordEvent("CustomEvent");

  }
  chargedEvent() {
    CleverTap.recordChargedEvent({ 'totalValue': 20, 'category': 'books', 'purchase_date': new Date() },
      [{ 'title': 'book1', 'published_date': new Date('2010-12-12T06:35:31'), 'author': 'ABC' },
      { 'title': 'book2', 'published_date': new Date('2000-12-12T06:35:31') },
      { 'title': 'book3', 'published_date': new Date(), 'author': 'XYZ' }]);
    alert("Charged Event Pushed")
  }

  getUnitID = () => {
    CleverTap.getDisplayUnitForId(this.state.nativekey, (err, res) => {
      console.log('Get Display Unit for Id:' + res);
      alert(`Get Display Unit for Id: ${res}`);
    });
  };
  goNativeDisplay =() =>{
    this.props.navigation.navigate('Display');
  }

  //Fetch Native Display Payload
  getAllDisplayUnits = () => {
    
    CleverTap.getAllDisplayUnits((err, res) => {
      console.log(`All Display Units:--- ${res}`);
      //  alert(`All Display Units: ${res}`);
      this.setState({ datasource: JSON.parse(res) })
      this.setState({ nativekey: this.state.datasource.wzrk_id }) //Store wzrk_id to use it as Unit_id  
      this.setState({ message: this.state.datasource.content[0].message.text, title: this.state.datasource.content[0].title.text })
      console.log("Unit ID is" + this.state.nativekey)

      //NotificationViewed for Native Display
      CleverTap.pushDisplayUnitViewedEventForID(this.state.nativekey);

    });

  };

  show_appInbox = () => {
    //Show Inbox
    CleverTap.showInbox({
      //'tabs': ['Offers', 'Promotions'],
      'navBarTitle': 'My App Inbox',
      'navBarTitleColor': '#000000',
      'navBarColor': '#FFFFFF',
      'inboxBackgroundColor': '#ffffff',
      'backButtonColor': '#000000',
      'unselectedTabColor': '#000000',
      'selectedTabColor': '#FF0000',
      'selectedTabIndicatorColor': '#000000',
      'noMessageText': 'No message(s)',
      'noMessageTextColor': '#FF0000'
    });
  };

  pushProduct() {
    CleverTap.recordEvent('ProductLiked', { 'Name': 'iPhone12', 'price': 80000, 'color': 'Jet Black', 'sku': 'IP1202' });
    alert("Product Liked ")
  }


  renderItemComponent = (data) =>
    <TouchableOpacity style={styles.container} onPress={() => alert(JSON.stringify(this.state.inbox.msg.content[0].message.text))} >
      <Text style={{ fontSize: 20 }}>hi</Text>

    </TouchableOpacity>
  sendEvent = (text) => {
    this.setState({ event_name: text })
  }
  sendProp = (text) => {
    this.setState({ prop_name: text })
  }
  ItemSeparator = () => <View style={{
    height: 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    marginLeft: 10,
    marginRight: 10,
  }}
  />


  render() {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <ScrollView
        >

          <View style={{ paddingTop: 20 }} >
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>Hello there  {this.state.name} ,</Text>
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>Your Identity is {this.state.identity} ,</Text>
            <Text style={{ fontSize: 20, paddingLeft: 20 }}>Your Email is {this.state.email} ,</Text>

            <View style={{ paddingTop: 20, paddingLeft: 20 }}>
              <TextInput
                placeholder="Enter event name"
                returnKeyType="done" placeholderTextColor='#000'
                style={{ borderWidth: 1, width: 350, borderRadius: 20, fontSize: 15, }}
                onChangeText={(text1) => this.setState({ event_name: text1 })}
              />
            </View>
          </View>
          <View style={{ width: 200, paddingTop: 30 }}>
            <Button title='Push Above Event ' color={this.state.color} onPress={() => this.pushInputEvent()} />
          </View>
          <View style={{ width: 200, paddingTop: 30 }}>
            <Button title='Push Custom Event ' color={this.state.color} onPress={() => this.pushcustomevent()} />
          </View>
          <View style={{ width: 200, paddingTop: 30 }}>
            <Button title='Go to Native' color={this.state.color} onPress={() => this.goNativeDisplay()} />
          </View>
          <View style={{ width: 200, paddingTop: 30 }}>
            <Button title='Push Product Liked  ' color={this.state.color} onPress={() => this.pushProduct()} />
          </View>
          <View style={{ width: 200, paddingTop: 30 }}>
            <Button title='Push Charged Event ' color={this.state.color} onPress={() => this.chargedEvent()} />
          </View>
          <View style={{ width: 200, paddingTop: 30 }}>
            <Button title='Show AppInbox ' color={this.state.color} onPress={() => this.show_appInbox()} />
          </View>
          {/* <View style={{ width: 200, paddingTop: 30 }}>
            <Button title='Show Custom App Inbox ' color={this.state.color} onPress={() => this.props.navigation.navigate('AppInbox')} />
          </View> */}
          <View style={{ width: 200, paddingTop: 30 }}>
            <Button title='Show Native Display' color={this.state.color} onPress={() => this.getAllDisplayUnits()} />
          </View>
          <View style={{ width: 200, paddingTop: 30, flexDirection: 'row' }}>
            <Button title='Show Unit Display Payload' color={this.state.color} onPress={() => this.getUnitID()} />
            <Text style={{ color: '#000000', fontSize: 15, paddingTop: 15 }}>{this.state.nativekey}</Text>
          </View>
          <View style={{ width: 300, paddingTop: 30 }}>
            {/* Here render native display values */}



            {/* Push Notification Clicked Event for Native Display */}
            <TouchableOpacity style={{borderWidth:2}}onPress={() => CleverTap.pushDisplayUnitClickedEventForID(this.state.nativekey)}>

              <Text style={{ fontSize: 15, width: '100%', color: '#000000' }}>Native Titleee :- {this.state.title}</Text>
              <Text style={{ fontSize: 15, width: '100%', color: '#000000' }}>Native Message :-{this.state.message}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 500, width: 400 }}>

            <View style={{ paddingTop: 20 }}>
              <View style={{ paddingTop: 30 }}>
                <Button title='Go to Webview' color={this.state.color} onPress={() => this.props.navigation.navigate('Profile')} />
              </View>
            </View>

          </View>

        </ScrollView>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    height: 40,
    width: 100
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
export default Greenwood;


