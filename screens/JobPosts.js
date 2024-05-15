import React, { useContext, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import StarRating from "../components/StarRating";
import TopicRequestContext from "../context/TopicRequest/TopicRequestContext";
import { useFocusEffect } from "@react-navigation/native";
import SearchBar from "../components/SearchBar";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const JobPosts = () => {
  const context = useContext(TopicRequestContext);
  const { GetTeacherTopicRequest } = context;
  const [flag, setFlag] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [topicRequest, setTopicRequest] = useState({});
  const [localTopicRequests, setLocalTopicRequests] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false);
        const json = await GetTeacherTopicRequest();
        setTopicRequest(json.topicRequestInfo);
        setLocalTopicRequests(json.topicRequestInfo);
        setFlag(true);
      };

      fetchData();
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const fetchData = async () => {
      const json = await GetTeacherTopicRequest();
      setTopicRequest(json.topicRequestInfo);
      setLocalTopicRequests(json.topicRequestInfo);
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

  const handleSearch = (text) => {
    setSearchText(text);

    const filtered = localTopicRequests.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(text.toLowerCase())
      )
    );

    setTopicRequest(filtered);
  };

  const navigation = useNavigation();

  const flexD = "column";
  const host = "http://helloworld-nodejs-4714.azurewebsites.net";

  return (
    <>
      <Header heading="Job Posts" navigate="TeacherHomePage" />
      {flag && (
        <View
          style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}
        >
          <SearchBar
            text="Search Here"
            value={searchText}
            onChangeText={handleSearch}
          />
          <ScrollView
            style={{
              flex: 1,
              flexDirection: flexD,
              backgroundColor: "#d9d9d9",
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {topicRequest.length > 0 && (
              <>
                {topicRequest.map((topic, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate("SingleJobPost", {
                        additionalData: topic.topic_request_id,
                      })
                    }
                  >
                    <View style={styles.sectionContainer}>
                      <View>
                        <View style={styles.languageItem}>
                          <View>
                            <Text style={styles.sectionTitle}>
                              {topic.title}
                            </Text>
                          </View>
                          <View>
                            <Text style={styles.userDetails}>
                              ${topic.rate_per_hour} Hourly - Posted on{" "}
                              {topic.initiated_date} - {topic.bid_count}{" "}
                              Proposals Sent
                            </Text>
                          </View>
                          <View>
                            <Text style={styles.userDetails1}>
                              {topic.description.slice(0, 150)} ...
                            </Text>
                          </View>
                        </View>
                        <View style={styles.secondContainer}>
                          <View style={styles.profileTextContainer}>
                            <StarRating rating={topic.rate} starSize={30} />
                            <View style={styles.iconContainer}>
                              <Image
                                source={require("../assets/location.png")}
                                style={styles.icon}
                              />
                              <Text style={styles.location}>
                                {topic.location}
                              </Text>
                            </View>
                            <View style={styles.iconContainer}>
                              <Image
                                source={require("../assets/language.png")}
                                style={styles.icon}
                              />
                              <Text style={styles.location}>
                                {topic.language}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
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
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  errorText: {
    color: "white",
    textAlign: "center",
  },
  skillsContainer: {
    marginTop: 10,
  },
  skillItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  bulletPoint: {
    color: "blue",
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
    color: "black",
    fontSize: FontSize.size_2xl,
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
    marginBottom: 10,
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
    marginTop: 10,
  },

  profileTextContainer: {
    flex: 1,
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    marginTop: 15,
    fontWeight: "300",
    color: "#888888",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.calibri,
  },
  userDetails1: {
    marginTop: 15,
    fontWeight: "300",
    color: "black",
    fontSize: FontSize.size_mini,
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

export default JobPosts;
