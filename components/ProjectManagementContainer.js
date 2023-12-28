import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const ProjectManagementContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.liveSessions}>
      <Pressable
        style={[styles.drRafi, styles.atifPosition]}
        onPress={() => navigation.navigate("LiveSession")}
      >
        <View style={[styles.drRafiChild, styles.romashaLayout]} />
        <Text style={[styles.byDrRafi, styles.byDrRafiTypo]}>By Dr. Rafi</Text>
        <Text
          style={[styles.uiuxInteraciveSession, styles.projectManagementTypo]}
        >
          UI/UX Interacive Session
        </Text>
      </Pressable>
      <View style={[styles.romasha, styles.romashaLayout]}>
        <View style={[styles.drRafiChild, styles.romashaLayout]} />
        <Image
          style={[styles.image3Icon, styles.iconLayout]}
          resizeMode="cover"
          source={require("../assets/image-33.png")}
        />
        <Text
          style={[styles.mobileAppDevelopment, styles.projectManagementTypo]}
        >
          Mobile App Development
        </Text>
        <Text style={[styles.byRomasha, styles.byDrRafiTypo]}>By Romasha</Text>
      </View>
      <View style={[styles.atif, styles.atifPosition]}>
        <View style={[styles.drRafiChild, styles.romashaLayout]} />
        <Image
          style={[styles.image4Icon, styles.image4IconPosition]}
          resizeMode="cover"
          source={require("../assets/image-42.png")}
        />
        <Text style={[styles.byDrAtif, styles.byDrRafiTypo]}>By Dr Atif</Text>
        <Text style={[styles.projectManagement, styles.image4IconPosition]}>
          ProjectManagement
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  atifPosition: {
    top: 0,
    position: "absolute",
  },
  romashaLayout: {
    width: 103,
    top: 0,
    height: 164,
    position: "absolute",
  },
  byDrRafiTypo: {
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_6xs_5,
    top: 153,
    position: "absolute",
  },
  projectManagementTypo: {
    width: 101,
    fontSize: FontSize.size_2xs,
    top: 121,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  iconLayout: {
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    width: 103,
  },
  image4IconPosition: {
    left: 1,
    position: "absolute",
  },
  drRafiChild: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorSlateblue,
    left: 0,
  },
  byDrRafi: {
    left: 39,
  },
  uiuxInteraciveSession: {
    left: 5,
    position: "absolute",
  },
  drRafi: {
    width: 106,
    left: 0,
    height: 164,
  },
  image3Icon: {
    height: 117,
    left: 0,
    top: 0,
    position: "absolute",
  },
  mobileAppDevelopment: {
    left: 2,
    position: "absolute",
  },
  byRomasha: {
    left: 32,
  },
  romasha: {
    left: 112,
  },
  image4Icon: {
    top: 1,
    height: 116,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    width: 103,
  },
  byDrAtif: {
    left: 36,
  },
  projectManagement: {
    width: 101,
    fontSize: FontSize.size_2xs,
    top: 121,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  atif: {
    left: 229,
    width: 104,
    height: 164,
  },
  liveSessions: {
    top: 159,
    left: 14,
    width: 333,
    height: 164,
    position: "absolute",
  },
});

export default ProjectManagementContainer;
