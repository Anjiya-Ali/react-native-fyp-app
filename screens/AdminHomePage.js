import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import AdminContext from "../context/Admin/AdminContext";
import CourseContext from "../context/Courses/courseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken } from "../src/api/api";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
} from "victory-native";
import Menu from "../components/Menu";

const host = "http://helloworld-nodejs-4714.azurewebsites.net";

const AdminHomePage = () => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const getUniqueUsersPerMonth = async () => {
      const response = await GetUniqueUsersPerMonth();
      const id = await AsyncStorage.getItem("id");
      const userData = await getUser(id);
      const name = userData.first_name + " " + userData.last_name;
      setName(name);
      if (response.users) {
        setUsers(response.users);
      }
      const token = await getToken();
      setToken(token);
    };

    const getRevenuePerMonth = async () => {
      const response = await GetRevenuePerMonth();
      if (response.revenue) {
        setRevenue(response.revenue);
      }
    };

    try {
      setRefreshing(true);
      await getUniqueUsersPerMonth();
      await getRevenuePerMonth();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  });

  const adminContext = useContext(AdminContext);
  const { GetUniqueUsersPerMonth, GetRevenuePerMonth } = adminContext;
  const course_context = useContext(CourseContext);
  const { getUser } = course_context;
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    "http://helloworld-nodejs-4714.azurewebsites.net/Uploads/ProfilePictures/Logo2.png"
  );
  const [users, setUsers] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [flag, setFlag] = useState(false);
  const [token, setToken] = useState("");
  const [filteredOrganizations, setFilteredOrganizations] = useState([
    {
      _id: 14,
      name: "Home",
      url: require("../assets/icons8-home-50.png"),
      screen: "AdminHomePage",
    },
    {
      _id: 1,
      name: "Manage Students",
      url: require("../assets/icons8connection80-11.png"),
      screen: "ManageStudents",
    },
    {
      _id: 2,
      name: "Manage Teachers",
      url: require("../assets/icons8connection80-11.png"),
      screen: "ManageTeachers",
    },
    {
      _id: 3,
      name: "Payments",
      url: require("../assets/icons8cart24-11.png"),
      screen: "AdminPayment",
    },
    {
      _id: 13,
      name: "Logout",
      url: require("../assets/icons8logoutroundedleft50-1.png"),
      screen: "Main",
    },
  ]);
  const [display, setDisplay] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const getUniqueUsersPerMonth = async () => {
      const response = await GetUniqueUsersPerMonth();
      const id = await AsyncStorage.getItem("id");
      const userData = await getUser(id);
      const name = userData.first_name + " " + userData.last_name;
      setName(name);
      if (response.users) {
        setUsers(response.users);
      }
      const token = await getToken();
      setToken(token);
    };

    const getRevenuePerMonth = async () => {
      const response = await GetRevenuePerMonth();
      if (response.revenue) {
        setRevenue(response.revenue);
      }
    };

    setFlag(false);

    getUniqueUsersPerMonth();
    getRevenuePerMonth();

    setFlag(true);
  }, []);

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {display && (
        <Menu
          filteredOrganizations={filteredOrganizations}
          profilePictureUrl={profilePictureUrl}
          display={setDisplay}
          navigate="AdminHomePage"
        />
      )}

      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => navigation.navigate("AdminHomePage")}
          >
            {profilePictureUrl ? (
              <Image
                style={styles.arrowIcon}
                resizeMode="cover"
                source={{ uri: profilePictureUrl }}
              />
            ) : null}
          </TouchableOpacity>
          <Text style={styles.heading}>Hello Admin</Text>
          <TouchableOpacity onPress={() => setDisplay(!display)}>
            <Image
              style={styles.hamburgerIcon}
              resizeMode="cover"
              source={require("../assets/hamburger1.png")}
            />
          </TouchableOpacity>
        </View>
        {flag && (
          <>
            <Text style={styles.liveSessionsTitle}>OverView</Text>
            {users.length > 0 && (
              <>
                <Text style={styles.liveSessionsTitle2}>Unique Number of Users Per Month</Text>
                <View style={styles.container}>
                  <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={{ x: 10 }}
                  >
                    <VictoryAxis
                      style={{
                        tickLabels: {
                          angle: 45,
                          fontSize: 10,
                          fill: "black",
                          dy: -5,
                          dx: 10,
                        },
                      }}
                      tickValues={users.map((user) => user.formattedDate)}
                    />
                    <VictoryAxis dependentAxis tickFormat={(tick) => tick} />
                    <VictoryBar
                      data={users}
                      x="formattedDate"
                      y="userCount"
                      style={{
                        data: { fill: Color.colorSlateblue },
                      }}
                    />
                  </VictoryChart>
                </View>
              </>
            )}
            {revenue.length > 0 && (
              <>
                <Text style={styles.liveSessionsTitle2}>Profit Gained Per Month</Text>
                <View style={styles.container}>
                  <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={{ x: 10 }}
                  >
                    <VictoryAxis
                      style={{
                        tickLabels: {
                          angle: 45,
                          fontSize: 10,
                          fill: "black",
                          dy: -5,
                          dx: 10,
                        },
                      }}
                      tickValues={revenue.map((user) => user.formattedDate)}
                    />
                    <VictoryAxis dependentAxis tickFormat={(tick) => tick} />
                    <VictoryBar
                      data={revenue}
                      x="formattedDate"
                      y="totalAmount"
                      style={{
                        data: { fill: Color.colorSlateblue },
                      }}
                    />
                  </VictoryChart>
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: FontSize.size_xl,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorWhite,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 10,
    margin: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 81,
    backgroundColor: Color.colorSlateblue,
    paddingHorizontal: 16,
    borderBottomRightRadius: Border.br_11xl,
    borderBottomLeftRadius: Border.br_11xl,
  },
  hamburgerIcon: {
    width: 25,
    height: 16,
  },
  heading: {
    fontSize: FontSize.size_xl,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorWhite,
  },
  arrowIcon: {
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  liveSessionsContainer: {
    marginVertical: 10,
  },

  liveSessionsTitle2: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginLeft: 22,
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow radius
  },

  liveSessionsTitle: {
    marginTop: 15,
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    marginLeft: 22,
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow radius
  },

  liveSessionItem: {
    width: 140,
    height: 215,
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: Color.colorSlateblue,
  },
  liveSessionImage: {
    width: 150,
    height: 120,
    borderRadius: 10,
    marginBottom: 6,
  },
  liveSessionTextContainer: {
    padding: 5,
  },
  liveSessionTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  liveSessionTeacher: {
    textTransform: "capitalize",
    marginTop: 10,
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
});

export default AdminHomePage;
