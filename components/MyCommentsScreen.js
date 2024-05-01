// CommunityPage.js
import React, { useEffect, useContext, useState,useCallback } from "react";

import { Image, Text, StyleSheet, View, TouchableOpacity,RefreshControl } from "react-native";
import { ScrollView } from "react-native";
// import CommunityCommentContext from '../context/CommunityComments/CommunityCommentContext';

import MyComments from "./MyComments";
import ReplierDialogue from "./ReplierDialogue";
import MainCommentDialogue from "./MainCommentDialogue";
import EditCommentDialogue from "./EditCommentDialogue";
import MyCommentsContext from "../context/MyComments/MyCommentsContext";
import RealHeader from "./RealHeader";
import Empty from "./Empty";
import CommunityContext from "../context/Community/CommunityContext";

//*************** */
import * as Animatable from "react-native-animatable";
//*************** */
const MyCommentsScreen = ({ route }) => {

  const [loading, setLoading] = useState(true);
  const { postId, commState, setCommState, creator_user_id } = route.params || {};

  const [isReplying, setIsReplying] = useState("Main");
  const [replyingTo, setReplyingTo] = useState(null);
  
  const [replyingToId, setReplyingToId] = useState(null);
  const [commentIDD, setCommentId] = useState(null);
  const [desc, setDesc] = useState(null);
  const handleReply = (name, commentId,commentor_id) => {
    setReplyingTo(name);
    
    setReplyingToId(commentor_id)
    setCommentId(commentId);
    setIsReplying("Reply");
  };
  const handleCancelReply = () => {
    setIsReplying("Main");
    setReplyingTo(null);
  };
  const editComment = (commentId, text) => {
    setCommentId(commentId);
    setDesc(text);
    setIsReplying("Edit");
  };
  const myCommentsContext = useContext(MyCommentsContext);
  const { getMyComments, communityComments, resetComments, loggedIn } =
    myCommentsContext;
  useEffect(() => {
    const fetchData = async () => {
      await getMyComments(postId);
      setLoading(false);  // <-- Set loading to false after data fetching
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (!communityComments) {
      getMyComments(postId);
    }
  }, [communityComments]);

  useEffect(() => {
    return () => {
      resetComments();
    };
  }, []);

  //yay original wala hai
  // if (!communityComments) {
  //   return <Text>Loading...</Text>;
  // }
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const getFeeder = async () => {
      
      await getMyComments(postId);
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
    <>
      <RealHeader heading="My Post Comments" />
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {communityComments.commentsInOrder.length === 0 ? (
          <Empty message="No Comments on the Post:)" top={10} />
        ) : (
          communityComments.commentsInOrder.map((comment, index, array) => (
            <MyComments
              key={index}
              comment={comment.comment}
              childComments={comment.childComments}
              depth={1}
              padd={10}
              isBlue={comment.comment.like_members.includes(loggedIn)}
              postId={postId}
              onReply={handleReply}
              bottomPadding={index === array.length - 1 ? 100 : 0}
              editComment={editComment}
              id2={comment.comment.commentor_id}
            />
          ))
        )}
      </ScrollView>

      {isReplying === "Reply" ? (
        <ReplierDialogue
          name={replyingTo}
          onCancel={handleCancelReply}
          postId={postId}
          commentId={commentIDD}
          commState={commState}
          setCommState={setCommState}
          creator_user_id={creator_user_id}
          replyingToId={replyingToId}
        />
      ) : isReplying === "Main" ? (
        <MainCommentDialogue
          postId={postId}
          commState={commState}
          setCommState={setCommState}
          creator_user_id={creator_user_id}
        />
      ) : isReplying === "Edit" ? (
        <EditCommentDialogue
          postId={postId}
          commentId={commentIDD}
          text={desc}
          onCancel={handleCancelReply}
        />
      ) : null}
    </>
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


export default MyCommentsScreen;
