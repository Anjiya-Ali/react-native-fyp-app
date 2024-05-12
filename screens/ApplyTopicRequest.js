import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import TopicRequestContext from "../context/TopicRequest/TopicRequestContext";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationContext from "../context/Notifications/notificationContext";

const ApplyTopicRequest = ({ route }) => {
  const { additionalData } = route.params;
  const context = useContext(TopicRequestContext);
  const { CreateProposalBid } = context;
  const context1 = useContext(NotificationContext);
  const {
    CreateNotification
  } = context1;
  const [description, setDescription] = useState("");
  const [value1, setValue1] = useState(null);
  const [error, setError] = useState(null);

  const handleSelectProfilePicture = async () => {
    try {
      navigation.navigate("TeacherProfilePage");
    } catch (error) {
      console.error("Error selecting profile picture:", error.message);
    }
  };

  const handleApplyNow = async () => {
    try {
        setError(null);
        if (description.trim() === "" || value1 === null) {
          setError("Please provide complete and valid details.");
          setTimeout(() => {
            setError(null);
          }, 3000);
          return;
        }
        else{
          await CreateProposalBid(additionalData.id, description, value1);
          userName = await AsyncStorage.getItem('name');
          await CreateNotification(`${userName} has bidded on your topic request.`, "MyRequestedProposals", "New Bid", additionalData.id1)
          navigation.navigate("BidSuccessful")
        }
    }
    catch (error) {
      setError("An error occurred while creating proposal for topic request. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 3000);
      console.error("Create topic request error:", error);
      return;
    }
  };

  const handleDropdownChange1 = (value) => {
    setValue1(value);
  };

  const navigation = useNavigation();

  const flexD = "column";
  const host = "http://helloworld-nodejs-4714.azurewebsites.net";

  const val = [];

  for (let year = 1; year <= 1000; year++) {
    val.push({ label: year.toString(), value: year.toString() });
  }

  return (
    <>
      <ScrollView style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}>
        <Header heading="Write Proposal Bid" navigate="SingleJobPost" flag={false} data= {additionalData.id} />
        <View
          style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}
        >
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={handleSelectProfilePicture}>
              <Image
                style={styles.profileImage}
                resizeMode="cover"
                source={{ uri: `${host}/${additionalData.teacher_dp}` }}
              />
            </TouchableOpacity>
            <View style={styles.profileTextContainer}>
              <Text style={styles.userName}>{additionalData.name}</Text>
              <Text style={styles.userDetails}>{additionalData.bio}</Text>
            </View>
          </View>
          <View style={styles.container}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Description</Text>
              <TextInput
                placeholder="Start Writing your Proposal"
                placeholderTextColor="black"
                value={description}
                onChangeText={(text) => setDescription(text)}
                multiline={true}
                style={[styles.input, { textAlignVertical: 'top' }]}
              />
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Rate per Hour</Text>
              <RNPickerSelect
                onValueChange={handleDropdownChange1}
                items={val}
                placeholder={{ label: "Select rate", value: null }}
                value={value1}
                style={{
                  inputAndroid: {
                    backgroundColor: "white",
                    color: "black",
                  },
                  inputIOS: {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
              />
            </View>
            <TouchableOpacity
              onPress={handleApplyNow}
              style={styles.viewAllButtonContainer}
            >
              <Text style={styles.viewAllButton}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
    errorContainer: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
      },
      errorText: {
        color: 'white',
        textAlign: 'center',
      },
  viewAllButtonContainer: {
    backgroundColor: Color.colorSlateblue,
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 5,
    marginLeft: 6,
    marginRight: 6,
  },
  input:{
    color: 'black',
    backgroundColor: "white",
    height: 400,
    borderRadius: 7,
  },
  viewAllButton: {
    color: Color.colorWhite,
    fontSize: FontSize.size_sm,
  },
  skillItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  bulletPoint: {
    color: "black",
    fontSize: 20,
    marginRight: 5,
  },
  userDetails: {
    marginTop: 15,
    fontWeight: "300",
    color: "#888888",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.calibri,
  },
  sectionTitle: {
    color: "black",
    fontSize: FontSize.size_2xl,
    fontWeight: "700",
    marginBottom: 2,
  },
  sectionTitle1: {
    color: "black",
    fontSize: FontSize.size_mini,
    fontWeight: "700",
    marginBottom: 2,
    textAlign: "center",
  },
  sectionTitle2: {
    color: "black",
    fontSize: FontSize.size_mini,
    fontWeight: "700",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
  },
  column1: {
    flex: 2,
    backgroundColor: "#d9d9d9",
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 4,
    height: 530,
  },
  column2: {
    flex: 1,
    backgroundColor: "#d9d9d9",
    marginRight: 10,
    borderRadius: 4,
    height: 350,
  },
  separator: {
    marginTop: 10,
    height: 2,
    backgroundColor: "black",
    marginVertical: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  sectionContainer: {
    padding: 5,
    backgroundColor: "#d9d9d9",
    marginBottom: 10,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  profileImage: {
    borderRadius: 32,
    width: 64,
    height: 64,
  },
  profileTextContainer: {
    flex: 1,
    marginLeft: 5,
  },
  userName: {
    color: "black",
    fontSize: FontSize.size_xl,
    fontWeight: "700",
  },
  userDetails: {
    fontWeight: "300",
    color: "black",
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.calibri,
  },
  connections: {
    fontWeight: "bold",
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.calibri,
    color: Color.colorSlateblue,
  },
  location: {
    color: "black",
    fontSize: FontSize.size_base,
    fontWeight: "700",
  },
  icon: {
    width: 15,
    height: 15,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ApplyTopicRequest;