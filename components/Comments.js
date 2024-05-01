import React, { useState, useEffect, useContext } from "react";
import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";

import CommunityCommentContext from "../context/CommunityComments/CommunityCommentContext";
import ReplierDialogue from "./ReplierDialogue";
import OptionEnable from "./OptionEnable";
import { useNavigation } from "@react-navigation/native";

import CommunityContext from "../context/Community/CommunityContext";

import MainConfig from "../MainConfig";
import UserContext from "../context/User/userContext";

import NotificationContext from "../context/Notifications/notificationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Comments = (props) => {
  const lHost = MainConfig.localhost;
  const navigation = useNavigation();
  const {
    depth,
    padd,
    comment,
    childComments,
    isBlue,
    id,
    postId,
    onReply,
    bottomPadding,
    editComment,
    id2
  } = props;
  const host = MainConfig.localhost;
  const context = useContext(UserContext);
  const { getProfilePicForOther } = context;
  const [imageUri, setImageUri] = useState(null);

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
  const communityCommentContext = useContext(CommunityCommentContext);
  const { likeCommunityComment, loggedIn } = communityCommentContext;
  const handleReadMore = () => {
    console.warn("Hi");
  };
  const [blue, setBlue] = useState(isBlue);
  const [lik, setLikes] = useState(comment.total_likes);
  const notificationContext = useContext(NotificationContext);
  const { CreateNotification } = notificationContext;
  const notification = async () => {
    try {
      let username = await AsyncStorage.getItem('name');

      if (!username) {
        throw new Error('Username is missing.');
      }
      await CreateNotification(`"${username}" liked your Comment".`, "Community", "Comment Liked", id2);
      console.log("Notification created successfully.");
    } catch (error) {
      console.error("Error in notification function:", error);
    }
  }
  const watchLike = () => {
    setBlue((prevBlue) => !prevBlue);
    likeCommunityComment(id, postId, comment._id);
    if (blue === true) {
      setLikes(lik - 1);
    } else if (blue === false) {
      notification()
      setLikes(lik + 1);
    }
  };
  const [clicked, setClicked] = useState(false);

  const handleReplier = (name, commentor_id) => {
    console.log("meso pakistan", commentor_id, name + ' ' + comment._id)
    onReply(name, comment._id, commentor_id);
  };

  const displayOptions = () => {
    setClicked(true);
  };
  const onCancel = () => {
    setClicked(!clicked);
  };
  const handleCommentLikedMembers = () => {
    navigation.navigate("CommunityCommentsLikedMembers", {
      id: id,
      postId: postId,
      commentId: comment._id,
    });
  };
  const lower = comment.commentor_name.toLowerCase();
  const spaceremoved = lower.replace(/\s/g, "");
  return (
    <View
      style={[
        styles.myCommunities,
        { marginTop: padd, marginBottom: bottomPadding },
      ]}
    >
      <TouchableOpacity
        onLongPress={displayOptions}
        style={{
          width: "100%",
          flex: 0,
          backgroundColor: clicked ? "#373EB2" : "white",
          flexDirection: "row",
        }}
      >
        {!clicked ? (
          <>
            <View
              style={{
                flex: (depth + 1) / 14,
                alignItems: "flex-end",
                marginRight: 5,
                top: 5,
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
            <View style={{ flex: (11 - depth) / 14 }}>
              <View style={{ flex: 1 / 4, justifyContent: "flex-end" }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "800",
                    fontFamily: "Calibri",
                    color: "#373eb2",
                    top: 7,
                  }}
                >
                  {comment.commentor_name}
                </Text>
              </View>
              <View
                style={{
                  flex: 2 / 4,
                  justifyContent: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "500",
                    fontFamily: "Calibri",
                    color: "black",
                  }}
                >
                  {comment.description}
                </Text>
              </View>
              <View style={{ flex: 1 / 4, flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    handleReplier(comment.commentor_name, comment.commentor_id);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "100",
                      fontFamily: "Calibri",
                      color: "#373eb2",
                      bottom: 5,
                    }}
                  >
                    Reply
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 2 / 14 }}>
              <TouchableOpacity
                style={{
                  flex: 2 / 3,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={watchLike}
              >
                {blue ? (
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    source={require("../assets/FilledHeart.png")}
                  />
                ) : (
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    source={require("../assets/Heart.png")}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCommentLikedMembers}
                style={{ flex: 1 / 3, alignItems: "center" }}
              >
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: "100",
                    fontFamily: "Calibri",
                    color: "black",
                  }}
                >
                  {lik > 0 ? lik : null}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <OptionEnable
            onCancel={onCancel}
            id={id}
            postId={postId}
            commentId={comment._id}
            editComment={editComment}
            desc={comment.description}
          />
        )}
      </TouchableOpacity>
      {childComments &&
        childComments.length > 0 &&
        childComments.map((childComment, index) => (
          <Comments
            key={index}
            comment={childComment.comment}
            childComments={childComment.childComments}
            depth={depth + 1}
            padd={0}
            isBlue={childComment.comment.like_members.includes(loggedIn)}
            id={id}
            id2={childComment.comment.commentor_id}
            postId={postId}
            onReply={onReply}
            bottomPadding={0}
            editComment={editComment}
          />
        ))}
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
    // paddingVertical: 10,
  },
});

export default Comments;