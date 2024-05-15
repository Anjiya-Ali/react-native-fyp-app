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
import TopicRequestContext from "../context/TopicRequest/TopicRequestContext";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const MyActiveProposals = () => {
  const context = useContext(TopicRequestContext);
  const { GetActiveProposals } = context;
  const [allProposals, setAllProposals] = useState([]);
  const [localProposals, setLocalProposals] = useState([]);
  const [flag, setFlag] = useState(false);
  const [lengthh, setLengthh] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false);
        const json = await GetActiveProposals();
        setAllProposals(json.proposalsInfo || []);
        setLocalProposals(json.proposalsInfo || []);
        setFilteredData(json.proposalsInfo || []);
        if (json.proposalsInfo) {
          setLengthh(json.proposalsInfo.length);
        }
        setFlag(true);
      };

      fetchData();
    }, [])
  );

  const handlViewSingleProposal = async (id) => {
    try {
      navigation.navigate("ViewSingleProposal", {
        additionalData: id,
      });
    } catch (error) {
      console.error("Error viewing single proposal:", error.message);
    }
  };

  const handleEndContract = async (
    id,
    profile_picture,
    name,
    email,
    teacher_id
  ) => {
    try {
      navigation.navigate("EndContract", {
        additionalData: { id, profile_picture, name, email, teacher_id },
      });
    } catch (error) {
      console.error("Error ending contract:", error.message);
    }
  };

  const navigation = useNavigation();

  const flexD = "column";
  const host = "http://helloworld-nodejs-4714.azurewebsites.net";

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const fetchData = async () => {
      const json = await GetActiveProposals();
      setAllProposals(json.proposalsInfo || []);
      setLocalProposals(json.proposalsInfo || []);
      setFilteredData(json.proposalsInfo || []);
      if (json.proposalsInfo) {
        setLengthh(json.proposalsInfo.length);
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

  const handleSearch = (text) => {
    setSearchText(text);

    const filtered = localProposals.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredData(filtered);
  };

  return (
    <>
      <Header heading="Proposals" navigate="HomePage1" />
      {flag && (
        <View
          style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}
        >
          {allProposals.length > 0 && (
            <>
              <Text style={styles.userName1}>You have {lengthh} proposals</Text>
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
            {allProposals.length > 0 && (
              <ScrollView>
                {filteredData.map((proposal, index) => (
                  <View key={index}>
                    <View style={styles.sectionContainer}>
                      <View
                        style={{
                          position: "absolute",
                          right: 2,
                          justifyContent: "flex-end",
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            padding: 5,
                            borderRadius: 10,
                            fontWeight: "bold",
                            backgroundColor:
                              proposal.status === "Requested"
                                ? "yellow"
                                : proposal.status === "Closed"
                                ? "red"
                                : proposal.status === "Active"
                                ? "green"
                                : "#dc3545",
                          }}
                        >
                          {proposal.status}
                        </Text>
                      </View>
                      <View style={styles.profileHeader}>
                        <View style={styles.profileTextContainer}>
                          <Text style={styles.userName}>{proposal.title}</Text>
                          <Text style={styles.userDetails}>
                            {proposal.description.slice(0, 100)} ...{" "}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.separator} />
                      <View
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            marginTop: 5,
                            marginLeft: 36,
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            justifyContent: "space-between",
                            marginRight: 36,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              handlViewSingleProposal(proposal.teacher_bid_id)
                            }
                            style={styles.viewAllButtonContainer}
                          >
                            <Text style={styles.viewAllButton}>
                              {" "}
                              View Proposal{" "}
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              handleEndContract(
                                proposal.teacher_bid_id,
                                proposal.teacher_dp,
                                proposal.teacher_name,
                                proposal.teacher_email,
                                proposal.teacher_id
                              )
                            }
                          >
                            <Text style={styles.acceptButtonText}>
                              End Contract
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            )}
            {localProposals.length === 0 && (
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
                  NO PROPOSALS
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
              onPress={() => navigation.navigate("MyProposals")}
            >
              <Image
                style={styles.ellipseImage}
                resizeMode="cover"
                source={require("../assets/eclipse2.png")}
              />
              <Text style={styles.iconText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.icons8Arrow2411, { left: windowWidth * 0.27 }]}
              onPress={() => navigation.navigate("MyRequestedProposals")}
            >
              <Image
                style={styles.ellipseImage}
                resizeMode="cover"
                source={require("../assets/eclipse2.png")}
              />
              <Text style={styles.iconText}>Requested</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.icons8Arrow2411, { left: windowWidth * 0.52 }]}
              onPress={() => navigation.navigate("MyActiveProposals")}
            >
              <Image
                style={styles.ellipseImage}
                resizeMode="cover"
                source={require("../assets/eclipse1.png")}
              />
              <Text style={styles.iconText}>Active</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.icons8Arrow2411, { left: windowWidth * 0.75 }]}
              onPress={() => navigation.navigate("MyClosedProposals")}
            >
              <Image
                style={styles.ellipseImage}
                resizeMode="cover"
                source={require("../assets/eclipse2.png")}
              />
              <Text style={styles.iconText}>Closed</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
    color: "red",
    fontSize: 16,
    marginTop: 2,
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

export default MyActiveProposals;