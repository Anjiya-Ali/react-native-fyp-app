import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import socialHubContext from "../context/SocialHub/SocialHubContext";
import NotificationContext from "../context/Notifications/notificationContext";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import SearchBar from "../components/SearchBar";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const MyPendingConnections = () => {
  const route = useRoute();

  const context = useContext(socialHubContext);
  const {
    getPendingConnections,
    pendingConnections,
    acceptRequest,
    privilege,
    rejectRequest,
  } = context;
  const context1 = useContext(NotificationContext);
  const {
    CreateNotification
  } = context1;
  const [allPendingConnections, setAllPendingConnections] = useState([]);
  const [localRequests, setLocalRequests] = useState([]);
  const [userPrivilege, setUserPrivilege] = useState("");
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [requestId, setRequestId] = useState();
  const [role, setRole] = useState("");
  const [flag, setFlag] = useState(false);
  const [lengthh, setLengthh] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleAcceptRequest = (id) => {
    setRequestId(id);
    setShowAcceptModal(true);
  };

  const handleRejectRequest = (id) => {
    setRequestId(id);
    setShowRejectModal(true);
  };

  const handleAcceptRequest1 = async (connectionId) => {
    await acceptRequest(connectionId);
    setFilteredData(
      filteredData.filter((request) => request.id !== connectionId)
    );
    setLengthh(lengthh - 1);
    setShowAcceptModal(false);
    userName = await AsyncStorage.getItem('name');
    await CreateNotification(`${userName} has accepted your friend request.`, "MyConnections", "New Connection", connectionId)
    navigation.navigate('MyConnections')
  };

  const handleRejectRequest1 = async (connectionId) => {
    await rejectRequest(connectionId);
    setFilteredData(
      filteredData.filter((request) => request.id !== connectionId)
    );
    setLengthh(lengthh - 1);
    setShowRejectModal(false);
    navigation.navigate('MyConnections')
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false);
        const json = await getPendingConnections();
        setAllPendingConnections(json.connections || []);
        setLocalRequests(json.connections || []);
        setUserPrivilege(json.privilege);
        setFilteredData(json.connections || []);
        if (json.connections) {
          setLengthh(json.connections.length);
        }
        setRole(await AsyncStorage.getItem("role"));
        setFlag(true);
      };

      fetchData();
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const fetchData = async () => {
      const json = await getPendingConnections();
      setAllPendingConnections(json.connections || []);
      setLocalRequests(json.connections || []);
      setUserPrivilege(json.privilege);
      setFilteredData(json.connections || []);
      if (json.connections) {
        setLengthh(json.connections.length);
      }
      setRole(await AsyncStorage.getItem("role"));
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

  const handleSearch = (text) => {
    setSearchText(text);

    const filtered = localRequests.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const navigation = useNavigation();

  const flexD = "column";
  const host = "http://helloworld-nodejs-4714.azurewebsites.net";

  return (
    <>
      {role === "Teacher" ? (
            <Header heading="My Pending Requests" navigate="TeacherHomePage" />
          ) : (
            <Header heading="My Pending Requests" navigate="HomePage1" />
      )}
      {flag && (
        <View
          style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}
        >
          {allPendingConnections.length > 0 && (
            <>
              <Text style={styles.userName1}>You have {lengthh} requests</Text>
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
            {localRequests.length > 0 && (
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
                          <Text style={styles.userName}>{connection.name}</Text>
                          <Text style={styles.userDetails}>
                            {connection.bio}
                          </Text>
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
                          onPress={() => handleAcceptRequest(connection.id)}
                        >
                          <Text style={styles.acceptButtonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleRejectRequest(connection.id)}
                        >
                          <Text style={styles.acceptButtonText}>Reject</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
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
                        onPress={() => handleAcceptRequest1(requestId)}
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
                        onPress={() => handleRejectRequest1(requestId)}
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
            )}
            {localRequests.length === 0 && (
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
                  NO PENDING REQUESTS
                </Text>
              </View>
            )}
          </ScrollView>
          <View style={[styles.headerPosition1, { position: "relative" }]}>
            <View
              style={[styles.headerChild1, { flex: 1, width: windowWidth }]}
            />
            <TouchableOpacity
              style={[styles.icons8Arrow2411, { left: windowWidth * 0.055 }]}
              onPress={() => navigation.navigate("MyConnections")}
            >
              <Image
                style={styles.icon1}
                resizeMode="cover"
                source={require("../assets/friendss.png")}
              />
              <Text style={styles.iconText}>Connections</Text>
            </TouchableOpacity>
            {userPrivilege === "Teacher" && (
              <TouchableOpacity
                style={styles.hamburgerIcon2}
                onPress={() => navigation.navigate("MyFollowers")}
              >
                <Image
                  resizeMode="cover"
                  source={require("../assets/follower.png")}
                  style={{ height: 33 }}
                />
                <Text style={styles.iconText}>Followers</Text>
              </TouchableOpacity>
            )}
          </View>
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
  iconText: {
    fontSize: 12,
    color: "white",
    bottom: 4,
  },
  acceptButtonText: {
    color: Color.colorSlateblue,
    fontSize: 16,
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
    left: windowWidth - 30,
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
    top: 20,
    left: 13,
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

export default MyPendingConnections;
