import React, { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import CommunityCommentContext from "../context/CommunityComments/CommunityCommentContext";
import MyCommentsContext from "../context/MyComments/MyCommentsContext";
const MyOptionEnable = (props) => {

    const myCommentsContext = useContext(MyCommentsContext);
    const { deleteMyComment } = myCommentsContext
    const { onCancel, postId, commentId, editComment, desc } = props
    const handleDelete = () => {
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
