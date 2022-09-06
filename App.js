// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import About from './About';
import Profile from './Profile';
import Login from './Login';
import AppInbox from './AppInbox';
import Display from './NativeDisplay';

const Stack = createStackNavigator();

function NavStack() {
  return (
     <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle :{
            fontWeight: 'bold',
          },
        }}
      >
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ title: 'Home' }}
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ title: 'Profile' }}
      />
      <Stack.Screen 
       name="About" 
       component={About} 
       options={{ title: 'About' }}
      />
        <Stack.Screen 
       name="Login" 
       component={Login} 
       options={{ title: 'Login' }}
      />
       <Stack.Screen 
       name="AppInbox" 
       component={AppInbox} 
       options={{ title: 'Inbox Message' }}
      />
      <Stack.Screen 
       name="Display" 
       component={Display} 
       options={{ title: 'Native Display' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <NavStack />
    </NavigationContainer>
  );
}

console.disableYellowBox = true;