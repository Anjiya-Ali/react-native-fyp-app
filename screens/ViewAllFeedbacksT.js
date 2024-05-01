import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, Border } from "../GlobalStyles";
import StarRating from "../components/StarRating";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const ViewAllFeedbacksT = ({ route }) => {
  const { additionalData } = route.params;

  const navigation = useNavigation();
  const flexD = "column";
  const host = "http://192.168.0.105:3000";

  return (
    <ScrollView style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}>
      <View style={[styles.headerPosition, { position: "relative" }]}>
        <View style={[styles.headerChild, { flex: 1, width: windowWidth }]} />
        <TouchableOpacity
          style={[styles.icons8Arrow241, { left: windowWidth * 0.035 }]}
          onPress={() => navigation.navigate("TeacherProfilePage")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/icons8arrow24-1.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionIconsContainer}>
          <Text style={styles.sectionTitle}>Feedbacks</Text>
        </View>
        {additionalData.map((feedback, index) => (
          <View key={index}>
          <View style={styles.profileHeader1}>
          <TouchableOpacity onPress={() => navigation.navigate("OtherProfilePage")}>
            <Image
                style={styles.profileImage}
                resizeMode="cover"
                source={{ uri: `${host}/${feedback.feedbackProviderProfilePicture}`}}
            />
          </TouchableOpacity>
            <View style={styles.profileTextContainer}>
                <Text style={styles.location}>{feedback.feedbackProviderFullName}</Text>
                <Text style={styles.educationData}>{feedback.feedback_text}</Text>
            </View>
          </View>
          <StarRating rating={feedback.feedback} starSize={25} />
          {index < 2 && <View style={styles.separator} />}
        </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
  profileTextContainer: {
    flex: 1,
    marginLeft: 5,
  },
  profileHeader1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 5,
  },
  profileImage: {
    borderRadius: 32,
    width: 64,
    height: 64,
  },
  sectionIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  languageName: {
    fontWeight: "700",
    color: "black",
    fontSize: FontSize.size_lg,
  },
  languageLevel: {
    fontSize: FontSize.size_sm,
    color: Color.colorSlateblue,
  },
  languageItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingLeft: 5
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
  sectionTitle: {
    color: "black",
    fontSize: FontSize.size_2xl,
    paddingBottom: 10,
    paddingLeft: 5,
    fontWeight: "700",
  },
  sectionContainer: {
    padding: 5,
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  headerPosition: {
    height: 81,
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  headerChild: {
    borderBottomRightRadius: Border.br_11xl,
    borderBottomLeftRadius: Border.br_11xl,
    backgroundColor: Color.colorSlateblue,
  },
  excelInAgile: {
    top: width < 600 ? 115 : 245,
    left: 7,
  },
  agile: {
    width: "100%",
  },
  icons8Arrow241: {
    left: 13,
    width: 26,
    height: 24,
    top: 30,
    position: "absolute",
  },
  educationData: {
    fontSize: FontSize.size_sm,
    color: "black",
  },
});

export default ViewAllFeedbacksT;