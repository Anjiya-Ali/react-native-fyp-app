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
  TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { launchImageLibrary } from 'react-native-image-picker';
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import teacherProfileContext from "../context/TeacherProfile/teacherProfileContext";
import StarRating from "../components/StarRating";
import { useFocusEffect } from "@react-navigation/native";
import NotificationContext from "../context/Notifications/notificationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const TeacherProfilePage = () => {
  const context = useContext(teacherProfileContext);
  const { getTeacher, updateBio, addProfilePic } = context;
  const context1 = useContext(NotificationContext);
  const {
    CreateNotification
  } = context1;
  const [allEducations, setAllEducations] = useState([]);
  const [allExperiences, setAllExperiences] = useState([]);
  const [allCertifications, setAllCertifications] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [allHaw, setAllHaw] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [showUpdateBioModal, setShowUpdateBioModal] = useState(false);
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [initialBioSet, setInitialBioSet] = useState(false);
  const [flag, setFlag] = useState(false);
  const [teacherProfile, setTeacherProfile] =useState({})

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false)
        const json = await getTeacher();
        setTeacherProfile(json)
        setAllEducations(json.education || []);
        setAllExperiences(json.experience || []);
        setAllCertifications(json.certifications || []);
        setAllProjects(json.projects || []);
        setAllHaw(json.haw || []);
        setAllSkills(json.skills || []);
        setAllLanguages(json.languages || []);
        setAllFeedbacks(json.feedbacks || []);
        if (!initialBioSet) {
          setBio(json.bio);
          setInitialBioSet(true);
        }
        setFlag(true)
      };

      fetchData();
    }, [])
  );

  const handleLinkPress = async (link) => {
    if (await Linking.canOpenURL(link)) {
      await Linking.openURL(link);
    } else {
      console.warn('Cannot open the link');
    }
  }

  const handleUpdateBio = async (bio) => {
    try {
      setError(null);
      if(bio.length > 100 || bio.length < 4){
        setError("Bio should be of characters between 5-100");
          setTimeout(() => {
          setError(null);
          }, 3000);
          return;
      }
      else{
        setShowUpdateBioModal(false);
        setFlag(false)
        await updateBio(bio);
        const json = await getTeacher();
        setTeacherProfile(json)
        setAllEducations(json.education || []);
        setAllExperiences(json.experience || []);
        setAllCertifications(json.certifications || []);
        setAllProjects(json.projects || []);
        setAllHaw(json.haw || []);
        setAllSkills(json.skills || []);
        setAllLanguages(json.languages || []);
        setAllFeedbacks(json.feedbacks || []);
        if (!initialBioSet) {
          setBio(json.bio);
          setInitialBioSet(true);
        }
        userName = await AsyncStorage.getItem('name');
        id = await AsyncStorage.getItem('id');
        await CreateNotification(`Hi ${userName}! Your bio was updated.`, "TeacherProfilePage", "Bio Updated", id)
        setFlag(true)
      }
  } 
    catch (error) {
        setError("An error occurred while updating the bio. Please try again.");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
    };

    const handleSelectProfilePicture = async () => {
      try {
        const options = {
          title: 'Select Profile Picture',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
    
        const response = await launchImageLibrary(options);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error:', response.error);
        } else {
          setProfilePicture(response.assets[0]);
    
          // Move the profile picture upload logic here
          if (response.assets[0]) {
            const formData = new FormData();
            formData.append('profilePicture', {
              uri: response.assets[0].uri,
              type: response.assets[0].type,
              name: response.assets[0].fileName || 'profilePicture.jpg',
            });

            setFlag(false)
            await addProfilePic(formData);
            const json = await getTeacher();
            setTeacherProfile(json)
            setAllEducations(json.education || []);
            setAllExperiences(json.experience || []);
            setAllCertifications(json.certifications || []);
            setAllProjects(json.projects || []);
            setAllHaw(json.haw || []);
            setAllSkills(json.skills || []);
            setAllLanguages(json.languages || []);
            setAllFeedbacks(json.feedbacks || []);
            if (!initialBioSet) {
              setBio(json.bio);
              setInitialBioSet(true);
            }
            userName = await AsyncStorage.getItem('name');
            id = await AsyncStorage.getItem('id');
            await CreateNotification(`Hi ${userName}! Your profile picture was updated.`, "TeacherProfilePage", "Profile Pic Updated", id)
            setFlag(true)
          }
        }
      } catch (error) {
        console.error('Error selecting profile picture:', error.message);
      }
    };

  const navigation = useNavigation();

  const flexD = "column";
  const host = "http://helloworld-nodejs-4714.azurewebsites.net";

  return (
    <>
    {flag && (
      <View style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}>
      <Header heading="My Profile" navigate="TeacherHomePage" />
    <ScrollView
      style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}
    >
      <View style={styles.profileHeader}>
      <TouchableOpacity onPress={handleSelectProfilePicture}>
        <Image
          style={styles.profileImage}
          resizeMode="cover"
          source={{ uri: `${host}/${teacherProfile.profile_picture}` }}
        />
        </TouchableOpacity>
        
        <View style={styles.profileTextContainer}>
          <Text style={styles.userName}>{teacherProfile.full_name}</Text>
          <TouchableOpacity
            onPress={() => setShowUpdateBioModal(true)}
          >
            <Text style={styles.userDetails}>{teacherProfile.bio}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.secondContainer}>
        <View style={styles.profileTextContainer}>
          <Text style={styles.location}>{teacherProfile.location}</Text>
          <Text style={styles.connections}>
            {teacherProfile.total_connections > 500
              ? `500+ Connections   ${teacherProfile.total_followers} Followers`
              : `${teacherProfile.total_connections} Connections   ${teacherProfile.total_followers} Followers`}
          </Text>
        </View>
        <StarRating rating={teacherProfile.feedback} starSize={25} />
      </View>
      {allExperiences.length > 0 && (
        <View style={styles.sectionContainer}>
          <View style={styles.sectionIconsContainer}>
            <Text style={styles.sectionTitle}>Experiences</Text>
            <View style={styles.sectionIconsContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditExperienceScreenT", {
                    additionalData: allExperiences,
                  })
                }
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8pencil30-2.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddExperienceScreenT")}
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8plus30-1.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          {allExperiences.slice(0, 3).map((experience, index) => (
            <View key={index}>
              <View style={styles.languageItem}>
                <Text style={styles.languageName}>{experience.title}</Text>
                <Text style={styles.educationData}>{experience.company}</Text>
                <Text style={styles.educationData}>{experience.start_date}</Text>
                <Text style={styles.educationData}>{experience.end_date}</Text>
                <Text style={styles.languageLevel}>{experience.location}</Text>
              </View>
              {index < 2 && <View style={styles.separator} />}
            </View>
          ))}
          {allExperiences.length > 3 && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewAllExperiencesT", {
                  additionalData: allExperiences,
                  worth: true
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
            <View style={styles.sectionIconsContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditEducationScreenT", {
                    additionalData: allEducations,
                  })
                }
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8pencil30-2.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddEducationScreenT")}
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8plus30-1.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          {allEducations.slice(0, 3).map((education, index) => (
            <View key={index}>
              <View style={styles.languageItem}>
                <Text style={styles.languageName}>{education.degree}</Text>
                <Text style={styles.educationData}>{education.school}</Text>
                <Text style={styles.educationData}>{education.start_date}</Text>
                <Text style={styles.educationData}>{education.end_date}</Text>
                <Text style={styles.languageLevel}>{education.grade}</Text>
              </View>
              {index < 2 && <View style={styles.separator} />}
            </View>
          ))}
          {allEducations.length > 3 && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewAllEducationT", {
                  additionalData: allEducations,
                  worth: true
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
            <View style={styles.sectionIconsContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditCertificationScreenT", {
                    additionalData: allCertifications,
                  })
                }
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8pencil30-2.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddCertificationScreenT")}
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8plus30-1.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          {allCertifications.slice(0, 3).map((certificate, index) => (
            <View key={index}>
              <View style={styles.languageItem}>
                <Text style={styles.languageName}>{certificate.title}</Text>
                <Text style={styles.educationData}>{certificate.issuer}</Text>
                <TouchableOpacity onPress={() => handleLinkPress(certificate.link)}>
                    <Text style={styles.languageLevel}>{certificate.link}</Text>
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
                  worth: true
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
            <View style={styles.sectionIconsContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditProjectScreenT", {
                    additionalData: allProjects,
                  })
                }
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8pencil30-2.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddProjectScreenT")}
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8plus30-1.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          {allProjects.slice(0, 3).map((project, index) => (
            <View key={index}>
              <View style={styles.languageItem}>
                <Text style={styles.languageName}>{project.title}</Text>
                <Text style={styles.educationData}>{project.description}</Text>
                <Text style={styles.educationData}>{project.start_date}</Text>
                <Text style={styles.educationData}>{project.end_date}</Text>
                <TouchableOpacity onPress={() => handleLinkPress(project.link)}>
                    <Text style={styles.languageLevel}>{project.link}</Text>
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
                  worth: true
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
            <View style={styles.sectionIconsContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditHawScreenT", {
                    additionalData: allHaw,
                  })
                }
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8pencil30-2.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddHawScreenT")}
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8plus30-1.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          {allHaw.slice(0, 3).map((haw, index) => (
            <View key={index}>
              <View style={styles.languageItem}>
                <Text style={styles.languageName}>{haw.title}</Text>
                <Text style={styles.educationData}>{haw.issuer}</Text>
                <Text style={styles.languageLevel}>{haw.issue_date}</Text>
              </View>
              {index < 2 && <View style={styles.separator} />}
            </View>
          ))}
          {allHaw.length > 3 && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewAllHawT", {
                  additionalData: allHaw,
                  worth: true
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
            <View style={styles.sectionIconsContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditSkillScreenT", {
                    additionalData: allSkills,
                  })
                }
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8pencil30-2.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddSkillScreenT")}
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8plus30-1.png")}
                />
              </TouchableOpacity>
            </View>
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
                  worth: true
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
            <Text style={styles.sectionTitle}>Feedbacks</Text>
          </View>
          {allFeedbacks.slice(0, 3).map((feedback, index) => (
            <View key={index}>
              <View style={styles.profileHeader1}>
              <TouchableOpacity onPress={() => navigation.navigate("OtherProfilePage", {
                    additionalData: feedback.feedbackProviderId,
                  })
                }>
                <Image
                    style={styles.profileImage}
                    resizeMode="cover"
                    source={{ uri: `${host}/${feedback.feedbackProviderProfilePicture}`}}
                />
              </TouchableOpacity>
                <View style={styles.profileTextContainer}>
                    <Text style={styles.location}>{feedback.feedbackProviderFullName}</Text>
                    <Text style={styles.educationData}>{feedback.feedback_text}</Text>
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
                  worth: true
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
            <View style={styles.sectionIconsContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditLanguageScreenT", {
                    additionalData: allLanguages,
                  })
                }
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8pencil30-2.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddLanguageScreenT")}
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8plus30-1.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          {allLanguages.slice(0, 3).map((language, index) => (
            <View key={index}>
              <View style={styles.languageItem}>
                <Text style={styles.languageName}>{language.name}</Text>
                <Text style={styles.languageLevel}>{language.level}</Text>
              </View>
              {index < 2 && <View style={styles.separator} />}
            </View>
          ))}
          {allLanguages.length > 3 && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ViewAllLanguagesT", {
                  additionalData: allLanguages,
                  worth: true
                })
              }
              style={styles.viewAllButtonContainer}
            >
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <Modal
          animationType="slide"
          transparent={true}
          visible={showUpdateBioModal}
          onRequestClose={() => setShowUpdateBioModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Update Bio</Text>
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}
              <TextInput placeholderTextColor="black" value={bio} onChangeText={(text) => setBio(text)} multiline={true} style = {styles.input}/>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleUpdateBio(bio)}
              >
                <Text style={styles.modalButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowUpdateBioModal(false)}
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
  input: {
    color: "black"
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
  profileHeader1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 5,
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

export default TeacherProfilePage;