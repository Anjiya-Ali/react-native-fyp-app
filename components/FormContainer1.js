import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

const FormContainer1 = () => {
  return (
    <View style={styles.groupParent}>
      <View style={styles.rectangleParent}>
        <View style={[styles.groupChild, styles.groupChildPosition]} />
        <View style={[styles.rectangleGroup, styles.groupLayout]}>
          <View style={[styles.groupItem, styles.groupPosition]} />
          <Text style={[styles.muhammadRafi, styles.muhammadRafiTypo]}>
            Muhammad Rafi
          </Text>
        </View>
      </View>
      <Image
        style={[styles.image1Icon, styles.groupChildPosition]}
        resizeMode="cover"
        source={require("../assets/image-14.png")}
      />
      <View style={[styles.rectangleContainer, styles.groupInnerLayout]}>
        <View style={[styles.groupInner, styles.groupInnerLayout]} />
        <Text style={[styles.ismailAhmedAnsari, styles.muhammadRafiTypo]}>
          Ismail Ahmed Ansari
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildPosition: {
    height: 224,
    borderRadius: Border.br_7xl,
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupLayout: {
    height: 24,
    width: 94,
    position: "absolute",
  },
  groupPosition: {
    backgroundColor: Color.colorSlateblue,
    borderRadius: Border.br_7xl,
    left: 0,
    top: 0,
  },
  muhammadRafiTypo: {
    textAlign: "center",
    fontFamily: FontFamily.calibri,
    fontSize: FontSize.size_smi,
    position: "absolute",
  },
  groupInnerLayout: {
    height: 23,
    width: 124,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorWhite,
    width: 144,
  },
  groupItem: {
    height: 24,
    width: 94,
    position: "absolute",
  },
  muhammadRafi: {
    top: 5,
    left: 6,
    color: Color.colorWhitesmoke_200,
    width: 88,
    height: 8,
  },
  rectangleGroup: {
    left: 25,
    top: 201,
  },
  rectangleParent: {
    width: 144,
    left: 0,
    top: 0,
    height: 225,
    position: "absolute",
  },
  image1Icon: {
    width: 156,
    height: 224,
    borderRadius: Border.br_7xl,
  },
  groupInner: {
    backgroundColor: Color.colorSlateblue,
    borderRadius: Border.br_7xl,
    left: 0,
    top: 0,
  },
  ismailAhmedAnsari: {
    top: 4,
    left: 10,
    color: Color.colorWhite,
    width: 110,
  },
  rectangleContainer: {
    left: 13,
    top: 201,
  },
  groupParent: {
    top: 326,
    left: 17,
    height: 225,
    position: "absolute",
    width: 156,
  },
});

export default FormContainer1;
