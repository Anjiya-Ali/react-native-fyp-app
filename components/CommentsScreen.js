// CommunityPage.js
import React, { useEffect, useContext, useState } from "react";

import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import CommunityCommentContext from "../context/CommunityComments/CommunityCommentContext";
import Comments from "./Comments";
import ReplierDialogue from "./ReplierDialogue";
import MainCommentDialogue from "./MainCommentDialogue";
import EditCommentDialogue from "./EditCommentDialogue";
import RealHeader from "./RealHeader";
import Empty from "./Empty";
import CommunityContext from "../context/Community/CommunityContext";

const CommentsScreen = ({ route }) => {
  const { id, postId, commState, setCommState } = route.params || {};

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
  const communityCommentContext = useContext(CommunityCommentContext);
  const { getCommunityComments, communityComments, resetComments, loggedIn } =
    communityCommentContext;

  useEffect(() => {
    if (!communityComments) {
      getCommunityComments(id, postId);
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
    <View style={{ flex: 1 }}>
      <RealHeader heading="Post Comments" />
      <ScrollView>
        {communityComments.commentsInOrder.length === 0 ? (
          <Empty message="No Comments on the Post:)" top={10} />
        ) : (
          communityComments.commentsInOrder.map((comment, index, array) => (
            <Comments
              key={index}
              comment={comment.comment}
              childComments={comment.childComments}
              depth={1}
              padd={10}
              isBlue={comment.comment.like_members.includes(loggedIn)}
              id={id}
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
          id={id}
          postId={postId}
          commentId={commentIDD}
          commState={commState}
          setCommState={setCommState}
        />
      ) : isReplying === "Main" ? (
        <MainCommentDialogue
          id={id}
          postId={postId}
          commState={commState}
          setCommState={setCommState}
        />
      ) : isReplying === "Edit" ? (
        <EditCommentDialogue
          id={id}
          postId={postId}
          commentId={commentIDD}
          text={desc}
          onCancel={handleCancelReply}
        />
      ) : null}
    </View>
  );
};

export default CommentsScreen;
