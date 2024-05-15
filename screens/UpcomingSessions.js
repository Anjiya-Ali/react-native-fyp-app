import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import sessionContext from "../context/Sessions/sessionContext";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import Header from "../components/Header";
import { TouchableOpacity } from "react-native";
import SearchBar from "../components/SearchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationContext from "../context/Notifications/notificationContext";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const UpcomingSessions = () => {
  const context = useContext(sessionContext);
  const { GetAllUpcomingSessions, AddInterestedSession } = context;
  const [allSessions, setAllSessions] = useState([]);
  const [localSessions, setLocalSessions] = useState([]);
  const [flag, setFlag] = useState(false);
  const [searchText, setSearchText] = useState("");
  const context1 = useContext(NotificationContext);
  const {
    CreateNotification
  } = context1;

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false);
        const json = await GetAllUpcomingSessions();
        setAllSessions(json || []);
        setLocalSessions(json || []);
        setFlag(true);
      };

      fetchData();
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const fetchData = async () => {
      const json = await GetAllUpcomingSessions();
      setAllSessions(json || []);
      setLocalSessions(json || []);
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
  const host = "http://helloworld-nodejs-4714.azurewebsites.net";

  const handleInterest = async (id, title) => {
    setFlag(false);
    await AddInterestedSession(id);
    const json = await GetAllUpcomingSessions();
    setAllSessions(json || []);
    setLocalSessions(json || []);
    id = await AsyncStorage.getItem('id');
    userName = await AsyncStorage.getItem('name');
    await CreateNotification(`Hi ${userName}! You have marked Session : ${title} as interested.`, "UpcomingSessions", "Interested Session", id)
    setFlag(true);
  };

  const handleSearch = (text) => {
    setSearchText(text);

    const filtered = localSessions.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(text.toLowerCase())
      )
    );

    setAllSessions(filtered);
  };

  const extractDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);

    // Extract date and time separately
    const date = dateTime.getDate();
    const month = dateTime.toLocaleString("default", { month: "long" });
    const year = dateTime.getFullYear();

    // Format the date as '27th Oct 2023'
    const formattedDate = `${date}${ordinalSuffix(date)} ${month} ${year}`;

    function ordinalSuffix(number) {
      const suffixes = ["th", "st", "nd", "rd"];
      const v = number % 100;
      return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
    }

    return formattedDate;
  };

  const extractTime = (dateTimeString) => {
    const timestamp = "2023-12-26T02:00:00.000+00:00";
    const userTimezone = "Asia/Karachi";
    const dateObject = new Date(dateTimeString);

    dateObject.setMinutes(
      dateObject.getMinutes() +
        dateObject.getTimezoneOffset() +
        (Intl.DateTimeFormat().resolvedOptions().timeZone === userTimezone
          ? 0
          : new Date().getTimezoneOffset())
    );

    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(dateObject);

    return formattedTime;
  };

  return (
    <>
      <Header heading="Upcoming Sessions" navigate="HomePage1" />
      {flag && (
        <>
          <View
            style={{
              flex: 1,
              flexDirection: flexD,
              backgroundColor: "#d9d9d9",
            }}
          >
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
              {localSessions.length > 0 && (
                <ScrollView>
                  <SearchBar
                    text="Search Sessions"
                    value={searchText}
                    onChangeText={handleSearch}
                  />
                  {allSessions.map((session, index) => (
                    <View key={index}>
                      <View style={styles.sectionContainer}>
                        <View style={styles.container}>
                          <View style={styles.imageContainer1}>
                            <Image
                              style={styles.profileImage}
                              resizeMode="cover"
                              source={{
                                uri: `${host}/${session.liveSessionImage}`,
                              }}
                            />
                          </View>
                          <View style={styles.detailsContainer}>
                            <View style={styles.textContainer}>
                              <Text style={styles.userName}>
                                {session.liveSessionTitle} by{" "}
                                {session.liveSessionTeacher}
                              </Text>
                            </View>
                            <View style={styles.buttonAndDateTimeContainer}>
                              <Text style={styles.userDetails}>
                                {extractDate(session.day)}
                              </Text>
                              <Text style={styles.userDetails}>
                                {extractTime(session.day)}
                              </Text>
                              <TouchableOpacity
                                onPress={() => handleInterest(session.id, session.liveSessionTitle)}
                                style={[
                                  session.interested
                                    ? {
                                        backgroundColor: "lightgreen",
                                        opacity: 0.3,
                                      }
                                    : { backgroundColor: "lightblue" },
                                ]}
                                disabled={session.interested}
                              >
                                <Text style={styles.acceptButtonText}>
                                  Interested
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            alignItems: "center",
                          }}
                        ></View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}
              {localSessions.length === 0 && (
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
                    NO UPCOMING LIVE SESSIONS
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
  },
  imageContainer1: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    height: 150,
  },
  detailsContainer: {
    height: "auto",
    backgroundColor: "white",
    flexDirection: "row",
  },
  textContainer: {
    flex: 1 / 2,
    padding: 10,
  },
  buttonAndDateTimeContainer: {
    flex: 1 / 2,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
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
    color: "black",
    padding: 1,
    paddingLeft: 5,
    paddingRight: 2,
    fontSize: 16,
    margin: 2,
  },
  iconText: {
    fontSize: 12,
    color: "white",
    bottom: 4,
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
    left: 13,
    width: 30,
    height: 29,
    top: 27,
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
    // borderRadius: 32,
    width: "100%",
    height: "100%",
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

export default UpcomingSessions;
