import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from "react-native-animatable";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Section1Screen from './Section1Screen';
import Section2Screen from './Section2Screen';
import Section3Screen from './Section3Screen';
import { useNavigation } from '@react-navigation/native';
import { CometChatUIKit } from "@cometchat/chat-uikit-react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import messaging from '@react-native-firebase/messaging';

const Tab = createMaterialTopTabNavigator();

const Main = () => {
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
        checkTokenAndNavigate();
      }, 5000);

      return () => clearTimeout(timer);
    }, [])
  );

  const makeLogin = (uid) => {
      CometChatUIKit.login({uid})
      .then(user => {
        return true;
      })
      .catch(err => {
        console.log("Error while login:", err);
      });
  }

  const checkTokenAndNavigate = async () => { 
    const token = await AsyncStorage.getItem("tokenn"); 
    const id = await AsyncStorage.getItem("id");
    const role = await AsyncStorage.getItem("role"); 

    if (token) { 
      makeLogin(id);
      const fcmToken = await messaging().getToken();
      const result = await CometChat.registerTokenForPushNotification(fcmToken);
      console.log(result);

      if (role == "Student") { 
        navigation.navigate("HomePage1"); 
      } 
      if (role == "Teacher") { 
        navigation.navigate("TeacherHomePage"); 
      } 
      
    } 
  };

  if (loading) {
    return (
      <View style={styles.container}>
        {/* Logo and app name */}
        {/* <Image source={require('../assets/picture4-2.png')} style={styles.logo} /> */}
        <Animatable.Image
          style={styles.logo}
          source={require("../assets/Logo2.png")}
          resizeMode="contain"
          animation="rotate"
          iterationCount="infinite"
          easing="linear"
          duration={3000}
        />
        <Text style={styles.appName}>LEARNLANCE</Text>
      </View>
    );
  }

  // Once loading is done, render the main content
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: true,
      }}
      tabBarOptions={{
        style: {
          display: 'none', // Hide the tab bar
        },
      }}
    >
      <Tab.Screen
        name="Section1Screen"
        component={Section1Screen}
        options={{
          title: 'COURSE HUB',
          headerShown: false, // Hide the top navigator bar for this screen
        }}
      />
      <Tab.Screen
        name="Section2Screen"
        component={Section2Screen}
        options={{
          title: 'TALENT MATCH',
          headerShown: false, // Hide the top navigator bar for this screen
        }}
      />
      <Tab.Screen
        name="Section3Screen"
        component={Section3Screen}
        options={{
          title: 'LIVE CONNECT',
          headerShown: false, // Hide the top navigator bar for this screen
        }}
      />
    </Tab.Navigator>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 50,
    marginTop: 10,
    color: "black"
  },
});

export default Main;