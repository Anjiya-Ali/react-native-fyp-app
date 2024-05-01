import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchForm from "../components/SearchForm";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import StudentProfileContext from "../context/StudentProfile/studentProfileContext";
import UserContext from "../context/User/userContext";
import SessionContext from "../context/Sessions/sessionContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "../src/api/api";
import { SCREEN_NAMES } from "../src/navigators/screenNames";
import Menu from "../components/Menu";
import CourseContext from "../context/Courses/courseContext";
import TopicRequestContext from "../context/TopicRequest/TopicRequestContext";
import { useFocusEffect } from "@react-navigation/native";
import StarRating from "../components/StarRating";

const host = "http://192.168.0.147:3000";

const LiveSessionItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item.meetingId)}>
      <View style={styles.liveSessionItem}>
        <Image
          style={styles.liveSessionImage}
          resizeMode="cover"
          source={{ uri: `${host}/${item.liveSessionImage}` }}
        />
        <View style={styles.liveSessionTextContainer}>
          <Text style={styles.liveSessionTitle}>{item.liveSessionTitle}</Text>
          <Text style={styles.liveSessionTeacher}>
            by {item.liveSessionTeacher}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const LiveSessionItem1 = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item._id)}>
      <View style={styles.liveSessionItem1}>
        <Image
          style={styles.liveSessionImage1}
          resizeMode="cover"
          source={{ uri: `${host}/${item.community_image}` }}
        />
        <View style={styles.liveSessionTextContainer1}>
          <Text style={styles.liveSessionTitle1}>{item.community_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const LiveSessionItem2 = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item._id)}>
      <View style={styles.liveSessionItem2}>
        <Image
          style={styles.liveSessionImage2}
          resizeMode="cover"
          source={{ uri: `${host}/${item.featured_image}` }}
        />
        <View style={styles.liveSessionTextContainer2}>
          <Text style={styles.liveSessionTitle2}>{item.title}</Text>
          <Text style={styles.liveSessionTeacher}>${item.fees}</Text>
          <StarRating rating={item.rating} starSize={25} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HomePage1 = () => {
  const navigation = useNavigation();

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

  const course_context = useContext(CourseContext);
  const { getUser, GetRecommendedCourses } = course_context;
  const context = useContext(StudentProfileContext);
  const { getProfilePicture } = context;
  const session_context = useContext(SessionContext);
  const { getLiveSessions } = session_context;
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [liveSessions, setLiveSessions] = useState([]);
  const [token, setToken] = useState("");
  const user_context = useContext(UserContext);
  const { GetAllUsers } = user_context;
  const [allUsers, setAllUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const topic_request_context = useContext(TopicRequestContext);
  const { GetPopularCommunities } = topic_request_context;
  const [communities, setCommunities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [flag, setFlag] = useState(false);

  const [filteredOrganizations, setFilteredOrganizations] = useState([
    {
      _id: 1,
      name: "Home",
      url: require("../assets/icons8-home-50.png"),
      screen: "HomePage1",
    },
    {
      _id: 2,
      name: "My Courses",
      url: require("../assets/icons8course50-1-11.png"),
      screen: "MyCourses",
    },
    {
      _id: 3,
      name: "My Chats",
      url: require("../assets/icons8chats24-21.png"),
      screen: "HomePage1",
    },
    {
      _id: 4,
      name: "My Posts",
      url: require("../assets/posts.png"),
      screen: "MyPosts",
    },
    {
      _id: 5,
      name: "My Topic Requests",
      url: require("../assets/icons8topic24-11.png"),
      screen: "MyTopicRequest",
    },
    {
      _id: 6,
      name: "Proposals",
      url: require("../assets/myproposal.png"),
      screen: "MyProposals",
    },
    {
      _id: 7,
      name: "My Connections",
      url: require("../assets/icons8connection80-11.png"),
      screen: "MyConnections",
    },
    {
      _id: 8,
      name: "News Feed",
      url: require("../assets/newsfeed.png"),
      screen: "NewsFeedInit",
    },
    {
      _id: 9,
      name: "Communities",
      url: require("../assets/icons8myspace350-11.png"),
      screen: "Community",
    },
    {
      _id: 10,
      name: "Elearning",
      url: require("../assets/icons8elearning64-11.png"),
      screen: "Elearning",
    },
    {
      _id: 11,
      name: "Scheduled Meetings",
      url: require("../assets/icons8schedule50-11.png"),
      screen: "MeetingsScreen",
    },
    {
      _id: 12,
      name: "Upcoming Sessions",
      url: require("../assets/icons8sessions32-11.png"),
      screen: "UpcomingSessions",
    },
    {
      _id: 13,
      name: "Cart",
      url: require("../assets/icons8cart24-11.png"),
      screen: "BuyCourseCart",
    },
    {
      _id: 14,
      name: "Notifications",
      url: require("../assets/icons8notifications64-1.png"),
      screen: "HomePage1",
    },
    {
      _id: 15,
      name: "Privacy Policy",
      url: require("../assets/icons8privacypolicy50-1.png"),
      screen: "PrivacyPolicy",
    },
    {
      _id: 16,
      name: "FAQs",
      url: require("../assets/icons8faq50-1.png"),
      screen: "FAQs",
    },
    {
      _id: 17,
      name: "Logout",
      url: require("../assets/icons8logoutroundedleft50-1.png"),
      screen: "Main",
    },
  ]);
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const fetchLiveSessions = async () => {
      const response = await getLiveSessions();
      const id = await AsyncStorage.getItem("id");
      const userData = await getUser(id);
      const name = userData.first_name + " " + userData.last_name;
      setName(name);
      if (response.liveSessions) {
        setLiveSessions(response.liveSessions);
      } else {
        setLiveSessions([]);
      }
      const token = await getToken();
      setToken(token);
    };

    const fetchUsers = async () => {
      const response = await GetAllUsers();
      setAllUsers(response.memberInfo);
    };

    const fetchCommunities = async () => {
      const json = await GetPopularCommunities();
      setCommunities(json.communities);
    };

    const fetchcourses = async () => {
      const json = await GetRecommendedCourses();
      setCourses(json.coursesWithLearningPosts);
    };

    try {
      setRefreshing(true);
      await fetchLiveSessions();
      await fetchUsers();
      await fetchCommunities();
      await fetchcourses();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false);

        const fetchProfilePicture = async () => {
          const response = await getProfilePicture();
          setProfilePictureUrl(`${host}/${response.profilePictureUrl}`);
        };

        const fetchLiveSessions = async () => {
          const response = await getLiveSessions();
          const id = await AsyncStorage.getItem("id");
          const userData = await getUser(id);
          const name = userData.first_name + " " + userData.last_name;
          setName(name);
          if (response.liveSessions) {
            setLiveSessions(response.liveSessions);
          }
          const token = await getToken();
          setToken(token);
        };

        const fetchUsers = async () => {
          const response = await GetAllUsers();
          setAllUsers(response.memberInfo);
        };

        const fetchCommunities = async () => {
          const json = await GetPopularCommunities();
          setCommunities(json.communities);
        };

        const fetchcourses = async () => {
          const json = await GetRecommendedCourses();
          setCourses(json.coursesWithLearningPosts);
        };

        fetchProfilePicture();
        fetchLiveSessions();
        fetchUsers();
        fetchCommunities();
        fetchcourses();

        setFlag(true);
      };

      fetchData();
    }, [])
  );

  const handleViewAllCommunity = () => {
    navigation.navigate("Community");
  };

  const handleViewAllCourses = () => {
    navigation.navigate("Categories"); //change it
  };

  const handleLiveSessionPress = (meetingId) => {
    navigation.navigate(SCREEN_NAMES.Home, {
      name: name,
      token: token,
      meetingId: meetingId,
    }); //name kahan se laun
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

  return (
    <>
      {flag && (
        <View style={{ flex: 1, flexDirection: "row" }}>
          {display && (
            <Menu
              filteredOrganizations={filteredOrganizations}
              profilePictureUrl={profilePictureUrl}
              display={setDisplay}
              navigate="StudentProfilePage"
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
                onPress={() => navigation.navigate("StudentProfilePage")}
              >
                {profilePictureUrl ? (
                  <Image
                    style={styles.arrowIcon}
                    resizeMode="cover"
                    source={{ uri: profilePictureUrl }}
                  />
                ) : null}
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
                {liveSessions.length > 0 && (
                  <View style={styles.liveSessionsContainer}>
                    <Text style={styles.liveSessionsTitle}>Live Sessions</Text>
                    <FlatList
                      data={liveSessions}
                      keyExtractor={(item) => item.meetingId.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <LiveSessionItem
                          item={item}
                          onPress={handleLiveSessionPress}
                        />
                      )}
                    />
                  </View>
                )}

                {courses.length > 0 && (
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
                          Courses for You
                        </Text>
                      </View>
                      <TouchableOpacity onPress={handleViewAllCourses}>
                        <View>
                          <Text style={styles.viewAllJobs}>View All</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      data={courses}
                      keyExtractor={(item) => item._id.toString()}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item }) => (
                        <LiveSessionItem2
                          item={item}
                          onPress={() =>
                            navigation.navigate("BuyCourse", { course_id: item._id, navigate: 'HomePage1' })
                          } //change it
                        />
                      )}
                    />
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
                        <LiveSessionItem1
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
  liveSessionImage2: {
    width: 230,
    height: 120,
    borderRadius: 10,
    marginBottom: 6,
  },
  liveSessionTextContainer2: {
    padding: 5,
  },
  liveSessionTitle2: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  liveSessionItem2: {
    width: 230,
    height: 225,
    marginLeft: 10,
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: Color.colorSlateblue,
  },
  viewAllJobs: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: Color.colorSlateblue,
    marginRight: 22,
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
  liveSessionsContainer: {
    marginVertical: 10,
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
    textShadowRadius: 2,
  },
  liveSessionImage1: {
    width: 230,
    height: 120,
    borderRadius: 10,
    marginBottom: 6,
  },
  liveSessionTextContainer1: {
    padding: 5,
  },
  liveSessionTitle1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  liveSessionItem1: {
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
    marginTop: 5,
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});

export default HomePage1;