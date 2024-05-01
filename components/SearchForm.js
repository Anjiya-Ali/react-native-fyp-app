import * as React from "react";
import { StyleSheet, View, Image, TextInput } from "react-native";
import { Border, Color, FontSize, FontFamily } from "../GlobalStyles";

const SearchForm = (props) => {
  const { text, value, onChangeText } = props;
  return (
    <View style={styles.searchSomeone}>
      <View style={styles.searchSomeoneChild} />
      <TextInput
        style={[styles.searchSomeone1, styles.searchPosition1]}
        placeholderTextColor="black"
        placeholder={text}
        value={value}
        onChangeText={onChangeText}
      />
      <Image
        style={[styles.searchSomeoneItem, styles.searchPosition]}
        resizeMode="cover"
        source={require("../assets/rectangle-18.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchPosition1: {
    top: 2,
    position: "absolute",
  },
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
    height: 35,
    position: "absolute",
  },
  searchSomeone1: {
    left: 53,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.interRegular,
    color: Color.colorDimgray_100,
    textAlign: "left",
    width: 'auto',
    height: 35,
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
    height: 60,
    position: "absolute",
  },
});

export default SearchForm;