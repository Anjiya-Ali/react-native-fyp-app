import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const Container = () => {
  return (
    <View style={styles.helloEveryoneIAmDelighParent}>
      <Text style={[styles.helloEveryoneIContainer, styles.textTypo]}>
        <Text
          style={styles.textClr}
        >{`Hello, everyone! 🎉I am delighted to share that I have embarked on a new adventure as a software engineering intern at SYSTEMS LIMITED. Despite facing countless unanswered applications, I refused to let go of hope. Today, I stand here with immense pride, having secured an internship at this renowned company through my efforts. I `}</Text>
        <Text style={styles.readMore}>Read More ...</Text>
      </Text>
      <View style={[styles.rectangleParent, styles.groupChildLayout]}>
        <View style={[styles.groupChild, styles.groupChildLayout]} />
        <Image
          style={styles.icons8Like301}
          resizeMode="cover"
          source={require("../assets/icons8like30-1.png")}
        />
        <Text style={[styles.text, styles.textPosition]}>101</Text>
      </View>
      <View style={[styles.rectangleGroup, styles.rectanglePosition]}>
        <View style={[styles.groupChild, styles.groupChildLayout]} />
        <Text style={[styles.text, styles.textPosition]}>2</Text>
        <Image
          style={[styles.icons8Topic501, styles.textPosition]}
          resizeMode="cover"
          source={require("../assets/icons8topic50-11.png")}
        />
      </View>
      <View style={[styles.rectangleContainer, styles.rectanglePosition]}>
        <View style={[styles.groupChild, styles.groupChildLayout]} />
        <Text style={[styles.text, styles.textPosition]}>2</Text>
        <Image
          style={[styles.icons8Topic501, styles.textPosition]}
          resizeMode="cover"
          source={require("../assets/icons8topic50-11.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    textAlign: "left",
    fontSize: FontSize.size_2xs,
  },
  groupChildLayout: {
    height: 19,
    width: 50,
    left: 0,
    position: "absolute",
  },
  textPosition: {
    top: 5,
    position: "absolute",
  },
  rectanglePosition: {
    left: 102,
    height: 19,
    width: 50,
    position: "absolute",
  },
  textClr: {
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.calibri,
  },
  readMore: {
    fontWeight: "300",
    color: Color.colorSlateblue,
    fontFamily: FontFamily.calibri,
  },
  helloEveryoneIContainer: {
    height: 98,
    left: 0,
    fontSize: FontSize.size_2xs,
    top: 0,
    width: 286,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorGainsboro_200,
    borderRadius: Border.br_base,
    top: 0,
    width: 50,
  },
  icons8Like301: {
    top: 3,
    left: 11,
    width: 14,
    height: 12,
    position: "absolute",
  },
  text: {
    left: 25,
    width: 23,
    height: 9,
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.calibri,
    textAlign: "left",
    fontSize: FontSize.size_2xs,
  },
  rectangleParent: {
    top: 81,
  },
  icons8Topic501: {
    left: 12,
    width: 13,
    height: 12,
    borderRadius: Border.br_base,
  },
  rectangleGroup: {
    top: 81,
  },
  rectangleContainer: {
    top: 421,
  },
  helloEveryoneIAmDelighParent: {
    top: 638,
    left: 44,
    height: 440,
    width: 286,
    position: "absolute",
  },
});

export default Container;
