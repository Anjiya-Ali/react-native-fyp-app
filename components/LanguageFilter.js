import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const LanguageFilter = () => {
  return (
    <View style={styles.rectangleParent}>
      <View style={styles.groupChild} />
      <Text style={styles.languages}>Languages</Text>
      <Text
        style={[
          styles.englishProfessionalWorkingContainer,
          styles.containerPosition,
        ]}
      >
        <Text style={styles.english}>{`English
`}</Text>
        <Text
          style={styles.professionalWorkingProficien}
        >{`Professional Working Proficiency
`}</Text>
      </Text>
      <Text style={[styles.urduNativeOrContainer, styles.containerPosition]}>
        <Text style={styles.english}>{`Urdu
`}</Text>
        <Text style={styles.professionalWorkingProficien}>{`Native or Bilingual
`}</Text>
      </Text>
      <View style={styles.groupItem} />
      <View style={styles.icons8Plus301Parent}>
        <Image
          style={[styles.icons8Plus301, styles.icons8Layout]}
          resizeMode="cover"
          source={require("../assets/icons8plus30-1.png")}
        />
        <Image
          style={[styles.icons8Pencil302, styles.icons8Layout]}
          resizeMode="cover"
          source={require("../assets/icons8pencil30-2.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPosition: {
    height: 28,
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    left: 12,
    position: "absolute",
  },
  icons8Layout: {
    width: 15,
    height: 15,
    top: 0,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorWhite,
    top: 0,
    height: 121,
    width: 360,
    left: 0,
    position: "absolute",
  },
  languages: {
    fontSize: FontSize.size_mini,
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    top: 13,
    fontFamily: FontFamily.calibri,
    fontWeight: "700",
    left: 12,
    position: "absolute",
  },
  english: {
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.calibri,
    fontWeight: "700",
  },
  professionalWorkingProficien: {
    fontSize: FontSize.size_2xs,
    fontWeight: "300",
    fontFamily: FontFamily.calibri,
  },
  englishProfessionalWorkingContainer: {
    top: 40,
    width: 311,
  },
  urduNativeOrContainer: {
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
  icons8Plus301: {
    left: 0,
    width: 15,
  },
  icons8Pencil302: {
    left: 19,
  },
  icons8Plus301Parent: {
    left: 308,
    width: 34,
    height: 15,
    top: 13,
    position: "absolute",
  },
  rectangleParent: {
    top: 787,
    height: 121,
    width: 360,
    position: "absolute",
    left: 0,
  },
});

export default LanguageFilter;
