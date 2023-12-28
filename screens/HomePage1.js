import React, { useState, useContext, useEffect, useCallback } from "react";
import { Text, StyleSheet, TouchableOpacity, View, Image, FlatList, ScrollView, TouchableHighlight, Dimensions, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchForm from "../components/SearchForm";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import StudentProfileContext from "../context/StudentProfile/studentProfileContext";
import SessionContext from "../context/Sessions/sessionContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from '../src/api/api';
import { SCREEN_NAMES } from '../src/navigators/screenNames';
import Menu from '../components/Menu'
import CourseContext from "../context/Courses/courseContext";

const host = "http://172.16.57.195:3000"

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
          <Text style={styles.liveSessionTeacher}>by {item.liveSessionTeacher}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HomePage1 = () => {
  const navigation = useNavigation();

  const handleNavigation = async (screen) => {
    if (screen === 'Main') {
      try {
        await AsyncStorage.removeItem('tokenn');
        await AsyncStorage.removeItem('role');
        await AsyncStorage.removeItem('id');
        await AsyncStorage.removeItem('name');
      } catch (error) {
        console.error('Error removing items from AsyncStorage:', error);
      }
    }
    navigation.navigate(screen);
    setDisplay(false);
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const fetchLiveSessions = async () => {
      const response = await getLiveSessions();
      const id = await AsyncStorage.getItem("id");
      const userData = await getUser(id);
      const name = userData.first_name + ' ' + userData.last_name;
      setName(name);
      if (response.liveSessions) {
        setLiveSessions(response.liveSessions);
      }
      else{
        setLiveSessions([]);
      }
      const token = await getToken();
      setToken(token);
    };

    try {
      setRefreshing(true);
      await fetchLiveSessions();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const course_context = useContext(CourseContext);
  const { getUser } = course_context;
  const context = useContext(StudentProfileContext);
  const { getProfilePicture } = context;
  const session_context = useContext(SessionContext);
  const { getLiveSessions } = session_context;
  const [profilePictureUrl, setProfilePictureUrl] = useState('')
  const [liveSessions, setLiveSessions] = useState([]);
  const [token, setToken] = useState('');
  const [filteredOrganizations, setFilteredOrganizations] = useState([
    {
      _id: 14,
      name: "Home",
      url: require("../assets/icons8-home-50.png"),
      screen: "HomePage1",
    },
    { _id: 1, name: 'My Courses', url: require("../assets/icons8course50-1-11.png"), screen: "MyCourses" },
    { _id: 2, name: 'My Chats', url: require("../assets/icons8chats24-21.png"), screen: "HomePage1" },
    { _id: 3, name: 'My Posts', url: require("../assets/icons8topic24-11.png"), screen: "HomePage1" },
    { _id: 4, name: 'My Connections', url: require("../assets/icons8connection80-11.png"), screen: "MyConnections" },
    {
      _id: 17,
      name: "News Feed",
      url: require("../assets/icons8myspace350-11.png"),
      screen: "NewsFeedInit",
    },
    { _id: 5, name: 'Communities', url: require("../assets/icons8myspace350-11.png"), screen: "Community" },
    { _id: 6, name: 'eLearning Page', url: require("../assets/icons8elearning64-11.png"), screen: "HomePage1" },
    { _id: 7, name: 'Scheduled Meetings', url: require("../assets/icons8schedule50-11.png"), screen: "HomePage1" },
    { _id: 8, name: 'Upcoming Sessions', url: require("../assets/icons8sessions32-11.png"), screen: "HomePage1" },
    { _id: 9, name: 'Cart', url: require("../assets/icons8cart24-11.png"), screen: "HomePage1" },
    { _id: 10, name: 'Notifications', url: require("../assets/icons8notifications64-1.png"), screen: "HomePage1" },
    { _id: 11, name: 'Privacy Policy', url: require("../assets/icons8privacypolicy50-1.png"), screen: "HomePage1" },
    { _id: 12, name: 'FAQs', url: require("../assets/icons8faq50-1.png"), screen: "HomePage1" },
    { _id: 13, name: 'Logout', url: require("../assets/icons8logoutroundedleft50-1.png"), screen: "Main" },
  ]);
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const response = await getProfilePicture();
      setProfilePictureUrl(`${host}/${response.profilePictureUrl}`);
    };

    const fetchLiveSessions = async () => {
      const response = await getLiveSessions();
      const id = await AsyncStorage.getItem("id");
      const userData = await getUser(id);
      const name = userData.first_name + ' ' + userData.last_name;
      setName(name);
      if (response.liveSessions) {
        setLiveSessions(response.liveSessions);
      }
      const token = await getToken();
      setToken(token);
    };

    fetchProfilePicture();
    fetchLiveSessions();

  });

  const handleLiveSessionPress = (meetingId) => {
    navigation.navigate(SCREEN_NAMES.Home, { name: name, token: token, meetingId: meetingId });   //name kahan se laun
  }

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {display && (
        <Menu filteredOrganizations={filteredOrganizations} profilePictureUrl={profilePictureUrl} display={setDisplay} navigate='StudentProfilePage' />
      )}

      <ScrollView style={{ flex: 1, backgroundColor: "white" }} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => navigation.navigate('StudentProfilePage')}
          >
            {profilePictureUrl ? (
              <Image style={styles.arrowIcon} resizeMode="cover" source={{ uri: profilePictureUrl }} />
            ) : null}
          </TouchableOpacity>
          <SearchForm />
          <TouchableOpacity onPress={() => setDisplay(!display)}>
            <Image style={styles.hamburgerIcon} resizeMode="cover" source={require("../assets/hamburger1.png")} />
          </TouchableOpacity>
        </View>
        <View style={styles.liveSessionsContainer}>
          <Text style={styles.liveSessionsTitle}>Live Sessions</Text>
          <FlatList
            data={liveSessions}
            keyExtractor={(item) => item.meetingId.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <LiveSessionItem item={item} onPress={handleLiveSessionPress} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 22,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow radius
  },

  liveSessionItem: {
    width: 140,
    height: 215,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: Color.colorSlateblue
  },
  liveSessionImage: {
    width: 150,
    height: 120,
    borderRadius: 10,
    marginBottom: 6,
  },
  liveSessionTextContainer: {
    padding: 5,
  },
  liveSessionTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  liveSessionTeacher: {
    textTransform: 'capitalize',
    marginTop: 10,
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default HomePage1;
