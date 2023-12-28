import React, { useEffect, useContext } from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import NewsFeedDescription from "./NewsFeedDescription";
import CreatePostBox from "./CreatePostBox";
import FeedPostOriginal from "./FeedPostOriginal";
import FeedPosts from "./FeedPosts";
import NewsFeedContext from "../context/NewsFeed/NewsFeedContext";
import RealHeader from "./RealHeader";
import CommunityContext from "../context/Community/CommunityContext";

import Empty from "./Empty";
const NewsFeedInit = () => {
  const newsFeedContext = useContext(NewsFeedContext);
  const { allPosts, getfeed, loggedIn } = newsFeedContext;

  useEffect(() => {
    getfeed();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <RealHeader heading="Post's Feed" />
      <ScrollView>
        <CreatePostBox id="{singleComm.community._id}" />

        {!allPosts ? (
          <View>
            {/* Render a loading indicator or message */}
            <Text>Loading posts...</Text>
          </View>
        ) : allPosts.length === 0 ? (
          <Empty message="No Posts Found" top={10} />
        ) : (
          allPosts.map((elem) => {
            return elem.post_id.file_attachments.length !== 0 ? (
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
            ) : (
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
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default NewsFeedInit;
