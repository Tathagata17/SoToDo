import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Spalsh from './Screens/Spalsh';
import Home from './Screens/Home';
import Signup from './Screens/Signup';
import User from './Screens/User';
import Login from './Screens/Login';

const AppNavigator = () => {
  const stack = createStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="spalsh"
          component={Spalsh}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="User"
          component={User}
          options={{headerShown: false}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
