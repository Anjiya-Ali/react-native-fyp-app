import React, { useEffect, useState, useContext } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import CommunityPostContext from "../context/Posts/CommunityPostContext";
import { useNavigation } from "@react-navigation/native";
import PostCarousel from "./PostCarousel";
import MainConfig from "../MainConfig";

import CommunityContext from "../context/Community/CommunityContext";
import UserContext from "../context/User/userContext";
import NotificationContext from "../context/Notifications/notificationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getDaySuffix = (day) => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  const lastDigit = day % 10;
  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const formatDate = (inputDate) => {
  const parsedDate = new Date(inputDate);
  const day = parsedDate.getDate();
  const month = parsedDate.toLocaleString("default", { month: "short" });
  const year = parsedDate.getFullYear();

  const daySuffix = getDaySuffix(day);
  const formattedDate = `${day}${daySuffix} ${month}, ${year}`;

  return formattedDate;
};

const PostsOriginal = (props) => {
  const lHost = MainConfig.localhost;

  const navigation = useNavigation();
  const [not, setNot] = useState(false);

  const communityContext = useContext(CommunityContext);
  const { creatorCard } = communityContext;
  const communityPostContext = useContext(CommunityPostContext);
  const {
    likeCommunityPost,
    allPosts,
    deleteCommunityPost,
    setFileAttachments,
    loggedIn,
  } = communityPostContext;
  const {
    dp,
    name,
    date,
    description,
    likes,
    comments,
    image,
    postId,
    isBlue,
    memberIn,
    file_attachments,
    id2
  } = props;
  const [lik, setLikes] = useState(likes);
  const [blue, setBlue] = useState(isBlue);

  const [visible, setVisible] = useState(false);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (creatorCard === loggedIn || memberIn === true) {
      setNot(true);
    }
  }, []);
  const notificationContext = useContext(NotificationContext);
  const { CreateNotification } = notificationContext;
  const notification = async () => {
    try {
      let username = await AsyncStorage.getItem('name');

      if (!username) {
        throw new Error('Username is missing.');
      }
      await CreateNotification(`"${username}" liked your Community Post".`, "Community", "Community Post Liked", id2);
      console.log("Notification created successfully.");
    } catch (error) {
      console.error("Error in notification function:", error);
    }
  }
  const handleLikings = () => {
    setBlue((prevBlue) => !prevBlue);
    likeCommunityPost(allPosts[0].community_id, postId);
    if (blue === true) {
      setLikes(lik - 1);
    } else if (blue === false) {
      notification()
      setLikes(lik + 1);
    }
  };
  const handleLikedMembers = () => {
    if (lik !== 0) {
      navigation.navigate("LikedMembers", {
        id: allPosts[0].community_id,
        postId: postId,
      });
    }
  };
  const [commState, setCommState] = useState(comments);
  const handleComments = () => {
    navigation.navigate("CommunityComments", {
      id: allPosts[0].community_id,
      postId: postId,
      commState,
      setCommState,
      creator_user_id:id2
    });
  };
  const formattedDate = formatDate(date);

  const [desc, setDesc] = useState(description);
  const [showReadMore, setShowReadMore] = useState(false);

  const handleReadMore = () => {
    setShowReadMore(!showReadMore);
  };

  const handleCancel = () => {
    setDel(false);
    setVisible(!visible);
  };
  const handleDeletion = () => {
    deleteCommunityPost(allPosts[0].community_id, postId);
  };
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
  const handleEdit = () => {
    setFileAttachments(file_attachments);
    navigation.navigate("EditPost", {
      id: allPosts[0].community_id,
      desc: description,
      postId,
    });
  };

  const truncatedDesc = description.slice(0, 100);

  const lower = name.toLowerCase();
  const spaceremoved = lower.replace(/\s/g, "");
  return (
    <View style={styles.myCommunities}>
      {del == false ? (
        <View
          style={{
            width: "100%",
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <View style={{ flex: 1 / 8, flexDirection: "row", marginTop: 10 }}>
            <View
              style={{
                flex: 2 / 8,
                justifyContent: "center",
                alignItems: "flex-end",
                marginRight: 5,
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
            <View style={{ flex: 6 / 8 }}>
              <View style={{ flex: 2 / 3, justifyContent: "flex-end" }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "800",
                    fontFamily: "Calibri",
                    color: "black",
                  }}
                >
                  {name}
                </Text>
              </View>
              <View style={{ flex: 1 / 3 }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "300",
                    fontFamily: "Calibri",
                    color: "black",
                  }}
                >
                  {formattedDate}
                </Text>
              </View>
            </View>
            {not === true ? (
              <View
                style={{
                  position: "absolute",
                  right: 20,
                  top: 10,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setVisible(!visible);
                  }}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    source={require("../assets/EclipseBlue.png")}
                  />
                </TouchableOpacity>

                {visible === true ? (
                  <View
                    style={{
                      zIndex: 1,
                      height: 80,
                      width: 80,
                      position: "absolute",
                      top: 15,
                      left: -80,
                      backgroundColor: "#d9d9d9",
                      borderColor: "black",
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <TouchableOpacity
                        onPress={handleEdit}
                        style={{
                          flex: 1 / 2,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: 1,
                        }}
                      >
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          source={require("../assets/edit.png")}
                        />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "300",
                            fontFamily: "Calibri",
                            color: "black",
                          }}
                        >
                          {" "}
                          Edit
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setDel(true);
                        }}
                        style={{
                          flex: 1 / 2,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          source={require("../assets/deleted.png")}
                        />
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "300",
                            fontFamily: "Calibri",
                            color: "black",
                          }}
                        >
                          {" "}
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
          <View
            style={{
              flex: 0,
              justifyContent: "center",
              marginLeft: 50,
              marginRight: 40,
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Calibri",
                color: "black",
                fontSize: 12,
                fontWeight: "500",
                fontFamily: "Calibri",
              }}
            >
              {showReadMore
                ? description
                : truncatedDesc + (description.length > 100 ? "..." : "")}
            </Text>
            {description.length > 100 && (
              <TouchableOpacity onPress={handleReadMore}>
                <Text
                  style={[
                    { color: "#373eb2", fontSize: 12 },
                    styles.fontDescription,
                  ]}
                >
                  {showReadMore ? "Read Less" : "Read More..."}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flex: 4 / 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {file_attachments && (
              <PostCarousel fileAttachments={file_attachments} />
            )}
          </View>
          <View
            style={{ flex: 1 / 8, flexDirection: "row", marginVertical: 10 }}
          >
            <View
              style={{
                flex: 1 / 2,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={handleLikings}
                style={{
                  backgroundColor: "#d9d9d9",
                  height: 30,
                  width: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomLeftRadius: 10,
                  borderTopStartRadius: 10,
                  borderLeftWidth: 1,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                }}
              >
                <Image
                  resizeMode="cover"
                  style={{
                    height: 15,
                    width: 17,
                  }}
                  source={
                    blue
                      ? require(`../assets/blueLike.png`)
                      : require(`../assets/Like.png`)
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLikedMembers}
                style={{
                  backgroundColor: "#d9d9d9",
                  height: 30,
                  width: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomRightRadius: 10,
                  borderTopEndRadius: 10,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 11,
                    fontWeight: "300",
                    fontFamily: "Calibri",
                  }}
                >
                  {lik}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1 / 2,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#d9d9d9",
                  height: 30,
                  width: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomLeftRadius: 10,
                  borderTopStartRadius: 10,
                  borderLeftWidth: 1,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                }}
              >
                <Image
                  resizeMode="cover"
                  style={{
                    height: 15,
                    width: 17,
                  }}
                  source={require("../assets/Comment.png")}
                />
              </View>
              <TouchableOpacity
                onPress={handleComments}
                style={{
                  backgroundColor: "#d9d9d9",
                  height: 30,
                  width: 30,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomRightRadius: 10,
                  borderTopEndRadius: 10,
                  borderRightWidth: 1,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    color: "black",

                    fontSize: 11,
                    fontWeight: "300",
                    fontFamily: "Calibri",
                  }}
                >
                  {comments}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            width: "100%",
            height: 55,
            flex: 1,
            backgroundColor: "red",
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
              style={{
                flex: 2 / 3,
                flexDirection: "row",
                alignItems: "center",
              }}
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
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: 11,
                      fontWeight: "500",
                      fontFamily: "Calibri",
                      color: "black",
                    }}
                  >
                    {" "}
                    's Post
                  </Text>
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
              <TouchableOpacity onPress={handleCancel}>
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
      )}
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
    paddingVertical: 10,
  },
});

export default PostsOriginal;