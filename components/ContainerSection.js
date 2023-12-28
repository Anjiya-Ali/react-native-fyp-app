import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";

const ContainerSection = () => {
  return (
    <View style={styles.rectangleParent}>
      <View style={[styles.groupChild, styles.groupChildLayout]} />
      <Text style={styles.bWaterfall}>B. Waterfall</Text>
      <View style={styles.rectangleGroup}>
        <View style={styles.groupShadowBox} />
        <Text style={[styles.cKanban, styles.textTypo]}>C. Kanban</Text>
        <View style={[styles.rectangleContainer, styles.groupChildLayout]}>
          <View style={styles.groupShadowBox} />
          <Text style={[styles.cKanban, styles.textTypo]}>D. Lean</Text>
        </View>
      </View>
      <Text style={[styles.text, styles.textTypo]}>5</Text>
      <Image
        style={styles.icons8Coins481}
        resizeMode="cover"
        source={require("../assets/icons8coins48-1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 40,
    width: 257,
    left: 0,
    position: "absolute",
  },
  textTypo: {
    color: Color.labelColorLightPrimary,
    textAlign: "left",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    position: "absolute",
  },
  groupChild: {
    top: 163,
    backgroundColor: Color.colorSlateblue,
    borderWidth: 0.2,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_xl,
    height: 40,
  },
  bWaterfall: {
    top: 173,
    color: Color.colorWhite,
    textAlign: "left",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    fontSize: FontSize.size_sm,
    left: 17,
    position: "absolute",
  },
  groupShadowBox: {
    backgroundColor: Color.colorGainsboro_200,
    top: 0,
    height: 40,
    width: 257,
    borderWidth: 0.2,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: Border.br_xl,
    left: 0,
    position: "absolute",
  },
  cKanban: {
    top: 10,
    color: Color.labelColorLightPrimary,
    fontSize: FontSize.size_sm,
    left: 17,
  },
  rectangleContainer: {
    top: 55,
  },
  rectangleGroup: {
    top: 222,
    height: 95,
    width: 257,
    left: 0,
    position: "absolute",
  },
  text: {
    left: 251,
    fontSize: FontSize.bodyBold_size,
    top: 0,
    color: Color.labelColorLightPrimary,
  },
  icons8Coins481: {
    top: 1,
    left: 262,
    width: 16,
    height: 20,
    position: "absolute",
  },
  rectangleParent: {
    top: 191,
    left: 40,
    width: 278,
    height: 317,
    position: "absolute",
  },
});

export default ContainerSection;
