// CommunityPage.js
import React, { useEffect, useContext } from "react";
import CommunityCommentContext from "../context/CommunityComments/CommunityCommentContext";
import { ScrollView, View } from "react-native";
import LikedMembers from "./LikedMembers";
import RealHeader from "./RealHeader";
import Empty from "./Empty";
const LikedMembersCommentsScreen = ({ route }) => {
  const { id, postId, commentId } = route.params || {};
  const communityCommentContext = useContext(CommunityCommentContext);
  const { likeCommunityCommentMembers, membersLiked, setMembersLiked, reset } =
    communityCommentContext;
  useEffect(() => {
    likeCommunityCommentMembers(id, postId, commentId);
    return () => {
      reset();
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <RealHeader heading="Liked Comment Members" />
      {membersLiked.length === 0 ? (
        <Empty message="No one has liked the Comment :)" top={10} />
      ) : (
        <ScrollView>
          {membersLiked.map((elem) => (
            <LikedMembers
              name={elem.first_name + " " + elem.last_name}
              key={elem._id}
              id2={elem._id}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default LikedMembersCommentsScreen;
