import * as React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

const LiveSessionsContainer = () => {
  return (
    <View style={styles.liveSessions}>
      <View style={[styles.atif, styles.iconLayout1]}>
        <View style={[styles.atifChild, styles.drRafiLayout]} />
        <Image
          style={[styles.image4Icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/image-43.png")}
        />
        <Text style={[styles.byDrAtif, styles.byDrAtifTypo]}>{`By Dr. Atif
`}</Text>
      </View>
      <View style={[styles.drRafi, styles.drRafiLayout]}>
        <View style={[styles.atifChild, styles.drRafiLayout]} />
        <Text style={[styles.byDrRafi, styles.byDrAtifTypo]}>By Dr. Rafi</Text>
        <Image
          style={[styles.image2Icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/image-27.png")}
        />
      </View>
      <View style={[styles.romasha, styles.drRafiLayout]}>
        <View style={[styles.atifChild, styles.drRafiLayout]} />
        <Image
          style={[styles.image3Icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/image-34.png")}
        />
        <Text style={[styles.byRomasha, styles.byDrAtifTypo]}>By Romasha</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout1: {
    width: 103,
    position: "absolute",
  },
  drRafiLayout: {
    height: 164,
    width: 103,
    top: 0,
    position: "absolute",
  },
  iconLayout: {
    borderRadius: Border.br_3xs,
    left: 0,
  },
  byDrAtifTypo: {
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_2xs,
    top: 146,
    position: "absolute",
  },
  atifChild: {
    backgroundColor: Color.colorSlateblue,
    borderRadius: Border.br_3xs,
    left: 0,
  },
  image4Icon: {
    top: 1,
    height: 143,
    width: 103,
    position: "absolute",
  },
  byDrAtif: {
    left: 21,
  },
  atif: {
    left: 229,
    top: 0,
    width: 103,
    height: 172,
  },
  byDrRafi: {
    left: 25,
  },
  image2Icon: {
    height: 142,
    width: 103,
    position: "absolute",
    top: 0,
  },
  drRafi: {
    left: 0,
    height: 164,
  },
  image3Icon: {
    height: 144,
    width: 103,
    position: "absolute",
    top: 0,
  },
  byRomasha: {
    left: 19,
  },
  romasha: {
    left: 112,
  },
  liveSessions: {
    top: 159,
    left: 14,
    width: 332,
    height: 172,
    position: "absolute",
  },
});

export default LiveSessionsContainer;
