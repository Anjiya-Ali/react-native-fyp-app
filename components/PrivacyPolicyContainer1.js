import * as React from "react";
import { Text, StyleSheet, Pressable, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const PrivacyPolicyContainer1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.privacyPolicyParent}>
      <Pressable
        style={styles.privacyPolicy}
        onPress={() => navigation.navigate("PrivacyPolicy2")}
      >
        <Text style={styles.privacyPolicy1}>Privacy Policy</Text>
      </Pressable>
      <Image
        style={styles.icons8PrivacyPolicy501}
        resizeMode="cover"
        source={require("../assets/icons8privacypolicy50-11.png")}
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
        <Text style={styles.privacyPolicy1}>Notifications</Text>
      </Pressable>
      <Pressable
        style={[styles.faq, styles.faqPosition]}
        onPress={() => navigation.navigate("FAQ1")}
      >
        <Text style={styles.privacyPolicy1}>FAQ</Text>
      </Pressable>
      <View
        style={[styles.icons8LogoutRoundedLeft50Parent, styles.icons8Layout]}
      >
        <Image
          style={[styles.icons8LogoutRoundedLeft50, styles.icons8Layout]}
          resizeMode="cover"
          source={require("../assets/icons8logoutroundedleft50-1.png")}
        />
        <Pressable
          style={styles.logout}
          onPress={() => navigation.navigate("FrontPage")}
        >
          <Text style={styles.privacyPolicy1}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  privacyPolicy1: {
    fontSize: FontSize.size_xl,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.labelColorLightPrimary,
    textAlign: "left",
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
    left: 50,
  },
  icons8LogoutRoundedLeft50: {
    width: 31,
    left: 0,
    top: 0,
  },
  logout: {
    left: 42,
    top: 2,
    position: "absolute",
  },
  icons8LogoutRoundedLeft50Parent: {
    top: 138,
    left: 8,
    width: 110,
  },
  privacyPolicyParent: {
    top: 535,
    left: 89,
    width: 186,
    height: 165,
    position: "absolute",
  },
});

export default PrivacyPolicyContainer1;
