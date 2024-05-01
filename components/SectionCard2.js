import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const SectionCard2 = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.rectangleParent, styles.groupChildLayout1]}>
      <View style={[styles.groupChild, styles.groupPosition]} />
      <Pressable
        style={[styles.rectangleGroup, styles.groupLayout]}
        onPress={() => navigation.navigate("Proposal1")}
      >
        <View style={[styles.groupItem, styles.groupLayout]} />
        <Text style={[styles.message, styles.hrFlexBox]}>Message</Text>
      </Pressable>
      <Text style={[styles.hr, styles.hrFlexBox]}>
        <Text style={[styles.text, styles.textTypo]}>$15</Text>
        <Text style={styles.hr1}>/hr</Text>
      </Text>
      <Text style={[styles.phdInCs, styles.phdInCsPosition]}>
        PHD in CS - Frontend Developer
      </Text>
      <Text style={[styles.drMuhammadRafi, styles.phdInCsPosition]}>
        Dr. Muhammad Rafi
      </Text>
      <Image
        style={styles.icon}
        resizeMode="cover"
        source={require("../assets/1516807823802-1.png")}
      />
      <Image
        style={[styles.groupInner, styles.groupChildLayout]}
        resizeMode="cover"
        source={require("../assets/star-2.png")}
      />
      <Image
        style={[styles.starIcon, styles.groupChildLayout]}
        resizeMode="cover"
        source={require("../assets/star-2.png")}
      />
      <Image
        style={[styles.groupChild1, styles.groupChildLayout]}
        resizeMode="cover"
        source={require("../assets/star-2.png")}
      />
      <Image
        style={[styles.groupChild2, styles.groupChildLayout]}
        resizeMode="cover"
        source={require("../assets/star-2.png")}
      />
      <Image
        style={[styles.groupChild3, styles.groupChildLayout]}
        resizeMode="cover"
        source={require("../assets/star-2.png")}
      />
      <View style={[styles.rectangleContainer, styles.rectangleLayout]}>
        <View style={[styles.rectangleView, styles.rectangleLayout]} />
        <Text style={[styles.immerseYourselfInContainer, styles.hrFlexBox]}>
          <Text
            style={styles.immerseYourselfIn}
          >{`Immerse yourself in the dynamic realm of React development with me! In this course, we'll unravel the power of React components, state management, and JSX syntax. From the basics to advanced concepts like Redux for state management, `}</Text>
          <Text style={styles.readMore}>Read More ...</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout1: {
    height: 177,
    width: 360,
    position: "absolute",
  },
  groupPosition: {
    top: 0,
    left: 0,
  },
  groupLayout: {
    height: 23,
    width: 72,
    position: "absolute",
  },
  hrFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  textTypo: {
    fontSize: FontSize.size_smi,
    fontWeight: "700",
  },
  phdInCsPosition: {
    left: 45,
    textAlign: "left",
    fontFamily: FontFamily.calibri,
    position: "absolute",
  },
  groupChildLayout: {
    height: 18,
    width: 19,
    top: 48,
    position: "absolute",
  },
  rectangleLayout: {
    height: 72,
    width: 336,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorWhite,
    height: 177,
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
    top: 6,
    left: 16,
    color: Color.colorGainsboro_100,
    width: 46,
    height: 17,
    fontFamily: FontFamily.calibri,
    fontWeight: "700",
    textAlign: "left",
    fontSize: FontSize.size_2xs,
  },
  rectangleGroup: {
    top: 148,
    left: 273,
  },
  text: {
    fontFamily: FontFamily.calibri,
  },
  hr1: {
    fontSize: FontSize.size_3xs,
    fontFamily: FontFamily.calibri,
  },
  hr: {
    top: 50,
    width: 47,
    color: Color.labelColorLightPrimary,
    left: 9,
  },
  phdInCs: {
    top: 26,
    width: 133,
    fontSize: FontSize.size_3xs,
    color: Color.labelColorLightPrimary,
  },
  drMuhammadRafi: {
    top: 13,
    width: 118,
    color: Color.colorSlateblue,
    fontSize: FontSize.size_smi,
    fontWeight: "700",
  },
  icon: {
    top: 8,
    left: 4,
    borderRadius: Border.br_198xl,
    width: 37,
    height: 37,
    position: "absolute",
  },
  groupInner: {
    left: 255,
  },
  starIcon: {
    left: 236,
  },
  groupChild1: {
    left: 313,
  },
  groupChild2: {
    left: 294,
  },
  groupChild3: {
    left: 274,
  },
  rectangleView: {
    borderRadius: Border.br_base,
    backgroundColor: Color.colorGainsboro_100,
    top: 0,
    left: 0,
  },
  immerseYourselfIn: {
    color: Color.labelColorLightPrimary,
  },
  readMore: {
    color: Color.colorSlateblue,
  },
  immerseYourselfInContainer: {
    top: 9,
    left: 12,
    width: 317,
    height: 55,
    fontFamily: FontFamily.calibri,
    fontSize: FontSize.size_2xs,
    textAlign: "left",
  },
  rectangleContainer: {
    top: 71,
    left: 9,
  },
  rectangleParent: {
    top: 58,
    left: 0,
    width: 360,
  },
});

export default SectionCard2;
