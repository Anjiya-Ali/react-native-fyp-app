import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const DataScienceContainer = ({
  sessionDescription,
  sessionDuration,
  sessionTitle,
}) => {
  return (
    <View style={styles.joinMeForAnInsightfulSessParent}>
      <Text style={[styles.joinMeForContainer, styles.textTypo]}>
        <Text style={styles.joinMeFor}>{sessionDescription}</Text>
        <Text style={styles.readMore}>Read More ...</Text>
      </Text>
      <View style={[styles.rectangleParent, styles.groupLayout]}>
        <View style={[styles.groupChild, styles.groupLayout]} />
        <Image
          style={styles.icons8Like301}
          resizeMode="cover"
          source={require("../assets/icons8like30-1.png")}
        />
        <Text style={[styles.text, styles.textPosition]}>
          {sessionDuration}
        </Text>
      </View>
      <View style={[styles.rectangleGroup, styles.groupLayout]}>
        <View style={[styles.groupChild, styles.groupLayout]} />
        <Text style={[styles.text, styles.textPosition]}>{sessionTitle}</Text>
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
    fontFamily: FontFamily.calibri,
    fontSize: FontSize.size_2xs,
  },
  groupLayout: {
    height: 19,
    width: 50,
    position: "absolute",
  },
  textPosition: {
    top: 5,
    position: "absolute",
  },
  joinMeFor: {
    color: Color.labelColorLightPrimary,
  },
  readMore: {
    color: Color.colorSlateblue,
  },
  joinMeForContainer: {
    left: 1,
    width: 286,
    height: 71,
    top: 0,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorGainsboro_200,
    borderRadius: Border.br_base,
    left: 0,
    width: 50,
    top: 0,
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
    textAlign: "left",
    fontFamily: FontFamily.calibri,
    fontSize: FontSize.size_2xs,
  },
  rectangleParent: {
    left: 0,
    width: 50,
    top: 67,
  },
  icons8Topic501: {
    left: 12,
    width: 13,
    height: 12,
    borderRadius: Border.br_base,
  },
  rectangleGroup: {
    left: 111,
    top: 67,
  },
  joinMeForAnInsightfulSessParent: {
    top: 41,
    left: 44,
    width: 287,
    height: 86,
    position: "absolute",
  },
});

export default DataScienceContainer;
