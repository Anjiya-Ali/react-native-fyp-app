import React, { useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageSourcePropType,
} from "react-native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const SectionCard1 = ({
  price,
  courseDescription,
  personName,
  componentDimensions,
  courseTitle,
  propTop,
  propWidth,
  propWidth1,
}) => {
  const groupViewStyle = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
    };
  }, [propTop]);

  const mSInCSStyle = useMemo(() => {
    return {
      ...getStyleValue("width", propWidth),
    };
  }, [propWidth]);

  const msSairaSamnaniStyle = useMemo(() => {
    return {
      ...getStyleValue("width", propWidth1),
    };
  }, [propWidth1]);

  return (
    <View
      style={[styles.rectangleParent, styles.groupChildLayout1, groupViewStyle]}
    >
      <View style={[styles.groupChild, styles.groupPosition]} />
      <View style={[styles.rectangleGroup, styles.groupLayout]}>
        <View style={[styles.groupItem, styles.groupLayout]} />
        <Text style={[styles.message, styles.hrFlexBox]}>Message</Text>
      </View>
      <Text style={[styles.hr, styles.hrFlexBox]}>
        <Text style={[styles.text, styles.textTypo]}>{price}</Text>
        <Text style={styles.hr1}>/hr</Text>
      </Text>
      <Text style={[styles.msInCs, styles.msInCsPosition, mSInCSStyle]}>
        {courseDescription}
      </Text>
      <Text
        style={[
          styles.msSairaSamnani,
          styles.msInCsPosition,
          msSairaSamnaniStyle,
        ]}
      >
        {personName}
      </Text>
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
        source={componentDimensions}
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
        <Text style={[styles.elevateYourUiuxContainer, styles.hrFlexBox]}>
          <Text style={styles.elevateYourUiux}>{courseTitle}</Text>
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
  msInCsPosition: {
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
    top: 0,
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
  msInCs: {
    top: 26,
    width: 145,
    fontSize: FontSize.size_3xs,
    color: Color.labelColorLightPrimary,
  },
  msSairaSamnani: {
    top: 13,
    width: 118,
    color: Color.colorSlateblue,
    fontSize: FontSize.size_smi,
    fontWeight: "700",
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
  elevateYourUiux: {
    color: Color.labelColorLightPrimary,
  },
  readMore: {
    color: Color.colorSlateblue,
  },
  elevateYourUiuxContainer: {
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
    top: 196,
    left: 0,
    width: 360,
    position: "absolute",
  },
});

export default SectionCard1;
