import React, { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity } from "react-native";
import CommunityCommentContext from "../context/CommunityComments/CommunityCommentContext";
import MyCommentsContext from "../context/MyComments/MyCommentsContext";
import Error from "./Error";

const EditCommentDialogue = (props) => {
    const communityCommentContext = useContext(CommunityCommentContext);
    const { updateCommunityComment } = communityCommentContext


    const myCommentsContext = useContext(MyCommentsContext);
    const { updateMyComment } = myCommentsContext

    const { id, postId, text, commentId, onCancel } = props
    const [error, showError] = useState(false)

    const [replyText, setReplyText] = useState(text);
    const handleTextChange = (text) => {
        setReplyText(text);
    };
    const [message, setMessage] = useState('')
    const sendReply = () => {

        if (replyText.trim() === "") {
            setMessage('First Please Enter something to Edit')
            showError(true)
            setTimeout(() => {
                showError(false);
            }, 3000);
            return;
        }


        if (text === replyText) {
            setMessage('You have not Updated the Comment')
            showError(true)
            setTimeout(() => {
                showError(false);
            }, 3000);
            return;
        }

        if (text !== replyText) {
            if (id) {

                updateCommunityComment(id, postId, commentId, description = replyText)
            }
            else {
                updateMyComment(postId, commentId, description = replyText)
            }
        }
        onCancel()
    }
    const cancel = () => {
        onCancel()
    }
    return (
        <>
            {error ? (
                <Error error={message} />
            ) : null}
            <View style={styles.myCommunities}>
                <View style={{
                    width: "100%",
                    height: 80,
                    flex: 1,
                    backgroundColor: "#373eb2",
                    borderTopLeftRadius: 30, borderTopRightRadius: 30
                }}>
                    <View style={{ backgroundColor: '#373eb2', flex: 2 / 4, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                        <TouchableOpacity onPress={sendReply}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: "800",
                                fontFamily: "Inter-ExtraBold",
                                color: "#e4e3e3",
                                paddingBottom: 2,
                            }}>Edit Comment</Text>
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

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Your Comment"
                                placeholderTextColor="white"
                                value={replyText}
                                onChangeText={handleTextChange}
                            />
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
        bottom: 0
    },
});

export default EditCommentDialogue;