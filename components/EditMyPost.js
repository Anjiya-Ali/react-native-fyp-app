import React, { useState, useEffect, useContext } from "react";
import { ScrollView, View } from "react-native";
import CreatingPostCard from "./CreatingPostCard";
import EditingCommunityPost from "./EditingCommunityPost";

import CommunityPostContext from "../context/Posts/CommunityPostContext";

import RealHeader from './RealHeader'
import EditablePostCard from "./EditablePostCard";
import EditablePostCardMy from "./EditablePostCardMy";
import EditingMyPost from './EditingMyPost'
const EditPostPage = ({ route }) => {
    const { desc, postId } = route.params || {};
    const [description, setDescription] = useState(desc)

    const communityPostContext = useContext(CommunityPostContext);
    const { resetFileAttachments } = communityPostContext

    useEffect(() => {
        return () => {
            resetFileAttachments()
        }
    }, []);
    return (
        <View style={{ flex: 1 }}>

            <RealHeader
                heading='Edit My Post'
            />
            <ScrollView >
                <EditablePostCardMy description={description} />
            </ScrollView>
            <EditingMyPost description={description} setDescription={setDescription} postId={postId} />
        </View>
    );
};
export default EditPostPage;
