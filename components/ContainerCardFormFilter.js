import * as React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
} from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const ContainerCardFormFilter = ({
  dimensionCode,
  dimensionCodeImageUrl,
  dimensionCodeText,
}) => {
  return (
    <View style={[styles.popularCourses, styles.courseLayout]}>
      <View style={[styles.course1, styles.courseIconLayout]}>
        <Image
          style={[styles.image5Icon, styles.courseIconLayout]}
          resizeMode="cover"
          source={dimensionCode}
        />
        <View style={[styles.course1Child, styles.courseIconLayout]} />
        <Image
          style={[styles.course1Item, styles.itemLayout]}
          resizeMode="cover"
          source={dimensionCodeImageUrl}
        />
        <Text style={styles.text}>$500</Text>
      </View>
      <View style={[styles.course2, styles.courseIconLayout]}>
        <View style={[styles.course1Child, styles.courseIconLayout]} />
        <Image
          style={[styles.course2Item, styles.itemLayout]}
          resizeMode="cover"
          source={require("../assets/group-11.png")}
        />
        <Text style={styles.text}>$1200</Text>
        <Image
          style={[styles.image6Icon, styles.courseIconLayout]}
          resizeMode="cover"
          source={require("../assets/image-6.png")}
        />
      </View>
      <View style={[styles.course3, styles.courseIconLayout]}>
        <View style={[styles.course1Child, styles.courseIconLayout]} />
        <Image
          style={[styles.course1Item, styles.itemLayout]}
          resizeMode="cover"
          source={dimensionCodeText}
        />
        <Text style={styles.text}>$300</Text>
        <Image
          style={[styles.image7Icon, styles.courseIconLayout]}
          resizeMode="cover"
          source={require("../assets/image-7.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  courseLayout: {
    height: 177,
    top: 0,
  },
  courseIconLayout: {
    width: 131,
    position: "absolute",
  },
  itemLayout: {
    height: 19,
    width: 82,
    left: 29,
    position: "absolute",
  },
  image5Icon: {
    left: 1,
    height: 140,
    top: 0,
    width: 131,
  },
  course1Child: {
    backgroundColor: Color.colorSlateblue,
    height: 38,
    top: 139,
    left: 0,
  },
  course1Item: {
    top: 140,
  },
  text: {
    top: 159,
    left: 49,
    fontSize: FontSize.size_2xs,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorWhite,
    textAlign: "center",
    width: 42,
    position: "absolute",
  },
  course1: {
    height: 177,
    top: 0,
    left: 0,
  },
  course2Item: {
    top: 139,
  },
  image6Icon: {
    height: 138,
    left: 0,
    top: 0,
    width: 131,
  },
  course2: {
    top: 1,
    left: 146,
    height: 176,
  },
  image7Icon: {
    height: 139,
    left: 0,
    top: 0,
    width: 131,
  },
  course3: {
    left: 292,
    height: 177,
    top: 0,
  },
  popularCourses: {
    width: 431,
    left: 0,
    position: "absolute",
  },
});

export default ContainerCardFormFilter;
