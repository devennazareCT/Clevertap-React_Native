# CleverTap React-Native Integration
Clevertap Integration with React Native


### CleverTap Geo-Fencing implementation (Android)
Check [Android Folder](https://github.com/devennazareCT/Clevertap-React_Native/tree/master/android) page for more information regarding implementation of Geo-Fencing in Android  .

## Steps :-
1) Clone the project and run ``` npm install ```
2) After installing the node modules run ``` npx react-native run-android ``` .
3) To Receive App Inbox kindy click the Push Custom Event Button on the (Home)Home.js Page.


### Check [Home.js](https://github.com/devennazareCT/Clevertap-React_Native/blob/master/Home.js) page for more information regarding how to push events , Inbox Initialization and Native Display callbacks .

To Fetch App Inbox button Callback 
Click on the Push Custom Event Button on Home Page to recieve the Campaign Message.
Click on Show App Inbox button to view the Inbox Message . 
Once you click on the App inbox button you can get the app inbox button callback by using below code 

Add below code in componentdidMount()
```

  componentDidMount() {
    CleverTap.setDebugLevel(3);

    CleverTap.addListener(CleverTap.CleverTapInboxMessageButtonTapped, (event) => {
      console.log("insidelistner")

      this.handleCleverTapInbox(CleverTap.CleverTapInboxMessageButtonTapped, event);
      console.log("endoflistener")
    });
  }

```
Declare the handleCleverTapInbox method outside the ComponentdidMount as below

```
 handleCleverTapInbox(eventName, event) {
    console.log('handleCleverTapInbox', eventName, event);
    console.log("eventname is" + eventName);

    //Fetch the app inbox button kv here 
    console.log("APP INbox EVENT KV IS- ", JSON.stringify(event))

  }

```
### Screenshot for the above Callback

![App Inbox Button Callback](https://github.com/devennazareCT/Clevertap-React_Native/blob/master/AppInboxButtonCallback.png)

To Fetch Native Display Payload - 

``` 
 CleverTap.getAllDisplayUnits((err, res) => {
      this.setState({ datasource: JSON.parse(res) })
      this.setState({nativekey: this.state.datasource.wzrk_id}) //Store wzrk_id to use it as Unit_id  
      this.setState({ message: this.state.datasource.content[0].message.text, title: this.state.datasource.content[0].title.text })
      console.log("Unit ID is"+this.state.nativekey)
      });
```

To Fetch Native Display Payload using Unit ID  - 
Pass the wzrk_id as the 'Unit ID' in the below Function 
```
  getUnitID = () => {
    CleverTap.getDisplayUnitForId('Unit ID', (err, res) => {
      console.log('Get Display Unit for Id:'+res);
      alert(`Get Display Unit for Id: ${res}`);
    });
  };
```
To push Notification Viewed Event for NativeDisplay ,
Pass the wzrk_id as the Unit ID in the below Function 

```
CleverTap.pushDisplayUnitViewedEventForID('Unit_id');
```

To push Notification Clicked Event for NativeDisplay ,
Pass the wzrk_id as the Unit ID in the below Function . Usually used on Touchable Opacity onPress method on Native Display
```
CleverTap.pushDisplayUnitClickedEventForID('Unit_id');
```

## Screenshot 
![CT ReactNative](https://github.com/devennazareCT/Clevertap-React_Native/blob/master/ss.jpg)
