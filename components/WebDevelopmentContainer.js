import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontFamily, Border, Color, FontSize } from "../GlobalStyles";

const WebDevelopmentContainer = () => {
  return (
    <View style={styles.groupParent}>
      <View style={styles.rectangleParent}>
        <View style={styles.groupChild} />
        <Text style={styles.titleWebDevelopmentContainer}>
          <Text style={[styles.title, styles.titleTypo]}>Title:</Text>
          <Text style={styles.webDevelopment}>
            <Text style={styles.text}>{` `}</Text>
            <Text style={[styles.webDevelopment1, styles.titleTypo]}>
              Web Development
            </Text>
          </Text>
        </Text>
      </View>
      <View style={[styles.rectangleGroup, styles.groupLayout1]}>
        <View style={[styles.groupItem, styles.groupLayout]} />
        <Text style={styles.containerPosition}>
          <Text style={[styles.title, styles.titleTypo]}>Description:</Text>
          <Text style={styles.embarkingOnA}>
            {" "}
            Embarking on a React Web Development Journey! Seeking a Skilled
            Developer to Guide and Collaborate on Building Dynamic User
            Interfaces. Open to Hiring!
          </Text>
        </Text>
      </View>
      <View style={[styles.rectangleContainer, styles.groupInnerLayout]}>
        <View style={[styles.groupInner, styles.groupInnerLayout]} />
        <Text style={styles.containerPosition}>
          <Text style={[styles.title, styles.titleTypo]}>Skills Required:</Text>
          <Text style={styles.embarkingOnA}>{` 
Web Developer
Problem Solver`}</Text>
        </Text>
      </View>
      <View style={[styles.groupView, styles.viewLayout]}>
        <View style={[styles.rectangleView, styles.viewLayout]} />
        <Text
          style={[styles.estimatedHours10Container, styles.containerPosition]}
        >
          <Text style={[styles.title, styles.titleTypo]}>Estimated Hours:</Text>
          <Text style={styles.embarkingOnA}> 10 Hours</Text>
        </Text>
      </View>
      <View style={[styles.rectangleParent1, styles.viewLayout]}>
        <View style={[styles.rectangleView, styles.viewLayout]} />
        <Text
          style={[styles.estimatedHours10Container, styles.containerPosition]}
        >
          <Text style={[styles.title, styles.titleTypo]}>Rate Per Hour:</Text>
          <Text style={styles.embarkingOnA}> $10</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleTypo: {
    fontWeight: "700",
    fontFamily: FontFamily.calibri,
  },
  groupLayout1: {
    height: 62,
    left: 0,
    width: 291,
    position: "absolute",
  },
  groupLayout: {
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorGainsboro_200,
    top: 0,
  },
  groupInnerLayout: {
    height: 48,
    left: 0,
    width: 291,
    position: "absolute",
  },
  viewLayout: {
    height: 21,
    left: 0,
    width: 291,
    position: "absolute",
  },
  containerPosition: {
    width: 271,
    fontSize: FontSize.size_2xs,
    textAlign: "left",
    left: 13,
    top: 4,
    position: "absolute",
  },
  groupChild: {
    borderRadius: Border.br_42xl,
    backgroundColor: Color.colorGainsboro_200,
    height: 20,
    left: 0,
    top: 0,
    width: 291,
    position: "absolute",
  },
  title: {
    color: Color.colorSlateblue,
    fontFamily: FontFamily.calibri,
  },
  text: {
    fontFamily: FontFamily.calibri,
  },
  webDevelopment1: {
    fontFamily: FontFamily.calibri,
  },
  webDevelopment: {
    color: Color.labelColorLightPrimary,
  },
  titleWebDevelopmentContainer: {
    fontSize: FontSize.size_smi,
    width: 226,
    textAlign: "left",
    left: 13,
    top: 4,
    position: "absolute",
  },
  rectangleParent: {
    height: 20,
    left: 0,
    top: 0,
    width: 291,
    position: "absolute",
  },
  groupItem: {
    height: 62,
    left: 0,
    width: 291,
    position: "absolute",
  },
  embarkingOnA: {
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.calibri,
  },
  rectangleGroup: {
    top: 32,
  },
  groupInner: {
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorGainsboro_200,
    top: 0,
  },
  rectangleContainer: {
    top: 172,
  },
  rectangleView: {
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorGainsboro_200,
    top: 0,
  },
  estimatedHours10Container: {
    height: 12,
  },
  groupView: {
    top: 106,
  },
  rectangleParent1: {
    top: 139,
  },
  groupParent: {
    top: 809,
    left: 42,
    height: 220,
    width: 291,
    position: "absolute",
  },
});

export default WebDevelopmentContainer;
