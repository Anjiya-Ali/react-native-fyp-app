import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import DataScienceContainer from "./DataScienceContainer";
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";

const SectionCard5 = () => {
  return (
    <View style={[styles.vectorParent, styles.groupChildLayout]}>
      <Image
        style={[styles.groupChild, styles.groupPosition]}
        resizeMode="cover"
        source={require("../assets/rectangle-47803.png")}
      />
      <View style={[styles.rectangleParent, styles.groupItemLayout]}>
        <View style={[styles.groupItem, styles.groupItemLayout]} />
        <Text style={styles.message}>Message</Text>
      </View>
      <DataScienceContainer
        sessionDescription="🚀 Join me for an insightful session on the exciting world of Data Science! 📊 Whether you're a beginner or looking to deepen your knowledge, this session is tailored for all enthusiasts. Let's explore the fascinating realms of data analysis, machine learning, and practical "
        sessionDuration="21"
        sessionTitle="2"
      />
      <Text style={[styles.oct2022, styles.oct2022Position]}>1 oct 2022</Text>
      <Image
        style={styles.vyw5swcg400x4001Icon}
        resizeMode="cover"
        source={require("../assets/vyw5swcg-400x400-12.png")}
      />
      <Text style={[styles.anjiyaMuhammadAli, styles.oct2022Position]}>
        Anjiya Muhammad Ali
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 134,
    width: 360,
    position: "absolute",
  },
  groupPosition: {
    top: 0,
    left: 0,
  },
  groupItemLayout: {
    height: 19,
    width: 55,
    position: "absolute",
  },
  oct2022Position: {
    color: Color.labelColorLightPrimary,
    left: 45,
    textAlign: "left",
    fontFamily: FontFamily.calibri,
    position: "absolute",
  },
  groupChild: {
    height: 134,
    width: 360,
    position: "absolute",
  },
  groupItem: {
    borderRadius: Border.br_123xl,
    backgroundColor: Color.colorSlateblue,
    top: 0,
    left: 0,
  },
  message: {
    top: 4,
    left: 7,
    fontSize: FontSize.size_2xs,
    color: Color.colorGainsboro_100,
    width: 43,
    height: 10,
    textAlign: "left",
    fontFamily: FontFamily.calibri,
    fontWeight: "700",
    position: "absolute",
  },
  rectangleParent: {
    top: 108,
    left: 256,
  },
  oct2022: {
    top: 20,
    fontSize: FontSize.size_3xs,
    fontWeight: "300",
    width: 49,
    height: 15,
  },
  vyw5swcg400x4001Icon: {
    top: 6,
    left: 14,
    borderRadius: Border.br_200xl,
    width: 26,
    height: 27,
    position: "absolute",
  },
  anjiyaMuhammadAli: {
    top: 7,
    fontSize: FontSize.size_smi,
    width: 126,
    height: 13,
    fontWeight: "700",
    color: Color.labelColorLightPrimary,
    left: 45,
  },
  vectorParent: {
    top: 385,
    left: 0,
    width: 360,
  },
});

export default SectionCard5;
