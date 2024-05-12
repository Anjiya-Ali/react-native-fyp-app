import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { Color, FontSize, FontFamily } from "../GlobalStyles";
import TopicRequestContext from "../context/TopicRequest/TopicRequestContext";
import Header from "../components/Header";
import NotificationContext from "../context/Notifications/notificationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EndContract = ({ route }) => {
  const flexD = "column";
  const host = "http://helloworld-nodejs-4714.azurewebsites.net";

  const { additionalData } = route.params;
  const [selectedStars, setSelectedStars] = useState(0);
  const [isDoneDisabled, setIsDoneDisabled] = useState(true);
  const [feedbackText, setFeedbackText] = useState("");
  const context = useContext(TopicRequestContext);
  const { AddFeedback, EndContract } = context;
  const context1 = useContext(NotificationContext);
  const {
    CreateNotification
  } = context1;

  const navigation = useNavigation();

  const handleStarClick = (stars) => {
    setSelectedStars(stars);
    updateDoneButtonStatus(stars, feedbackText);
  };

  const handleTextChange = (text) => {
    setFeedbackText(text);
    updateDoneButtonStatus(selectedStars, text);
  };

  const updateDoneButtonStatus = (stars, text) => {
    setIsDoneDisabled(stars === 0 || text.trim() === "");
  };

  const handleSubmit = async () => {
    await AddFeedback(additionalData.teacher_id, selectedStars.toString(), feedbackText);
    await EndContract(additionalData.id);
    userName = await AsyncStorage.getItem('name');
    await CreateNotification(`Hi! Student : ${userName} has closed the topic request.`, "MyClosedProposalsT", "Topic Request Closed", additionalData.teacher_id)
    navigation.navigate("MyClosedProposals")
  };

  return (
    <View style={{ flex: 1, flexDirection: flexD, backgroundColor: "white" }}>
      <Header
        heading="End Contract"
        navigate="MyActiveProposals"
        flag={false}
      />
      <Text style={styles.title}>{additionalData.name}</Text>
      <Text style={styles.smallTitle}>{additionalData.email}</Text>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: `${host}/${additionalData.profile_picture}` }}
            style={styles.profileImage}
          />
        </View>
      </View>
      <View style={styles.myCommunities}>
        <View
          style={{
            width: "100%",
            height: 450,
            flex: 1,
            backgroundColor: "#373eb2",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <View
            style={{
              backgroundColor: "#373eb2",
              flex: 1 / 8,
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                fontFamily: "Inter-ExtraBold",
                color: "#e4e3e3",
                paddingBottom: 2,
              }}
            >
              Enter your Experience with Teacher
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#d9d9d9",
              flex: 7 / 8,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
          >
            <View style={styles.modalContent}>
              <Text style={styles.sectionTitle1}>
                Please Rate this Teacher Overall
              </Text>
              <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((stars) => (
                  <TouchableOpacity
                    key={stars}
                    onPress={() => handleStarClick(stars)}
                  >
                    <Text
                      style={[
                        styles.startext,
                        {
                          color:
                            stars <= selectedStars
                              ? Color.colorSlateblue
                              : "black",
                        },
                      ]}
                    >
                      {"\u2605"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>
                  What do you wanna say about the teacher?
                </Text>
                <ScrollView>
                  <TextInput
                    placeholderTextColor="white"
                    value={feedbackText}
                    onChangeText={handleTextChange}
                    multiline={true}
                    style={styles.input}
                  />
                </ScrollView>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.button, { opacity: isDoneDisabled ? 0.5 : 1 }]}
                disabled={isDoneDisabled}
              >
                <Text style={styles.done}>End</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  profileContainer: {
    borderRadius: 50,
    overflow: "hidden",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  myCommunities: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  input: {
    color: "white",
    backgroundColor: Color.colorSlateblue,
    height: 150,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
  },
  smallTitle: {
    textAlign: "center",
    color: "black",
    fontSize: FontSize.size_sm,
    fontWeight: "400",
  },
  sectionTitle1: {
    textAlign: "center",
    marginBottom: 10,
    color: Color.colorSlateblue,
    fontSize: FontSize.size_lg,
    fontWeight: "700",
  },
  sectionTitle: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    color: Color.colorSlateblue,
    fontSize: FontSize.size_lg,
    fontWeight: "700",
  },
  title: {
    textAlign: "center",
    marginTop: 10,
    color: Color.colorSlateblue,
    fontSize: FontSize.size_5xl,
    fontWeight: "700",
  },
  modalContent: {
    justifyContent: "center",
    height: 370,
    position: "absolute",
    // bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    left: 0,
    right: 0,
    backgroundColor: Color.colorGainsboro_200,
    padding: 20,
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  startext: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  done: {
    textAlign: "center",
    color: "white",
  },
  button: {
    marginTop: 25,
    backgroundColor: Color.colorSlateblue,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

export default EndContract;