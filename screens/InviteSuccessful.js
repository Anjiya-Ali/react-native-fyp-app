import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Dimensions, Animated, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const InviteSuccessful = ({ route }) => {
  const { additionalData } = route.params;
  const navigation = useNavigation();
  const [imageScale] = useState(new Animated.Value(1));

  useEffect(() => {
    animateImage();
  }, []);

  const animateImage = () => {
    Animated.timing(imageScale, {
      toValue: 1.2, 
      duration: 1500, 
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#d9d9d9" }}>
    <View style={[styles.headerPosition, { position: "relative" }]}>
      <View style={[styles.headerChild, { flex: 1, width: windowWidth }]} />
      <Text style={styles.myCourses1}>INVITED SUCCESSFULLY</Text>
      <TouchableOpacity
        style={[styles.icons8Arrow241, { left: windowWidth * 0.035 }]}
        onPress={() => navigation.navigate("ViewMemberForJointAccount", {
          additionalData: additionalData,
      })}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/icons8arrow24-1.png")}
        />
      </TouchableOpacity>
    </View>
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/Logo2.png")} // Change this to the actual path of your image
        style={[styles.image, { transform: [{ scale: imageScale }] }]}
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icons8Arrow241: {
    left: 13,
    width: 26,
    height: 24,
    top: 30,
    position: "absolute",
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
    width: 25,
    height: 25,
  },
  myCourses1: {
    fontSize: FontSize.size_xl,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorWhite,
    width: '100%',
    height: 30,
    textAlign: "center",
    top: 33,
    position: "absolute",
  },
  headerChild: {
    borderBottomRightRadius: Border.br_11xl,
    borderBottomLeftRadius: Border.br_11xl,
    backgroundColor: Color.colorSlateblue,
  },
  headerPosition: {
    height: 81,
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
  },
  image: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.5,
    resizeMode: "contain",
  },
});

export default InviteSuccessful;