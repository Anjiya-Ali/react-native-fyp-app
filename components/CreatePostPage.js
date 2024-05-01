import React, { useState, useEffect, useContext } from "react";
import { ScrollView, BackHandler, View } from "react-native";
import CreatingPostCard from "./CreatingPostCard";
import CreateCommunityPost from "./CreateCommunityPost";
import RealHeader from "./RealHeader";
import CommunityPostContext from "../context/Posts/CommunityPostContext";

const CreatePostPage = ({ route }) => {
  const { id } = route.params || {};
  const [description, setDescription] = useState("");

  const communityPostContext = useContext(CommunityPostContext);
  const { resetFileAttachments } = communityPostContext;

  useEffect(() => {
    console.log(id)
    return () => {
      resetFileAttachments();
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <RealHeader heading="Create Community Post" />
      <ScrollView>
        <CreatingPostCard description={description} />
      </ScrollView>
      <CreateCommunityPost
        description={description}
        setDescription={setDescription}
        id={id}
      />
    </View>
  );
};
export default CreatePostPage;
