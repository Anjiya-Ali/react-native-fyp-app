import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import teacherProfileContext from "../context/TeacherProfile/teacherProfileContext";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const UpdateSingleCertificationScreenT = ({ route }) => {

  const { additionalData } = route.params;

  const context = useContext(teacherProfileContext);
  const [certificationUpdated, setCertificationUpdated] = useState();
  const [certificateTitle, setCertificateTitle] = useState(additionalData.title);
  const [certificateIssuer, setCertificateIssuer] = useState(additionalData.issuer);
  const [certificateLink, setCertificateLink] = useState(additionalData.link);
  const [error, setError] = useState(null);
  const { editCertification } = context;

  const handleUpdateCertification = async (id) => {
    try {
        setError(null);
        if (certificateTitle.trim() === "" || certificateIssuer.trim() === "" || certificateLink.trim() === "") {
            setError("Please provide complete and valid details.");
            setTimeout(() => {
              setError(null);
            }, 3000);
            return;
        }
        else{
            await editCertification(certificateTitle, certificateIssuer, certificateLink, id);
            setCertificationUpdated(true);
        }
    } catch (error) {
        setError("An error occurred while updating the certificate. Please try again.");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
    }
  }

  const navigation = useNavigation();

  useEffect(() => {
    if(certificationUpdated){
      navigation.navigate("TeacherProfilePage")
    }
  }, [certificationUpdated]);

  const flexD = "column";

  return (
    <ScrollView style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}>
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
      <View style={styles.container}>
        <Text style={styles.header}>Update Certification</Text>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Title</Text>
          <TextInput defaultValue={certificateTitle} placeholderTextColor="black"value={certificateTitle} onChangeText={(text) => setCertificateTitle(text)} style = {styles.input} multiline={true}/>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Issuer</Text>
          <TextInput defaultValue={certificateIssuer} placeholderTextColor="black"value={certificateIssuer} onChangeText={(text) => setCertificateIssuer(text)} style = {styles.input} multiline={true}/>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Link</Text>
          <TextInput defaultValue={certificateLink} placeholderTextColor="black"value={certificateLink} onChangeText={(text) => setCertificateLink(text)} multiline={true} style = {styles.input} />
        </View>
        <TouchableOpacity
          onPress={() => handleUpdateCertification(additionalData.id)}
          style={styles.viewAllButtonContainer}
        >
          <Text style={styles.viewAllButton}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    input: {
        color: "black"
      },
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
  viewAllButtonContainer: {
    backgroundColor: Color.colorSlateblue,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  viewAllButton: {
    color: Color.colorWhite,
    fontSize: FontSize.size_sm,
  },
  sectionTitle: {
    color: "black",
    fontSize: FontSize.size_lg,
    fontWeight: "700",
  },
  sectionContainer: {
    padding: 5,
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  parent: {
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  headerPosition: {
    height: 81,
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 16, // Add some padding for better spacing
    width: "100%", // Use 100% of the parent width
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
    width: "100%", // Use 100% of the parent width
  },
  icons8Arrow241: {
    left: 13,
    width: 26,
    height: 24,
    top: 30,
    position: "absolute",
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
    width: 25,
    height: 25,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
  },
  header: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});

export default UpdateSingleCertificationScreenT;