import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import CreatingPostCard from "./CreatingPostCard";
import UpdatePost from "./UpdadePost";
const UpdatePostScreen = ({ route }) => {
    const { id } = route.params || {};
    const [description, setDescription] = useState('')
    return (
        <>
            <ScrollView >
                <CreatingPostCard description={description} />
            </ScrollView>
            <UpdatePost description={description} setDescription={setDescription} id={id} />
        </>
    );
};
export default UpdatePostScreen;
