import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import socialHubContext from "../context/SocialHub/SocialHubContext";
import StarRating from "../components/StarRating";
import { useFocusEffect } from "@react-navigation/native";
import NotificationContext from "../context/Notifications/notificationContext";
import * as Animatable from "react-native-animatable";
const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const OtherProfilePage = ( {route} ) => {
  const { additionalData } = route.params;

  const context1 = useContext(socialHubContext);
  const {
    getOtherProfile,
    otherUserProfile,
    createConnection,
    acceptConnection,
    cancelRequest,
    removeConnection,
    cancelFollowing,
  } = context1;

  const context2 = useContext(NotificationContext);
  const {
    CreateNotification
  } = context2;

  const [loading, setLoading] = useState(false);
  const [allInterests, setAllInterests] = useState([]);
  const [allEducations, setAllEducations] = useState([]);
  const [allCertifications, setAllCertifications] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [allBagdes, setAllBagdes] = useState([]);
  const [statusBooll, setStatusBooll] = useState(false);
  const [privilege, setPrivilege] = useState(false);
  const [allExperiences, setAllExperiences] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [allHaw, setAllHaw] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [role, setRole] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [flag, setFlag] = useState(false);
  console.log("Hello1")
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false);
        setRole(await AsyncStorage.getItem('role'))
        const idd = await AsyncStorage.getItem('id')
        const json = await getOtherProfile(additionalData);
        setAllInterests(json.interests || []);
        setAllEducations(json.education || []);
        setAllCertifications(json.certifications || []);
        setAllLanguages(json.languages || []);
        setAllBagdes(json.badges || []);
        setAllExperiences(json.experience || []);
        setAllProjects(json.projects || []);
        setAllHaw(json.haw || []);
        setAllSkills(json.skills || []);
        setAllFeedbacks(json.feedbacks || []);
        if (json.statusBool) {
          setStatusBooll(json.statusBool.slice(0, -1));
        }
        if(idd === additionalData){
          setStatusBooll("Non")
        }
        setPrivilege(json.privilege);
        setFlag(true);
      };
      fetchData();
    }, [])
  );

  const navigation = useNavigation();

  const flexD = "column";
  const host = "http://helloworld-nodejs-4714.azurewebsites.net";

  const handleUnfollow = async () => {
    setShowRejectModal(false);
    await cancelFollowing(additionalData);
    await getOtherProfile(additionalData);
    setStatusBooll("Follow")
  };

  const handleFollow = async () => {
    await createConnection(additionalData);
    await getOtherProfile(additionalData);
    userName = await AsyncStorage.getItem('name');
    await CreateNotification(`${userName} has started following you.`, "MyFollowers", "New Follower", additionalData)
    setStatusBooll("Following")
  };

  const handleConnect = async () => {
    await createConnection(additionalData);
    await getOtherProfile(additionalData);
    userName = await AsyncStorage.getItem('name');
    await CreateNotification(`${userName} has sent you a friend request.`, "MyPendingConnections", "New Connection Request", additionalData)
    setStatusBooll("pending")
  };

  const handleWithdraw = async () => {
    setShowWithdrawModal(false);
    await cancelRequest(additionalData);
    await getOtherProfile(additionalData);
    setStatusBooll("Connect")
  };

  const handleUnfriend = async () => {
    setShowFriendModal(false);
    await removeConnection(additionalData);
    await getOtherProfile(additionalData);
    setStatusBooll("Connect")
  };

  const handleAccept = async () => {
    await acceptConnection(additionalData);
    await getOtherProfile(additionalData);
    userName = await AsyncStorage.getItem('name');
    await CreateNotification(`${userName} has accepted your freind request.`, "MyConnections", "New Connection", additionalData)
    setStatusBooll("Friend")
  };

  const handleConnection = (type) => {
    if (type === "Connect") {
      handleConnect();
    } else if (type === "Accept?") {
      handleAccept();
    } else if (type === "Pending") {
      setShowWithdrawModal(true);
    } else if (type === "Follow") {
      handleFollow();
    } else if (type === "Following") {
      setShowRejectModal(true);
    } else if (type === "Friend") {
      setShowFriendModal(true);
    }
  };

  const handleLinkPress = async (link) => {
    if (await Linking.canOpenURL(link)) {
      await Linking.openURL(link);
    } else {
      console.warn("Cannot open the link");
    }
  };

  return (
    <>
    {flag && (
      <View style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}>
        {role === 'Teacher' ? <Header heading="Interesting Profile?"/> : <Header heading="Interesting Profile?"/>}
      <ScrollView
      style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}
    >
      {privilege === "Student" && (
        <>
          {loading ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50%",
              }}
            >
              <Animatable.Image
                style={styles.logo}
                source={require("../assets/Logo2.png")}
                resizeMode="contain"
                animation="rotate"
                iterationCount="infinite"
                easing="linear"
                duration={1000}
              />
            </View>
          ) : (
            <>
              <View style={styles.profileHeader}>
                <Image
                  style={styles.profileImage}
                  resizeMode="cover"
                  source={{
                    uri: `${host}/${otherUserProfile.profile_picture}`,
                  }}
                />
                <View style={styles.profileTextContainer}>
                  <Text style={styles.userName}>
                    {otherUserProfile.full_name}
                  </Text>
                  <Text style={styles.userDetails}>{otherUserProfile.bio}</Text>
                </View>
              </View>
              <View style={styles.secondContainer}>
                <View style={styles.profileTextContainer}>
                  <Text style={styles.location}>
                    {otherUserProfile.location}
                  </Text>
                  <Text style={styles.connections}>
                    {otherUserProfile.total_connections > 500
                      ? "500+ Connections"
                      : `${otherUserProfile.total_connections} Connections`}
                  </Text>
                </View>
                <View>
                  <StarRating
                    rating={otherUserProfile.feedback}
                    starSize={25}
                  />
                  {statusBooll !== "Non" && (
                    <TouchableOpacity
                      style={styles.smallButton}
                      onPress={() => handleConnection(statusBooll)}
                    >
                      <Text style={styles.buttonText}>{statusBooll}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              {allInterests.length > 0 && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionIconsContainer}>
                    <Text style={styles.sectionTitle}>Interests</Text>
                  </View>
                  {allInterests.slice(0, 3).map((interest, index) => (
                    <View key={index}>
                      <View style={styles.languageItem}>
                        <Text style={styles.languageName}>
                          {interest.title}
                        </Text>
                        <Text style={styles.educationData}>
                          {interest.description}
                        </Text>
                      </View>
                      {index < 2 && <View style={styles.separator} />}
                    </View>
                  ))}
                  {allInterests.length > 3 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ViewAllInterests", {
                          additionalData: otherUserProfile.interests,
                          worth: false,
                        })
                      }
                      style={styles.viewAllButtonContainer}
                    >
                      <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {allEducations.length > 0 && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionIconsContainer}>
                    <Text style={styles.sectionTitle}>Educations</Text>
                  </View>
                  {allEducations.slice(0, 3).map((education, index) => (
                    <View key={index}>
                      <View style={styles.languageItem}>
                        <Text style={styles.languageName}>
                          {education.degree}
                        </Text>
                        <Text style={styles.educationData}>
                          {education.school}
                        </Text>
                        <Text style={styles.educationData}>
                          {education.start_date}
                        </Text>
                        <Text style={styles.educationData}>
                          {education.end_date}
                        </Text>
                        <Text style={styles.languageLevel}>
                          {education.grade}
                        </Text>
                      </View>
                      {index < 2 && <View style={styles.separator} />}
                    </View>
                  ))}
                  {allEducations.length > 3 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ViewAllEducation", {
                          additionalData: allEducations,
                          worth: false,
                        })
                      }
                      style={styles.viewAllButtonContainer}
                    >
                      <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {allCertifications.length > 0 && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionIconsContainer}>
                    <Text style={styles.sectionTitle}>Certifications</Text>
                  </View>
                  {allCertifications.slice(0, 3).map((certificate, index) => (
                    <View key={index}>
                      <View style={styles.languageItem}>
                        <Text style={styles.languageName}>
                          {certificate.title}
                        </Text>
                        <Text style={styles.languageLevel}>
                          {certificate.instructor}
                        </Text>
                      </View>
                      {index < 2 && <View style={styles.separator} />}
                    </View>
                  ))}
                  {allCertifications.length > 3 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ViewAllCertifications", {
                          additionalData: allCertifications,
                          worth: false,
                        })
                      }
                      style={styles.viewAllButtonContainer}
                    >
                      <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {allBagdes.length > 0 && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionIconsContainer}>
                    <Text style={styles.sectionTitle}>Badges</Text>
                  </View>
                  {allBagdes.slice(0, 3).map((badge, index) => (
                    <View key={index}>
                      <View style={styles.languageItem}>
                        <Text style={styles.languageName}>{badge.name}</Text>
                        <Text style={styles.languageLevel}>{badge.level}</Text>
                      </View>
                      {index < 2 && <View style={styles.separator} />}
                    </View>
                  ))}
                  {allBagdes.length > 3 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ViewAllBadges", {
                          additionalData: allBagdes,
                          worth: false,
                        })
                      }
                      style={styles.viewAllButtonContainer}
                    >
                      <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {allLanguages.length > 0 && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionIconsContainer}>
                    <Text style={styles.sectionTitle}>Languages</Text>
                  </View>
                  {allLanguages.slice(0, 3).map((language, index) => (
                    <View key={index}>
                      <View style={styles.languageItem}>
                        <Text style={styles.languageName}>{language.name}</Text>
                        <Text style={styles.languageLevel}>
                          {language.level}
                        </Text>
                      </View>
                      {index < 2 && <View style={styles.separator} />}
                    </View>
                  ))}
                  {allLanguages.length > 3 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ViewAllLanguages", {
                          additionalData: allLanguages,
                          worth: false,
                        })
                      }
                      style={styles.viewAllButtonContainer}
                    >
                      <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </>
          )}
        </>
      )}
      {privilege === "Teacher" && (
        <>
          {loading ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50%",
              }}
            >
              <Animatable.Image
                style={styles.logo}
                source={require("../assets/Logo2.png")}
                resizeMode="contain"
                animation="rotate"
                iterationCount="infinite"
                easing="linear"
                duration={1000}
              />
            </View>
          ) : (
            <>
              <View style={styles.profileHeader}>
                <Image
                  style={styles.profileImage}
                  resizeMode="cover"
                  source={{
                    uri: `${host}/${otherUserProfile.profile_picture}`,
                  }}
                />
                <View style={styles.profileTextContainer}>
                  <Text style={styles.userName}>
                    {otherUserProfile.full_name}
                  </Text>
                  <Text style={styles.userDetails}>{otherUserProfile.bio}</Text>
                </View>
              </View>
              <View style={styles.secondContainer}>
                <View style={styles.profileTextContainer}>
                  <Text style={styles.location}>
                    {otherUserProfile.location}
                  </Text>
                  <Text style={styles.connections}>
                    {otherUserProfile.total_connections > 500
                      ? `500+ Connections   ${otherUserProfile.total_followers} Followers`
                      : `${otherUserProfile.total_connections} Connections   ${otherUserProfile.total_followers} Followers`}
                  </Text>
                </View>
                <View>
                  <StarRating
                    rating={otherUserProfile.feedback}
                    starSize={25}
                  />
                  {statusBooll !== "Non" && (
                    <TouchableOpacity
                      style={styles.smallButton}
                      onPress={() => handleConnection(statusBooll)}
                    >
                      <Text style={styles.buttonText}>{statusBooll}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              {allExperiences.length > 0 && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionIconsContainer}>
                    <Text style={styles.sectionTitle}>Experiences</Text>
                  </View>
                  {allExperiences.slice(0, 3).map((experience, index) => (
                    <View key={index}>
                      <View style={styles.languageItem}>
                        <Text style={styles.languageName}>
                          {experience.title}
                        </Text>
                        <Text style={styles.educationData}>
                          {experience.company}
                        </Text>
                        <Text style={styles.educationData}>
                          {experience.start_date}
                        </Text>
                        <Text style={styles.educationData}>
                          {experience.end_date}
                        </Text>
                        <Text style={styles.languageLevel}>
                          {experience.location}
                        </Text>
                      </View>
                      {index < 2 && <View style={styles.separator} />}
                    </View>
                  ))}
                  {allExperiences.length > 3 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ViewAllExperiencesT", {
                          additionalData: allExperiences,
                          worth: false,
                        })
                      }
                      style={styles.viewAllButtonContainer}
                    >
                      <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {allEducations.length > 0 && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionIconsContainer}>
                    <Text style={styles.sectionTitle}>Educations</Text>
                  </View>
                  {allEducations.slice(0, 3).map((education, index) => (
                    <View key={index}>
                      <View style={styles.languageItem}>
                        <Text style={styles.languageName}>
                          {education.degree}
                        </Text>
                        <Text style={styles.educationData}>
                          {education.school}
                        </Text>
                        <Text style={styles.educationData}>
                          {education.start_date}
                        </Text>
                        <Text style={styles.educationData}>
                          {education.end_date}
                        </Text>
                        <Text style={styles.languageLevel}>
                          {education.grade}
                        </Text>
                      </View>
                      {index < 2 && <View style={styles.separator} />}
                    </View>
                  ))}
                  {allEducations.length > 3 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ViewAllEducation", {
                          additionalData: allEducations,
                          worth: false,
                        })
                      }
                      style={styles.viewAllButtonContainer}
                    >
                      <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {allCertifications.length > 0 && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionIconsContainer}>
                    <Text style={styles.sectionTitle}>Certifications</Text>
                  </View>
                  {allCertifications.slice(0, 3).map((certificate, index) => (
                    <View key={index}>
                      <View style={styles.languageItem}>
                        <Text style={styles.languageName}>
                          {certificate.title}
                        </Text>
                        <Text style={styles.educationData}>
                          {certificate.issuer}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleLinkPress(certificate.link)}
                        >
                          <Text style={styles.languageLevel}>
                            {certificate.link}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {index < 2 && <View style={styles.separator} />}
                    </View>
                  ))}
                  {allCertifications.length > 3 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ViewAllCertificationsT", {
                          additionalData: allCertifications,
                          worth: false,
                        })
                      }
                      style={styles.viewAllButtonContainer}
                    >
                      <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {allProjects.length > 0 && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionIconsContainer}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                  </View>
                  {allProjects.slice(0, 3).map((project, index) => (
                    <View key={index}>
                      <View style={styles.languageItem}>
                        <Text style={styles.languageName}>{project.title}</Text>
                        <Text style={styles.educationData}>
                          {project.description}
                        </Text>
                        <Text style={styles.educationData}>
                          {project.start_date}
                        </Text>
                        <Text style={styles.educationData}>
                          {project.end_date}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleLinkPress(project.link)}
                        >
                          <Text style={styles.languageLevel}>
                            {project.link}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {index < 2 && <View style={styles.separator} />}
                    </View>
                  ))}
                  {allProjects.length > 3 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ViewAllProjectsT", {
                          additionalData: allProjects,
                          worth: false,
                        })
                      }
                      style={styles.viewAllButtonContainer}
                    >
                      <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {allHaw.length > 0 && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionIconsContainer}>
                    <Text style={styles.sectionTitle}>Honors and Awards</Text>
                  </View>
                  {allHaw.slice(0, 3).map((haw, index) => (
                    <View key={index}>
                      <View style={styles.languageItem}>
                        <Text style={styles.languageName}>{haw.title}</Text>
                        <Text style={styles.educationData}>{haw.issuer}</Text>
                        <Text style={styles.languageLevel}>
                          {haw.issue_date}
                        </Text>
                      </View>
                      {index < 2 && <View style={styles.separator} />}
                    </View>
                  ))}
                  {allHaw.length > 3 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ViewAllHawT", {
                          additionalData: allHaw,
                          worth: false,
                        })
                      }
                      style={styles.viewAllButtonContainer}
                    >
                      <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {allSkills.length > 0 && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionIconsContainer}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                  </View>
                  {allSkills.slice(0, 6).map((skill, index) => (
                    <View key={index}>
                      <View style={styles.languageItem}>
                        <Text style={styles.languageName}>{skill.name}</Text>
                      </View>
                      {index < 5 && <View style={styles.separator} />}
                    </View>
                  ))}
                  {allSkills.length > 6 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ViewAllSkillsT", {
                          additionalData: allSkills,
                          worth: false,
                        })
                      }
                      style={styles.viewAllButtonContainer}
                    >
                      <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {allFeedbacks.length > 0 && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionIconsContainer}>
                    <Text style={styles.sectionTitle}>Languages</Text>
                  </View>
                  {allFeedbacks.slice(0, 3).map((feedback, index) => (
                    <View key={index}>
                      <View style={styles.profileHeader1}>
                        <Image
                          style={styles.profileImage}
                          resizeMode="cover"
                          source={{
                            uri: `${host}/${feedback.feedbackProviderProfilePicture}`,
                          }}
                        />
                        <View style={styles.profileTextContainer}>
                          <Text style={styles.location}>
                            {feedback.feedbackProviderFullName}
                          </Text>
                          <Text style={styles.educationData}>
                            {feedback.feedback_text}
                          </Text>
                        </View>
                      </View>
                      <StarRating rating={feedback.feedback} starSize={25} />
                      {index < 2 && <View style={styles.separator} />}
                    </View>
                  ))}
                  {allFeedbacks.length > 3 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ViewAllFeedbacksT", {
                          additionalData: allFeedbacks,
                          worth: false,
                        })
                      }
                      style={styles.viewAllButtonContainer}
                    >
                      <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {allLanguages.length > 0 && (
                <View style={styles.sectionContainer}>
                  <View style={styles.sectionIconsContainer}>
                    <Text style={styles.sectionTitle}>Languages</Text>
                  </View>
                  {allLanguages.slice(0, 3).map((language, index) => (
                    <View key={index}>
                      <View style={styles.languageItem}>
                        <Text style={styles.languageName}>{language.name}</Text>
                        <Text style={styles.languageLevel}>
                          {language.level}
                        </Text>
                      </View>
                      {index < 2 && <View style={styles.separator} />}
                    </View>
                  ))}
                  {allLanguages.length > 3 && (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ViewAllLanguages", {
                          additionalData: allLanguages,
                          worth: false,
                        })
                      }
                      style={styles.viewAllButtonContainer}
                    >
                      <Text style={styles.viewAllButton}>View All</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </>
          )}
        </>
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
              onPress={() => handleUnfollow()}
            >
              <Text style={styles.modalButtonText}>Unfollow</Text>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={showWithdrawModal}
        onRequestClose={() => showWithdrawModal(false)}
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
              onPress={() => handleWithdraw()}
            >
              <Text style={styles.modalButtonText}>Withdraw</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowWithdrawModal(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showFriendModal}
        onRequestClose={() => showFriendModal(false)}
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
              onPress={() => handleUnfriend()}
            >
              <Text style={styles.modalButtonText}>Unfriend</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowFriendModal(false)}
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
  loaderContainer: {
    flex: 1,
  },

  logo: {
    width: 100,
    height: 100,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
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
  profileHeader1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 5,
  },
  smallButton: {
    backgroundColor: "#353db0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
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
    width: 25,
    height: 25,
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
    fontSize: FontSize.size_xl,
    fontWeight: "700",
    marginBottom: 10,
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
  userDetails: {
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

export default OtherProfilePage;
