import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import jointAccountContext from "../context/JointAccounts/JointAccountContext";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationContext from "../context/Notifications/notificationContext";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const ViewJointAccountRequests = () => {
  const context1 = useContext(jointAccountContext);
  const {
    jointAccountRequests,
    getJointAccountRequests,
    acceptRequest,
    rejectRequest,
  } = context1;
  const [localRequests, setLocalRequests] = useState([]);
  const [requestId, setRequestId] = useState();
  const [teacherId, setTeacherId] = useState();
  const [flag, setFlag] = useState(false);
  const [lengthh, setLengthh] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const context2 = useContext(NotificationContext);
  const {
    CreateNotification
  } = context2;

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false);
        const json = await getJointAccountRequests();
        setLocalRequests(json.jointAccountRequestsInfo || []);
        setFilteredData(json.jointAccountRequestsInfo || []);
        if (json.jointAccountRequestsInfo) {
          setLengthh(json.jointAccountRequestsInfo.length);
        }
        setFlag(true);
      };

      fetchData();
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const fetchData = async () => {
      const json = await getJointAccountRequests();
      setLocalRequests(json.jointAccountRequestsInfo || []);
      setFilteredData(json.jointAccountRequestsInfo || []);
      if (json.jointAccountRequestsInfo) {
        setLengthh(json.jointAccountRequestsInfo.length);
      }
    };

    try {
      setRefreshing(true);
      fetchData();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  });

  const navigation = useNavigation();

  const flexD = "column";
  const host = "http://192.168.0.107:3000";

  const handleAcceptInvitation = async (jointAccountRequestId, teacherId) => {
    navigation.navigate("ViewSingleJointAccountRequest", {
      additionalData: jointAccountRequestId,
      additionalData1: teacherId,
    });
  };

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleAcceptRequest = (id, id1) => {
    setRequestId(id);
    setTeacherId(id1);
    setShowAcceptModal(true);
  };

  const handleRejectRequest = (id) => {
    setRequestId(id);
    setShowRejectModal(true);
  };

  const handleAcceptConfirmation = async (id) => {
    await acceptRequest(id);
    setLocalRequests(localRequests.filter((request) => request.id !== id));
    setLengthh(lengthh - 1);
    userName = await AsyncStorage.getItem('name');
    await CreateNotification(`${userName} has accepted your joint account request.`, "ViewJointAccountRequests", "New Joint Account", teacherId)
    setShowAcceptModal(false);
  };

  const handleRejectConfirmation = async (id) => {
    await rejectRequest(id);
    setLocalRequests(localRequests.filter((request) => request.id !== id));
    setLengthh(lengthh - 1);
    setShowRejectModal(false);
  };

  const handleSearch = (text) => {
    setSearchText(text);

    const filtered = localRequests.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(text.toLowerCase())
      )
    );

    setFilteredData(filtered);
  };

  return (
    <>
      {flag && (
        <View
          style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}
        >
          <Header heading="Joint Account Requests" navigate="TeacherHomePage" />
          {lengthh > 0 && (
            <>
              <SearchBar
                text="Search Here"
                value={searchText}
                onChangeText={handleSearch}
              />
            </>
          )}
          <ScrollView
            style={{
              flex: 1,
              flexDirection: flexD,
              backgroundColor: "#d9d9d9",
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {lengthh > 0 && (
              <ScrollView>
                {filteredData.map((connection, index) => (
                  <View key={index}>
                    <View style={styles.sectionContainer}>
                      <View style={styles.profileHeader}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("OtherProfilePage", {
                              additionalData: connection.id,
                            })
                          }
                        >
                          <Image
                            style={styles.profileImage}
                            resizeMode="cover"
                            source={{
                              uri: `${host}/${connection.profile_picture}`,
                            }}
                          />
                        </TouchableOpacity>
                        <View style={styles.profileTextContainer}>
                          <TouchableOpacity
                            onPress={() =>
                              handleAcceptInvitation(
                                connection.jointAccountRequestId,
                                connection.id
                              )
                            }
                          >
                            <Text style={styles.userName}>
                              {connection.courseName}
                            </Text>
                            <Text style={styles.userDetails1}>by</Text>
                            <Text style={styles.userDetails}>
                              {connection.name}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.separator} />
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingRight: 20,
                          paddingLeft: 20,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            handleAcceptRequest(
                              connection.jointAccountRequestId,
                              connection.id
                            )
                          }
                        >
                          <Text style={styles.acceptButtonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            handleRejectRequest(
                              connection.jointAccountRequestId
                            )
                          }
                        >
                          <Text style={styles.acceptButtonText}>Reject</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
            {lengthh === 0 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/image-18.png")}
                  style={styles.imageStyle}
                />
                <Text
                  style={{ color: "blue", fontSize: 25, fontWeight: "bold" }}
                >
                  NO JOINT ACCOUNT REQUESTS
                </Text>
              </View>
            )}
            <Modal
              animationType="slide"
              transparent={true}
              visible={showAcceptModal}
              onRequestClose={() => setShowAcceptModal(false)}
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
                    onPress={() => handleAcceptConfirmation(requestId)}
                  >
                    <Text style={styles.modalButtonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setShowAcceptModal(false)}
                  >
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

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
                    onPress={() => handleRejectConfirmation(requestId)}
                  >
                    <Text style={styles.modalButtonText}>Reject</Text>
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
        </View>
      )}
    </>
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
  acceptButtonText: {
    color: Color.colorSlateblue,
    fontSize: 16,
  },
  iconText: {
    fontSize: 12,
    color: "white",
    bottom: 4,
  },
  headerPosition: {
    height: 81,
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
    width: "100%",
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
    left: 13,
    width: 30,
    height: 29,
    top: 24,
    position: "absolute",
  },
  icon: {
    width: 25,
    height: 25,
  },
  icon1: {
    width: 25,
    height: 29,
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
  profileImage: {
    borderRadius: 32,
    width: 64,
    height: 64,
  },
  profileTextContainer: {
    flex: 1,
    marginLeft: 5,
  },
  userName: {
    color: "black",
    fontSize: FontSize.size_xl,
    fontWeight: "700",
  },
  userName1: {
    color: "white",
    fontSize: FontSize.size_base,
    textAlign: "center",
    position: "absolute",
    top: 60,
  },
  userDetails: {
    fontWeight: "500",
    color: "black",
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.calibri,
  },
  userDetails1: {
    fontWeight: "200",
    color: Color.colorSlateblue,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.calibri,
  },
});

export default ViewJointAccountRequests;
