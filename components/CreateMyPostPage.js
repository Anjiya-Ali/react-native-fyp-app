import React, { useState, useEffect, useContext } from "react";
import { ScrollView, View } from "react-native";
import CreatingPostCard from "./CreatingPostCard";
import CreateCommunityPost from "./CreateCommunityPost";
import CreatingMyPostCard from "./CreatingMyPostCard";
import CreateMyPostBottom from "./CreateMyPostBottom";

import RealHeader from './RealHeader';
import CommunityPostContext from "../context/Posts/CommunityPostContext";

const CreateMyPostPage = () => {
    const [description, setDescription] = useState('')

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
                heading='Create Your Post'
            />
            <ScrollView >
                <CreatingMyPostCard description={description} />
            </ScrollView>
            <CreateMyPostBottom description={description} setDescription={setDescription} />
        </View>
    );
};
export default CreateMyPostPage;
