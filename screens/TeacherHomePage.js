import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchForm from "../components/SearchForm";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import TeacherProfileContext from "../context/TeacherProfile/teacherProfileContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Menu from "../components/Menu";

const TeacherHomePage = () => {
  const navigation = useNavigation();
  const Teachercontext = useContext(TeacherProfileContext);
  const { getTeacherProfilePicture } = Teachercontext;
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const host = "http://172.16.57.195:3000";
  const [filteredOrganizations, setFilteredOrganizations] = useState([
    {
      _id: 15,
      name: "Home",
      url: require("../assets/icons8-home-50.png"),
      screen: "TeacherHomePage",
    },
    {
      _id: 1,
      name: "Administrative Tools",
      url: require("../assets/icons8course50-1-11.png"),
      screen: "TeacherHomePage",
    },
    {
      _id: 16,
      name: "My Courses",
      url: require("../assets/icons8course50-1-11.png"),
      screen: "TeacherHomePage",
    },
    {
      _id: 2,
      name: "My Chats",
      url: require("../assets/icons8chats24-21.png"),
      screen: "TeacherHomePage",
    },
    {
      _id: 3,
      name: "Job Posts",
      url: require("../assets/icons8topic24-11.png"),
      screen: "TeacherHomePage",
    },
    {
      _id: 4,
      name: "My Connections",
      url: require("../assets/icons8connection80-11.png"),
      screen: "MyConnections",
    },
    {
      _id: 5,
      name: "My Posts",
      url: require("../assets/icons8myspace350-11.png"),
      screen: "TeacherHomePage",
  },
    {
      _id: 5,
      name: "Communities",
      url: require("../assets/icons8myspace350-11.png"),
      screen: "Community",
    },
    {
      _id: 17,
      name: "News Feed",
      url: require("../assets/icons8myspace350-11.png"),
      screen: "NewsFeedInit",
    },
    {
      _id: 7,
      name: "Scheduled Meetings",
      url: require("../assets/icons8schedule50-11.png"),
      screen: "TeacherHomePage",
    },
    {
      _id: 8,
      name: "My Sessions",
      url: require("../assets/icons8sessions32-11.png"),
      screen: "MySessions",
    },
    {
      _id: 9,
      name: "Joint Account Requests",
      url: require("../assets/icons8-user-account-50.png"),
      screen: "ViewJointAccountRequests",
    },
    {
      _id: 14,
      name: "Teachers for JA",
      url: require("../assets/icons8cart24-11.png"),
      screen: "ViewMemberForJointAccount",
    },
    {
      _id: 10,
      name: "Notifications",
      url: require("../assets/icons8notifications64-1.png"),
      screen: "TeacherHomePage",
    },
    {
      _id: 11,
      name: "Privacy Policy",
      url: require("../assets/icons8privacypolicy50-1.png"),
      screen: "TeacherHomePage",
    },
    {
      _id: 12,
      name: "FAQs",
      url: require("../assets/icons8faq50-1.png"),
      screen: "TeacherHomePage",
    },
    {
      _id: 13,
      name: "Logout",
      url: require("../assets/icons8logoutroundedleft50-1.png"),
      screen: "Main",
    },
  ]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const response = await getTeacherProfilePicture();
      setProfilePictureUrl(`${host}/${response.profilePictureUrl}`);
    };

    fetchProfilePicture();
  });

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
    <View style={{ flex: 1, flexDirection: "row" }}>
      {display && <Menu filteredOrganizations = {filteredOrganizations} profilePictureUrl = {profilePictureUrl} display={setDisplay} navigate='TeacherProfilePage'/>}
      <View style={{ flex: 1, backgroundColor: "white" }}>
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
          <SearchForm />
          <TouchableOpacity onPress={() => setDisplay(!display)}>
            <Image
              style={styles.hamburgerIcon}
              resizeMode="cover"
              source={require("../assets/hamburger1.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
