import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import jointAccountContext from "../context/JointAccounts/JointAccountContext";
import { TouchableOpacity } from "react-native";
import Header from "../components/Header";
const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationContext from "../context/Notifications/notificationContext";

const WriteMessageForJointAccount = ({ route }) => {
  const { additionalData } = route.params;
  const context1 = useContext(NotificationContext);
  const {
    CreateNotification
  } = context1;
  const context = useContext(jointAccountContext);
  const [messageAdded, setMessageAdded] = useState();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const { SendInvitationToTeacherForJointAccount } = context;

  const handleAddMessage = async () => {
    try {
      if (message.trim() === "") {
        setError("It is required to write a message.");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      } else {
        await SendInvitationToTeacherForJointAccount(
          message,
          additionalData.courseId,
          additionalData.teacherId
        );
        userName = await AsyncStorage.getItem('name');
        await CreateNotification(`${userName} has invited you for a joint account.`, "ViewJointAccountRequests", "New Invitation", additionalData.teacherId)
        setMessageAdded(true);
      }
    } catch (error) {
      setError("An error occurred while sending message. Please try again.");
      console.error("Add message error:", error);
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    if (messageAdded) {
        navigation.navigate("InviteSuccessful", {
            additionalData: additionalData.courseId,
        });
    }
  }, [messageAdded]);

  const flexD = "column";

  return (
    <View style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}>
      <Header heading={`INVITE ${additionalData.fullName}`} navigate="ViewMemberForJointAccount" flag = {false} data={additionalData.courseId} />
    <ScrollView
      style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}
    >
      <View style={styles.container}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Inviting to Course "{additionalData.localCourseName}"
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Dear Dr. Atif Tahir,

I hope this message finds you well. I am organizing an Introduction to Machine Learning with Python course and am impressed by your expertise in [mention relevant areas]. I believe your contribution would greatly benefit our students.

Course Overview:
Title: Introduction to Machine Learning with Python
Duration: 12 Weeks
Platform: LearnLance

Why Dr. Muhammad Rafi:
Proven expertise in [mention specific areas].
Exceptional ability to convey complex concepts effectively.
Your commitment to creating an engaging learning environment.

Offer:
Flexible scheduling.
Competitive compensation.

I'd love to discuss this opportunity further at your earliest convenience. Your insights would enrich our course. Looking forward to the possibility of collaboration.

Warm regards,
Dr. Farrukh Hassan
+923471678725
"
            placeholderTextColor="black"
            value={message}
            onChangeText={(text) => setMessage(text)}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          onPress={handleAddMessage}
          style={styles.viewAllButtonContainer}
        >
          <Text style={styles.viewAllButton}>Invite</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: "black",
  },
  errorContainer: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
  viewAllButtonContainer: {
    backgroundColor: Color.colorSlateblue,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  viewAllButton: {
    color: Color.colorWhite,
    fontSize: FontSize.size_sm,
  },
  sectionTitle: {
    color: "black",
    fontSize: FontSize.size_lg,
    fontWeight: "700",
    textAlign: 'center'
  },
  sectionContainer: {
    padding: 5,
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  parent: {
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  headerPosition: {
    height: 81,
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 16, // Add some padding for better spacing
    width: "100%", // Use 100% of the parent width
  },
  childIconLayout: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
  headerChild: {
    borderBottomRightRadius: Border.br_11xl,
    borderBottomLeftRadius: Border.br_11xl,
    backgroundColor: Color.colorSlateblue,
  },
  hamburgerIcon: {
    top: 33,
    left: windowWidth - 40,
    width: 25,
    height: 16,
    position: "absolute",
  },
  box: {
    margin: "0 auto",
    height: height / 6,
    alignSelf: "center",
  },
  excelInAgileTypo: {
    height: 46,
    width: 283,
    color: Color.colorSlateblue,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    fontSize: FontSize.size_lg,
    textAlign: "left",
    position: "absolute",
  },
  myCourses1: {
    fontSize: FontSize.size_xl,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorWhite,
    width: 185,
    height: 26,
    textAlign: "center",
    top: 30,
    position: "absolute",
  },
  image1Icon: {
    width: width * 0.8,
    margin: "0 auto",
    height: width < 600 ? height / 5.5 : height / 2.8,
  },
  excelInAgile: {
    top: width < 600 ? 115 : 245,
    left: 7,
  },
  agile: {
    width: "100%", // Use 100% of the parent width
  },
  icons8Arrow241: {
    left: 13,
    width: 26,
    height: 24,
    top: 30,
    position: "absolute",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
  },
  header: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});

export default WriteMessageForJointAccount;
