import React, { useEffect, useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Section1Screen from "./Section1Screen";
import StudentContext from "../context/StudentProfile/studentProfileContext";
import TeacherContext from "../context/TeacherProfile/teacherProfileContext";
import Section2Screen from "./Section2Screen";
import Section3Screen from "./Section3Screen";
import { useNavigation } from "@react-navigation/native";
import CourseContext from "../context/Courses/courseContext";

const Tab = createMaterialTopTabNavigator();

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [flag2, setFlag2] = useState(false);
  const navigation = useNavigation();
  const context = useContext(CourseContext);
  const { getUser } = context;
  const context2 = useContext(StudentContext);
  const { getStudent } = context2;
  const context3 = useContext(TeacherContext);
  const { getTeacher } = context3;

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);

      const timer = setTimeout(() => {
        checkTokenAndNavigate();
        setLoading(false);
      }, 5000);

      return () => clearTimeout(timer);
    }, [])
  );

  const checkTokenAndNavigate = async () => {
    const token = await AsyncStorage.getItem("tokenn");
    const role = await AsyncStorage.getItem("role");
    const id = await AsyncStorage.getItem("id");
    const name = await AsyncStorage.getItem("name");

    if (token) {
      if (role === "Student") {
        const userProfile = await getStudent();
        const user = await getUser(id);
        if (!userProfile.education.length) {
          navigation.navigate("StudentProfile", {
            name: name,
            email: user.email,
          }); //change
        } else {
          navigation.navigate("HomePage1"); //change
        }
      } else if (role === "Teacher") {
        const teacherProfile = await getTeacher();
        if (!teacherProfile.education.length) {
          navigation.navigate("TeacherProfile", {
            name: name,
            email: user.email,
          }); //change
        } else {
          navigation.navigate("TeacherHomePage"); //change
        }
      }
    }
    
    setFlag2(true);
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
    flag2 && (
      <>
        <Tab.Navigator
          screenOptions={{
            swipeEnabled: true,
          }}
          tabBarOptions={{
            style: {
              display: "none", // Hide the tab bar
            },
          }}
        >
          <Tab.Screen
            name="Section1Screen"
            component={Section1Screen}
            options={{
              title: "COURSE HUB",
              headerShown: false, // Hide the top navigator bar for this screen
            }}
          />
          <Tab.Screen
            name="Section2Screen"
            component={Section2Screen}
            options={{
              title: "TALENT MATCH",
              headerShown: false, // Hide the top navigator bar for this screen
            }}
          />
          <Tab.Screen
            name="Section3Screen"
            component={Section3Screen}
            options={{
              title: "LIVE CONNECT",
              headerShown: false, // Hide the top navigator bar for this screen
            }}
          />
        </Tab.Navigator>
      </>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 50,
    marginTop: 10,
    color: "black",
  },
});

export default Main;
