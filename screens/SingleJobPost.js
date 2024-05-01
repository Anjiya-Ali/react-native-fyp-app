import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import TopicRequestContext from "../context/TopicRequest/TopicRequestContext";
import StarRating from "../components/StarRating";
import { useFocusEffect } from "@react-navigation/native";

const SingleJobPost = ({ route }) => {
  const { additionalData } = route.params;
  const context = useContext(TopicRequestContext);
  const { GetSingleTeacherTopicRequest } = context;

  const [topicRequest, setTopicRequest] = useState({});
  const [flag, setFlag] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false);
        const json = await GetSingleTeacherTopicRequest(additionalData);
        setTopicRequest(json.topicRequestInfo);
        setFlag(true);
      };

      fetchData();
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const fetchData = async () => {
      const json = await GetSingleTeacherTopicRequest(additionalData);
      setTopicRequest(json.topicRequestInfo);
    };

    try {
      setRefreshing(true);
      fetchData();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  });

  const handleSelectProfilePicture = async () => {
    try {
      navigation.navigate("TeacherProfilePage");
    } catch (error) {
      console.error("Error selecting profile picture:", error.message);
    }
  };

  const handleApplyNow = async (id1, id, name, bio, teacher_dp) => {
    try {
      navigation.navigate("ApplyTopicRequest", {
        additionalData: { id1, id, name, bio, teacher_dp },
      });
    } catch (error) {
      console.error("Error applying topic request:", error.message);
    }
  };

  const navigation = useNavigation();

  const flexD = "column";
  const host = "http://192.168.0.147:3000";

  return (
    <>
      {flag && (
        <View
          style={{ flex: 1, flexDirection: flexD, backgroundColor: "white" }}
        >
          <Header heading="" flag={false} />
          <ScrollView
            style={{ flex: 1, flexDirection: flexD, backgroundColor: "white" }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.profileHeader}>
              <TouchableOpacity onPress={handleSelectProfilePicture}>
                <Image
                  style={styles.profileImage}
                  resizeMode="cover"
                  source={{ uri: `${host}/${topicRequest.teacher_dp}` }}
                />
              </TouchableOpacity>
              <View style={styles.profileTextContainer}>
                <Text style={styles.userName}>{topicRequest.teacher_name}</Text>
                <Text style={styles.userDetails}>
                  {topicRequest.teacher_bio}
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.column1}>
                <ScrollView>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.sectionTitle}>
                      {topicRequest.title}
                    </Text>
                    <Text style={[styles.userDetails, { marginTop: 3 }]}>
                      ${topicRequest.rate_per_hour} Hourly Rate
                    </Text>
                    <Text style={styles.userDetails}>
                      Posted on {topicRequest.initiated_date}
                    </Text>
                    <Text style={styles.userDetails}>
                      {topicRequest.bid_count} Proposals Already Sent
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                    }}
                  >
                    <Text style={styles.sectionTitle}>Job Description</Text>
                    <Text style={styles.userDetails}>
                      Posted on {topicRequest.description}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                    }}
                  >
                    <Text style={styles.sectionTitle}>Estimated Hours</Text>
                    <Text style={styles.userDetails}>
                      Posted on {topicRequest.estimated_hours}
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                    }}
                  >
                    <Text style={styles.sectionTitle}>Skills Required</Text>
                    {topicRequest.skills_required.map((skill, index) => (
                      <View key={index} style={styles.skillItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.userDetails}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
              <View style={styles.column2}>
                <ScrollView>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.sectionTitle1}>About the Client</Text>
                    <Text style={[styles.sectionTitle1, { marginTop: 20 }]}>
                      {topicRequest.student_name}
                    </Text>
                    <Text style={[styles.userDetails, { textAlign: "center" }]}>
                      {topicRequest.student_bio}
                    </Text>
                    <Text style={styles.connections}>
                      {topicRequest.student_connections} Connections
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      alignItems: "center",
                    }}
                  >
                    <View style={styles.iconContainer}>
                      <Image
                        source={require("../assets/location.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.sectionTitle1}>
                        {topicRequest.location}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 20,
                      alignItems: "center",
                    }}
                  >
                    <View style={styles.iconContainer}>
                      <Image
                        source={require("../assets/verification.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.sectionTitle1}>
                        Payment Verification
                      </Text>
                    </View>
                    <View>
                      <StarRating rating={topicRequest.rate} starSize={25} />
                    </View>
                  </View>
                  <View style={styles.separator} />
                  <TouchableOpacity
                    onPress={() =>
                      handleApplyNow(
                        topicRequest.student_id,
                        topicRequest.topic_request_id,
                        topicRequest.teacher_name,
                        topicRequest.teacher_bio,
                        topicRequest.teacher_dp
                      )
                    }
                    style={styles.viewAllButtonContainer}
                  >
                    <Text style={styles.viewAllButton}>Apply Now</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  viewAllButtonContainer: {
    backgroundColor: Color.colorSlateblue,
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
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
    flexDirection: "row",
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
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
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

export default SingleJobPost;
