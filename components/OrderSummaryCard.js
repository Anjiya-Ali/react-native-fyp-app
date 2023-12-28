import React, { useMemo } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const OrderSummaryCard = ({ propTop, propLeft }) => {
  const groupView4Style = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
      ...getStyleValue("left", propLeft),
    };
  }, [propTop, propLeft]);

  return (
    <View
      style={[styles.rectangleParent, styles.groupChildLayout, groupView4Style]}
    >
      <View style={[styles.groupChild, styles.groupShadowBox]} />
      <Text style={[styles.javaTutoring, styles.javaTutoringPosition]}>
        Java Tutoring
      </Text>
      <Text style={styles.text}>300$</Text>
      <Text style={[styles.muhummadRafi, styles.text1Typo]}>Muhummad Rafi</Text>
      <Text style={[styles.text1, styles.text1Position]}>4.5</Text>
      <Image
        style={styles.groupItem}
        resizeMode="cover"
        source={require("../assets/star-12.png")}
      />
      <View style={[styles.groupInner, styles.groupShadowBox]} />
      <Image
        style={styles.clock4Icon}
        resizeMode="cover"
        source={require("../assets/clock-1.png")}
      />
      <Text style={[styles.pending, styles.text1Position]}>Pending</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 79,
    width: 261,
  },
  groupShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute",
  },
  javaTutoringPosition: {
    textAlign: "left",
    color: Color.colorGainsboro_100,
    left: 30,
    position: "absolute",
  },
  text1Typo: {
    fontSize: FontSize.size_4xs,
    fontFamily: FontFamily.interRegular,
  },
  text1Position: {
    top: 51,
    textAlign: "left",
    position: "absolute",
  },
  groupChild: {
    top: 0,
    left: 0,
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorSlateblue,
    borderStyle: "solid",
    borderColor: Color.labelColorLightPrimary,
    borderWidth: 1,
    height: 79,
    width: 261,
  },
  javaTutoring: {
    top: 10,
    fontSize: FontSize.bodyBold_size,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
  },
  text: {
    top: 7,
    left: 200,
    fontSize: FontSize.size_xl,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 4,
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
    position: "absolute",
  },
  muhummadRafi: {
    top: 33,
    textAlign: "left",
    color: Color.colorGainsboro_100,
    left: 30,
    position: "absolute",
  },
  text1: {
    left: 45,
    fontSize: FontSize.size_4xs,
    fontFamily: FontFamily.interRegular,
    color: Color.colorWhite,
  },
  groupItem: {
    top: 49,
    left: 24,
    width: 23,
    height: 23,
    position: "absolute",
  },
  groupInner: {
    top: 48,
    left: 147,
    borderRadius: Border.br_21xl,
    backgroundColor: Color.colorGainsboro_100,
    width: 107,
    height: 24,
  },
  clock4Icon: {
    top: 50,
    left: 152,
    width: 20,
    height: 20,
    position: "absolute",
  },
  pending: {
    left: 176,
    fontSize: FontSize.size_sm,
    color: Color.colorSlateblue,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
  },
  rectangleParent: {
    top: 497,
    left: 46,
    position: "absolute",
  },
});

export default OrderSummaryCard;
