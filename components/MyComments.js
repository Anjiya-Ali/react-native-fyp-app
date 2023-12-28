import React, { useState, useContext } from "react";
import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";

import CommunityCommentContext from "../context/CommunityComments/CommunityCommentContext";
import ReplierDialogue from "./ReplierDialogue";
import MyOptionEnable from "./MyOptionEnable";
import { useNavigation } from "@react-navigation/native";
import MyCommentsContext from "../context/MyComments/MyCommentsContext";
import MainConfig from "../MainConfig";
import CommunityContext from "../context/Community/CommunityContext";

const MyComments = (props) => {
  const {
    depth,
    padd,
    comment,
    childComments,
    isBlue,
    postId,
    onReply,
    bottomPadding,
    editComment,
  } = props;
  const lHost = MainConfig.localhost;
  const getImageUri = (imageName) => {
    const imageExtensions = ["jpeg", "jpg", "png", "gif", "bmp"]; // Add more if needed
    const lowercaseName = imageName.toLowerCase();
    const extension = imageExtensions.find((ext) =>
      lowercaseName.endsWith(ext)
    );

    if (extension) {
      return `${lHost}/Uploads/ProfilePictures/${spaceremoved}.${extension}`;
    } else {
      // Default to JPEG if the extension is not recognized
      return `${lHost}/Uploads/ProfilePictures/${spaceremoved}.jpeg`;
    }
  };
  const navigation = useNavigation();

  const myCommentsContext = useContext(MyCommentsContext);
  const { likeMyComment, loggedIn } = myCommentsContext;

  const handleReadMore = () => {
    console.warn("Hi");
  };
  const [blue, setBlue] = useState(isBlue);
  const [lik, setLikes] = useState(comment.total_likes);
  const watchLike = () => {
    setBlue((prevBlue) => !prevBlue);
    likeMyComment(postId, comment._id);
    if (blue === true) {
      setLikes(lik - 1);
    } else if (blue === false) {
      setLikes(lik + 1);
    }
  };
  const [clicked, setClicked] = useState(false);

  const handleReplier = (name) => {
    onReply(name, comment._id);
  };

  const displayOptions = () => {
    setClicked(true);
  };
  const onCancel = () => {
    setClicked(!clicked);
  };
  const handleCommentLikedMembers = () => {
    navigation.navigate("MyCommentsLikedMembers", {
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
              <Image
                style={{
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                }}
                source={{
                    uri: getImageUri(spaceremoved)
                }}
              />
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
                  style={{ width: 25 }}
                  onPress={() => {
                    handleReplier(comment.commentor_name);
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
          <MyOptionEnable
            onCancel={onCancel}
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
          <MyComments
            key={index}
            comment={childComment.comment}
            childComments={childComment.childComments}
            depth={depth + 1}
            padd={0}
            isBlue={childComment.comment.like_members.includes(loggedIn)}
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

export default MyComments;
