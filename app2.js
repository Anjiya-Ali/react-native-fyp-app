import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import CourseState from "./context/Courses/courseState";
import CartState from "./context/Cart/cartState";
import SessionState from "./context/Sessions/sessionState";
import * as React from "react";
import { useEffect } from "react";
import Certificate from "./screens/Certificate";
import MyCourses from "./screens/MyCourses";
import ELearningPage from "./screens/ELearningPage";
import BuyCourseCart from "./screens/BuyCourseCart";
import BuyCourse from "./screens/BuyCourse";
import CoursesE1 from "./screens/CoursesE1";
import Cart4 from "./screens/Cart4";
import Cart3 from "./screens/Cart3";
import Feedback from "./screens/Feedback";
import Quiz from "./screens/Quiz";
import SingleCourse from "./screens/SingleCourse";
import HomePage1 from "./screens/HomePage1";
import TeacherHomePage from "./screens/TeacherHomePage";
import AdminHomePage from "./screens/AdminHomePage";
import StudentProfileState from "./context/StudentProfile/studentProfileState";
import TeacherProfileState from "./context/TeacherProfile/teacherProfileState";
import UserState from "./context/User/userState";
import JointAccountState from "./context/JointAccounts/JointAccountState";
import SocialHubState from "./context/SocialHub/SocialHubState";
import AddLanguageScreen from "./screens/AddLanguageScreen";
import AddInterestScreen from "./screens/AddInterestScreen";
import ViewAllLanguages from "./screens/ViewAllLanguages";
import ViewAllBadges from "./screens/ViewAllBadges";
import ViewAllCertifications from "./screens/ViewAllCertifications.js";
import ViewAllInterests from "./screens/ViewAllInterests";
import ViewAllEducation from "./screens/ViewAllEducation";
import EditInterestScreen from "./screens/EditInterestScreen";
import EditEducationScreen from "./screens/EditEducationScreen";
import EditLanguageScreen from "./screens/EditLanguageScreen";
import UpdateSingleInterestScreen from "./screens/UpdateSingleInterestScreen";
import UpdateSingleEducationScreen from "./screens/UpdateSingleEducationScreen";
import UpdateSingleLanguageScreen from "./screens/UpdateSingleLanguageScreen";
import AddEducationScreen from "./screens/AddEducationScreen";
import StudentProfilePage from "./screens/StudentProfilePage";
import TeacherProfilePage from "./screens/TeacherProfilePage";
import MyConnections from "./screens/MyConnections";
import MyFollowers from "./screens/MyFollowers";
import MyPendingConnections from "./screens/MyPendingConnections";
import Main from "./screens/Main";
import Section1Screen from "./screens/Section1Screen";
import Section2Screen from "./screens/Section2Screen";
import Section3Screen from "./screens/Section3Screen";
import OtherProfilePage from "./screens/OtherProfilePage";
import ViewAllExperiencesT from "./screens/ViewAllExperiencesT";
import ViewAllEducationT from "./screens/ViewAllEducationT";
import ViewAllCertificationsT from "./screens/ViewAllCertificationsT";
import ViewAllProjectsT from "./screens/ViewAllProjectsT";
import ViewAllHawT from "./screens/ViewAllHawT";
import ViewAllSkillsT from "./screens/ViewAllSkillsT";
import ViewAllFeedbacksT from "./screens/ViewAllFeedbacksT";
import ViewAllLanguagesT from "./screens/ViewAllLanguagesT";
import AddExperienceScreenT from "./screens/AddExperienceScreenT";
import AddEducationScreenT from "./screens/AddEducationScreenT";
import AddCertificationScreenT from "./screens/AddCertificationScreenT";
import AddProjectScreenT from "./screens/AddProjectScreenT";
import AddHawScreenT from "./screens/AddHawScreenT";
import AddLanguageScreenT from "./screens/AddLanguageScreenT";
import AddSkillScreenT from "./screens/AddSkillScreenT";
import EditLanguageScreenT from "./screens/EditLanguageScreenT";
import EditSkillScreenT from "./screens/EditSkillScreenT";
import Register from "./screens/Register";
import Register1 from "./screens/Register1";
import EmailVerification from "./screens/EmailVerification";
import CodeVerification from "./screens/CodeVerification";
import PasswordVerification from "./screens/PasswordVerification";
import EditProjectScreenT from "./screens/EditProjectScreenT";
import EditHawScreenT from "./screens/EditHawScreenT";
import EditCertificationScreenT from "./screens/EditCertificationScreenT";
import EditEducationScreenT from "./screens/EditEducationScreenT";
import EditExperienceScreenT from "./screens/EditExperienceScreenT";
import UpdateSingleExperienceScreenT from "./screens/UpdateSingleExperienceScreenT";
import UpdateSingleEducationScreenT from "./screens/UpdateSingleEducationScreenT";
import UpdateSingleCertificationScreenT from "./screens/UpdateSingleCertificationScreenT";
import UpdateSingleLanguageScreenT from "./screens/UpdateSingleLanguageScreenT";
import UpdateSingleProjectScreenT from "./screens/UpdateSingleProjectScreenT";
import UpdateSingleHawScreenT from "./screens/UpdateSingleHawScreenT";
import ViewMemberForJointAccount from "./screens/ViewMemberForJointAccount";
import WriteMessageForJointAccount from "./screens/WriteMessageForJointAccount";
import InviteSuccessful from "./screens/InviteSuccessful";
import MypendingInvitations from "./screens/MypendingInvitations";
import MyAcceptedInvitations from "./screens/MyAcceptedInvitations";
import ViewJointAccountRequests from "./screens/ViewJointAccountRequests";
import ViewSingleJointAccountRequest from "./screens/ViewSingleJointAccountRequest";
import StudentProfile from "./screens/StudentProfile";
import TeacherProfile from "./screens/TeacherProfile";
import MySessions from "./screens/MySessions";
import Toast from "react-native-toast-message";
import colors from "./src/styles/colors";
import Home from "./src/scenes/home";
import Viewer_Home from "./src/scenes/home/viewer";
import Speaker_Home from "./src/scenes/home/speaker";
import Meeting from "./src/scenes/ILS";
import { SCREEN_NAMES } from "./src/navigators/screenNames";
import Orientation from "react-native-orientation-locker";
import CommunityPage from "./components/CommunityPage";
import CommunityState from "./context/Community/CommunityState";
import CommunityInit from "./components/CommunityInit";
import CommunityPostState from "./context/Posts/CommunityPostState";
import LikedMemberScreen from "./components/LikedMemberScreen";
import CommunityCommentState from "./context/CommunityComments/CommunityCommentsState";
import CommentsScreen from "./components/CommentsScreen";
import LikedMembersCommentsScreen from "./components/LikedMembersCommentsScreen";
import PostMembers from "./components/PostMembers";
import CreateCommunityPage from "./components/CreateCommunityPage";
import UpdateCommunityScreen from "./components/UpdateCommuityScreen";
import DeleteCommunityScreen from "./components/DeleteCommunityScreen";
import CreatePostPage from "./components/CreatePostPage";
import EditPostPage from "./components/EditPostPage";
import NewsFeedInit from "./components/NewsFeedInit";
import NewsFeedState from "./context/NewsFeed/NewsFeedState";
import PersonalPostState from "./context/PersonalPosts/PersonalPostState";
import PersonalPost from "./components/PersonalPost";
import CreateMyPostPage from "./components/CreateMyPostPage";
import LikedMyPostMemberScreen from "./components/LikedMyPostMemberScreen";
import MyCommentsScreen from "./components/MyCommentsScreen";
import MyCommentState from "./context/MyComments/MyCommentsState";
import MyLikedMembersCommentsScreen from "./components/MyLikedMembersCommentsScreen";
import EditMyPost from "./components/EditMyPost";
import CommunityMembersRendering from "./components/CommunityMembersRendering.js";

import AdminState from "./context/Admin/AdminState";
import TopicRequestState from "./context/TopicRequest/TopicRequestState";
import ManageStudents from "./screens/ManageStudents";
import ManageTeachers from "./screens/ManageTeachers";
import MyTopicRequest from "./screens/MyTopicRequest";
import CreateTopicRequest from "./screens/CreateTopicRequest";
import ViewProposals from "./screens/ViewProposals";
import MyProposals from "./screens/MyProposals";
import ViewSingleProposal from "./screens/ViewSingleProposal";
import MyRequestedProposals from "./screens/MyRequestedProposals";
import MyActiveProposals from "./screens/MyActiveProposals";
import MyClosedProposals from "./screens/MyClosedProposals";
import EndContract from "./screens/EndContract";
import AcceptProposal from "./screens/AcceptProposal";
import ProposalConfirmation from "./screens/ProposalConfirmation";
import JobPosts from "./screens/JobPosts";
import SingleJobPost from "./screens/SingleJobPost";
import ApplyTopicRequest from "./screens/ApplyTopicRequest";
import BidSuccessful from "./screens/BidSuccessful";
import TeacherProposals from "./screens/TeacherProposals";
import ViewSingleProposalT from "./screens/ViewSingleProposalT";
import MyRequestedProposalsT from "./screens/MyRequestedProposalsT";
import MyActiveProposalsT from "./screens/MyActiveProposalsT";
import MyClosedProposalsT from "./screens/MyClosedProposalsT";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import UpcomingSessions from "./screens/UpcomingSessions";
import FAQs from "./screens/FAQs";
import ElearnState from "./context/Elearn/ElearnState.js";
import NotificationState from "./context/Notifications/notificationState.js";
import CommunitySearch from "./components/CommunitySearch.js";
import CoursesSearch from "./components/CoursesSearch.js";
import Categories from "./components/Categories.js";
import ScheduledMeetings from "./components/ScheduledMeetings.js";
import ELearning from "./components/ELearning.js";
import AdminPayment from "./components/AdminPayment.js";
import Temporary from "./components/Temporary";
import Teachers from "./components/Teachers.js";
import MeetingSchedulingState from "./context/MeetingScheduling/MeetingSchedulingState.js";

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  LogBox.ignoreLogs(["Warning: ..."]);
  LogBox.ignoreAllLogs();

  useEffect(() => {
    const lockScreenOrientation = async () => {
      Orientation.lockToPortrait();
    };

    lockScreenOrientation();
  }, []);

  return (
    <>
      <NotificationState>
        <NewsFeedState>
          <PersonalPostState>
            <MyCommentState>
              <CommunityState>
                <CommunityPostState>
                  <CommunityCommentState>
                    <SocialHubState>
                      <StudentProfileState>
                        <TeacherProfileState>
                          <AdminState>
                            <TopicRequestState>
                              <JointAccountState>
                                <UserState>
                                  <CourseState>
                                    <CartState>
                                      <SessionState>
                                        <ElearnState>
                                          <MeetingSchedulingState>
                                            <NavigationContainer>
                                              {hideSplashScreen ? (
                                                <Stack.Navigator
                                                  screenOptions={{
                                                    headerShown: false,
                                                  }}
                                                >
                                                  <Stack.Screen
                                                    name="Main"
                                                    component={Main}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="CommunityMembersRendering"
                                                    component={
                                                      CommunityMembersRendering
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyConnections"
                                                    component={MyConnections}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewMemberForJointAccount"
                                                    component={
                                                      ViewMemberForJointAccount
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                    initialParams={{
                                                      additionalData:
                                                        "65c9cf45be893185551bd038",
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewJointAccountRequests"
                                                    component={
                                                      ViewJointAccountRequests
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="Section1Screen"
                                                    component={Section1Screen}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="Section2Screen"
                                                    component={Section2Screen}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="Section3Screen"
                                                    component={Section3Screen}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="Register"
                                                    component={Register}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="Register1"
                                                    component={Register1}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="EmailVerification"
                                                    component={
                                                      EmailVerification
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="PasswordVerification"
                                                    component={
                                                      PasswordVerification
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="CodeVerification"
                                                    component={CodeVerification}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="OtherProfilePage"
                                                    component={OtherProfilePage}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="TeacherProfilePage"
                                                    component={
                                                      TeacherProfilePage
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="StudentProfilePage"
                                                    component={
                                                      StudentProfilePage
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewSingleJointAccountRequest"
                                                    component={
                                                      ViewSingleJointAccountRequest
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MypendingInvitations"
                                                    component={
                                                      MypendingInvitations
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyAcceptedInvitations"
                                                    component={
                                                      MyAcceptedInvitations
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="WriteMessageForJointAccount"
                                                    component={
                                                      WriteMessageForJointAccount
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="InviteSuccessful"
                                                    component={InviteSuccessful}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyFollowers"
                                                    component={MyFollowers}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyPendingConnections"
                                                    component={
                                                      MyPendingConnections
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="UpdateSingleHawScreenT"
                                                    component={
                                                      UpdateSingleHawScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="UpdateSingleProjectScreenT"
                                                    component={
                                                      UpdateSingleProjectScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="UpdateSingleCertificationScreenT"
                                                    component={
                                                      UpdateSingleCertificationScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="UpdateSingleLanguageScreenT"
                                                    component={
                                                      UpdateSingleLanguageScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="UpdateSingleExperienceScreenT"
                                                    component={
                                                      UpdateSingleExperienceScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="UpdateSingleEducationScreenT"
                                                    component={
                                                      UpdateSingleEducationScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="EditExperienceScreenT"
                                                    component={
                                                      EditExperienceScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="EditEducationScreenT"
                                                    component={
                                                      EditEducationScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="EditCertificationScreenT"
                                                    component={
                                                      EditCertificationScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="EditHawScreenT"
                                                    component={EditHawScreenT}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="EditProjectScreenT"
                                                    component={
                                                      EditProjectScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="EditSkillScreenT"
                                                    component={EditSkillScreenT}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="EditLanguageScreenT"
                                                    component={
                                                      EditLanguageScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="AddProjectScreenT"
                                                    component={
                                                      AddProjectScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="AddSkillScreenT"
                                                    component={AddSkillScreenT}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="AddHawScreenT"
                                                    component={AddHawScreenT}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="AddLanguageScreenT"
                                                    component={
                                                      AddLanguageScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="AddExperienceScreenT"
                                                    component={
                                                      AddExperienceScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="AddCertificationScreenT"
                                                    component={
                                                      AddCertificationScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="AddEducationScreenT"
                                                    component={
                                                      AddEducationScreenT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewAllHawT"
                                                    component={ViewAllHawT}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewAllLanguagesT"
                                                    component={
                                                      ViewAllLanguagesT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewAllFeedbacksT"
                                                    component={
                                                      ViewAllFeedbacksT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewAllSkillsT"
                                                    component={ViewAllSkillsT}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewAllExperiencesT"
                                                    component={
                                                      ViewAllExperiencesT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewAllCertificationsT"
                                                    component={
                                                      ViewAllCertificationsT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewAllProjectsT"
                                                    component={ViewAllProjectsT}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewAllEducationT"
                                                    component={
                                                      ViewAllEducationT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="AddLanguageScreen"
                                                    component={
                                                      AddLanguageScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="UpdateSingleLanguageScreen"
                                                    component={
                                                      UpdateSingleLanguageScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="EditLanguageScreen"
                                                    component={
                                                      EditLanguageScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="AddInterestScreen"
                                                    component={
                                                      AddInterestScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="UpdateSingleInterestScreen"
                                                    component={
                                                      UpdateSingleInterestScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="EditInterestScreen"
                                                    component={
                                                      EditInterestScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="AddEducationScreen"
                                                    component={
                                                      AddEducationScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="UpdateSingleEducationScreen"
                                                    component={
                                                      UpdateSingleEducationScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="EditEducationScreen"
                                                    component={
                                                      EditEducationScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewAllLanguages"
                                                    component={ViewAllLanguages}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewAllEducation"
                                                    component={ViewAllEducation}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewAllBadges"
                                                    component={ViewAllBadges}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewAllCertifications"
                                                    component={
                                                      ViewAllCertifications
                                                    }
                                                  />
                                                  <Stack.Screen
                                                    name="ViewAllInterests"
                                                    component={ViewAllInterests}
                                                  />
                                                  <Stack.Screen
                                                    name="HomePage1"
                                                    component={HomePage1}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="TeacherHomePage"
                                                    component={TeacherHomePage}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="AdminHomePage"
                                                    component={AdminHomePage}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MySessions"
                                                    component={MySessions}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name={SCREEN_NAMES.Home}
                                                    component={Home}
                                                  />
                                                  <Stack.Screen
                                                    name="StudentProfile"
                                                    component={StudentProfile}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyCourses"
                                                    component={MyCourses}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="TeacherProfile"
                                                    component={TeacherProfile}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="Certificate"
                                                    component={Certificate}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ELearningPage"
                                                    component={ELearningPage}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="BuyCourseCart"
                                                    component={BuyCourseCart}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="BuyCourse"
                                                    component={BuyCourse}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="Feedback"
                                                    component={Feedback}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="Cart4"
                                                    component={Cart4}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="Cart3"
                                                    component={Cart3}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="SingleCourse"
                                                    component={SingleCourse}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="Quiz"
                                                    component={Quiz}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="CoursesE1"
                                                    component={CoursesE1}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />

                                                  <Stack.Screen
                                                    name={
                                                      SCREEN_NAMES.Viewer_Home
                                                    }
                                                    component={Viewer_Home}
                                                    options={{
                                                      headerStyle: {
                                                        backgroundColor:
                                                          colors.primary["900"],
                                                      },
                                                      headerBackTitle: "Home",
                                                      headerTintColor: "#fff",
                                                      headerTitleStyle: {
                                                        fontWeight: "bold",
                                                      },
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name={
                                                      SCREEN_NAMES.Speaker_Home
                                                    }
                                                    component={Speaker_Home}
                                                    options={{
                                                      headerStyle: {
                                                        backgroundColor:
                                                          colors.primary["900"],
                                                      },
                                                      headerBackTitle: "Home",
                                                      headerTintColor: "#fff",
                                                      headerTitleStyle: {
                                                        fontWeight: "bold",
                                                      },
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name={SCREEN_NAMES.Meeting}
                                                    component={Meeting}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="Community"
                                                    component={CommunityPage}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyPosts"
                                                    component={PersonalPost}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="NewsFeedInit"
                                                    component={NewsFeedInit}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="CreateMyPost"
                                                    component={CreateMyPostPage}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="LikedMyPostMembers"
                                                    component={
                                                      LikedMyPostMemberScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyComments"
                                                    component={MyCommentsScreen}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyCommentsLikedMembers"
                                                    component={
                                                      MyLikedMembersCommentsScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="CreateCommunity"
                                                    component={
                                                      CreateCommunityPage
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="UpdateCommunity"
                                                    component={
                                                      UpdateCommunityScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="DeleteCommunity"
                                                    component={
                                                      DeleteCommunityScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="CommunityInit"
                                                    component={CommunityInit}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="CreatePost"
                                                    component={CreatePostPage}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="EditPost"
                                                    component={EditPostPage}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="EditMyPost"
                                                    component={EditMyPost}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="PostMembers"
                                                    component={PostMembers}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="LikedMembers"
                                                    component={
                                                      LikedMemberScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="CommunityComments"
                                                    component={CommentsScreen}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="CommunityCommentsLikedMembers"
                                                    component={
                                                      LikedMembersCommentsScreen
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />

                                                  <Stack.Screen
                                                    name="ManageStudents"
                                                    component={ManageStudents}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ManageTeachers"
                                                    component={ManageTeachers}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyTopicRequest"
                                                    component={MyTopicRequest}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="CreateTopicRequest"
                                                    component={
                                                      CreateTopicRequest
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewProposals"
                                                    component={ViewProposals}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyProposals"
                                                    component={MyProposals}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewSingleProposal"
                                                    component={
                                                      ViewSingleProposal
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyRequestedProposals"
                                                    component={
                                                      MyRequestedProposals
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyActiveProposals"
                                                    component={
                                                      MyActiveProposals
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyClosedProposals"
                                                    component={
                                                      MyClosedProposals
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="EndContract"
                                                    component={EndContract}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="AcceptProposal"
                                                    component={AcceptProposal}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ProposalConfirmation"
                                                    component={
                                                      ProposalConfirmation
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="JobPosts"
                                                    component={JobPosts}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="SingleJobPost"
                                                    component={SingleJobPost}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ApplyTopicRequest"
                                                    component={
                                                      ApplyTopicRequest
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="BidSuccessful"
                                                    component={BidSuccessful}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="TeacherProposals"
                                                    component={TeacherProposals}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="ViewSingleProposalT"
                                                    component={
                                                      ViewSingleProposalT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyRequestedProposalsT"
                                                    component={
                                                      MyRequestedProposalsT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyActiveProposalsT"
                                                    component={
                                                      MyActiveProposalsT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="MyClosedProposalsT"
                                                    component={
                                                      MyClosedProposalsT
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="PrivacyPolicy"
                                                    component={PrivacyPolicy}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="UpcomingSessions"
                                                    component={UpcomingSessions}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="FAQs"
                                                    component={FAQs}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="AdminPayment"
                                                    component={AdminPayment}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="Elearning"
                                                    component={ELearning}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="Categories"
                                                    component={Categories}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="CoursesSearch"
                                                    component={CoursesSearch}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                  <Stack.Screen
                                                    name="Teachers"
                                                    component={Teachers}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />

                                                  <Stack.Screen
                                                    name="CommunitySearch"
                                                    component={CommunitySearch}
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />

                                                  <Stack.Screen
                                                    name="MeetingsScreen"
                                                    component={
                                                      ScheduledMeetings
                                                    }
                                                    options={{
                                                      headerShown: false,
                                                    }}
                                                  />
                                                </Stack.Navigator>
                                              ) : null}
                                            </NavigationContainer>
                                          </MeetingSchedulingState>
                                        </ElearnState>
                                      </SessionState>
                                    </CartState>
                                  </CourseState>
                                </UserState>
                              </JointAccountState>
                            </TopicRequestState>
                          </AdminState>
                        </TeacherProfileState>
                      </StudentProfileState>
                    </SocialHubState>
                  </CommunityCommentState>
                </CommunityPostState>
              </CommunityState>
            </MyCommentState>
          </PersonalPostState>
        </NewsFeedState>
      </NotificationState>
      <Toast />
    </>
  );
};
export default App;
