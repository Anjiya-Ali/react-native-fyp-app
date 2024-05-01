import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const SectionForm = () => {
  return (
    <View style={[styles.groupParent, styles.groupParentLayout]}>
      <View style={[styles.rectangleParent, styles.groupPosition]}>
        <View style={[styles.groupChild, styles.groupPosition]} />
        <View style={[styles.videoParent, styles.videoLayout]}>
          <Text style={[styles.video, styles.videoTypo]}>Video</Text>
          <Image
            style={[styles.icons8Video501, styles.icons8Position]}
            resizeMode="cover"
            source={require("../assets/icons8video50-11.png")}
          />
        </View>
        <View style={[styles.icons8Image501Parent, styles.icons8Layout]}>
          <Image
            style={[styles.icons8Image501, styles.icons8Layout]}
            resizeMode="cover"
            source={require("../assets/icons8image50-11.png")}
          />
          <Text style={[styles.photos, styles.icons8Layout]}>Photos</Text>
        </View>
        <Image
          style={[styles.inshasamnani2Icon, styles.whatsOnYourPosition]}
          resizeMode="cover"
          source={require("../assets/inshasamnani-21.png")}
        />
      </View>
      <View style={[styles.groupWrapper, styles.groupLayout]}>
        <View style={[styles.rectangleGroup, styles.groupLayout]}>
          <View style={[styles.groupItem, styles.groupLayout]} />
          <Text style={[styles.whatsOnYour, styles.whatsOnYourPosition]}>
            What’s on your mind?
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupParentLayout: {
    height: 82,
    width: 360,
    position: "absolute",
  },
  groupPosition: {
    top: 0,
    left: 0,
  },
  videoLayout: {
    height: 11,
    position: "absolute",
  },
  videoTypo: {
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.calibri,
    fontWeight: "300",
    fontSize: FontSize.size_2xs,
  },
  icons8Position: {
    width: 13,
    top: 0,
    left: 0,
  },
  icons8Layout: {
    height: 12,
    position: "absolute",
  },
  whatsOnYourPosition: {
    top: 7,
    position: "absolute",
  },
  groupLayout: {
    height: 54,
    width: 284,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorWhite,
    height: 82,
    width: 360,
    position: "absolute",
    top: 0,
  },
  video: {
    width: 39,
    left: 15,
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.calibri,
    fontWeight: "300",
    fontSize: FontSize.size_2xs,
    top: 0,
    height: 11,
    position: "absolute",
  },
  icons8Video501: {
    height: 11,
    position: "absolute",
  },
  videoParent: {
    left: 277,
    width: 54,
    top: 64,
  },
  icons8Image501: {
    width: 13,
    top: 0,
    left: 0,
  },
  photos: {
    width: 35,
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.calibri,
    fontWeight: "300",
    fontSize: FontSize.size_2xs,
    left: 15,
    top: 0,
  },
  icons8Image501Parent: {
    left: 63,
    width: 50,
    top: 64,
  },
  inshasamnani2Icon: {
    left: 14,
    borderRadius: Border.br_127xl,
    width: 26,
    height: 26,
  },
  rectangleParent: {
    height: 82,
    width: 360,
    position: "absolute",
    top: 0,
  },
  groupItem: {
    borderRadius: Border.br_base,
    backgroundColor: Color.colorGainsboro_100,
    top: 0,
    left: 0,
  },
  whatsOnYour: {
    left: 10,
    width: 265,
    height: 42,
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.calibri,
    fontWeight: "300",
    fontSize: FontSize.size_2xs,
  },
  rectangleGroup: {
    top: 0,
    left: 0,
  },
  groupWrapper: {
    top: 5,
    left: 53,
  },
  groupParent: {
    top: 288,
    left: 0,
    width: 360,
    position: "absolute",
  },
});

export default SectionForm;
