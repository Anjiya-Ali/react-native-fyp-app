import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import ContainerCardFormFilter from "./ContainerCardFormFilter";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const PopularCoursesContainer1 = () => {
  return (
    <View style={styles.popularCoursesWhole}>
      <ContainerCardFormFilter
        dimensionCode={require("../assets/image-52.png")}
        dimensionCodeImageUrl={require("../assets/group-13.png")}
        dimensionCodeText={require("../assets/group-14.png")}
      />
      <View style={[styles.viewMore, styles.viewLayout]}>
        <View style={[styles.viewMoreChild, styles.viewLayout]} />
        <Image
          style={styles.viewMoreItem}
          resizeMode="cover"
          source={require("../assets/arrow-1.png")}
        />
        <Text style={styles.viewAll}>VIEW ALL</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewLayout: {
    height: 33,
    width: 116,
    position: "absolute",
  },
  viewMoreChild: {
    top: 0,
    left: 0,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.colorGainsboro_200,
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
    fontSize: FontSize.size_smi_5,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.labelColorLightPrimary,
    textAlign: "center",
    width: 91,
    position: "absolute",
  },
  viewMore: {
    top: 56,
    left: 433,
  },
  popularCoursesWhole: {
    top: 406,
    left: 14,
    width: 346,
    height: 177,
    position: "absolute",
  },
});

export default PopularCoursesContainer1;
