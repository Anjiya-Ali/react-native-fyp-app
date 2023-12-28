import React, { useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageSourcePropType,
} from "react-native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const SectionCard3 = ({ fullName, dimensionCode, propTop, propTop1 }) => {
  const groupView5Style = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
    };
  }, [propTop]);

  const image1IconStyle = useMemo(() => {
    return {
      ...getStyleValue("top", propTop1),
    };
  }, [propTop1]);

  return (
    <View
      style={[styles.rectangleParent, styles.groupChildLayout, groupView5Style]}
    >
      <View style={[styles.groupChild, styles.groupChildLayout]} />
      <View style={[styles.groupChild, styles.groupChildLayout]} />
      <View style={[styles.groupChild, styles.groupChildLayout]} />
      <Text style={[styles.ismailAhmedAnsari, styles.inviteTypo]}>
        {fullName}
      </Text>
      <View style={styles.rectangleView} />
      <Text style={[styles.invite, styles.inviteTypo]}>Invite</Text>
      <Image
        style={[styles.image1Icon, image1IconStyle]}
        resizeMode="cover"
        source={dimensionCode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 47,
    width: 357,
    left: 0,
    position: "absolute",
  },
  inviteTypo: {
    textAlign: "left",
    fontFamily: FontFamily.calibri,
    fontSize: FontSize.size_lg,
    top: 12,
    position: "absolute",
  },
  groupChild: {
    top: 0,
    backgroundColor: Color.colorWhite,
  },
  ismailAhmedAnsari: {
    left: 50,
    color: Color.labelColorLightPrimary,
  },
  rectangleView: {
    top: 8,
    left: 248,
    borderRadius: Border.br_base,
    backgroundColor: Color.colorSlateblue,
    width: 96,
    height: 31,
    position: "absolute",
  },
  invite: {
    left: 274,
    fontWeight: "700",
    color: Color.colorGainsboro_100,
  },
  image1Icon: {
    top: 6,
    left: 8,
    borderRadius: Border.br_29xl,
    width: 33,
    height: 33,
    position: "absolute",
  },
  rectangleParent: {
    top: 158,
  },
});

export default SectionCard3;
