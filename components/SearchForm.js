import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const SearchForm = () => {
  return (
    <View style={styles.searchSomeone}>
      <View style={styles.searchSomeoneChild} />
      <Text style={[styles.searchSomeone1, styles.searchPosition]}>
        Search Someone
      </Text>
      <Image
        style={[styles.searchSomeoneItem, styles.searchPosition]}
        resizeMode="cover"
        source={require("../assets/rectangle-18.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchPosition: {
    top: 5,
    position: "absolute",
  },
  searchSomeoneChild: {
    top: 0,
    left: 0,
    borderRadius: Border.br_31xl,
    backgroundColor: Color.colorWhite,
    borderStyle: "solid",
    borderColor: Color.labelColorLightPrimary,
    borderWidth: 1,
    width: 232,
    height: 32,
    position: "absolute",
  },
  searchSomeone1: {
    left: 53,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.interRegular,
    color: Color.colorDimgray_100,
    textAlign: "left",
    width: 233,
    height: 50,
  },
  searchSomeoneItem: {
    left: 11,
    width: 27,
    height: 31,
  },
  searchSomeone: {
    top: 26,
    left: 64,
    width: 286,
    height: 55,
    position: "absolute",
  },
});

export default SearchForm;
