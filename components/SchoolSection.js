import React, { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const SchoolSection = ({ institutionName, schoolName, propTop }) => {
  const groupView1Style = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
    };
  }, [propTop]);

  return (
    <View
      style={[styles.rectangleParent, styles.groupChildLayout, groupView1Style]}
    >
      <View style={[styles.groupChild, styles.groupChildLayout]} />
      <View style={styles.groupItem} />
      <Text style={[styles.exAgaKhan, styles.schoolTypo]}>
        {institutionName}
      </Text>
      <Text style={[styles.school, styles.schoolTypo]}>{schoolName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 63,
    width: 360,
    left: 0,
    position: "absolute",
  },
  schoolTypo: {
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.calibri,
    left: 8,
    position: "absolute",
  },
  groupChild: {
    top: 0,
    backgroundColor: Color.colorWhite,
  },
  groupItem: {
    top: 50,
    borderStyle: "solid",
    borderColor: Color.labelColorLightPrimary,
    borderTopWidth: 1,
    width: 329,
    height: 1,
    left: 8,
    position: "absolute",
  },
  exAgaKhan: {
    top: 35,
    fontSize: FontSize.size_xs,
    fontWeight: "300",
  },
  school: {
    top: 6,
    fontSize: FontSize.size_lg,
    fontWeight: "700",
  },
  rectangleParent: {
    top: 88,
  },
});

export default SchoolSection;
