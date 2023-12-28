import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const PopularCommunitiesContainer = () => {
  return (
    <View style={styles.popularCommunities}>
      <Image
        style={[styles.image8Icon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/image-8.png")}
      />
      <View style={[styles.popularCommunitiesChild, styles.popularLayout]} />
      <Text style={styles.webDeveloperEnthusiasts}>
        Web Developer Enthusiasts
      </Text>
      <Image
        style={[styles.image9Icon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/image-9.png")}
      />
      <View style={[styles.popularCommunitiesItem, styles.popularLayout]} />
      <Text style={[styles.dataScienceEnthusiasts, styles.enthusiastsTypo]}>
        Data Science Enthusiasts
      </Text>
      <Image
        style={styles.image10Icon}
        resizeMode="cover"
        source={require("../assets/image-10.png")}
      />
      <View style={[styles.popularCommunitiesInner, styles.popularLayout]} />
      <Text style={[styles.cloudComputingEnthusiasts, styles.enthusiastsTypo]}>
        Cloud Computing Enthusiasts
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    width: 227,
    top: 0,
    height: 136,
    position: "absolute",
  },
  popularLayout: {
    height: 35,
    width: 177,
    backgroundColor: Color.colorSlateblue,
    borderBottomLeftRadius: Border.br_xl,
    borderBottomRightRadius: Border.br_xl,
    top: 0,
    position: "absolute",
  },
  enthusiastsTypo: {
    top: 3,
    height: 17,
    width: 150,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_smi_5,
    position: "absolute",
  },
  image8Icon: {
    left: 0,
  },
  popularCommunitiesChild: {
    left: 49,
  },
  webDeveloperEnthusiasts: {
    left: 60,
    height: 17,
    width: 150,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_smi_5,
    top: 0,
    position: "absolute",
  },
  image9Icon: {
    left: 236,
  },
  popularCommunitiesItem: {
    left: 286,
  },
  dataScienceEnthusiasts: {
    left: 301,
  },
  image10Icon: {
    left: 472,
    width: 229,
    top: 0,
    height: 136,
    position: "absolute",
  },
  popularCommunitiesInner: {
    left: 524,
  },
  cloudComputingEnthusiasts: {
    left: 546,
  },
  popularCommunities: {
    top: 664,
    left: 15,
    width: 345,
    height: 136,
    position: "absolute",
  },
});

export default PopularCommunitiesContainer;
