import React, { useState, useContext, useEffect} from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Remove from "./Remove";
import Approve from "./Approve";
import CommunityContext from "../context/Community/CommunityContext";
import MainConfig from "../MainConfig";
import UserContext from "../context/User/userContext";
import { useNavigation } from "@react-navigation/native";

const CommunityMembersRequested = (props) => {
  const [clicked, setClicked] = useState(false);
  const [color, setColor] = useState("white");
  const context = useContext(UserContext);
  const {getProfilePicForOther } = context;
  const { name, bioInfo, pendId, id, id2 } = props;
  const navigation = useNavigation();
  const communityContext = useContext(CommunityContext);
  const { addRequestedMembers, pendMem, setPendingMembers } = communityContext;
  const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        const fetchImageUri = async () => {
            try {
                const uri = await getProfilePicForOther(id2);
                setImageUri(`${lHost}/${uri}`);
            } catch (error) {
                console.error("Error fetching profile picture:", error);
            }
        };

        fetchImageUri();
    }, [id2]);
  const removeClicked = () => {
    const updatedPendMem = pendMem.filter((member) => member._id !== id);

    setPendingMembers(updatedPendMem);
    addRequestedMembers(id, pendId);
    setClicked(!clicked);
    setColor(color === "white" ? "#94D82D" : "white");
};


  const lHost = MainConfig.localhost;

  const lower = name.toLowerCase();
  const spaceremoved = lower.replace(/\s/g, "");
  return (
    <View style={styles.myCommunities}>
      <View
        style={{
          width: "100%",
          height: 55,
          flex: 1,
          backgroundColor: color,
          flexDirection: "row",
        }}
        onPress={removeClicked}
      >
        {!clicked ? (
          <>
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
            </View>
            <View style={{ flex: 2 / 4, justifyContent: "center" }}>
              <View style={{ flex: 2 / 3, justifyContent: "flex-end" }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "800",
                    fontFamily: "Calibri",
                    color: "#373eb2",
                  }}
                >
                  {name}
                </Text>
              </View>
              <View style={{ flex: 1 / 2 }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "300",
                    fontFamily: "Calibri",
                    color: "black",
                  }}
                >
                  {bioInfo}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1 / 4,
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity onPress={removeClicked}>
                <Image
                  style={{
                    borderRadius: 50,
                    width: 40,
                    height: 40,
                    right: 20,
                  }}
                  source={require("../assets/approve.png")}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Approve name={name} communityName=" the Community" id2={id2} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myCommunities: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default CommunityMembersRequested;
