import React, { useEffect, useContext, useState, useCallback } from "react";
import { StyleSheet, ScrollView, View, Text,RefreshControl } from "react-native";
import CreatePostBox from "./CreatePostBox";
import FeedPostOriginal from "./FeedPostOriginal";
import FeedPosts from "./FeedPosts";
import NewsFeedContext from "../context/NewsFeed/NewsFeedContext";
import RealHeader from "./RealHeader";
import Empty from "./Empty";
import PersonalContent from "./PersonalContent";
import PersonalContentOriginal from "./PersonalContentOriginal";

//*************** */
import * as Animatable from "react-native-animatable";
//*************** */

const NewsFeedInit = () => {

  const [loading, setLoading] = useState(true);
  const newsFeedContext = useContext(NewsFeedContext);
  const { allPosts1, getfeed, loggedIn } = newsFeedContext;
  useEffect(() => {
    const fetchData = async () => {
      await getfeed();
      setLoading(false);  // <-- Set loading to false after data fetching
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (!allPosts1) {
      getfeed();
    }
  }, [allPosts1]);
  // useEffect(() => {
  // }, [allPosts1]);
  // ----------------------------------------------------
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const getFeeder = async () => {
      await getfeed();
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

  // -------------------------------------------------------
  const meso = 123;
  const meso1 = 1231;
  const meso2 = 1232;
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
      <RealHeader heading="Post's Feed" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CreatePostBox key={meso} />

        {!allPosts1 ? (
          <View key={meso1}>
            {/* Render a loading indicator or message */}
            <Text>Loading posts...</Text>
          </View>
        ) : allPosts1.length === 0 ? (
          <Empty message="No Posts Found" top={10} key={meso2} />
        ) : (
          allPosts1.map((elem) => {
            if (elem._id) {
              if (elem.post_id.file_attachments.length !== 0) {

                return (
                  <FeedPostOriginal
                    key={elem._id}
                    name={elem.name}
                    dp={require("../assets/Insha.png")}
                    date={elem.post_id.date}
                    comments={elem.commentsCount}
                    description={elem.post_id.description}
                    likes={elem.post_id.total_likes}
                    image={require("../assets/Certificate.png")}
                    file_attachments={elem.post_id.file_attachments}
                    postId={elem.post_id._id}
                    isBlue={elem.post_id.like_members.includes(loggedIn)}
                    community_name={elem.community_name}
                    community_id={elem.community_id}
                    community_image={elem.community_image}
                    creator_user_id={elem.creator_user_id}

                  />
                )
              }
              else {
                return (
                  <FeedPosts
                    key={elem._id}
                    name={elem.name}
                    dp={require("../assets/Insha.png")}
                    date={elem.post_id.date}
                    comments={elem.commentsCount}
                    description={elem.post_id.description}
                    likes={elem.post_id.total_likes}
                    postId={elem.post_id._id}
                    isBlue={elem.post_id.like_members.includes(loggedIn)}
                    memberIn={elem.poster === loggedIn ? true : false}
                    community_name={elem.community_name}
                    community_id={elem.community_id}
                    community_image={elem.community_image}
                    creator_user_id={elem.creator_user_id}
                  />
                )
              }
            } else {
              if (elem.post_id.file_attachments.length !== 0) {
                return (
                  <PersonalContentOriginal
                    key={elem.post_id._id}
                    id2={elem.poster}
                    name={elem.name}
                    dp={require("../assets/Insha.png")}
                    date={elem.post_id.date}
                    comments={elem.commentsCount}
                    description={elem.post_id.description}
                    likes={elem.post_id.total_likes}
                    image={require("../assets/Certificate.png")}
                    file_attachments={elem.post_id.file_attachments}
                    postId={elem.post_id._id}
                    isBlue={elem.post_id.like_members.includes(loggedIn)}
                    memberIn={elem.poster === loggedIn}
                  />
                )
              }
              else {
                // console.log("for this is", elem.name, elem.post_id.description, elem.poster === loggedIn)
                return (<PersonalContent
                  key={elem.post_id._id}
                  id2={elem.poster}
                  name={elem.name}
                  dp={require("../assets/Insha.png")}
                  date={elem.post_id.date}
                  comments={elem.commentsCount}
                  description={elem.post_id.description}
                  likes={elem.post_id.total_likes}
                  postId={elem.post_id._id}
                  isBlue={elem.post_id.like_members.includes(loggedIn)}
                  memberIn={elem.poster === loggedIn ? true : false}
                />)
              }
            }
          })
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

export default NewsFeedInit;