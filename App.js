import React from 'react';
import { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Button, Image
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
const CleverTap = require('clevertap-react-native');
class Greenwood extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      datasource: [],
      title: '--------',
      message: '-------',
      uri: 'https://reactnative.dev/img/tiny_logo.png',
      inbox: []
    };
    //...whatever construction you need
  }
  componentDidMount() {
    //alert("Component")
    CleverTap.initializeInbox();
    CleverTap.setLocation(34.15, -118.20);
    CleverTap.createNotificationChannel("87796", "dev87796", "CT React Native Testing", 1, true);
    CleverTap.onUserLogin({ 'Name': 'Deven', 'Identity': '87796', 'Email': 'deven@testreact.com', 'Phone': '8779636312', 'Gender': 'M', 'MSG-push': true });
  }
  pushEvent() {
    CleverTap.recordEvent('DevenRN');
    //   alert("Event Pushed - DevenRN")
  }
  getUnitID = () => {
    CleverTap.getDisplayUnitForId('Unit Id', (err, res) => {
      console.log('Get Display Unit for Id:', res, err);
      alert(`Get Display Unit for Id: ${res}`);
    });
  };
  getAllDisplayUnits = () => {
    CleverTap.getAllDisplayUnits((err, res) => {
      // console.log(`All Display Units: ${res}`);
      //  alert(`All Display Units: ${res}`);
      this.setState({ datasource: JSON.parse(res) })
      console.log("state is" + JSON.stringify(this.state.datasource.content[0].media.url))
      this.setState({ message: JSON.stringify(this.state.datasource.content[0].message.text), title: JSON.stringify(this.state.datasource.content[0].title.text), uri: JSON.stringify(this.state.datasource.content[0].media.url).replace(/['"]+/g, '') })
      // alert(`All Display Units==?>: ${res}`);
    });
  };
  show_appInbox = () => {
    //Show Inbox
    CleverTap.showInbox({
      //'tabs': ['Offers', 'Promotions'],
      'navBarTitle': 'My App Inbox',
      'navBarTitleColor': '#000000',
      'navBarColor': '#FFFFFF',
      'inboxBackgroundColor': '#342314',
      'backButtonColor': '#000000',
      'unselectedTabColor': '#000000',
      'selectedTabColor': '#FF0000',
      'selectedTabIndicatorColor': '#000000',
      'noMessageText': 'No message(s)',
      'noMessageTextColor': '#FF0000'
    });
  };
  pushProduct() {
    CleverTap.recordEvent('ProductLiked', { 'Name': 'iPhone12', 'price': '80,000', 'color': 'Jet Black', 'sku': 'IP1202' });
    alert("Product Pushed ")
  }
  fetchinboxmethod = () => {
    CleverTap.getAllInboxMessages((err, res) => {
      console.log('All Inbox Messages: ', res, err);
      this.setState({
        inbox: JSON.parse(res[0])
      })
      // alert(`All Inbox Messages: \n `+JSON.stringify(res));
      // console.log(`All Inbox Messages:==> `+JSON.stringify(res[0].msg));
      console.log('All messages: ', this.state.inbox);
      alert("Message is" + JSON.stringify(this.state.inbox.msg.content[0].message.text))
    });
    // alert(`All Inbox Messages: \n `+JSON.stringify(this.state.inbox.content[0]));
  }
  create_NotificationChannel = () => {
    alert('Notification Channel Created');
    //Creating Notification Channel
  };
  Get_InboxMessageForId = () => {
    //Get inbox Id
    CleverTap.getInboxMessageForId('1645783124_1645789160', (err, res) => {
      console.log("marking message read = " + res);
      alert("marking message read:" + res.msg.content[0].message.text);
    });
  };
  getinboxcount = () => {
    CleverTap.getInboxMessageCount((err, res) => {
      console.log('Total Messages: ', res, err);
      alert(`Total Messages: \n ${res}`);
    });
  };
  delete_InboxMessageForId = () => {
    //Get inbox Id
    CleverTap.deleteInboxMessageForId('1645783124_1645789160');
  };
  render() {
    return (
      <View>
        <ScrollView
        >
          <Text style={{ fontSize: 20 }}>CleverTap React Native Integration1</Text>
          <View style={{ width: 100, paddingTop: 30 }}>
            <Button title='Push Event ' onPress={() => this.pushEvent()} />
          </View>
          <View style={{ width: 120, paddingTop: 30 }}>
            <Button title='Push Product ' onPress={() => this.pushProduct()} />
          </View>
          <View style={{ width: 120, paddingTop: 30 }}>
            <Button title='Show AppInbox ' onPress={() => this.show_appInbox()} />
          </View>
          <View style={{ width: 120, paddingTop: 30 }}>
            <Button title='Native Display' onPress={() => this.getAllDisplayUnits()} />
          </View>
          <View style={{ width: 120, paddingTop: 30 }}>
            <Button title='showinboxmessage' onPress={() => this.fetchinboxmethod()} />
          </View>
          <View style={{ width: 120, paddingTop: 30, flexDirection: 'row' }}>
            <Button title='InboxCount' onPress={() => this.getinboxcount()} />
            <Button title='SpecificINbx' onPress={() => this.Get_InboxMessageForId()} />
            <Button title='DeleteMessage' onPress={() => this.delete_InboxMessageForId()} />
          </View>
          <View style={{ width: 300, paddingTop: 30 }}>
            <Text style={{ fontSize: 20, width: '100%' }}>Native Titleee :- {this.state.title}</Text>
            <Text style={{ fontSize: 20, width: '100%' }}>Nativeee Message :-{this.state.message}</Text>
          </View>
          <View style={{ height: 200, width: 200, paddingTop: 40 }}>
            <Image style={{ height: 150, width: 100 }}
              source={{
                uri: this.state.uri,
              }}
            />
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