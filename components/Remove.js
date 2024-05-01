import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import CommunityContext from "../context/Community/CommunityContext";
const Remove = (props) => {
  const { name, removeClicked, id, accId } = props;

  const communityContext = useContext(CommunityContext);
  const { removingAddedMembers, joinedMem, setJoinedMembers } =
    communityContext;
  const handleDeletion = () => {
    const updatedPendMem = joinedMem.filter((member) => member._id !== accId);
    const setJoined = async () => {
      await setJoinedMembers(updatedPendMem);
    };
    setJoined();
    removingAddedMembers(id, accId);
  };
  return (
    <View style={styles.myCommunities}>
      <View
        style={{
          width: "100%",
          height: 55,
          flex: 1,
          backgroundColor: "#f14436",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 3 / 4 }}>
          <View style={{ flex: 2 / 3, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "800",
                fontFamily: "Calibri",
                color: "white",
                paddingLeft: 10,
              }}
            >
              Are You Sure?
            </Text>
          </View>
          <View
            style={{ flex: 2 / 3, flexDirection: "row", alignItems: "center" }}
          >
            <View>
              <Text
                style={{
                  paddingLeft: 10,
                  fontSize: 11,
                  fontWeight: "500",
                  fontFamily: "Calibri",
                  color: "black",
                }}
              >
                You want to Remove{" "}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "800",
                  fontFamily: "Calibri",
                  color: "white",
                }}
              >
                {name}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 / 4, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={handleDeletion}
            style={{
              flex: 1 / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 40,
                height: 40,
              }}
              source={require("../assets/check.png")}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1 / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={removeClicked}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                }}
                source={require("../assets/Cancel.png")}
              />
            </TouchableOpacity>
          </View>
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

export default Remove;
