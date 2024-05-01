import * as React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.signup}>
      <Image
        style={styles.imageIzlyy1zfiTransformed1Icon}
        resizeMode="cover"
        source={require("../assets/imageizlyy1zfitransformed-11.png")}
      />
      <View style={[styles.signupChild, styles.childBg]} />
      <Image
        style={styles.signupItem}
        resizeMode="cover"
        source={require("../assets/rectangle-110.png")}
      />
      <Text style={[styles.createANew, styles.signup1Typo]}>
        Create a New Account
      </Text>
      <Text style={[styles.loginToYour, styles.signup1Typo]}>
        Login to your Account
      </Text>
      <Image
        style={styles.signupInner}
        resizeMode="cover"
        source={require("../assets/ellipse-3.png")}
      />
      <View style={styles.rectangleParent}>
        <View style={[styles.groupChild, styles.groupShadowBox]} />
        <Image
          style={[styles.groupItem, styles.groupItemLayout]}
          resizeMode="cover"
          source={require("../assets/rectangle-12.png")}
        />
        <Text style={[styles.male, styles.maleTypo]}>Male</Text>
        <Text style={[styles.female, styles.maleTypo]}>Female</Text>
        <Text style={[styles.password, styles.passwordTypo]}>Password</Text>
        <Text style={[styles.location, styles.emailTypo]}>Location</Text>
        <View style={[styles.groupInner, styles.groupShadowBox]} />
        <Text style={[styles.dateOfBirth, styles.passwordTypo]}>
          Date of Birth
        </Text>
        <Text style={[styles.gender, styles.genderTypo]}>Gender</Text>
        <Text style={[styles.reEnterPassword, styles.passwordTypo]}>
          Re-enter Password
        </Text>
        <View style={[styles.rectangleView, styles.groupChild3Layout]} />
        <Text style={[styles.email, styles.emailTypo]}>Email</Text>
        <TouchableOpacity
          style={[styles.rectangleGroup, styles.groupLayout]}
          onPress={() => navigation.navigate("StudentProfile1")}
        >
          <View style={[styles.groupChild1, styles.groupLayout]} />
          <Text style={[styles.signup1, styles.signup1Typo]}>SignUp</Text>
        </TouchableOpacity>
        <View style={[styles.groupChild2, styles.groupChildShadowBox]} />
        <Text style={[styles.firstName, styles.passwordTypo]}>First Name</Text>
        <Image
          style={styles.ellipseIcon}
          resizeMode="cover"
          source={require("../assets/ellipse-3.png")}
        />
        <Text style={[styles.lastName, styles.genderTypo]}>Last Name</Text>
        <View style={[styles.groupChild3, styles.groupChildShadowBox]} />
        <Text style={[styles.text, styles.textTypo]}>...................</Text>
        <Text style={[styles.text1, styles.textTypo]}>...................</Text>
        <Text style={[styles.lname, styles.lnameTypo]}>lName</Text>
        <Image
          style={[styles.rectangleIcon, styles.groupItemLayout]}
          resizeMode="cover"
          source={require("../assets/rectangle-12.png")}
        />
        <Text style={[styles.pakistan, styles.lnameTypo]}>Pakistan</Text>
        <Text style={[styles.fname, styles.lnameTypo]}>fName</Text>
        <Image
          style={styles.groupChild4}
          resizeMode="cover"
          source={require("../assets/ellipse-2.png")}
        />
      </View>
      <Image
        style={styles.dropdown1Icon}
        resizeMode="cover"
        source={require("../assets/dropdown-1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  childBg: {
    backgroundColor: Color.colorSlateblue,
    borderRadius: Border.br_21xl,
    left: 0,
  },
  signup1Typo: {
    textAlign: "left",
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    position: "absolute",
  },
  groupShadowBox: {
    height: 37,
    borderWidth: 1,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorSlateblue,
    position: "absolute",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  groupItemLayout: {
    width: 310,
    height: 37,
    borderRadius: Border.br_8xs,
    position: "absolute",
  },
  maleTypo: {
    height: 18,
    width: 163,
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_xs,
    top: 93,
    textAlign: "left",
    position: "absolute",
  },
  passwordTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.colorSlateblue,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    position: "absolute",
  },
  emailTypo: {
    left: 7,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.colorSlateblue,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    position: "absolute",
  },
  genderTypo: {
    left: 166,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    color: Color.colorSlateblue,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    position: "absolute",
  },
  groupChild3Layout: {
    width: 148,
    left: 164,
  },
  groupLayout: {
    height: 44,
    width: 230,
    position: "absolute",
  },
  groupChildShadowBox: {
    top: 19,
    height: 37,
    borderWidth: 1,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorSlateblue,
    position: "absolute",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  textTypo: {
    height: 33,
    top: 206,
    width: 163,
    color: Color.colorGainsboro_100,
    textAlign: "left",
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    fontSize: FontSize.bodyBold_size,
    position: "absolute",
  },
  lnameTypo: {
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    position: "absolute",
  },
  imageIzlyy1zfiTransformed1Icon: {
    width: 533,
    height: 430,
    left: 0,
    top: 0,
    position: "absolute",
  },
  signupChild: {
    top: 241,
    width: 360,
    height: 469,
    position: "absolute",
  },
  signupItem: {
    top: 296,
    borderRadius: Border.br_11xl,
    width: 384,
    height: 414,
    left: 0,
    position: "absolute",
  },
  createANew: {
    top: 305,
    color: Color.colorSlateblue,
    textAlign: "left",
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    fontSize: FontSize.bodyBold_size,
    left: 86,
  },
  loginToYour: {
    top: 261,
    color: Color.colorGainsboro_100,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    textAlign: "left",
    fontSize: FontSize.bodyBold_size,
    left: 86,
  },
  signupInner: {
    top: 430,
    height: 13,
    width: 14,
    left: 306,
    position: "absolute",
  },
  groupChild: {
    width: 143,
    left: 2,
    top: 204,
    height: 37,
    borderWidth: 1,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
  },
  groupItem: {
    top: 141,
    left: 2,
  },
  male: {
    left: 185,
  },
  female: {
    left: 238,
  },
  password: {
    left: 5,
    fontSize: FontSize.size_sm,
    top: 186,
  },
  location: {
    top: 247,
  },
  groupInner: {
    top: 79,
    width: 143,
    left: 2,
  },
  dateOfBirth: {
    top: 60,
    width: 98,
    left: 5,
    fontSize: FontSize.size_sm,
  },
  gender: {
    top: 63,
    width: 98,
  },
  reEnterPassword: {
    left: 168,
    top: 186,
  },
  rectangleView: {
    height: 37,
    borderWidth: 1,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorSlateblue,
    position: "absolute",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    top: 204,
  },
  email: {
    top: 121,
  },
  groupChild1: {
    backgroundColor: Color.colorSlateblue,
    borderRadius: Border.br_21xl,
    left: 0,
    top: 0,
  },
  signup1: {
    top: 9,
    left: 79,
    fontSize: FontSize.size_xl,
    width: 72,
    height: 21,
    color: Color.colorGainsboro_100,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    textAlign: "left",
  },
  rectangleGroup: {
    top: 317,
    left: 45,
  },
  groupChild2: {
    width: 143,
    left: 2,
  },
  firstName: {
    left: 2,
    top: 0,
  },
  ellipseIcon: {
    left: 215,
    top: 93,
    height: 13,
    width: 14,
    position: "absolute",
  },
  lastName: {
    top: 0,
  },
  groupChild3: {
    width: 148,
    left: 164,
  },
  text: {
    left: 185,
  },
  text1: {
    left: 22,
  },
  lname: {
    top: 30,
    left: 178,
    color: Color.colorGainsboro_100,
  },
  rectangleIcon: {
    top: 266,
    left: 0,
  },
  pakistan: {
    top: 277,
    left: 15,
    color: Color.colorWhite,
  },
  fname: {
    top: 31,
    left: 16,
    color: Color.colorGainsboro_100,
  },
  groupChild4: {
    top: 96,
    left: 219,
    width: 6,
    height: 6,
    position: "absolute",
  },
  rectangleParent: {
    top: 336,
    left: 24,
    width: 401,
    height: 361,
    position: "absolute",
  },
  dropdown1Icon: {
    top: 610,
    width: 20,
    height: 20,
    left: 306,
    position: "absolute",
  },
  signup: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    height: 710,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
});

export default SignUp;
