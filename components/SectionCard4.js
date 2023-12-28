import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";

const SectionCard4 = () => {
  return (
    <View style={[styles.vectorParent, styles.groupChildLayout]}>
      <Image
        style={[styles.groupChild, styles.groupChildPosition]}
        resizeMode="cover"
        source={require("../assets/rectangle-47804.png")}
      />
      <View
        style={[styles.proudToAnnounceMyAchievemeWrapper, styles.proudLayout]}
      >
        <Text style={[styles.proudToAnnounceContainer, styles.proudLayout]}>
          <Text
            style={[styles.proudToAnnounce, styles.inshaSamnaniTypo]}
          >{`🎓 Proud to announce my achievement! 🚀 I have officially earned the Data Science Expert Certificate from IBM, validating my expertise in cutting-edge data analytics and machine learning. Excited to apply this knowledge to real-world challenges and share insights with the community. 🌐📊 #DataScience #DataAnalytics. `}</Text>
          <Text style={[styles.readMore, styles.readMoreTypo]}>
            Read More ...
          </Text>
        </Text>
      </View>
      <Text style={[styles.sept2022, styles.readMoreTypo]}>18 sept 2022</Text>
      <Text style={[styles.inshaSamnani, styles.inshaSamnaniPosition]}>
        Insha Samnani
      </Text>
      <Image
        style={[styles.inshasamnani3Icon, styles.inshaSamnaniPosition]}
        resizeMode="cover"
        source={require("../assets/inshasamnani-33.png")}
      />
      <Image
        style={styles.dataScientistExpert11Icon}
        resizeMode="cover"
        source={require("../assets/datascientistexpert-1--1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 392,
    width: 360,
    position: "absolute",
  },
  groupChildPosition: {
    top: 0,
    left: 0,
  },
  proudLayout: {
    height: 77,
    width: 286,
    position: "absolute",
  },
  inshaSamnaniTypo: {
    fontFamily: FontFamily.calibri,
    color: Color.labelColorLightPrimary,
  },
  readMoreTypo: {
    fontWeight: "300",
    fontFamily: FontFamily.calibri,
  },
  inshaSamnaniPosition: {
    top: 8,
    position: "absolute",
  },
  groupChild: {
    height: 392,
    width: 360,
    position: "absolute",
  },
  proudToAnnounce: {
    color: Color.labelColorLightPrimary,
  },
  readMore: {
    color: Color.colorSlateblue,
  },
  proudToAnnounceContainer: {
    fontSize: FontSize.size_2xs,
    textAlign: "left",
    top: 0,
    left: 0,
  },
  proudToAnnounceMyAchievemeWrapper: {
    top: 45,
    left: 45,
  },
  sept2022: {
    top: 22,
    fontSize: FontSize.size_3xs,
    width: 64,
    height: 16,
    color: Color.labelColorLightPrimary,
    textAlign: "left",
    left: 45,
    position: "absolute",
  },
  inshaSamnani: {
    fontSize: FontSize.size_smi,
    fontWeight: "700",
    width: 126,
    height: 14,
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.calibri,
    textAlign: "left",
    left: 45,
  },
  inshasamnani3Icon: {
    left: 14,
    borderRadius: Border.br_127xl,
    width: 26,
    height: 28,
  },
  dataScientistExpert11Icon: {
    top: 126,
    left: 69,
    width: 222,
    height: 222,
    position: "absolute",
  },
  vectorParent: {
    top: 534,
    left: 0,
    width: 360,
  },
});

export default SectionCard4;
