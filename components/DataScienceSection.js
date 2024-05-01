import React, { useMemo } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const DataScienceSection = ({
  enthusiastsTitle,
  icons8Arrow241TextAlign,
  onIcons8Arrow241Press,
}) => {
  const dATASCIENCEENTHUSIASTSStyle = useMemo(() => {
    return {
      ...getStyleValue("textAlign", icons8Arrow241TextAlign),
    };
  }, [icons8Arrow241TextAlign]);

  return (
    <View style={styles.groupChildPosition}>
      <View style={[styles.groupChild, styles.groupChildPosition]} />
      <Text
        style={[
          styles.dataScienceEnthusiasts,
          styles.icons8Arrow241Position,
          dATASCIENCEENTHUSIASTSStyle,
        ]}
      >
        {enthusiastsTitle}
      </Text>
      <Pressable
        style={[styles.icons8Arrow241, styles.icons8Arrow241Position]}
        onPress={onIcons8Arrow241Press}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/icons8arrow24-1.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildPosition: {
    height: 40,
    width: 360,
    left: 0,
    top: 0,
    position: "absolute",
  },
  icons8Arrow241Position: {
    top: 8,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorSlateblue,
  },
  dataScienceEnthusiasts: {
    left: 44,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.javaneseText,
    color: Color.colorWhite,
    textAlign: "center",
    width: 309,
    height: 25,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  icons8Arrow241: {
    left: 8,
    width: 26,
    height: 24,
  },
});

export default DataScienceSection;
