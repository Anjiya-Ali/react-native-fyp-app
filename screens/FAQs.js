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

const FAQs = () => {
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
            <Text style={[styles.pay]}>FAQ's</Text>
            <View style={styles.paybox}>
              <ScrollView>
                <Text style={styles.userDetails}>
                  Welcome to LearnLance! Gain insights into common queries
                  regarding our platform's policies, user guidelines, and more.
                  Find answers to ensure a seamless and informed experience for
                  our vibrant community.
                </Text>
                <Text style={styles.yourTotalIs2}>
                  How can I report inappropriate content or behavior on the
                  platform?
                </Text>
                <Text style={styles.userDetails1}>
                  To report any content or behavior that violates our Code of
                  Conduct, please send an email to
                  learnlanceadmin2002@gmail.com. Our team will investigate the
                  issue promptly and take appropriate action. We appreciate your
                  cooperation in maintaining a positive community environment.
                </Text>
                <Text style={styles.yourTotalIs2}>
                  What measures are in place to protect my privacy and personal
                  information?
                </Text>
                <Text style={styles.userDetails1}>
                  We prioritize the privacy and security of our users. Your
                  personal information is handled with care, and we have
                  implemented robust security measures. Refer to our Privacy
                  Policy for detailed information on data protection.
                </Text>
                <Text style={styles.yourTotalIs2}>
                  Can I share my contact information with other users?
                </Text>
                <Text style={styles.userDetails1}>
                  We advise against sharing personal contact information within
                  the platform without explicit consent. Respect the privacy of
                  others, and use the platform's messaging features for
                  communication.
                </Text>
                <Text style={styles.yourTotalIs2}>
                  How are intellectual property rights respected on LearnLance?
                </Text>
                <Text style={styles.userDetails1}>
                  Users are expected to honor intellectual property rights.
                  Unauthorized use of content is prohibited. If you believe your
                  intellectual property rights have been violated, please report
                  it to learnlanceadmin2002@gmail.com our support team.
                </Text>
                <Text style={styles.yourTotalIs2}>
                  What percentage does LearnLance retain from the total payment
                  when a student posts a topic request or a teacher posts a
                  course?
                </Text>
                <Text style={styles.userDetails1}>
                  LearnLance retains 2.5% of the total payment for both student
                  topic requests and teacher-posted courses.
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
    height: "88%",
    width: "100%",
    marginTop: "5%",
    borderWidth: 1,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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

export default FAQs;