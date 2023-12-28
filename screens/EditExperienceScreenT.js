import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, Border } from "../GlobalStyles";
import teacherProfileContext from "../context/TeacherProfile/teacherProfileContext";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const EditExperienceScreenT = ({ route }) => {

  const context = useContext(teacherProfileContext);
  const { deleteExperience } = context;
  const { additionalData } = route.params;

  const [localExperience, setLocalExperience] = useState(additionalData);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [requestId, setRequestId] = useState();

  const navigation = useNavigation();
  const flexD = "column";

  const handleDeleteExperience = async (id) => {
    setRequestId(id)
    setShowRejectModal(true);
  };

  const handleDelete = async () => {
    await deleteExperience(requestId);
    setLocalExperience(localExperience.filter((experience) => experience.id !== requestId));
    setShowRejectModal(false);
  };

  const handleUpdateExperience = async (title, company, start_date, end_date, location, id) => {
    navigation.navigate("UpdateSingleExperienceScreenT", {
      additionalData: { title, company, start_date, end_date, location, id },
    })
  };

  return (
    <ScrollView
      style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}
    >
      <View style={[styles.headerPosition, { position: "relative" }]}>
        <View style={[styles.headerChild, { flex: 1, width: windowWidth }]} />
        <TouchableOpacity
          style={[styles.icons8Arrow241, { left: windowWidth * 0.035 }]}
          onPress={() => navigation.navigate("TeacherProfilePage")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/icons8arrow24-1.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionIconsContainer}>
          <Text style={styles.sectionTitle}>Edit Experiences</Text>
        </View>
        {localExperience.map((experience, index) => (
          <View key={index}>
            <View style={styles.languageItem}>
                <Text style={styles.languageName}>{experience.title}</Text>
                <Text style={styles.educationData}>{experience.company}</Text>
                <Text style={styles.educationData}>{experience.start_date}</Text>
                <Text style={styles.educationData}>{experience.end_date}</Text>
                <Text style={styles.languageLevel}>{experience.location}</Text>
            </View>
            <View style={styles.sectionIconsContainer}>
              <TouchableOpacity onPress={() => handleUpdateExperience(experience.title, experience.company, experience.start_date, experience.end_date, experience.location, experience.id)}>
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8pencil30-2.png")}
                />
              </TouchableOpacity>
              { localExperience.length > 1 &&
                (
                  <TouchableOpacity onPress={() => handleDeleteExperience(experience.id)}>
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8delete24-3.png")}
                />
                </TouchableOpacity>
                )
              }
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </View>
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
                onPress={() => handleDelete()}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    languageLevel: {
        fontSize: FontSize.size_sm,
        color: Color.colorSlateblue,
      },
  sectionIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  educationData: {
    fontSize: FontSize.size_sm,
    color: "black",
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
    width: 25,
    height: 25,
  },
  sectionIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  languageItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 10,
    paddingLeft: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 5,
    marginBottom: 10,
  },
  sectionTitle: {
    color: "black",
    fontSize: FontSize.size_2xl,
    paddingBottom: 10,
    paddingLeft: 5,
    fontWeight: "700",
  },
  sectionContainer: {
    padding: 5,
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  headerPosition: {
    height: 81,
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  headerChild: {
    borderBottomRightRadius: Border.br_11xl,
    borderBottomLeftRadius: Border.br_11xl,
    backgroundColor: Color.colorSlateblue,
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
});

export default EditExperienceScreenT;