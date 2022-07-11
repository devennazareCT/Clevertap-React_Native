import React, { Component } from 'react';
const CleverTap = require('clevertap-react-native');

import { Button, View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { TOUCHABLE_STATE } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
class AppInbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            identity: '',
            inboxdata: [],
            inboxCount: 0,
            messagearray: [],
            myloop: [],
            messageid: [],

        };
        
    }

    componentDidMount() {
        CleverTap.setDebugLevel(3);

        CleverTap.initializeInbox();
        this.get_TotalMessageCount();
        this.getAllInboxMessage();
    }


    //function to fetch Inbox Count
    get_TotalMessageCount = () => {
        //Get Total messagecount
        CleverTap.getInboxMessageCount((err, res) => {
            this.setState({ inboxCount: res })
            console.log('Total Messages: ', res, err);

        });
    };

    //function to fetch Custom App Inbox Payload

    getAllInboxMessage() {
        CleverTap.getAllInboxMessages((err, res) => {
            console.log('All Inbox Messages:' + res);
            //console.log(`All Inbox Messages: \n ${res}`);


            for (let i = 0; i < this.state.inboxCount; i++) {
                this.setState({ inboxdata: JSON.parse(res[i]) })
                this.state.messagearray.push(JSON.parse(res[i]))
                console.log("loop is" + JSON.stringify(this.state.inboxdata.msg.content) + "position is" + i)
                this.state.messageid.push(this.state.messagearray.id)

                //Call Below Method to Push Notification Viewed Event 
                CleverTap.pushInboxNotificationViewedEventForId(this.state.messagearray.id);

                //Call Below Method to mark Inbox message as read 
                CleverTap.markReadInboxMessageForId(this.state.messagearray.id);

            }



        });
    }

    //Use this method to call get unread message count
    get_UnreadMessageCount = () => {

        //Get the count of unread messages
        CleverTap.getInboxMessageUnreadCount((err, res) => {
            console.log('Unread Messages: ', res, err);
            alert(`Unread Messages: \n ${res}`);
        });
    };

    //Use this method to fetch all unread inbox message
    get_All_InboxUnreadMessages = () => {

        //get all Inbox unread messages
        CleverTap.getUnreadInboxMessages((err, res) => {
            console.log('Unread Inbox Messages: ', res, err);
            alert(`Unread Inbox Messages: \n ${res}`);
        });
    };

    //Use this method to delete any message with message id
    delete_InboxMessageForId = () => {
        //Get inbox Id
        alert('Check Console for values');
        CleverTap.deleteInboxMessageForId('Message Id');
    
    };
    
    //Call Notification Clicked event for Message
    pushclickeventforMessage(message_id) {

        CleverTap.pushInboxNotificationClickedEventForId(message_id);
        alert("Notification Clicked Triggered")
    }
    render() {



        return (
            <View style={styles.container}>
                <ScrollView>

                    <View >
                        <Text style={{ fontSize: 25, paddingLeft: 20,paddingTop:20 }}>Inbox Messages : {this.state.inboxCount}</Text>


                    </View>
                    <FlatList
                        style={{ flex: 1, marginTop: 20 
                          }}
                        data={this.state.messagearray}
                        renderItem={({ item }) =>

                            <TouchableOpacity style={{}} onPress={() => this.pushclickeventforMessage(item.id)}>


                                <View style={styles.listItem}>

                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}s>{item.msg.content[0].title.text}</Text>
                                       {item.isRead?null:<View style={{height:10,width:10,borderRadius:27,backgroundColor:'#da9e3a',position:'absolute',right:10}}></View>}
                                        </View>
                                        <Text style={{ fontSize: 16 }}>{item.msg.content[0].message.text}</Text>

                                    </View>

                                </View>
                            </TouchableOpacity>




                        }
                    />
                </ScrollView>

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
        color: '#000',
    },
    container: {
        flex: 1,

    },
    listItem: {
        margin: 10,
        padding: 10,
        backgroundColor: "#FFF",
        width: "90%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5,
        borderColor: '#000',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,elevation:5
    },
    h2text: {
        marginTop: 10,
        fontFamily: 'Helvetica',
        fontSize: 36,
        fontWeight: 'bold',
    },
    flatview: {
        justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,
        height: 400
    },
    name: {
        fontFamily: 'Verdana',
        fontSize: 18,
        color: '#000'
    },
    email: {
        color: 'red'
    }
})
export default AppInbox;