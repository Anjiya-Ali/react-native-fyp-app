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

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const ViewProposals = ( {route} ) => {
  const { additionalData } = route.params;

  const context = useContext(TopicRequestContext);
  const { ViewProposalsOfTopicRequest } = context;
  const [flag, setFlag] = useState(false);
  const [topicRequest, setTopicRequest] = useState([]);
  const [showReadMore, setShowReadMore] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false);
        const json = await ViewProposalsOfTopicRequest(additionalData);
        setTopicRequest(json.teacherBidInfo);
        setShowReadMore(new Array(json.teacherBidInfo.length).fill(false))
        setFlag(true);
      };

      fetchData();
    }, [])
  );

  const handleSelectProfilePicture = async (id) => {
    try {
        navigation.navigate("OtherProfilePage", {
            additionalData: id,
        })
    } catch (error) {
      console.error("Error selecting profile picture:", error.message);
    }
  };

  const handleReadMore = (index) => {
    const newShowReadMore = [...showReadMore];
    newShowReadMore[index] = !newShowReadMore[index];
    setShowReadMore(newShowReadMore);
  };  

  const navigation = useNavigation();

  const flexD = "column";
  const host = "http://helloworld-nodejs-4714.azurewebsites.net";

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const fetchData = async () => {
      const json = await ViewProposalsOfTopicRequest(additionalData);
      setTopicRequest(json.teacherBidInfo);
      setShowReadMore(new Array(json.teacherBidInfo.length).fill(false))
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

  return (
    <>
      {flag && (
        <View
          style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}
        >
          <Header heading="Proposals" navigate="MyTopicRequest" />
          <ScrollView
            style={{
              flex: 1,
              flexDirection: flexD,
              backgroundColor: "#d9d9d9",
            }} refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {topicRequest.length > 0 && (
              <ScrollView>
                {topicRequest.map((topic, index) => (
                  <>
                <View key={index}>
                <View style={styles.sectionContainer}>
                    <View style={styles.profileHeader}>
                    <TouchableOpacity onPress={() => handleSelectProfilePicture(topic.teacher_id)}>
                        <Image
                        style={styles.profileImage}
                        resizeMode="cover"
                        source={{
                            uri: `${host}/${topic.profile_picture}`,
                        }}
                        />
                    </TouchableOpacity>
                    <View style={styles.profileTextContainer}>
                        <Text style={styles.userName1}>
                        {topic.name}
                        </Text>
                        <Text style={styles.userDetails}>
                            {topic.bio}
                        </Text>
                    </View>
                    </View>
                    <View style={styles.secondContainer}>
                    <View style={styles.profileTextContainer}>
                        <Text style={styles.userDetails2}>
                            {topic.rate_per_hour}/hr
                        </Text>
                    </View>
                    <StarRating
                        rating={topic.rate}
                        starSize={25}
                    />
                    </View>
                    <View style={styles.sectionContainer1}>
                        <Text style={styles.userDetails}>{showReadMore[index] ? topic.proposal_description : topic.proposal_description.slice(0, 230) + (topic.proposal_description.length > 230 ? "..." : "")}</Text>
                        {topic.proposal_description.length > 230 && (
                            <TouchableOpacity onPress={() => handleReadMore(index)}>
                                <Text style={[{
                                    color: '#373eb2',
                                    fontSize: 12,
                                    fontWeight: "500",
                                    fontFamily: "Calibri",
                                }]}>
                                    {showReadMore[index] ? "Read Less" : "Read More..."}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ marginTop: 5, width: "100%", flexDirection: 'row', justifyContent: 'flex-end' }}>
    <TouchableOpacity
        onPress={() => navigation.navigate('ConversationsWithMessages')} 
        style={styles.viewAllButtonContainer}
    >
        <Text style={styles.viewAllButton}>  Message  </Text> 
    </TouchableOpacity>
</View>

                </View>
                </View>
                  </>
                ))}
              </ScrollView>
            )}
            {topicRequest.length === 0 && (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require("../assets/image-18.png")}
                  style={styles.imageStyle}
                />
                <Text style={{ color: 'blue', fontSize: 25, fontWeight: "bold" }}>NO PROPOSALS</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  viewAllButtonContainer: {
    backgroundColor: Color.colorSlateblue,
    borderRadius: 5,
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
  sectionContainer1: {
    backgroundColor: "#d9d9d9",
    padding: 10,
    borderRadius: 10
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
  userDetails2: {
    fontWeight: "bold",
    color: "black",
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.calibri,
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

export default ViewProposals;