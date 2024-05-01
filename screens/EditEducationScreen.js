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
import studentProfileContext from "../context/StudentProfile/studentProfileContext";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const EditEducationScreen = ({ route }) => {

  const context = useContext(studentProfileContext);
  const { deleteEducation } = context;
  const { additionalData } = route.params;

  const [localEducations, setLocalEducations] = useState(additionalData);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [requestId, setRequestId] = useState();

  const navigation = useNavigation();
  const flexD = "column";

  const handleDeleteEducation = async (id) => {
    setRequestId(id)
    setShowRejectModal(true);
  };

  const handleDelete = async () => {
    await deleteEducation(requestId);
    setLocalEducations(localEducations.filter((education) => education.id !== requestId));
    setShowRejectModal(false);
  };

  const handleUpdateEducation = async (school, degree, start_date, end_date, grade, id) => {
    navigation.navigate("UpdateSingleEducationScreen", {
      additionalData: { school, degree, start_date, end_date, grade, id },
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
          onPress={() => navigation.navigate("StudentProfilePage")}
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
          <Text style={styles.sectionTitle}>Edit Educations</Text>
        </View>
        {localEducations.map((education, index) => (
          <View key={index}>
            <View style={styles.languageItem}>
              <Text style={styles.languageName}>{education.school}</Text>
              <Text style={styles.educationData}>{education.degree}</Text>
              <Text style={styles.educationData}>{education.start_date}</Text>
              <Text style={styles.educationData}>{education.end_date}</Text>
              <Text style={styles.languageLevel}>{education.grade}</Text>
            </View>
            <View style={styles.sectionIconsContainer}>
              <TouchableOpacity onPress={() => handleUpdateEducation(education.school, education.degree, education.start_date, education.end_date, education.grade, education.id)}>
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/icons8pencil30-2.png")}
                />
              </TouchableOpacity>
              { localEducations.length > 1 &&
                (
                  <TouchableOpacity onPress={() => handleDeleteEducation(education.id)}>
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

export default EditEducationScreen;