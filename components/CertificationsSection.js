import React, { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const CertificationsSection = ({
  achievementList,
  certificationBadgeSilverB,
  quizAuthorName,
  courseTitleBadge,
  userProfileImage,
  propTop,
}) => {
  const groupView3Style = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
    };
  }, [propTop]);

  return (
    <View
      style={[styles.rectangleParent, styles.groupChildLayout, groupView3Style]}
    >
      <View style={[styles.groupChild, styles.groupChildLayout]} />
      <Text style={styles.certifications}>{achievementList}</Text>
      <Text
        style={[styles.cloudFoundationDrContainer, styles.containerPosition]}
      >
        <Text style={styles.cloudFoundation}>{certificationBadgeSilverB}</Text>
        <Text style={styles.drMuhammadRafi}>{quizAuthorName}</Text>
      </Text>
      <Text
        style={[styles.introductionToDataContainer, styles.containerPosition]}
      >
        <Text style={styles.cloudFoundation}>{courseTitleBadge}</Text>
        <Text style={styles.drMuhammadRafi}>{userProfileImage}</Text>
      </Text>
      <View style={styles.groupItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 121,
    width: 360,
    left: 0,
    position: "absolute",
  },
  containerPosition: {
    height: 28,
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    left: 12,
    position: "absolute",
  },
  groupChild: {
    top: 0,
    backgroundColor: Color.colorWhite,
  },
  certifications: {
    top: 13,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.calibri,
    fontWeight: "700",
    left: 12,
    position: "absolute",
  },
  cloudFoundation: {
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.calibri,
    fontWeight: "700",
  },
  drMuhammadRafi: {
    fontSize: FontSize.size_2xs,
    fontWeight: "300",
    fontFamily: FontFamily.calibri,
  },
  cloudFoundationDrContainer: {
    top: 40,
    width: 311,
  },
  introductionToDataContainer: {
    top: 86,
    width: 302,
  },
  groupItem: {
    top: 77,
    borderStyle: "solid",
    borderColor: Color.labelColorLightPrimary,
    borderTopWidth: 1,
    width: 329,
    height: 1,
    left: 12,
    position: "absolute",
  },
  rectangleParent: {
    top: 527,
  },
});

export default CertificationsSection;
