import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StudentProfileContext from "../context/StudentProfile/studentProfileContext";
import TeacherProfileContext from "../context/TeacherProfile/teacherProfileContext";
import Menu from "./Menu";
import { isNonNullExpression } from "typescript";

const host = "http://helloworld-nodejs-4714.azurewebsites.net";

const Header = ({ heading, navigate = null, flag = true, data={} }) => {
  const navigation = useNavigation();
  const [display, setDisplay] = useState(false);

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
      screen: "ConversationsWithMessages",
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
      screen: "Notifications",
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

  const [TeacherFilteredOrganizations, SetTeacherFilteredOrganizations] =
    useState([
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
        screen: "TeacherAdminTools",
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
        _id: 14,
        name: "Teachers for JA",
        url: require("../assets/teacherforJA.png"),
        screen: "ViewMemberForJointAccount",
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

    const [AdminFilteredOrganizations, SetAdminFilteredOrganizations] =
    useState([
      {
        _id: 14,
        name: "Home",
        url: require("../assets/icons8-home-50.png"),
        screen: "AdminHomePage",
      },
      { _id: 1, name: 'Manage Students', url: require("../assets/icons8connection80-11.png"), screen: "ManageStudents" },
      { _id: 2, name: 'Manage Teachers', url: require("../assets/icons8connection80-11.png"), screen: "ManageTeachers" },
      { _id: 3, name: 'Payments', url: require("../assets/icons8cart24-11.png"), screen: "AdminPayment" },
      { _id: 13, name: 'Logout', url: require("../assets/icons8logoutroundedleft50-1.png"), screen: "Main" },
    ]);

  const context = useContext(StudentProfileContext);
  const { getProfilePicture } = context;
  const context1 = useContext(TeacherProfileContext);
  const { getTeacherProfilePicture } = context1;
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [teacherProfilePictureUrl, setTeacherProfilePictureUrl] = useState("");
  const [adminProfilePictureUrl, setAdminProfilePictureUrl] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const role = await AsyncStorage.getItem("role");
      setRole(role);
      if(role === "Admin"){
        setAdminProfilePictureUrl('http://helloworld-nodejs-4714.azurewebsites.net/Uploads/ProfilePictures/Logo2.png')
      }
      else{
        const response = await getProfilePicture();
        setProfilePictureUrl(`${host}/${response.profilePictureUrl}`);

        const response1 = await getTeacherProfilePicture();
        setTeacherProfilePictureUrl(`${host}/${response1.profilePictureUrl}`);
      }
    };

    fetchProfilePicture();
  }, []);

  return (
    <>
      {display && role === 'Student' && (
        <Menu
          filteredOrganizations={filteredOrganizations}
          profilePictureUrl={profilePictureUrl}
          display={setDisplay}
          navigate='StudentProfilePage'
        />
      )}
      {display && role === 'Teacher' && (
        <Menu
          filteredOrganizations={TeacherFilteredOrganizations}
          profilePictureUrl={teacherProfilePictureUrl}
          display={setDisplay}
          navigate='TeacherProfilePage'
        />
      )}
      {display && role === 'Admin' && (
        <Menu
          filteredOrganizations={AdminFilteredOrganizations}
          profilePictureUrl={adminProfilePictureUrl}
          display={setDisplay}
          navigate='AdminHomePage'
        />
      )}
      <View style={styles.headerContainer}>
        {navigate ? (
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => navigation.navigate(navigate, data)}
          >
            {/* Content for TouchableOpacity when navigate is truthy */}
            <Image
              style={styles.arrowIcon}
              resizeMode="cover"
              source={require("../assets/icons8arrow24-1.png")}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => navigation.goBack()}
          >
            {/* Content for TouchableOpacity when navigate is falsy */}
            <Image
              style={styles.arrowIcon}
              resizeMode="cover"
              source={require("../assets/icons8arrow24-1.png")}
            />
          </TouchableOpacity>
        )}
  
        <Text style={styles.heading}>{heading}</Text>
        {flag && (
          <TouchableOpacity onPress={() => setDisplay(!display)}>
            <Image
              style={styles.hamburgerIcon}
              resizeMode="cover"
              source={require("../assets/hamburger1.png")}
            />
          </TouchableOpacity>
        )}
        {!flag && <Text></Text>}
      </View>
    </>
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
    width: 26,
    height: 24,
  },
});

export default Header;
