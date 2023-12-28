import React, { useEffect, useState, useContext } from "react";
import { Dimensions, ScrollView, View } from "react-native";
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

const CommunityInit = ({ route }) => {
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
  const { getCommunityPosts, allPosts, creation, resetAllPosts } =
    communityPostContext;

  useEffect(() => {
    const getComm = async () => {
        await getOneCommunity(id);
      };
  
      getComm();
  }, []);

  useEffect(() => {
    const getComm = async () => {
      await getOneCommunity(id);
    };

    getComm();

    if (singleComm && singleComm.status === "Joined") {
      getCommunityPosts(singleComm.community._id);
    }
  }, [singleComm, joinedMem]);
  useEffect(() => {
    if (singleComm && singleComm.status === "Joined") {
      getCommunityPosts(singleComm.community._id);
    }
  }, [creation]);

  if (!singleComm || !singleComm.community) {
    return null; // or some loading indicator
  }

  // const lower = comment.commentor_name.toLowerCase()
  // const spaceremoved = comment.commentor_name.replace(/\s/g, '');
  return (
    <View style={{ flex: 1 }}>
      <RealHeader heading={community_name} />
      <ScrollView>
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

        {singleComm &&
        singleComm.status === "Joined" &&
        allPosts.length === 0 ? (
          <Empty message="No Community Post Created:)" top={10} />
        ) : singleComm && singleComm.status !== "Joined" ? null : (
          allPosts.map((elem) =>
            elem.post_id.file_attachments.length !== 0 ? (
              <PostsOriginal
                key={elem._id}
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
              />
            ) : (
              <Posts
                key={elem._id}
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
              />
            )
          )
        )}
      </ScrollView>
    </View>
  );
};
export default CommunityInit;
