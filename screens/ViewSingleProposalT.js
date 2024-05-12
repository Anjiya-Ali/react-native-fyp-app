import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import TopicRequestContext from "../context/TopicRequest/TopicRequestContext";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Header from "../components/Header";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const ViewSingleProposalT = ({ route }) => {
  const { additionalData } = route.params;

  const context = useContext(TopicRequestContext);
  const { ViewSingleProposalT } = context;
  const [proposals, setProposals] = useState([]);
  const [localProposals, setLocalProposals] = useState([]);
  const [flag, setFlag] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false);
        const json = await ViewSingleProposalT(additionalData);
        setProposals(json.proposalInfo || {});
        setLocalProposals(json.proposalInfo || {});
        setFlag(true);
      };

      fetchData();
    }, [])
  );

  const navigation = useNavigation();

  const flexD = "column";
  const host = "http://helloworld-nodejs-4714.azurewebsites.net";

  return (
    <>
      {flag && (
        <>
          <Header heading="Proposal Description" navigate="TeacherProposals" flag={false} />
          <View style={styles.container}>
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: `${host}/${proposals.teacher_dp}` }}
                style={styles.profileImage}
              />
            </View>
            <Image
              source={require("../assets/Logo2.png")}
              style={styles.logoImage}
            />
            <View style={styles.profileContainer}>
              <Image
                source={{ uri: `${host}/${proposals.student_dp}` }}
                style={styles.profileImage}
              />
            </View>
          </View>
          <View style={styles.myCommunities}>
            <View
              style={{
                width: "100%",
                height: 500,
                flex: 1,
                backgroundColor: "#373eb2",
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              }}
            >
              <View
                style={{
                  backgroundColor: "#373eb2",
                  flex: 1 / 8,
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "800",
                    fontFamily: "Inter-ExtraBold",
                    color: "#e4e3e3",
                    paddingBottom: 2,
                  }}
                >
                  {proposals.teacher_name}'s Proposal
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#d9d9d9",
                  flex: 7 / 8,
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  paddingTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Calibri",
                    color: "black",
                    marginRight: 5,
                    marginLeft: 10,
                  }}
                >
                  {proposals.description}
                </Text>
                <View style={styles.profileTextContainer}>
                  <Text style={styles.userDetails2}>
                    Rate per Hour: {proposals.rate_per_hour}/hr
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  profileContainer: {
    borderRadius: 50,
    overflow: "hidden",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  logoImage: {
    width: 50,
    height: 60,
  },
  userDetails2: {
    fontWeight: "bold",
    color: "black",
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.calibri,
  },
  myCommunities: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  ellipseImage: {
    width: 17,
    height: 17,
    marginHorizontal: 8,
  },
  viewAllButtonContainer: {
    backgroundColor: Color.colorSlateblue,
    alignItems: "center",
    borderRadius: 5,
    paddingVertical: 5,
  },
  viewAllButton: {
    color: Color.colorWhite,
    fontSize: FontSize.size_mini,
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
  acceptButtonText: {
    color: Color.colorSlateblue,
    fontSize: 16,
  },
  iconText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  headerPosition: {
    height: 100,
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerPosition1: {
    height: 71,
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerChild: {
    borderBottomRightRadius: Border.br_11xl,
    borderBottomLeftRadius: Border.br_11xl,
    backgroundColor: Color.colorSlateblue,
  },
  headerChild1: {
    borderTopRightRadius: Border.br_11xl,
    borderTopLeftRadius: Border.br_11xl,
    backgroundColor: Color.colorSlateblue,
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
  hamburgerIcon: {
    top: 33,
    left: windowWidth - 40,
    width: 25,
    height: 16,
    position: "absolute",
  },
  hamburgerIcon1: {
    top: 20,
    left: windowWidth - 70,
    width: 45,
    height: 20,
    position: "absolute",
    textAlign: "center",
    alignItems: "center",
  },
  hamburgerIcon2: {
    top: 20,
    width: 50,
    height: 20,
    position: "absolute",
    textAlign: "center",
    alignItems: "center",
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
  myCourses2: {
    fontSize: FontSize.size_mini,
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
  icons8Arrow2411: {
    top: 20,
    bottom: 100,
    width: 60,
    height: 25,
    position: "absolute",
    textAlign: "center",
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
  },
  icon1: {
    width: 25,
    height: 33,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
  sectionContainer: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  profileTextContainer: {
    marginTop: 8,
    alignItems: "center",
    flex: 1,
    marginLeft: 5,
  },
  userName: {
    color: "black",
    fontSize: FontSize.size_xl,
    fontWeight: "700",
  },
  userName1: {
    color: Color.colorSlateblue,
    fontSize: FontSize.size_base,
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    fontWeight: "bold",
  },
  userDetails: {
    fontWeight: "300",
    color: "black",
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.calibri,
  },
});

export default ViewSingleProposalT;