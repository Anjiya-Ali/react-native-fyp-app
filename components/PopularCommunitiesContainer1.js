import * as React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const PopularCommunitiesContainer1 = () => {
  return (
    <View style={[styles.popularCommunities, styles.image10IconLayout]}>
      <Image
        style={[styles.image8Icon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/image-81.png")}
      />
      <View style={[styles.popularCommunitiesChild, styles.popularLayout]} />
      <Text style={styles.webDeveloperEnthusiasts}>
        Web Developer Enthusiasts
      </Text>
      <Image
        style={[styles.image9Icon, styles.iconLayout]}
        resizeMode="cover"
        source={require("../assets/image-91.png")}
      />
      <View style={[styles.popularCommunitiesItem, styles.popularLayout]} />
      <Text style={[styles.dataScienceEnthusiasts, styles.enthusiastsTypo]}>
        Data Science Enthusiasts
      </Text>
      <Image
        style={[styles.image10Icon, styles.image10IconLayout]}
        resizeMode="cover"
        source={require("../assets/image-101.png")}
      />
      <View style={[styles.popularCommunitiesInner, styles.popularLayout]} />
      <Text style={[styles.cloudComputingEnthusiasts, styles.enthusiastsTypo]}>
        Cloud Computing Enthusiasts
      </Text>
      <View style={[styles.viewMore, styles.viewLayout]}>
        <View style={[styles.viewMoreChild, styles.viewLayout]} />
        <Image
          style={styles.viewMoreItem}
          resizeMode="cover"
          source={require("../assets/arrow-11.png")}
        />
        <Text style={styles.viewAll}>VIEW ALL</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image10IconLayout: {
    height: 136,
    position: "absolute",
  },
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
  viewLayout: {
    height: 33,
    width: 116,
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
    color: Color.colorWhite,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textAlign: "center",
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
  },
  popularCommunitiesInner: {
    left: 524,
  },
  cloudComputingEnthusiasts: {
    left: 546,
  },
  viewMoreChild: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.colorGainsboro_200,
    left: 0,
    top: 0,
  },
  viewMoreItem: {
    top: 17,
    left: 84,
    width: 22,
    height: 0,
    position: "absolute",
  },
  viewAll: {
    top: 9,
    left: 4,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.labelColorLightPrimary,
    width: 91,
    textAlign: "center",
    fontSize: FontSize.size_smi_5,
    position: "absolute",
  },
  viewMore: {
    top: 51,
    left: 713,
  },
  popularCommunities: {
    top: 661,
    left: 15,
    width: 350,
  },
});

export default PopularCommunitiesContainer1;
