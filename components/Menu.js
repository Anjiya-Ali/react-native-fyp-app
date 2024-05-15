import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import CourseContext from "../context/Courses/courseContext";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import userContext from "../context/User/userContext";


const Menu = ({ filteredOrganizations, profilePictureUrl, display, navigate }) => {
  const context = useContext(CourseContext);
  const { getUser } = context;
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const context1 = useContext(userContext);
    const {
        removeToken
    } = context1;

  const onClickHandler = () => {
    display(false);
  };

  const handleNavigation = async (screen) => {
    if (screen === "Main") {
      try {
        await removeToken();
        
        await AsyncStorage.removeItem("tokenn");
        await AsyncStorage.removeItem("role");
        await AsyncStorage.removeItem("id");
        await AsyncStorage.removeItem("name");

        CometChat.logout().then(
          () => {
            console.log("Logout completed successfully");
          }, error => {
            console.log("Logout failed with exception:", { error });
          }
        );
      } catch (error) {
        console.error("Error removing items from AsyncStorage:", error);
      }
    }
    navigation.navigate(screen);
    display(false);
  };

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const id = await AsyncStorage.getItem("id");
      const user = await getUser(id);
      setName(user.first_name + " " + user.last_name);
    };

    fetchProfilePicture();
  }, []);

  return (
    <View
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        height: Dimensions.get("window").height,
        width: "70%", // Adjust the width as needed
        backgroundColor: "#d9d9d9",
        padding: 20,
        zIndex: 100,
      }}
    >
      {/* Your side pane content */}
      <View style={{ display: "flex" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.arrowContainer}
            onPress={() => navigation.navigate(navigate)}
          >
            {profilePictureUrl ? (
              <Image
                style={styles.arrowIcon}
                resizeMode="cover"
                source={{ uri: profilePictureUrl }}
              />
            ) : null}
          </TouchableOpacity>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "black" }}>
            {name}
          </Text>
          <TouchableOpacity onPress={onClickHandler}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 900,
                color: Color.colorSlateblue,
              }}
            >
              X
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ borderBottomWidth: 1, marginTop: 10, marginBottom: 10 }}
        />
      </View>
      <ScrollView
        style={{ maxHeight: "70vh" }}
        showsVerticalScrollIndicator={false}
      >
        {filteredOrganizations.map((organization) => (
          <View
            style={{ borderRadius: 5, marginBottom: 10 }}
            key={organization._id}
          >
            <TouchableOpacity
              onPress={() => handleNavigation(organization.screen)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  margin: 5,
                }}
              >
                <Image
                  style={{ height: 30, width: 30 }}
                  resizeMode="cover"
                  source={organization.url}
                />
                <Text
                  style={{
                    color: "black",
                    fontSize: 20,
                    fontWeight: "bold",
                    marginLeft: 10,
                  }}
                >
                  {organization.name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  arrowIcon: {
    borderRadius: 20,
    width: 40,
    height: 40,
  },
});

export default Menu;
