import React, { useState, useEffect, useContext } from "react";
import { ScrollView, BackHandler, View } from "react-native";
import CreatingPostCard from "./CreatingPostCard";
import EditingCommunityPost from "./EditingCommunityPost";

import CommunityPostContext from "../context/Posts/CommunityPostContext";

import RealHeader from "./RealHeader";
import EditablePostCard from "./EditablePostCard";
const EditPostPage = ({ route }) => {
  const { id, desc, postId } = route.params || {};
  const [description, setDescription] = useState(desc);

  const communityPostContext = useContext(CommunityPostContext);
  const { resetFileAttachments } = communityPostContext;

  useEffect(() => {
    return () => {
      resetFileAttachments();
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <RealHeader heading="Edit Community Post" />
      <ScrollView>
        <EditablePostCard description={description} />
      </ScrollView>
      <EditingCommunityPost
        description={description}
        setDescription={setDescription}
        id={id}
        postId={postId}
      />
    </View>
  );
};
export default EditPostPage;
