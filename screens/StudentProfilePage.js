import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import studentProfileContext from "../context/StudentProfile/studentProfileContext";
import StarRating from "../components/StarRating";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { launchImageLibrary } from 'react-native-image-picker';
import NotificationContext from "../context/Notifications/notificationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const StudentProfilePage = () => {
  const context = useContext(studentProfileContext);
  const context1 = useContext(NotificationContext);
  const {
    CreateNotification
  } = context1;
  const { getStudent, updateBio, addProfilePic } = context;
  const [showUpdateBioModal, setShowUpdateBioModal] = useState(false);
  const [allInterests, setAllInterests] = useState([]);
  const [allEducations, setAllEducations] = useState([]);
  const [allCertifications, setAllCertifications] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [allBagdes, setAllBagdes] = useState([]);
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [initialBioSet, setInitialBioSet] = useState(false);
  const [flag, setFlag] = useState(false);
  const [userProfile, setUserProfile] =useState({})

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false)
        const json = await getStudent();
        setUserProfile(json);
        setAllInterests(json.interests || []);
        setAllEducations(json.education || []);
        setAllCertifications(json.certifications || []);
        setAllLanguages(json.languages || []);
        setAllBagdes(json.badges || []);
        if (!initialBioSet) {
          setBio(json.bio);
          setInitialBioSet(true);
        }
        setFlag(true)
      };

      fetchData();
    }, [])
  );

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
        const json = await getStudent();
        setUserProfile(json);
        setAllInterests(json.interests || []);
        setAllEducations(json.education || []);
        setAllCertifications(json.certifications || []);
        setAllLanguages(json.languages || []);
        setAllBagdes(json.badges || []);
        if (!initialBioSet) {
          setBio(json.bio);
          setInitialBioSet(true);
        }
        userName = await AsyncStorage.getItem('name');
        id = await AsyncStorage.getItem('id');
        await CreateNotification(`Hi ${userName}! Your bio was updated.`, "StudentProfilePage", "Bio Updated", id)
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
            const json = await getStudent();
            setUserProfile(json);
            setAllInterests(json.interests || []);
            setAllEducations(json.education || []);
            setAllCertifications(json.certifications || []);
            setAllLanguages(json.languages || []);
            setAllBagdes(json.badges || []);
            if (!initialBioSet) {
              setBio(json.bio);
              setInitialBioSet(true);
            }
            userName = await AsyncStorage.getItem('name');
            id = await AsyncStorage.getItem('id');
            await CreateNotification(`Hi ${userName}! Your profile picture was updated.`, "StudentProfilePage", "Profile Pic Updated", id)
            setFlag(true)
          }
        }
      } catch (error) {
        console.error('Error selecting profile picture:', error.message);
      }
    };    

  const navigation = useNavigation();

  const flexD = "column";
  const host = "http://192.168.0.147:3000";

  return (
    <>
    {flag && (
      <View style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}>
      <Header heading="My Profile" navigate="HomePage1" />
      <ScrollView
        style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}
      >
        <View style={styles.profileHeader}>
          <TouchableOpacity onPress={handleSelectProfilePicture}>
            <Image
              style={styles.profileImage}
              resizeMode="cover"
              source={{ uri: `${host}/${userProfile.profile_picture}` }}
            />
          </TouchableOpacity>
          <View style={styles.profileTextContainer}>
            <Text style={styles.userName}>{userProfile.full_name}</Text>
            <TouchableOpacity
              onPress={() => setShowUpdateBioModal(true)}
            >
              <Text style={styles.userDetails}>{userProfile.bio}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.secondContainer}>
          <View style={styles.profileTextContainer}>
            <Text style={styles.location}>{userProfile.location}</Text>
            <Text style={styles.connections}>
              {userProfile.total_connections > 500
                ? "500+ Connections"
                : `${userProfile.total_connections} Connections`}
            </Text>
          </View>
          <StarRating rating={userProfile.feedback} starSize={25} />
        </View>
        {allInterests.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionIconsContainer}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <View style={styles.sectionIconsContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("EditInterestScreen", {
                      additionalData: userProfile.interests,
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
                  onPress={() => navigation.navigate("AddInterestScreen")}
                >
                  <Image
                    style={styles.icon}
                    resizeMode="cover"
                    source={require("../assets/icons8plus30-1.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {allInterests.slice(0, 3).map((interest, index) => (
              <View key={index}>
                <View style={styles.languageItem}>
                  <Text style={styles.languageName}>{interest.title}</Text>
                  <Text style={styles.educationData}>{interest.description}</Text>
                </View>
                {index < 2 && <View style={styles.separator} />}
              </View>
            ))}
            {allInterests.length > 3 && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ViewAllInterests", {
                    additionalData: userProfile.interests,
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
                    navigation.navigate("EditEducationScreen", {
                      additionalData: userProfile.education,
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
                  onPress={() => navigation.navigate("AddEducationScreen")}
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
                  navigation.navigate("ViewAllEducation", {
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
            </View>
            {allCertifications.slice(0, 3).map((certificate, index) => (
              <View key={index}>
                <View style={styles.languageItem}>
                  <Text style={styles.languageName}>{certificate.title}</Text>
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
                    navigation.navigate("EditLanguageScreen", {
                      additionalData: userProfile.languages,
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
                  onPress={() => navigation.navigate("AddLanguageScreen")}
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
                  navigation.navigate("ViewAllLanguages", {
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

export default StudentProfilePage;