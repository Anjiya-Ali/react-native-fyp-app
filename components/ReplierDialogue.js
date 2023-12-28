import React, { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity } from "react-native";
import CommunityCommentContext from "../context/CommunityComments/CommunityCommentContext";
import MyCommentsContext from "../context/MyComments/MyCommentsContext";
import Error from "./Error";
const ReplierDialogue = (props) => {
    const communityCommentContext = useContext(CommunityCommentContext);
    const { createCommunityCommentReply } = communityCommentContext


    const myCommentsContext = useContext(MyCommentsContext);
    const { createMyCommentReply } = myCommentsContext


    const { name, onCancel, id, postId, commentId, setCommState, commState } = props
    const cancel = () => {
        onCancel()
    }
    const [replyText, setReplyText] = useState('');
    const handleTextChange = (text) => {

        setReplyText(text);
    };

    const [error, showError] = useState(false)
    const sendReply = () => {
        if (replyText.trim() === "") {
            showError(true)
            setTimeout(() => {
                showError(false);
            }, 3000);
            return;
        }
        setCommState(commState + 1);
        if (id) {
            createCommunityCommentReply(id, postId, commentId, description = replyText)
        }
        else {

            createMyCommentReply(postId, commentId, description = replyText)
        }
        onCancel()
    }
    return (
        <>

            {error ? (
                <Error error="First Please Enter something to Reply" />
            ) : null}
            <View style={styles.myCommunities}>
                <View style={{
                    width: "100%",
                    height: 100,
                    flex: 1,
                    backgroundColor: "#373eb2",
                    borderTopLeftRadius: 30, borderTopRightRadius: 30
                }}>
                    <View style={{ backgroundColor: '#373eb2', flex: 2 / 5, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                        <TouchableOpacity onPress={sendReply}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: "800",
                                fontFamily: "Inter-ExtraBold",
                                color: "#e4e3e3",
                                paddingBottom: 2,
                            }}>Reply</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={cancel} style={{ position: 'absolute', left: 300, top: 5 }}>
                            <Image
                                source={require('../assets/Cancel.png')}
                                resizeMode="cover"
                                style={{ height: 20, width: 20 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: '#d9d9d9', flex: 3 / 4, borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 10 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: "800",
                                    fontFamily: "Calibri",
                                    color: '#373eb2',
                                }}>Replying to <Text style={{ color: 'black' }}>@{name}</Text></Text>
                            </View>
                            <View style={{ flex: 2 / 3, justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Your Reply"
                                    placeholderTextColor="white"
                                    value={replyText}
                                    onChangeText={handleTextChange}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#373eb2',
        color: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 5,
        width: 250,

        height: 35,
        fontSize: 11
    },
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
        position: 'absolute',
        bottom: 0,
    },
});

export default ReplierDialogue;