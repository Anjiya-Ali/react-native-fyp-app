import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchForm from "../components/SearchForm";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import TeacherProfileContext from "../context/TeacherProfile/teacherProfileContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Menu from "../components/Menu";
import UserContext from "../context/User/userContext";
import TopicRequestContext from "../context/TopicRequest/TopicRequestContext";
import StarRating from "../components/StarRating";
import { useFocusEffect } from "@react-navigation/native";

const host = "http://helloworld-nodejs-4714.azurewebsites.net";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const LiveSessionItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item.meetingId)}>
      <View style={styles.liveSessionItem}>
        <Image
          style={styles.liveSessionImage}
          resizeMode="cover"
          source={{ uri: `${host}/${item.community_image}` }}
        />
        <View style={styles.liveSessionTextContainer}>
          <Text style={styles.liveSessionTitle}>{item.community_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TeacherHomePage = () => {
  const navigation = useNavigation();
  const Teachercontext = useContext(TeacherProfileContext);
  const { getTeacherProfilePicture } = Teachercontext;
  const user_context = useContext(UserContext);
  const { GetAllUsers } = user_context;
  const topic_request_context = useContext(TopicRequestContext);
  const {
    GetTeacherTopicRequest,
    GetRecommendedTeacherTopicRequest,
    GetPopularCommunities,
  } = topic_request_context;
  const [flag, setFlag] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [topicRequest, setTopicRequest] = useState([]);
  const [communities, setCommunities] = useState([]);
  const host = "http://helloworld-nodejs-4714.azurewebsites.net";
  const [filteredOrganizations, setFilteredOrganizations] = useState([
    {
      _id: 1,
      name: "Home",
      url: require("../assets/icons8-home-50.png"),
      screen: "TeacherHomePage",
    },
    {
      _id: 2,
      name: "Administrative Tools",
      url: require("../assets/administrativetool.png"),
      screen: "AdministrativeTools",
    },
    {
      _id: 4,
      name: "My Chats",
      url: require("../assets/icons8chats24-21.png"),
      screen: "ConversationsWithMessages",
    },
    {
      _id: 5,
      name: "Job Posts",
      url: require("../assets/icons8topic24-11.png"),
      screen: "JobPosts",
    },
    {
      _id: 6,
      name: "My Proposals",
      url: require("../assets/myproposal.png"),
      screen: "TeacherProposals",
    },
    {
      _id: 7,
      name: "My Connections",
      url: require("../assets/icons8connection80-11.png"),
      screen: "MyConnections",
    },
    {
      _id: 8,
      name: "My Posts",
      url: require("../assets/posts.png"),
      screen: "MyPosts",
    },
    {
      _id: 9,
      name: "Communities",
      url: require("../assets/icons8myspace350-11.png"),
      screen: "Community",
    },
    {
      _id: 10,
      name: "News Feed",
      url: require("../assets/newsfeed.png"),
      screen: "NewsFeedInit",
    },
    {
      _id: 11,
      name: "Scheduled Meetings",
      url: require("../assets/icons8schedule50-11.png"),
      screen: "MeetingsScreen",
    },
    {
      _id: 12,
      name: "My Sessions",
      url: require("../assets/icons8sessions32-11.png"),
      screen: "MySessions",
    },
    {
      _id: 13,
      name: "Joint Account Requests",
      url: require("../assets/icons8-user-account-50.png"),
      screen: "ViewJointAccountRequests",
    },
    {
      _id: 15,
      name: "Notifications",
      url: require("../assets/icons8notifications64-1.png"),
      screen: "Notifications",
    },
    {
      _id: 16,
      name: "Privacy Policy",
      url: require("../assets/icons8privacypolicy50-1.png"),
      screen: "PrivacyPolicy",
    },
    {
      _id: 17,
      name: "FAQs",
      url: require("../assets/icons8faq50-1.png"),
      screen: "FAQs",
    },
    {
      _id: 18,
      name: "Logout",
      url: require("../assets/icons8logoutroundedleft50-1.png"),
      screen: "Main",
    },
  ]);
  const [display, setDisplay] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false);

        const fetchProfilePicture = async () => {
          const response = await getTeacherProfilePicture();
          setProfilePictureUrl(`${host}/${response.profilePictureUrl}`);
        };

        const fetchUsers = async () => {
          const response = await GetAllUsers();
          setAllUsers(response.memberInfo);
        };

        const fetchTopicRequests = async () => {
          // const json = await GetTeacherTopicRequest();
          const json = await GetRecommendedTeacherTopicRequest();
          setTopicRequest(json.topicRequestInfo);
        };

        const fetchCommunities = async () => {
          const json = await GetPopularCommunities();
          setCommunities(json.communities);
        };

        fetchProfilePicture();
        fetchUsers();
        fetchTopicRequests();
        fetchCommunities();

        setFlag(true);
      };

      fetchData();
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const fetchProfilePicture = async () => {
      const response = await getTeacherProfilePicture();
      setProfilePictureUrl(`${host}/${response.profilePictureUrl}`);
    };

    const fetchUsers = async () => {
      const response = await GetAllUsers();
      setAllUsers(response.memberInfo);
    };

    const fetchTopicRequests = async () => {
      // const json = await GetTeacherTopicRequest();
      const json = await GetRecommendedTeacherTopicRequest();
      setTopicRequest(json.topicRequestInfo);
    };

    const fetchCommunities = async () => {
      const json = await GetPopularCommunities();
      setCommunities(json.communities);
    };

    try {
      setRefreshing(true);
      await fetchProfilePicture();
      await fetchUsers();
      await fetchTopicRequests();
      await fetchCommunities();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleViewAllJobs = () => {
    navigation.navigate("JobPosts");
  };

  const handleViewAllCommunity = () => {
    navigation.navigate("Community");
  };

  const handleSearch = (text) => {
    setSearchText(text);

    if (text === "") {
      setFilteredData([]);
    } else {
      const filtered = allUsers.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredData(filtered);
    }
  };

  const onClickHandler = () => {
    setDisplay(false);
  };

  const handleNavigation = async (screen) => {
    if (screen === "Main") {
      try {
        await AsyncStorage.removeItem("tokenn");
        await AsyncStorage.removeItem("role");
        await AsyncStorage.removeItem("id");
        await AsyncStorage.removeItem("name");
      } catch (error) {
        console.error("Error removing items from AsyncStorage:", error);
      }
    }
    navigation.navigate(screen);
    setDisplay(false);
  };

  return (
    <>
      {flag && (
        <View style={{ flex: 1, flexDirection: "column" }}>
          {display && (
            <Menu
              filteredOrganizations={filteredOrganizations}
              profilePictureUrl={profilePictureUrl}
              display={setDisplay}
              navigate="TeacherProfilePage"
            />
          )}

          <ScrollView
            style={{ flex: 1, backgroundColor: "white" }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.arrowContainer}
                onPress={() => navigation.navigate("TeacherProfilePage")}
              >
                <Image
                  style={styles.arrowIcon}
                  resizeMode="cover"
                  source={{ uri: profilePictureUrl }}
                />
              </TouchableOpacity>
              <SearchForm
                text="Search Here"
                value={searchText}
                onChangeText={handleSearch}
              />
              <TouchableOpacity onPress={() => setDisplay(!display)}>
                <Image
                  style={styles.hamburgerIcon}
                  resizeMode="cover"
                  source={require("../assets/hamburger1.png")}
                />
              </TouchableOpacity>
            </View>
            {filteredData.length > 0 && (
              <View style={styles.liveSessionsContainer}>
                <Text style={styles.liveSessionsTitle}>LearnLancers</Text>
                {filteredData.map((item) => (
                  <>
                    <View style={styles.profileHeader}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("OtherProfilePage", {
                            additionalData: item.id,
                          })
                        }
                      >
                        <Image
                          style={styles.profileImage}
                          resizeMode="cover"
                          source={{ uri: `${host}/${item.profile_picture}` }}
                        />
                      </TouchableOpacity>
                      <View style={styles.profileTextContainer}>
                        <Text style={styles.userName}>{item.name}</Text>
                        <Text style={styles.userDetails}>{item.bio}</Text>
                      </View>
                    </View>
                    <View style={styles.separator} />
                  </>
                ))}
              </View>
            )}
            {filteredData.length === 0 && (
              <>
                {topicRequest.length > 0 && (
                  <View style={styles.liveSessionsContainer}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text style={styles.liveSessionsTitle}>Job Posts</Text>
                      </View>
                      <TouchableOpacity onPress={handleViewAllJobs}>
                        <View>
                          <Text style={styles.viewAllJobs}>View All</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
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
                                    <Text style={styles.userDetails2}>
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
                                  <View style={styles.profileTextContainer1}>
                                    <StarRating
                                      rating={topic.rate}
                                      starSize={30}
                                    />
                                    <View style={styles.iconContainer}>
                                      <Image
                                        source={require("../assets/location.png")}
                                        style={styles.icon1}
                                      />
                                      <Text style={styles.location}>
                                        {topic.location}
                                      </Text>
                                    </View>
                                    <View style={styles.iconContainer}>
                                      <Image
                                        source={require("../assets/language.png")}
                                        style={styles.icon1}
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
                  </View>
                )}

                {communities.length > 0 && (
                  <View style={styles.liveSessionsContainer}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text style={styles.liveSessionsTitle}>
                          Popular Communities
                        </Text>
                      </View>
                      <TouchableOpacity onPress={handleViewAllCommunity}>
                        <View>
                          <Text style={styles.viewAllJobs}>View All</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      data={communities}
                      keyExtractor={(item) => item._id.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <LiveSessionItem
                          item={item}
                          onPress={() =>
                            navigation.navigate('CommunityInit',{id:item._id, community_name: item.community_name})
                          }
                        />
                      )}
                    />
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  liveSessionImage: {
    width: 230,
    height: 120,
    borderRadius: 10,
    marginBottom: 6,
  },
  liveSessionTextContainer: {
    padding: 5,
  },
  liveSessionTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  liveSessionTeacher: {
    textTransform: "capitalize",
    marginTop: 10,
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
  liveSessionItem: {
    width: 230,
    height: "auto",
    marginLeft: 10,
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: Color.colorSlateblue,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon1: {
    width: 20,
    height: 20,
    marginRight: 10,
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
    backgroundColor: "#d9d9d9",
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

  profileTextContainer1: {
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
  userDetails2: {
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
  liveSessionsContainer: {
    marginVertical: 10,
  },
  viewAllJobs: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: Color.colorSlateblue,
    marginRight: 22,
  },
  liveSessionsTitle: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginLeft: 22,
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow radius
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
  profileTextContainer: {
    flex: 1,
    marginLeft: 5,
  },
  userName: {
    color: "black",
    fontSize: FontSize.size_lg,
    fontWeight: "700",
  },
  userDetails: {
    fontWeight: "300",
    color: "black",
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.calibri,
  },
  profileImage: {
    borderRadius: 32,
    width: 55,
    height: 55,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 81,
    backgroundColor: Color.colorSlateblue,
    paddingHorizontal: 16,
    borderBottomRightRadius: Border.br_11xl,
    borderBottomLeftRadius: Border.br_11xl,
  },
  hamburgerIcon: {
    width: 25,
    height: 16,
  },
  heading: {
    fontSize: FontSize.size_xl,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorWhite,
  },
  arrowIcon: {
    borderRadius: 20,
    width: 40,
    height: 40,
  },
});

export default TeacherHomePage;