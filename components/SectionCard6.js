import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DataScienceContainer from "./DataScienceContainer";
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";

const SectionCard6 = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.vectorParent, styles.groupChildLayout]}>
      <Image
        style={[styles.groupChild, styles.groupPosition]}
        resizeMode="cover"
        source={require("../assets/rectangle-47803.png")}
      />
      <Pressable
        style={[styles.rectangleParent, styles.groupItemLayout]}
        onPress={() => navigation.navigate("Chat3")}
      >
        <View style={[styles.groupItem, styles.groupItemLayout]} />
        <Text style={styles.message}>Message</Text>
      </Pressable>
      <DataScienceContainer
        sessionDescription="🚀 Dive into the world of Data Science with me! 📊 Join our interactive session tailored for data science enthusiasts, where we'll explore key concepts, practical applications, and the latest trends in the field. Whether you're a beginner or looking to enhance your skills, this session is "
        sessionDuration="114"
        sessionTitle="29"
      />
      <Text style={[styles.sept2022, styles.sept2022Typo]}>1 sept 2022</Text>
      <Text style={[styles.muhammadRafi, styles.iconPosition]}>
        Muhammad Rafi
      </Text>
      <Image
        style={[styles.icon, styles.iconPosition]}
        resizeMode="cover"
        source={require("../assets/1516807823802-13.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 134,
    width: 360,
    position: "absolute",
  },
  groupPosition: {
    top: 0,
    left: 0,
  },
  groupItemLayout: {
    height: 19,
    width: 55,
    position: "absolute",
  },
  sept2022Typo: {
    color: Color.labelColorLightPrimary,
    left: 45,
    textAlign: "left",
    fontFamily: FontFamily.calibri,
  },
  iconPosition: {
    top: 7,
    position: "absolute",
  },
  groupChild: {
    height: 134,
    width: 360,
    position: "absolute",
  },
  groupItem: {
    borderRadius: Border.br_123xl,
    backgroundColor: Color.colorSlateblue,
    top: 0,
    left: 0,
  },
  message: {
    top: 4,
    left: 7,
    fontSize: FontSize.size_2xs,
    color: Color.colorGainsboro_100,
    width: 43,
    height: 10,
    textAlign: "left",
    fontFamily: FontFamily.calibri,
    fontWeight: "700",
    position: "absolute",
  },
  rectangleParent: {
    top: 108,
    left: 256,
  },
  sept2022: {
    top: 20,
    fontSize: FontSize.size_3xs,
    fontWeight: "300",
    width: 49,
    height: 15,
    color: Color.labelColorLightPrimary,
    left: 45,
    position: "absolute",
  },
  muhammadRafi: {
    fontSize: FontSize.size_smi,
    width: 126,
    height: 13,
    color: Color.labelColorLightPrimary,
    left: 45,
    textAlign: "left",
    fontFamily: FontFamily.calibri,
    fontWeight: "700",
    top: 7,
  },
  icon: {
    left: 14,
    borderRadius: Border.br_198xl,
    width: 26,
    height: 26,
  },
  vectorParent: {
    top: 941,
    left: 0,
    width: 360,
  },
});

export default SectionCard6;
