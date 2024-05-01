import React, { useEffect, useState, useContext, useCallback } from "react";

import { Dimensions, ScrollView, View, Text, StyleSheet, RefreshControl } from "react-native";
import LockedCommunity from "./LockedCommunity";
import CoverCommunity from "./CoverCommunity";
import CommunityDescription from "./CommunityDescription";
import CommunityContext from "../context/Community/CommunityContext";
import CommunityPostContext from "../context/Posts/CommunityPostContext";
import Posts from "./Posts";
import PostsOriginal from "./PostsOriginal";
import CreatePostBox from "./CreatePostBox";
import Empty from "./Empty";
import MainConfig from "../MainConfig";
import RealHeader from "./RealHeader";
import { useNavigation } from '@react-navigation/native';

import * as Animatable from "react-native-animatable";
const CommunityFeeder = (params) => {
    const { id } = params
    const [loading, setLoading] = useState(true);
    const lHost = MainConfig.localhost;
    // const { id, community_name } = route.params || {};
    const communityContext = useContext(CommunityContext);
    const communityPostContext = useContext(CommunityPostContext);
    const { setJoinedMembers, joinedMem } = communityContext;

    const [windowDimensions, setWindowDimensions] = useState(
        Dimensions.get("window")
    );
    const {
        getOneCommunity,
        singleComm,
        resetSingleComm,
        resetCreator,
        loggedIn,
    } = communityContext;
    const { getCommunityPosts, allPosts, creation, setAllPosts, tempPosts } =
        communityPostContext;
    const [refreshing, setRefreshing] = useState(false);

    // const onRefresh = useCallback(async () => {
    //     const getFeeder = async () => {
    //         const comm = await getOneCommunity(id);
    //         if (singleComm.status === "Joined") {
    //             getCommunityPosts(comm);
    //         }
    //     };

    //     try {
    //         setRefreshing(true);
    //         await getFeeder();
    //     } catch (error) {
    //         console.error("Error refreshing data:", error);
    //     } finally {
    //         setRefreshing(false);
    //     }
    // }, []);

    // useEffect(() => {
    //     const fetching = async () => {
    //         const commId = await getOneCommunity(id);
    //         if (singleComm && singleComm.status === "Joined") {
    //             await getCommunityPosts(commId);
    //             console.log(allPosts)
    //         }
    //         setLoading(false);
    //     };

    //     fetching();

    // }, []);

    
    // useEffect(() => {
    //     // Perform some setup or side effects here
    //     const fetching = async () => {
    //         await getCommunityPosts(id);
    //     };

    //     fetching();
    //     return () => {
    //         const fetch = async () => {
    //             await setAllPosts([])
    //             console.log("yes")
    //         }
    //         fetch()
    //     };
    // }, []);
    
    const navigation = useNavigation();

    useEffect(() => {
        const fetching = async () => {
            await getCommunityPosts(id);
        };

        fetching();

        const unsubscribe = navigation.addListener('beforeRemove', () => {
            // Reset allPosts when the screen is about to be removed
            console.log("i")
            setAllPosts([]);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        const fetching = async () => {
            if (!allPosts) {
                await getCommunityPosts(id);
            }
        };

        fetching();
        console.log(allPosts)
    }, [allPosts]);
    useEffect(() => {
        console.log("hugayen hain re-render hum loog", allPosts)
        // setDummyState(prev => !prev);
    
      }, [allPosts]);
    // if (loading) {
    //     return (
    //         <View style={styles.container}>
    //             <Animatable.Image
    //                 style={styles.logo}
    //                 source={require("../assets/Logo2.png")}
    //                 resizeMode="contain"
    //                 animation="rotate"
    //                 iterationCount="infinite"
    //                 easing="linear"
    //                 duration={3000}
    //             />
    //             <Text style={styles.appName}>LEARNLANCE</Text>
    //         </View>
    //     );
    // }
    
    if (allPosts.length === 0) {
        return (

            <Empty message="No Community Post Created:)" top={10} />
        )
    }

    return (
        <>



            {

                allPosts.map((elem) =>
                    elem.post_id.file_attachments.length !== 0 ? (
                        <PostsOriginal
                            key={elem._id}
                            id2={elem.poster}
                            name={elem.name}
                            dp={require("../assets/Insha.png")}
                            date={elem.post_id.date}
                            comments={elem.commentsCount}
                            description={elem.post_id.description}
                            likes={elem.post_id.total_likes}
                            image={require("../assets/Certificate.png")}
                            file_attachments={elem.post_id.file_attachments}
                            postId={elem.post_id._id}
                            isBlue={elem.post_id.like_members.includes(loggedIn)}
                            memberIn={elem.poster === loggedIn ? true : false}
                        />
                    ) : (
                        <Posts
                            key={elem._id}
                            id2={elem.poster}
                            name={elem.name}
                            dp={require("../assets/Insha.png")}
                            date={elem.post_id.date}
                            comments={elem.commentsCount}
                            description={elem.post_id.description}
                            likes={elem.post_id.total_likes}
                            postId={elem.post_id._id}
                            isBlue={elem.post_id.like_members.includes(loggedIn)}
                            memberIn={elem.poster === loggedIn ? true : false}
                        />
                    )
                )
            }
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white"
    },
    logo: {
        width: 100,
        height: 100,
    },
    appName: {
        fontSize: 50,
        marginTop: 10,
        color: "black"
    },
});
export default CommunityFeeder;
