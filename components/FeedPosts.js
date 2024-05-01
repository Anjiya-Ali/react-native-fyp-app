import React, { useEffect, useState, useContext } from "react";
import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import CommunityPostContext from "../context/Posts/CommunityPostContext";
import { useNavigation } from "@react-navigation/native";

import MainConfig from "../MainConfig";

import CommunityContext from "../context/Community/CommunityContext";
import UserContext from "../context/User/userContext";
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

const FeedPosts = (props) => {
  const [not, setNot] = useState(false);
  const navigation = useNavigation();
  const host = MainConfig.localhost;
  const context = useContext(UserContext);
  const { getProfilePicForOther } = context;
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchImageUri = async () => {
      try {
        const uri = await getProfilePicForOther(creator_user_id);
        setImageUri(`${host}/${uri}`);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchImageUri();
  }, [creator_user_id]);
  const communityContext = useContext(CommunityContext);
  const { creatorCard, setCreatorCard } = communityContext;
  const communityPostContext = useContext(CommunityPostContext);
  const { likeCommunityPost, deleteCommunityPost, loggedIn } =
    communityPostContext;
  const {
    dp,
    name,
    date,
    description,
    likes,
    comments,
    postId,
    isBlue,
    memberIn,
    community_name,
    community_id,
    community_image,
    creator_user_id,
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
  const handleLikings = () => {
    setBlue((prevBlue) => !prevBlue);
    likeCommunityPost(community_id, postId);
    if (blue === true) {
      setLikes(lik - 1);
    } else if (blue === false) {
      setLikes(lik + 1);
    }
  };
  const handleLikedMembers = () => {
    if (lik !== 0) {
      navigation.navigate("LikedMembers", {
        id: community_id,
        postId: postId,
      });
    }
  };
  const handleComments = () => {
    navigation.navigate("CommunityComments", {
      id: community_id,
      postId: postId,
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
    deleteCommunityPost(community_id, postId);
  };

  const truncatedDesc = desc.slice(0, 100);

  const lHost = MainConfig.localhost;

  const handleGoTo = () => {
    setCreatorCard(creator_user_id);
    navigation.navigate("CommunityInit", {
      id: community_id,
      community_name,
    });
  };

  const lower = name.toLowerCase();
  const spaceremoved = lower.replace(/\s/g, "");
  return (
    <View style={styles.myCommunities}>
      {del === false ? (
        <View
          style={{
            width: "100%",
            // height: 200,
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <View style={{ flex: 1 / 4, flexDirection: "row", marginTop: 10 }}>
            <View
              style={{ flex: 2 / 8, alignItems: "flex-end", marginRight: 10 }}
            >
              <Image
                style={{
                  width: 65,
                  height: 30,
                  borderRadius: 2,
                  top: 5,
                }}
                source={{ uri: `${lHost}/${community_image}` }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("OtherProfilePage", {
                    additionalData: creator_user_id,
                  })
                }
              >
              <Image
                style={{
                  borderRadius: 50,
                  width: 25,
                  height: 25,
                  position: "absolute",
                  bottom: -10,
                  right: -7,
                }}
                source={{
                    uri: imageUri
                }}
              />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 5 / 8, marginLeft: 10 }}>
              <TouchableOpacity
                onPress={handleGoTo}
                style={{ flex: 2 / 3, justifyContent: "center" }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "800",
                    fontFamily: "Calibri",
                    color: "#373EB2",
                  }}
                >
                  {community_name}
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 2 / 3, justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: 12,
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
                {/* <TouchableOpacity
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
                </TouchableOpacity> */}

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
                ? desc
                : truncatedDesc + (desc.length > 100 ? "..." : "")}
            </Text>
            {desc.length > 100 && (
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
          <View style={{ flex: 1 / 4, flexDirection: "row", marginBottom: 10 }}>
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
                  borderColor: "black",
                  borderLeftWidth: 1,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderBottomLeftRadius: 10,
                  borderTopStartRadius: 10,
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

export default FeedPosts;
