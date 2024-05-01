import React, { useMemo } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Color, Padding, FontFamily, FontSize, Border } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const ContainerFrame = ({
  propLeft,
  propWidth,
  propWidth1,
  propHeight,
  propColor,
  onFramePress,
}) => {
  const frameStyle = useMemo(() => {
    return {
      ...getStyleValue("left", propLeft),
      ...getStyleValue("width", propWidth),
    };
  }, [propLeft, propWidth]);

  const cardHeaderStyle = useMemo(() => {
    return {
      ...getStyleValue("width", propWidth1),
      ...getStyleValue("height", propHeight),
    };
  }, [propWidth1, propHeight]);

  const clearFilterStyle = useMemo(() => {
    return {
      ...getStyleValue("color", propColor),
    };
  }, [propColor]);

  return (
    <View style={[styles.frame, frameStyle]}>
      <View style={[styles.cardHeader, styles.frame4Border, cardHeaderStyle]}>
        <Pressable
          style={[styles.frame1, styles.frameSpaceBlock]}
          onPress={onFramePress}
        >
          <Text style={[styles.text, styles.textTypo]}>􀅾</Text>
        </Pressable>
        <View style={[styles.frame2, styles.frameFlexBox]}>
          <Text style={[styles.date, styles.textTypo]}>Date</Text>
        </View>
        <View style={[styles.frame3, styles.frameSpaceBlock]}>
          <Text style={[styles.text, styles.textTypo, clearFilterStyle]}>
            Clear filter
          </Text>
        </View>
      </View>
      <View style={[styles.week, styles.weekBg]}>
        <View style={[styles.frame4, styles.frameFlexBox]}>
          <Text style={[styles.sun, styles.sunTypo]}>Sun</Text>
        </View>
        <View style={[styles.frame4, styles.frameFlexBox]}>
          <Text style={[styles.mon, styles.sunTypo]}>Mon</Text>
        </View>
        <View style={[styles.frame4, styles.frameFlexBox]}>
          <Text style={[styles.mon, styles.sunTypo]}>Tue</Text>
        </View>
        <View style={[styles.frame4, styles.frameFlexBox]}>
          <Text style={[styles.mon, styles.sunTypo]}>Wed</Text>
        </View>
        <View style={[styles.frame4, styles.frameFlexBox]}>
          <Text style={[styles.mon, styles.sunTypo]}>Thu</Text>
        </View>
        <View style={[styles.frame4, styles.frameFlexBox]}>
          <Text style={[styles.mon, styles.sunTypo]}>Fri</Text>
        </View>
        <View style={[styles.frame4, styles.frameFlexBox]}>
          <Text style={[styles.sun, styles.sunTypo]}>Sat</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frame4Border: {
    borderBottomWidth: 1,
    borderColor: Color.colorWhitesmoke_100,
    borderStyle: "solid",
  },
  frameSpaceBlock: {
    paddingBottom: Padding.p_xs,
    paddingTop: Padding.p_3xs,
    flex: 1,
  },
  textTypo: {
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    lineHeight: 22,
    fontSize: FontSize.bodyBold_size,
  },
  frameFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
  },
  weekBg: {
    backgroundColor: Color.colorWhite,
    flexDirection: "row",
  },
  sunTypo: {
    fontSize: FontSize.size_mini,
    textAlign: "left",
    fontFamily: FontFamily.sFProDisplay,
    lineHeight: 22,
  },
  text: {
    color: Color.blue500,
  },
  frame1: {
    paddingLeft: Padding.p_base,
    paddingRight: Padding.p_3xs,
  },
  date: {
    fontWeight: "600",
    color: Color.gray900,
  },
  frame2: {
    paddingHorizontal: Padding.p_3xs,
    paddingBottom: Padding.p_xs,
    paddingTop: Padding.p_3xs,
    flex: 1,
  },
  frame3: {
    justifyContent: "flex-end",
    paddingLeft: Padding.p_3xs,
    paddingRight: Padding.p_base,
    flexDirection: "row",
  },
  cardHeader: {
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    paddingTop: Padding.p_base,
    flexDirection: "row",
    backgroundColor: Color.colorWhite,
    width: 377,
  },
  sun: {
    color: Color.red500,
  },
  frame4: {
    width: 52,
    padding: Padding.p_3xs,
    borderBottomWidth: 1,
    borderColor: Color.colorWhitesmoke_100,
    borderStyle: "solid",
  },
  mon: {
    color: Color.gray900,
  },
  week: {
    alignSelf: "stretch",
    paddingHorizontal: Padding.p_xs,
    paddingTop: Padding.p_9xs,
    flexDirection: "row",
  },
  frame: {
    position: "absolute",
    top: 61,
    left: 0,
    alignItems: "flex-end",
    width: 377,
  },
});

export default ContainerFrame;
