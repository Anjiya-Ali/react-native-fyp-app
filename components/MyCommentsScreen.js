// CommunityPage.js
import React, { useEffect, useContext, useState } from "react";

import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
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

const MyCommentsScreen = ({ route }) => {
  const { postId, commState, setCommState } = route.params || {};

  const [isReplying, setIsReplying] = useState("Main");
  const [replyingTo, setReplyingTo] = useState(null);
  const [commentIDD, setCommentId] = useState(null);
  const [desc, setDesc] = useState(null);
  const handleReply = (name, commentId) => {
    setReplyingTo(name);
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
    if (!communityComments) {
      getMyComments(postId);
    }
  }, [communityComments]);

  useEffect(() => {
    return () => {
      resetComments();
    };
  }, []);
  if (!communityComments) {
    return <Text>Loading...</Text>;
  }
  return (
    <>
      <RealHeader heading="My Post Comments" />
      <ScrollView>
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
        />
      ) : isReplying === "Main" ? (
        <MainCommentDialogue
          postId={postId}
          commState={commState}
          setCommState={setCommState}
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

export default MyCommentsScreen;
