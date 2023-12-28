import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const DateCard = () => {
  return (
    <View style={[styles.image1Parent, styles.image1ParentLayout]}>
      <Image
        style={styles.image1Icon}
        resizeMode="cover"
        source={require("../assets/image-1.png")}
      />
      <Text style={[styles.helloEveryonesixMonthsContainer, styles.textTypo]}>
        <Text
          style={styles.textClr}
        >{`Hello Everyone!Six months ago, I posted my picture for securing 1st position in the 4th semester at FAST NUCES. But that picture was quite incomplete, although I had a medal on my neck and a certificate in my hand. The reason for my position was missing in that picture. Here is the reason: My mother and my father. `}</Text>
        <Text style={styles.readMore}>Read More ...</Text>
      </Text>
      <View style={[styles.rectangleParent, styles.groupLayout]}>
        <View style={[styles.groupChild, styles.groupLayout]} />
        <Image
          style={styles.icons8Like301}
          resizeMode="cover"
          source={require("../assets/icons8like30-1.png")}
        />
        <Text style={[styles.text, styles.textPosition]}>221</Text>
      </View>
      <View style={[styles.rectangleGroup, styles.groupLayout]}>
        <View style={[styles.groupChild, styles.groupLayout]} />
        <Text style={[styles.text, styles.textPosition]}>20</Text>
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
  image1ParentLayout: {
    width: 286,
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
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
  image1Icon: {
    top: 86,
    left: 35,
    width: 212,
    height: 213,
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
  helloEveryonesixMonthsContainer: {
    height: 98,
    left: 0,
    top: 0,
    width: 286,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorGainsboro_200,
    borderRadius: Border.br_base,
    left: 0,
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
    fontFamily: FontFamily.calibri,
    textAlign: "left",
    fontSize: FontSize.size_2xs,
  },
  rectangleParent: {
    top: 306,
    width: 50,
    left: 0,
  },
  icons8Topic501: {
    left: 12,
    width: 13,
    height: 12,
    borderRadius: Border.br_base,
  },
  rectangleGroup: {
    left: 102,
    top: 306,
    width: 50,
  },
  image1Parent: {
    top: 243,
    left: 44,
    height: 325,
  },
});

export default DateCard;
