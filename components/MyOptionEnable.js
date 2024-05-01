import React, { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import CommunityCommentContext from "../context/CommunityComments/CommunityCommentContext";
import MyCommentsContext from "../context/MyComments/MyCommentsContext";
import NewsFeedContext from "../context/NewsFeed/NewsFeedContext";
import PersonalPostContext from '../context/PersonalPosts/PersonalPostContext';

const MyOptionEnable = (props) => {

    const myCommentsContext = useContext(MyCommentsContext);
    const { deleteMyComment } = myCommentsContext
    const { onCancel, postId, commentId, editComment, desc } = props
    
    const newsFeedContext = useContext(NewsFeedContext);
    const { allPosts1, setAllPosts1 } = newsFeedContext;

    const personalPostContext = useContext(PersonalPostContext);
    const { allPosts, setAllPosts } = personalPostContext;

    const handleDelete = () => {
        const index = allPosts1.findIndex(post => post.post_id._id === postId);

        if (index !== -1) {
            const tempArray = [...allPosts1];
            tempArray[index].commentsCount -= 1;
            setAllPosts1(tempArray);
        }

        const index1 = allPosts.findIndex(post => post._id === postId);

        if (index1 !== -1) {
            const tempArray = [...allPosts];
            tempArray[index1].commentsCount -= 1;
            setAllPosts(tempArray);
        }
        deleteMyComment(postId, commentId)
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

export default MyOptionEnable;