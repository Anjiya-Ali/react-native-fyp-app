import * as React from "react";
import { Text, StyleSheet, Image, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const PrivacyPolicyContainer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.privacyPolicyParent}>
      <Text style={[styles.privacyPolicy, styles.faqTypo]}>Privacy Policy</Text>
      <Image
        style={styles.icons8PrivacyPolicy501}
        resizeMode="cover"
        source={require("../assets/icons8privacypolicy50-1.png")}
      />
      <Image
        style={[styles.icons8Faq501, styles.faqPosition]}
        resizeMode="cover"
        source={require("../assets/icons8faq50-1.png")}
      />
      <Image
        style={[styles.icons8Notifications641, styles.icons8Position]}
        resizeMode="cover"
        source={require("../assets/icons8notifications64-1.png")}
      />
      <Pressable
        style={styles.notifications}
        onPress={() => navigation.navigate("Notifications")}
      >
        <Text style={styles.faqTypo}>Notifications</Text>
      </Pressable>
      <Text style={[styles.faq, styles.faqPosition]}>FAQ</Text>
      <View
        style={[styles.icons8LogoutRoundedLeft50Parent, styles.icons8Layout]}
      >
        <Image
          style={[styles.icons8LogoutRoundedLeft50, styles.icons8Layout]}
          resizeMode="cover"
          source={require("../assets/icons8logoutroundedleft50-1.png")}
        />
        <Text style={[styles.logout, styles.faqTypo]}>Logout</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  faqTypo: {
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_xl,
  },
  faqPosition: {
    top: 99,
    position: "absolute",
  },
  icons8Position: {
    left: 0,
    top: 0,
  },
  icons8Layout: {
    height: 27,
    position: "absolute",
  },
  privacyPolicy: {
    top: 52,
    left: 50,
    position: "absolute",
  },
  icons8PrivacyPolicy501: {
    top: 46,
    left: 9,
    height: 36,
    width: 30,
    position: "absolute",
  },
  icons8Faq501: {
    left: 10,
    height: 30,
    width: 30,
  },
  icons8Notifications641: {
    width: 46,
    height: 37,
    position: "absolute",
  },
  notifications: {
    top: 5,
    left: 50,
    position: "absolute",
  },
  faq: {
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_xl,
    left: 50,
  },
  icons8LogoutRoundedLeft50: {
    width: 31,
    left: 0,
    top: 0,
  },
  logout: {
    top: 2,
    left: 42,
    position: "absolute",
  },
  icons8LogoutRoundedLeft50Parent: {
    top: 138,
    left: 8,
    width: 110,
  },
  privacyPolicyParent: {
    top: 537,
    left: 309,
    width: 186,
    height: 165,
    position: "absolute",
  },
});

export default PrivacyPolicyContainer;
