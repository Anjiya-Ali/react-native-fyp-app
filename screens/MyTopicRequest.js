import React, { useContext, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  RefreshControl
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import StarRating from "../components/StarRating";
import TopicRequestContext from "../context/TopicRequest/TopicRequestContext";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import CreateMyOwnTopicRequest from "../components/CreateMyOwnTopicRequest";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const MyTopicRequest = () => {
  const context = useContext(TopicRequestContext);
  const { GetStudentsTopicRequest, DeleteStudentsTopicRequest, ViewProposalsOfTopicRequest } = context;
  const [flag, setFlag] = useState(false);
  const [topicRequest, setTopicRequest] = useState({});
  const [localTopicRequests, setLocalTopicRequests] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [requestId, setRequestId] = useState();
  const [error, setError] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false);
        const json = await GetStudentsTopicRequest();
        setTopicRequest(json);
        setLocalTopicRequests(json.topicRequestInfo);
        setFlag(true);
      };

      fetchData();
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const fetchData = async () => {
      const json = await GetStudentsTopicRequest();
      setTopicRequest(json);
      setLocalTopicRequests(json.topicRequestInfo);
    };

    try {
      setRefreshing(true);
      fetchData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }

  });

  const handleSelectProfilePicture = async () => {
    try {
      navigation.navigate("StudentProfilePage");
    } catch (error) {
      console.error("Error selecting profile picture:", error.message);
    }
  };

  const handleDeleteTopicRequest = async (id) => {
    setRequestId(id);
    setShowRejectModal(true);
  };

  const handleDelete = async () => {
    const json = await DeleteStudentsTopicRequest(requestId);
    if(json === true){
      setLocalTopicRequests(
        localTopicRequests.filter((topic) => topic.topic_request_id !== requestId)
      );
      setShowRejectModal(false);
    }
    else{
      setShowRejectModal(false);
      setError("Cannot delete topic request");
        setTimeout(() => {
          setError("");
        }, 3000);
      return;
    }
  };

  const handleViewProposals = async (id) => {
    try {
      navigation.navigate("ViewProposals", {
        additionalData: id,
      })
    } catch (error) {
      console.error("Error viewing proposals:", error.message);
    }
  };

  const navigation = useNavigation();

  const flexD = "column";
  const host = "http://helloworld-nodejs-4714.azurewebsites.net";

  return (
    <>
      <Header heading="My Topic Requests" navigate="HomePage1" />
      {flag && (
        <View
          style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}
        >
          <ScrollView
            style={{
              flex: 1,
              flexDirection: flexD,
              backgroundColor: "#d9d9d9",
            }} refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            <View style={styles.profileHeader}>
              <TouchableOpacity onPress={handleSelectProfilePicture}>
                <Image
                  style={styles.profileImage}
                  resizeMode="cover"
                  source={{
                    uri: `${host}/${topicRequest.topicRequestInfo[0].profile_picture}`,
                  }}
                />
              </TouchableOpacity>
              <View style={styles.profileTextContainer}>
                <Text style={styles.userName1}>
                  {topicRequest.topicRequestInfo[0].name}
                </Text>
                <Text style={styles.userDetails}>
                    {topicRequest.topicRequestInfo[0].bio}
                </Text>
              </View>
            </View>
            <View style={styles.secondContainer}>
              <View style={styles.profileTextContainer}>
                <Text style={styles.location}>
                  {topicRequest.topicRequestInfo[0].location}
                </Text>
                <Text style={styles.connections}>
                  {topicRequest.topicRequestInfo[0].connections > 500
                    ? "500+ Connections"
                    : `${topicRequest.topicRequestInfo[0].connections} Connections`}
                </Text>
              </View>
              <StarRating
                rating={topicRequest.topicRequestInfo[0].feedback}
                starSize={25}
              />
            </View>
            <CreateMyOwnTopicRequest />
            {localTopicRequests.length > 0 && (
              <View style={styles.sectionContainer}>
                {localTopicRequests.map((topic, index) => (
                  <View key={index}>
                    <View style={styles.profileHeader1}>
                      <TouchableOpacity onPress={handleSelectProfilePicture}>
                        <Image
                          style={styles.profileImage1}
                          resizeMode="cover"
                          source={{
                            uri: `${host}/${topicRequest.topicRequestInfo[0].profile_picture}`,
                          }}
                        />
                      </TouchableOpacity>
                      <View style={styles.profileTextContainer}>
                        <Text style={styles.userName}>
                          {topicRequest.topicRequestInfo[0].name}
                        </Text>
                        <Text style={styles.userDetails1}>
                            {topic.initiated_date}
                        </Text>
                      </View>
                    </View>
                    {error && (
                      <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                      </View>
                    )}
                    <View style={styles.languageItem}>
                      <View style={styles.rowContainer}>
                        <View>
                          <Text style={styles.sectionTitle}>Title</Text>
                        </View>
                        <View style={styles.sectionIconsContainer}>
                          <View style={styles.sectionIconsContainer}>
                            <TouchableOpacity
                              onPress={() => handleDeleteTopicRequest(topic.topic_request_id)}
                            >
                              <Image
                                style={styles.icon}
                                resizeMode="cover"
                                source={require("../assets/icons8delete24-3.png")}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                      <Text style={styles.languageName}>{topic.title}</Text>
                      <View style={styles.separator} />
                      <Text style={styles.sectionTitle}>Description</Text>
                      <Text style={styles.educationData}>
                        {topic.description}
                      </Text>
                      <View style={styles.separator} />
                      <Text style={styles.sectionTitle}>Skills Required</Text>
                        {topic.skills_required.map((skill, index) => (
                          <View key={index} style={styles.skillItem}>
                            <Text style={styles.bulletPoint}>•</Text>
                            <Text style={styles.educationData}>{skill}</Text>
                          </View>
                        ))}
                      <View style={styles.separator} />
                      <Text style={styles.sectionTitle}>Estimated Hours</Text>
                      <Text style={styles.educationData}>
                        {topic.estimated_hours} Hours
                      </Text>
                      <View style={styles.separator} />
                      <Text style={styles.sectionTitle}>Rate per Hour</Text>
                      <Text style={styles.educationData}>
                        ${topic.rate_per_hour}
                      </Text>
                      {topic.proposals ? (
                      <TouchableOpacity
                          onPress={() => handleViewProposals(topic.topic_request_id)}
                          style={styles.viewAllButtonContainer}
                        >
                          <Text style={styles.viewAllButton}>View Proposals</Text>
                      </TouchableOpacity>
                      ) : <></>}
                    </View>
                    <View style={styles.separator1} />
                  </View>
                ))}
              </View>
            )}
            <Modal
              animationType="slide"
              transparent={true}
              visible={showRejectModal}
              onRequestClose={() => setShowRejectModal(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalText}>Are you sure?</Text>
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={require("../assets/Logo2.png")}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => handleDelete()}
                  >
                    <Text style={styles.modalButtonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setShowRejectModal(false)}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
    paddingVertical: 10,
  },
  viewAllButton: {
    color: Color.colorWhite,
    fontSize: FontSize.size_sm,
  },
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
  skillsContainer: {
    marginTop: 10,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bulletPoint: {
    color: 'blue',
    fontSize: 20,
    marginRight: 5,
  },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
      },
    image: {
        width: 50,
        height: 50,
      },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  input: {
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    color: Color.colorSlateblue,
    textAlign: "center",
    fontWeight: "400",
  },
  modalButton: {
    backgroundColor: Color.colorSlateblue,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
  parent: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerPosition: {
    height: 81,
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
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
    width: "100%",
  },
  icons8Arrow241: {
    left: 13,
    width: 26,
    height: 24,
    top: 30,
    position: "absolute",
  },
  sectionIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 20,
    height: 20,
  },
  languageItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
  separator1: {
    height: 10,
    backgroundColor: "#ccc",
    marginVertical: 5,
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
  educationData: {
    fontSize: FontSize.size_sm,
    color: "black",
  },
  viewAllButtonContainer: {
    backgroundColor: Color.colorSlateblue,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  viewAllButton: {
    color: Color.colorWhite,
    fontSize: FontSize.size_mini,
  },
  sectionContainer: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
  },
  sectionTitle: {
    color: Color.colorSlateblue,
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    marginBottom: 2,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  profileHeader1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 10
  },
  profileImage: {
    borderRadius: 32,
    width: 64,
    height: 64,
  },
  profileImage1: {
    borderRadius: 32,
    width: 40,
    height: 40,
  },
  secondContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  profileTextContainer: {
    flex: 1,
    marginLeft: 5,
  },
  additionalImage: {
    width: 95,
    height: 18,
  },
  userName: {
    color: "black",
    fontSize: FontSize.size_xl,
    fontWeight: "700",
  },
  userName1: {
    color: "black",
    fontSize: FontSize.size_sm,
    fontWeight: "700",
  },
  userDetails: {
    fontWeight: "300",
    color: "black",
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.calibri,
  },
  userDetails1: {
    fontWeight: "300",
    color: "black",
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.calibri,
  },
  connections: {
    fontWeight: "600",
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.calibri,
    color: Color.colorSlateblue,
  },
  location: {
    color: "black",
    fontSize: FontSize.size_base,
    fontWeight: "700",
  },
});

export default MyTopicRequest;
