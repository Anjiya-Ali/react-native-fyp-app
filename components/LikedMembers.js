import React, { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import MainConfig from "../MainConfig";
import UserContext from "../context/User/userContext";
import { useNavigation } from "@react-navigation/native";

const LikedMembers = (props) => {
  const { name, id2 } = props;

  const lHost = MainConfig.localhost;

  const lower = name.toLowerCase();
  const spaceremoved = lower.replace(/\s/g, "");
  const host = MainConfig.localhost;
  const context = useContext(UserContext);
  const { getProfilePicForOther } = context;
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchImageUri = async () => {
      try {
        const uri = await getProfilePicForOther(id2);
        setImageUri(`${host}/${uri}`);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchImageUri();
  }, [id2]);
  return (
    <View style={styles.myCommunities}>
      <View
        style={{
          width: "100%",
          height: 55,
          flex: 1,
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            flex: 1 / 4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("OtherProfilePage", {
                additionalData: id2,
              })
            }
          >
          <Image
            style={{
              borderRadius: 50,
              width: 40,
              height: 40,
            }}
            source={{
              uri: imageUri
            }}
          />
          </TouchableOpacity>
          <Image
            style={{
              width: 20,
              height: 20,
              position: "absolute",
              top: 32,
              left: 50,
            }}
            source={require("../assets/LikedPic.png")}
          />
        </View>
        <View style={{ flex: 3 / 4, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "500",
              fontFamily: "Calibri",
              color: "#373eb2",
            }}
          >
            {name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myCommunitiesInnerFlexBox: {
    alignItems: "flex-end",
  },
  upperStyle: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: "#373eb2",
  },
  dataScienceEnthusiasts: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Calibri",
    color: "#e4e3e3",
    textAlign: "left",
  },
  dataScienceEnthusiastsWrapper: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: "#373eb2",
    height: 30,
  },
  myCommunitiesInner: {
    width: "100%",
    height: 150,
  },
  myCommunities: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default LikedMembers;
