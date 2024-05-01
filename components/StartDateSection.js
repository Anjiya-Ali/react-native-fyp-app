import React, { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const StartDateSection = ({ dateLabel, startDateLabel, propTop }) => {
  const groupView2Style = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
    };
  }, [propTop]);

  return (
    <View
      style={[styles.rectangleParent, styles.groupChildLayout, groupView2Style]}
    >
      <View style={[styles.groupChild, styles.groupChildLayout]} />
      <View style={[styles.groupChild, styles.groupChildLayout]} />
      <View style={styles.groupInner} />
      <Text style={[styles.ex30Sept, styles.ex30SeptTypo]}>{dateLabel}</Text>
      <Text style={[styles.startDate, styles.ex30SeptTypo]}>
        {startDateLabel}
      </Text>
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
  ex30SeptTypo: {
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
  groupInner: {
    top: 50,
    borderStyle: "solid",
    borderColor: Color.labelColorLightPrimary,
    borderTopWidth: 1,
    width: 329,
    height: 1,
    left: 8,
    position: "absolute",
  },
  ex30Sept: {
    top: 35,
    fontSize: FontSize.size_xs,
    fontWeight: "300",
  },
  startDate: {
    top: 6,
    fontSize: FontSize.size_lg,
    fontWeight: "700",
  },
  rectangleParent: {
    top: 244,
  },
});

export default StartDateSection;
