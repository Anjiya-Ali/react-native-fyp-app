import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PrivacyPolicy = () => {
  const navigation = useNavigation();
  const [role, setRole] = useState({});

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("role");
      if (token === "Student") {
        setRole("Student");
      } else {
        setRole("Teacher");
      }
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={[styles.buyCourseCart, styles.buyChildShadowBox1]}>
      <TouchableOpacity
        style={[styles.icons8Back481, styles.icons8Back481Position]}
        onPress={() => {
          if (role === "Student") {
            navigation.navigate("HomePage1");
          } else {
            navigation.navigate("TeacherHomePage");
          }
        }}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/icons8back48-1.png")}
        />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <Image
          style={styles.iconBeforePrivacy}
          resizeMode="cover"
          source={require("../assets/Logo2.png")}
        />
        <Text style={styles.iconText}>LEARNLANCE</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.checkout}>
          <View style={styles.paybox2}>
            <Text style={[styles.pay]}>Privacy and Policy</Text>
            <View style={styles.paybox}>
              <ScrollView>
                <Text style={styles.userDetails}>
                  Welcome to LearnLance! To ensure a positive and respectful
                  community experience for everyone, we have established this
                  Code of Conduct. By participating in this platform, you agree
                  to abide by these guidelines.
                </Text>
                <Text style={styles.yourTotalIs2}>Respect and Inclusivity</Text>
                <Text style={styles.userDetails1}>
                  In all your interactions, please treat every user with respect
                  and courtesy. Embrace diversity and reject any form of
                  discrimination or prejudice.
                </Text>
                <Text style={styles.yourTotalIs2}>Professionalism</Text>
                <Text style={styles.userDetails1}>
                  Maintain a high level of professionalism in your communication
                  and interactions. Be transparent and honest in your dealings
                  with others.
                </Text>
                <Text style={styles.yourTotalIs2}>Ethical Behavior</Text>
                <Text style={styles.userDetails1}>
                  Uphold ethical standards and act with integrity in all your
                  activities on the platform. Avoid engaging in any fraudulent
                  or deceptive behavior.
                </Text>
                <Text style={styles.yourTotalIs2}>Appropriate Content</Text>
                <Text style={styles.userDetails1}>
                  When creating and sharing content, ensure that it is
                  respectful and adheres to community guidelines. Refrain from
                  posting or sharing inappropriate or offensive material.
                </Text>
                <Text style={styles.yourTotalIs2}>Privacy</Text>
                <Text style={styles.userDetails1}>
                  Respect the privacy of others within the community. Avoid
                  sharing personal information without explicit consent.
                </Text>
                <Text style={styles.yourTotalIs2}>Intellectual Property</Text>
                <Text style={styles.userDetails1}>
                  Honor intellectual property rights and refrain from the
                  unauthorized use of content.
                </Text>
                <Text style={styles.yourTotalIs2}>
                  Supporting a Positive Community
                </Text>
                <Text style={styles.userDetails1}>
                  Actively contribute to building a positive and supportive
                  community. Encourage fellow users, share knowledge, and offer
                  assistance when possible. By uplifting others, you help create
                  a collaborative and thriving environment.
                </Text>
                <Text style={styles.yourTotalIs2}>
                  Responsibility for Actions
                </Text>
                <Text style={styles.userDetails1}>
                  Take responsibility for your actions on the platform. If you
                  make a mistake, acknowledge it, and work towards resolving any
                  resulting issues. This fosters a culture of accountability and
                  continuous improvement.
                </Text>
                <Text style={styles.yourTotalIs2}>Conflict Resolution</Text>
                <Text style={styles.userDetails2}>
                  In the event of disagreements or conflicts, approach
                  discussions with a constructive mindset. Seek resolution
                  through open communication, understanding differing
                  perspectives, and finding common ground. Refrain from engaging
                  in hostile behavior or personal attacks.
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buyChildShadowBox1: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  yourTotalIs2: {
    fontSize: FontSize.size_lg,
    color: "black",
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    marginTop: 15,
    marginLeft: 5,
  },
  userDetails1: {
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    fontWeight: "300",
    color: "black",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.calibri,
  },
  userDetails2: {
    marginTop: 5,
    marginBottom: 60,
    marginRight: 5,
    marginLeft: 5,
    fontWeight: "300",
    color: "black",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.calibri,
  },
  userDetails: {
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    fontWeight: "300",
    color: "black",
    textAlign: "center",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.calibri,
  },
  pay: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "3%",
    fontFamily: FontFamily.interExtraBold,
  },
  checkout: {
    marginTop: "10%",
    flexDirection: "row",
    flex: 1,
  },
  div3: {
    flex: 1,
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },
  icons8Back481Position: {
    position: "absolute",
    left: 0,
  },
  iconContainer: {
    alignItems: "center",
    marginTop: "20%",
  },
  iconBeforePrivacy: {
    width: 100,
    height: 115,
  },
  iconText: {
    fontSize: FontSize.size_11xl,
    color: "black",
    fontFamily: FontFamily.calibri,
    marginTop: 5,
  },
  paybox: {
    height: "100%",
    width: "100%",
    marginTop: "5%",
    borderWidth: 1,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderRadius: 20,
    backgroundColor: Color.colorGainsboro_200,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  paybox2: {
    height: "100%",
    width: "100%",
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Color.colorSlateblue,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  icons8Back481: {
    top: 10,
    width: 35,
    height: 35,
    left: 10,
  },
  buyCourseCart: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
  },
});

export default PrivacyPolicy;