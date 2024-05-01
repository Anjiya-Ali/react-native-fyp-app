// CommunityPage.js
import React, { useEffect, useContext, useState, useCallback } from "react";
import CommunityCommentContext from "../context/CommunityComments/CommunityCommentContext";
import { StyleSheet, Text, ScrollView, View, RefreshControl } from "react-native";
import LikedMembers from "./LikedMembers";
import RealHeader from "./RealHeader";
import Empty from "./Empty";
import * as Animatable from "react-native-animatable";

const LikedMembersCommentsScreen = ({ route }) => {
  const [loading, setLoading] = useState(true);

  const { id, postId, commentId } = route.params || {};
  const communityCommentContext = useContext(CommunityCommentContext);
  const { likeCommunityCommentMembers, membersLiked, setMembersLiked, reset } =
    communityCommentContext;
  useEffect(() => {
    const fetchData = async () => {
      await likeCommunityCommentMembers(id, postId, commentId);
      setLoading(false);  // <-- Set loading to false after data fetching
    };
    fetchData();

    return () => {
      reset();
    };
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const getFeeder = async () => {

      await likeCommunityCommentMembers(id, postId, commentId);
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
      <RealHeader heading="Liked Comment Members" />
      {membersLiked.length === 0 ? (
        <Empty message="No one has liked the Comment :)" top={10} />
      ) : (
        <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          {membersLiked.map((elem) => (
            <LikedMembers
              name={elem.first_name + " " + elem.last_name}
              key={elem._id}
              id2={elem._id}
            />
          ))}
        </ScrollView>
      )}
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

export default LikedMembersCommentsScreen;
