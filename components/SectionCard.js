import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Padding, FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const SectionCard = ({ eventTime, onFramePress }) => {
  return (
    <View style={styles.cardHeaderParent}>
      <View style={styles.cardHeader}>
        <Pressable
          style={[styles.frame, styles.frameSpaceBlock]}
          onPress={onFramePress}
        >
          <Text style={[styles.text, styles.textTypo]}>􀅾</Text>
        </Pressable>
        <View style={[styles.frame1, styles.frameSpaceBlock]}>
          <Text style={styles.date}>{eventTime}</Text>
        </View>
        <View style={[styles.frame2, styles.frameSpaceBlock]}>
          <Text style={[styles.clearFilter, styles.textTypo]}>
            Clear filter
          </Text>
        </View>
      </View>
      <Text style={styles.setTime}>Set time</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  frameSpaceBlock: {
    paddingTop: Padding.p_3xs,
    flex: 1,
    paddingBottom: Padding.p_xs,
  },
  textTypo: {
    fontFamily: FontFamily.sFProDisplay,
    textAlign: "left",
    lineHeight: 22,
    fontSize: FontSize.bodyBold_size,
  },
  text: {
    color: Color.blue500,
    textAlign: "left",
  },
  frame: {
    paddingRight: Padding.p_3xs,
    paddingLeft: Padding.p_base,
    paddingTop: Padding.p_3xs,
    flex: 1,
  },
  date: {
    fontWeight: "700",
    fontFamily: FontFamily.andikaNewBasic,
    color: Color.gray900,
    textAlign: "left",
    lineHeight: 22,
    fontSize: FontSize.bodyBold_size,
  },
  frame1: {
    justifyContent: "center",
    paddingHorizontal: Padding.p_3xs,
    flexDirection: "row",
  },
  clearFilter: {
    color: Color.gray500,
    textAlign: "left",
  },
  frame2: {
    justifyContent: "flex-end",
    paddingLeft: Padding.p_3xs,
    paddingRight: Padding.p_base,
    flexDirection: "row",
  },
  cardHeader: {
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    backgroundColor: Color.colorWhite,
    borderStyle: "solid",
    borderColor: Color.colorWhitesmoke_100,
    borderBottomWidth: 1,
    width: 362,
    paddingTop: Padding.p_base,
    flexDirection: "row",
  },
  setTime: {
    fontSize: FontSize.size_xl,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
    marginLeft: 10,
    textAlign: "left",
  },
  cardHeaderParent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 361,
    height: 81,
    alignItems: "center",
    paddingTop: Padding.p_xs,
    paddingRight: Padding.p_lg,
    paddingBottom: Padding.p_xs,
    paddingLeft: Padding.p_base,
    flexDirection: "row",
  },
});

export default SectionCard;
