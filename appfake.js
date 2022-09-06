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
const CleverTap = require('clevertap-react-native');
class Greenwood extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      datasource: [],
      title: '--------',
      message: '-------',
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
      identity: '00123112'
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
    // CleverTap.setPushToken("fcm:ch9ejVWUSgylcmiWau9OHZ:APA91bHgeEy5pMAK-9-lNzg8UK_5jBwmgQryTsS-pKfBLQX5SKJADd_cFsFZl4r-wgEDVdMOwIW6S6lMWz41ptSt8a3Z32nV0L8zDaYZrmDcXGzsYJMUR1P1lVkVXpa7Em-TYJfVfh_p", CleverTap.FCM);
    
    CleverTap.createNotificationChannel("877965", "dev87796", "CT React Native Testing", 1, true); //To create notification channel
    CleverTap.initializeInbox(); //For initializing Appinbox 


    this.fetchCats()
    CleverTap.addListener(CleverTap.CleverTapProductConfigDidInitialize, (event) => {
      this.handleCleverTapEvent(CleverTap.CleverTapProductConfigDidInitialize, event);
      console.log("inside addlistenrer");
      //  CleverTap.addListener(CleverTap.CleverTapPushNotificationClicked, (event) => {
      //     __handleCleverTapEvent(CleverTap.CleverTapPushNotificationClicked, event);
      // });
      CleverTap.addListener(CleverTap.CleverTapPushNotificationClicked, (event) => { console.log('handleCleverTapEvent', CleverTap.CleverTapPushNotificationClicked, event); });

    });

    CleverTap.setDefaultsMap({
      'text_color': 'red',
      'msg_count': 100,
      'price': 100.50,
      'is_shown': true,
      'json': '{"key":"val"}'
    });

  }
  fetchtest() {
    console.log("inside fetch and test")
    CleverTap.activate();

  }
  fetchFeatureflag() {
    CleverTap.getFeatureFlag('isWinner', false, (err, res) => {
      console.log('is Winner :', res,);
      this.setState({
        feature_flag: res,

      })
      alert("fetch is " + this.state.feature_flag)
    });

  }
  pushInputEvent() {
    //charge event
    // CleverTap.recordChargedEvent({ 'totalValue': 20, 'category': 'books', 'purchase_date': new Date() },
    // [{ 'title': 'book1', 'published_date': new Date('2010-12-12T06:35:31'), 'author': 'ABC' },
    // { 'title': 'book2', 'published_date': new Date('2000-12-12T06:35:31') },
    // { 'title': 'book3', 'published_date': new Date(), 'author': 'XYZ' }]);

    // //event with properties
    // CleverTap.recordEvent("testEventWithProps", { "start":"now", "foo": "bar"})

    //event without properties
    CleverTap.recordEvent(this.state.event_name);
    alert("event name is" + this.state.event_name)

  }
  pushcustomevent(){
    CleverTap.recordEvent("CustomEvent");

  }
  chargedEvent(){
     CleverTap.recordChargedEvent({ 'totalValue': 20, 'category': 'books', 'purchase_date': new Date() },
    [{ 'title': 'book1', 'published_date': new Date('2010-12-12T06:35:31'), 'author': 'ABC' },
    { 'title': 'book2', 'published_date': new Date('2000-12-12T06:35:31') },
    { 'title': 'book3', 'published_date': new Date(), 'author': 'XYZ' }]);
  }
  getUnitID = () => {
    CleverTap.getDisplayUnitForId('Unit Id', (err, res) => {
      console.log('Get Display Unit for Id:', res, err);
      alert(`Get Display Unit for Id: ${res}`);
    });
  };
  fetchproductdata = () => {
    CleverTap.getProductConfigString('ab1', (err, res) => {
      console.log('PC text_color val in string :', res);
      this.setState({
        discountkey: res,
        color: res
      })
    });
  }
  handleCleverTapEvent = (eventName, event) => {
    console.log('CleverTap Product Config Event - ', eventName, event);
  }
  getAllDisplayUnits = () => {
    CleverTap.getAllDisplayUnits((err, res) => {
      console.log(`All Display Units: ${res}`);
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
    CleverTap.recordEvent('ProductLiked', { 'Name': 'iPhone12', 'price': '80,000', 'color': 'Jet Black', 'sku': 'IP1202' });
    alert("Product Pushed ")
  }

  abtest() {
    CleverTap.recordEvent("abtest")
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
      for (let i = 0; i < res.length; i++) {
        console.log('position: %d', i, JSON.parse(res[i]))


      }
      // alert("Message is" + JSON.stringify(this.state.inbox.msg.content[0].message.text))
    });
    // alert(`All Inbox Messages: \n `+JSON.stringify(this.state.inbox.content[0]));
  }
  get_All_InboxUnreadMessages = () => {

    //get all Inbox unread messages
    CleverTap.getUnreadInboxMessages((err, res) => {
      console.log('Unread Inbox Messages: ', res, err);
      alert(`Unread Inbox Messages: \n ${res}`);
    });
  };
  markRead_InboxMessageForId = () => {
    //Get inbox Id
    alert('Check Console for values');
    CleverTap.markReadInboxMessageForId('1650977149_1650978838');

  };
  Get_InboxMessageForId = () => {
    //Get inbox Id
    CleverTap.getInboxMessageForId('1645783124_1645789160', (err, res) => {
      // console.log("marking message read = " + res);
      // alert("marking message read:" + res.msg.content[0].message.text);
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
  renderItemComponent = (data) =>
    <TouchableOpacity style={styles.container} onPress={() => alert(JSON.stringify(this.state.inbox.msg.content[0].message.text))} >
      <Text style={{ fontSize: 20 }}>hi</Text>

      {/* <Image style={styles.image} source={{ uri: data.item.url }} /> */}
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

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => { this.fetchCats() }); // call fetchCats after setting the state
  }
  fetchCats() {
    this.setState({ refreshing: true });
    fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1')
      .then(res => res.json())
      .then(resJson => {
        this.setState({ data: resJson });
        this.setState({ refreshing: false });
      }).catch(e => console.log(e));
  }
  raiseviewEvent = () => {
    CleverTap.pushInboxNotificationViewedEventForId('1648795529_1648796335');

  }
  raiseClickEvent = () => {
    CleverTap.pushInboxNotificationClickedEventForId('1648795529_1648796335');

  }
  render() {
    return (
      <View>
        <ScrollView
        >
          <Text style={{ fontSize: 20 }}>Product Config: {this.state.discountkey}</Text>
          <Text style={{ fontSize: 20 }}>Feature Flag: {this.state.feature_flag}</Text>
          <View style={{ paddingTop: 20 }} >
            <TextInput
              placeholder="Enter event name"
              returnKeyType="done"
              style={{ borderWidth: 1, width: 250, borderRadius: 20, fontSize: 15 }}
              onChangeText={(text1) => this.setState({ event_name: text1 })}
            />
          </View>
          <View style={{ width: 100, paddingTop: 30 }}>
            <Button title='Push Above Event ' color={this.state.color} onPress={() => this.pushInputEvent()} />
          </View>
          <View style={{ width: 100, paddingTop: 30 }}>
            <Button title='Push Custom Event ' color={this.state.color} onPress={() => this.pushcustomevent()} />
          </View>
          <View style={{ width: 100, paddingTop: 30 }}>
            {/* <Button title='onuser login 'color={this.state.color} onPress={() =>  CleverTap.onUserLogin({ 'Name': 'mmm', 'Identity': 97577, 'Email': 'mmm1@testre122act.com', 'Phone': '17245301789', 'Gender': 'M','birthdate': new Date('2020-03-03T06:35:31'), 'MSG-push': true ,'MSG-email' : true,
    'MSG-sms' : true,
    'MSG-whatsapp' : true})} /> */}
          </View>
          <View style={{ width: 100, paddingTop: 30 }}>
            <Button title='profile push' color={this.state.color} onPress={() => CleverTap.profileSet({
              'Name': 'ddd', 'Identity': 'd281190', 'Email': 'ddd@facebook.com', 'custom1': '1123',
              'birthdate': new Date('2020-03-03T06:35:31')
            })} />
          </View>
          <View style={{ width: 120, paddingTop: 30 }}>
            <Button title='Push Product ' color={this.state.color} onPress={() => this.fetchproductdata()} />
          </View>
          <View style={{ width: 120, paddingTop: 30 }}>
            <Button title='Show AppInbox ' color={this.state.color} onPress={() => this.show_appInbox()} />
          </View>
          <View style={{ width: 120, paddingTop: 30 }}>
            <Button title='Native Display' color={this.state.color} onPress={() => this.getAllDisplayUnits()} />
          </View>
          <View style={{ width: 120, paddingTop: 30 }}>
            <Button title='showinboxmessage' color={this.state.color} onPress={() => this.fetchinboxmethod()} />
          </View>
         
          <View style={{ width: 300, paddingTop: 30 }}>
            {/* <Text style={{fontSize: 20, width: '100%'}} > {JSON.stringify(this.state.inbox.msg.content[0].message.text)}</Text>
            */}
          </View>
          <View style={{ width: 300, paddingTop: 30 }}>
            <Text style={{ fontSize: 20, width: '100%' }}>Native Titleee :- {this.state.title}</Text>
            <Text style={{ fontSize: 20, width: '100%' }}>Native Message :-{this.state.message}</Text>
          </View>
          <View style={{ height: 500, width: 400 }}>
           
            <View style={{ paddingTop: 20 }}>
              <Button title='Upload Event' color={this.state.color} onPress={() => alert("Array is" + this.state.propvals)} />
              <View style={{ paddingTop: 30 }}>
                <Button title='Go to Webview' color={this.state.color} onPress={() => this.props.navigation.navigate('Profile')} />
              </View>
            </View>

            {/* <FlatList
            data={this.state.data}
            renderItem={item => this.renderItemComponent(item)}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.ItemSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          /> */}
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


// <View style={{ width: 120, paddingTop: 30, flexDirection: 'row', margin: 10, justifyContent: 'space-between', flex: 1 }}>
// <View style={{ width: 120 }}>
//   <Button title='View read' color={this.state.color} onPress={() => this.markRead_InboxMessageForId()} />
// </View>
// <View style={{ width: 120, padding: 7 }}>
//   <Button title='Ab Test' color={this.state.color} onPress={() => this.abtest()} />
// </View>
// <View style={{ width: 130 }}>
//   <Button title='View Unread' color={this.state.color} onPress={() => this.get_All_InboxUnreadMessages()} />
// </View>
// </View>