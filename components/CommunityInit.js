import React, { useEffect, useState, useContext, useCallback } from "react";
import { Dimensions, ScrollView, View, Text, StyleSheet, RefreshControl } from "react-native";
import LockedCommunity from "./LockedCommunity";
import CoverCommunity from "./CoverCommunity";
import CommunityDescription from "./CommunityDescription";
import CommunityContext from "../context/Community/CommunityContext";
import CommunityPostContext from "../context/Posts/CommunityPostContext";
import Posts from "./Posts";
import PostsOriginal from "./PostsOriginal";
import CreatePostBox from "./CreatePostBox";
import Empty from "./Empty";
import MainConfig from "../MainConfig";
import RealHeader from "./RealHeader";
import CommunityFeeder from "./CommunityFeeder";
import * as Animatable from "react-native-animatable";
import { useFocusEffect } from '@react-navigation/native';

const CommunityInit = ({ route }) => {

  const [loading, setLoading] = useState(true);
  const lHost = MainConfig.localhost;
  const { id, community_name } = route.params || {};
  const communityContext = useContext(CommunityContext);
  const communityPostContext = useContext(CommunityPostContext);
  const { setJoinedMembers, joinedMem } = communityContext;

  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );
  const {
    getOneCommunity,
    singleComm,
    resetSingleComm,
    resetCreator,
    loggedIn,
  } = communityContext;
  const { getCommunityPosts, allPosts, creation, setAllPosts } =
    communityPostContext;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const getFeeder = async () => {
      // if (singleComm.status === "Joined") {
      //   await getCommunityPosts(singleComm.community._id);
      // }
      const comm = await getOneCommunity(id);
    };

    try {
      setRefreshing(true);
      await getFeeder();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // useEffect(() => {
  //   if (singleComm && !allPosts) {
  //     getCommunityPosts(singleComm.community._id)
  //   }
  //   if (singleComm && allPosts.length == 0) {
  //     getCommunityPosts(singleComm.community._id)
  //   }
  // }, [allPosts]);
  useEffect(() => {
    const fetching = async () => {
      const commId = await getOneCommunity(id);
      // if (singleComm && singleComm.status === "Joined") {
      //   await getCommunityPosts(commId);
      //   console.log(allPosts)
      // }
      setLoading(false);
    };

    fetching();
  }, []);

  useEffect(() => {
    const fetching = async () => {
      console.log("Thats what i gt", singleComm)
      if (!singleComm) {
        console.log("meso")
        const commId = await getOneCommunity(id);
        // if ?
      }
      // if (singleComm && singleComm.status === "Joined") {
      //   console.log("I was called")
      //   await getCommunityPosts(singleComm.community._id);
      // }

    }
    fetching()

  }, [singleComm]);

  // useFocusEffect(() => {
  //       // This function will be called when the screen comes into focus

  //       return () => {
  //           // This function will be called when the screen is unfocused (unmounted or another screen comes into focus)
  //           // const fetch = async () => {
  //            setAllPosts([]);
  //           //     console.log("Cleanup logic executed");
  //           // }
  //           // fetch();
  //       };
  //   });
  // useEffect(() => {
  //   const fetching = async () => {
  //     if (!singleComm || singleComm.community._id !== allPosts.community) {
  //       // Reload components if singleComm or allPosts.community don't match
  //       window.location.reload(); // This will reload the entire page
  //       return;
  //     }
  //     await getCommunityPosts(singleComm.community._id);
  //   };

  //   fetching();
  // }, [singleComm]);
  // const [dummyState, setDummyState] = useState(false); // Dummy state variable




  if (loading) {
    return (
      <View style={styles.container}>
        <Animatable.Image
          style={styles.logo}
          source={require("../assets/Logo2.png")}
          resizeMode="contain"
          animation="rotate"
          iterationCount="infinite"
          easing="linear"
          duration={3000}
        />
        <Text style={styles.appName}>LEARNLANCE</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <RealHeader heading={community_name} />
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <CoverCommunity
          image={{ uri: `${lHost}/${singleComm.community.community_image}` }}
        />
        <CommunityDescription
          status={singleComm.status}
          description={singleComm.community.community_description}
          members={singleComm.community.total_members}
          id={singleComm.community._id}
          member={singleComm.community.members_id.includes(loggedIn)}
          creator={singleComm.community.creator_user_id == loggedIn}
        />

        {singleComm && singleComm.status !== "Joined" && <LockedCommunity />}
        {singleComm && singleComm.status === "Joined" && (
          <CreatePostBox id={singleComm.community._id} />
        )}

        {singleComm && singleComm.status === "Joined" && (
          <CommunityFeeder id={singleComm.community._id} />
        )}
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 50,
    marginTop: 10,
    color: "black"
  },
});
export default CommunityInit;
