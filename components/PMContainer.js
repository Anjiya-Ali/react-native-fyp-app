import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Padding, FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const PMContainer = () => {
  return (
    <View style={styles.rectangleParent}>
      <View style={styles.groupChild} />
      <View style={[styles.pmWrapper, styles.wrapperFlexBox]}>
        <Text style={[styles.pm, styles.pmFlexBox]}>PM</Text>
      </View>
      <View style={[styles.amWrapper, styles.wrapperFlexBox]}>
        <Text style={[styles.am, styles.textTypo]}>AM</Text>
      </View>
      <View style={[styles.frameParent, styles.frameFlexBox]}>
        <View>
          <Text style={[styles.text, styles.textFlexBox2]}>06</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.text1, styles.textFlexBox1]}>28</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.text1, styles.textFlexBox1]}>55</Text>
        </View>
      </View>
      <View style={[styles.frameView, styles.wrapper1Position]}>
        <Text style={[styles.text3, styles.textFlexBox]}>:</Text>
      </View>
      <View style={[styles.wrapper1, styles.wrapper1Position]}>
        <Text style={[styles.text4, styles.textFlexBox]}>:</Text>
      </View>
      <View style={[styles.frameGroup, styles.frameFlexBox]}>
        <View>
          <Text style={[styles.text5, styles.textFlexBox1]}>06</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.text6, styles.textTypo]}>27</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.text7, styles.textFlexBox2]}>54</Text>
        </View>
      </View>
      <View style={[styles.frameContainer, styles.frameFlexBox]}>
        <View>
          <Text style={[styles.text5, styles.textFlexBox1]}>06</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.text6, styles.textTypo]}>27</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.text7, styles.textFlexBox2]}>54</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperFlexBox: {
    padding: Padding.p_base,
    justifyContent: "center",
    alignItems: "center",
    width: 63,
    left: 213,
    position: "absolute",
  },
  pmFlexBox: {
    height: 24,
    display: "flex",
    textAlign: "center",
    fontSize: FontSize.size_xl,
    justifyContent: "center",
    alignItems: "center",
  },
  textTypo: {
    color: Color.colorDimgray_300,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  frameFlexBox: {
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_3xs,
    flexDirection: "row",
    width: 213,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  textFlexBox2: {
    width: 38,
    height: 24,
    display: "flex",
    textAlign: "center",
    fontSize: FontSize.size_xl,
    justifyContent: "center",
    alignItems: "center",
  },
  textFlexBox1: {
    width: 37,
    height: 24,
    display: "flex",
    textAlign: "center",
    fontSize: FontSize.size_xl,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper1Position: {
    top: 109,
    position: "absolute",
  },
  textFlexBox: {
    width: 8,
    height: 24,
    display: "flex",
    textAlign: "center",
    color: Color.labelColorLightPrimary,
    fontSize: FontSize.size_xl,
    justifyContent: "center",
    alignItems: "center",
  },
  groupChild: {
    top: -20,
    left: -37,
    backgroundColor: Color.colorGray_200,
    width: 361,
    height: 322,
    display: "none",
    borderRadius: Border.br_xs,
    position: "absolute",
  },
  pm: {
    width: 46,
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  pmWrapper: {
    borderColor: Color.colorDimgray_100,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderStyle: "solid",
    top: 94,
  },
  am: {
    width: 47,
    height: 24,
    display: "flex",
    textAlign: "center",
    fontSize: FontSize.size_xl,
    justifyContent: "center",
    alignItems: "center",
  },
  amWrapper: {
    top: 188,
  },
  text: {
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  text1: {
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  container: {
    marginLeft: 24,
  },
  frameParent: {
    borderColor: Color.colorDimgray_200,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderStyle: "solid",
    top: 94,
  },
  text3: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    width: 8,
  },
  frameView: {
    left: 73,
  },
  text4: {
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
  },
  wrapper1: {
    left: 134,
  },
  text5: {
    color: Color.colorDimgray_300,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  text6: {
    width: 39,
    height: 24,
    display: "flex",
    textAlign: "center",
    fontSize: FontSize.size_xl,
    justifyContent: "center",
    alignItems: "center",
  },
  text7: {
    color: Color.colorDimgray_300,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  frameGroup: {
    top: 0,
    borderRadius: Border.br_xs,
  },
  frameContainer: {
    top: 188,
    borderRadius: Border.br_xs,
  },
  rectangleParent: {
    top: 119,
    left: 56,
    width: 276,
    height: 244,
    position: "absolute",
  },
});

export default PMContainer;
