import React, { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity } from "react-native";
import CommunityCommentContext from "../context/CommunityComments/CommunityCommentContext";
import MyCommentsContext from "../context/MyComments/MyCommentsContext";
import Error from "./Error";
import NewsFeedContext from "../context/NewsFeed/NewsFeedContext";
import PersonalPostContext from '../context/PersonalPosts/PersonalPostContext';
import NotificationContext from "../context/Notifications/notificationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommunityPostContext from "../context/Posts/CommunityPostContext";

const ReplierDialogue = (props) => {
    const communityCommentContext = useContext(CommunityCommentContext);
    const { createCommunityCommentReply } = communityCommentContext

    const newsFeedContext = useContext(NewsFeedContext);
    const { allPosts1, getfeed, loggedIn, setAllPosts1 } = newsFeedContext;


    const myCommentsContext = useContext(MyCommentsContext);
    const { createMyCommentReply } = myCommentsContext


    const personalPostContext = useContext(PersonalPostContext);
    const { allPosts, setAllPosts } = personalPostContext;

    const { name, onCancel, id, postId, commentId, setCommState, commState, creator_user_id, replyingToId } = props
    const cancel = () => {
        onCancel()
    }
    const [replyText, setReplyText] = useState('');
    const handleTextChange = (text) => {

        setReplyText(text);
    };

    const communityPostContext = useContext(CommunityPostContext);
    const [error, showError] = useState(false)
    const notificationContext = useContext(NotificationContext);
    const { CreateNotification } = notificationContext;
    const notification = async (check) => {
        try {
            let username = await AsyncStorage.getItem('name');

            if (!username) {
                throw new Error('Username is missing.');
            }
            console.log("meso" + creator_user_id)
            if (check) {
                await CreateNotification(`"${username}" replied to your comment on Community Post".`, "Community", "Community Post Reply", replyingToId);
                await CreateNotification(`"${username}" commented on your Community Post".`, "Community", "Community Post Comment", creator_user_id);

            }
            else {
                await CreateNotification(`"${username}" replied to your comment on Post".`, "MyPosts", "Post Reply", replyingToId);
                await CreateNotification(`"${username}" commented on your Community Post".`, "MyPosts", "Post Comment", creator_user_id);

            }
            console.log("Notification created successfully.");
        } catch (error) {
            console.error("Error in notification function:", error);
        }
    }
    const sendReply = () => {
        if (replyText.trim() === "") {
            showError(true)
            setTimeout(() => {
                showError(false);
            }, 3000);
            return;
        }


        // setCommState(commState + 1);
        if (id) {
            console.log(postId)
            const index = allPosts1.findIndex(post => post.post_id._id === postId);

            if (index !== -1) {
                const tempArray = [...allPosts1];
                tempArray[index].commentsCount += 1;
                setAllPosts1(tempArray);
                
                console.log("Dekhao",tempArray)
            }
            const index1 = communityPostContext.allPosts.findIndex(post => post.post_id._id === postId);

            if (index1 !== -1) {
                const tempArray = [...communityPostContext.allPosts];
                tempArray[index1].commentsCount += 1;
                communityPostContext.setAllPosts(tempArray);
                console.log("Dekhao1",tempArray)
            }
            console.log("AllPosts",communityPostContext.allPosts)
            
            console.log("postid",postId)

            createCommunityCommentReply(id, postId, commentId, description = replyText)
            notification(1)
        }
        else {
            const index = allPosts1.findIndex(post => post.post_id._id === postId);

            if (index !== -1) {
                const tempArray = [...allPosts1];
                tempArray[index].commentsCount += 1;
                setAllPosts1(tempArray);
            }
            const index1 = allPosts.findIndex(post => post._id === postId);

            if (index1 !== -1) {
                const tempArray = [...allPosts];
                tempArray[index1].commentsCount += 1;
                setAllPosts(tempArray);
            }

            notification(0)
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