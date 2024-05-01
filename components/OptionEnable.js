import React, { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import CommunityCommentContext from "../context/CommunityComments/CommunityCommentContext";
import NewsFeedContext from "../context/NewsFeed/NewsFeedContext";

import CommunityPostContext from "../context/Posts/CommunityPostContext";
const OptionEnable = (props) => {

    const communityCommentContext = useContext(CommunityCommentContext);
    
    const communityPostContext = useContext(CommunityPostContext);
    const { deleteCommunityComment } = communityCommentContext
    const { onCancel, id, postId, commentId, editComment, desc } = props
    
    const newsFeedContext = useContext(NewsFeedContext);
    const { allPosts1, setAllPosts1 } = newsFeedContext;
    const handleDelete = () => {
        console.log(postId)
        const index = allPosts1.findIndex(post => post.post_id._id === postId);

        if (index !== -1) {
            const tempArray = [...allPosts1];
            tempArray[index].commentsCount -= 1;
            setAllPosts1(tempArray);
            console.log("Dekhao", tempArray)
        }

        const index1 = communityPostContext.allPosts.findIndex(post => post.post_id._id === postId);

        if (index1 !== -1) {
            const tempArray = [...communityPostContext.allPosts];
            tempArray[index1].commentsCount -= 1;
            communityPostContext.setAllPosts(tempArray);

            console.log("Dekhao1", tempArray)
        }
        deleteCommunityComment(id, postId, commentId)
        onCancel()
    }
    const handleEdit = () => {
        editComment(commentId, desc)
    }
    const handleCancel = () => {
        onCancel()
    }

    return (
        <>
            <View style={{ flex: 4 / 7, height: 55 }}>
            </View>
            <TouchableOpacity onPress={handleEdit} style={{ flex: 1 / 7, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{
                        borderRadius: 50,
                        width: 30,
                        height: 30,
                    }}
                    source={require('../assets/edit.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={{ flex: 1 / 7, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{
                        borderRadius: 50,
                        width: 30,
                        height: 30,
                    }}
                    source={require('../assets/deleted.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={{ flex: 1 / 7, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{
                        borderRadius: 50,
                        width: 30,
                        height: 30,
                    }}
                    source={require('../assets/Cancel.png')}
                />
            </TouchableOpacity>
        </>
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
        height: 30
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
        marginVertical: 5
    },
});

export default OptionEnable;
