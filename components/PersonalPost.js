import React, { useEffect, useState, useContext,useCallback } from "react";
import { StyleSheet, Text, Dimensions, ScrollView, View,RefreshControl } from "react-native";
import PersonalContent from "./PersonalContent";
import PersonalContentOriginal from "./PersonalContentOriginal";
import PersonalPostContext from '../context/PersonalPosts/PersonalPostContext';
import CreatePostBox from "./CreatePostBox";
import RealHeader from './RealHeader'
import CommunityContext from "../context/Community/CommunityContext";
import Empty from "./Empty";
//*************** */
import * as Animatable from "react-native-animatable";
//*************** */

const PersonalPost = () => {

    const [loading, setLoading] = useState(true);
    const personalPostContext = useContext(PersonalPostContext);
    const { allPosts, getPersonalPosts, loggedIn } = personalPostContext;

    useEffect(() => {
        const fetchData = async () => {
            await getPersonalPosts();
            setLoading(false);  // <-- Set loading to false after data fetching
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (!allPosts) {
            getfeed();
        }
    }, [allPosts]);
    useEffect(() => {

    }, [allPosts]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        const getFeeder = async () => {
            await getPersonalPosts();
        };

        try {
            setRefreshing(true);
            await getFeeder();
        } catch (error) {
            console.error("Error refreshing data:", error);
        } finally {
            setRefreshing(false);
        }
    }, []);
    if (loading) {
        return (
            <View style={styles.container}>
                <Animatable.Image
                    style={styles.logo}
                    source={require("../assets/Logo2.png")}
                    resizeMode="contain"
                    animation="rotate"
                    iterationCount="infinite"
                    easing="linear"
                    duration={3000}
                />
                <Text style={styles.appName}>LEARNLANCE</Text>
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <RealHeader
                heading="My Posts"
            />
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <CreatePostBox />
                {!allPosts ? (
                    <View>
                        {/* Render a loading indicator or message */}
                        <Text>Loading posts...</Text>
                    </View>
                ) : allPosts.length === 0 ? (
                    <Empty message="No Posts Found" top={10} />
                ) : (
                    allPosts.map((elem) => (
                        elem.file_attachments && elem.file_attachments.length !== 0 ? (
                            <PersonalContentOriginal
                                key={elem._id}
                                id2={elem.poster}
                                name={elem.name}
                                dp={require('../assets/Insha.png')}
                                date={elem.date}
                                comments={elem.commentsCount}
                                description={elem.description}
                                likes={elem.total_likes}
                                image={require('../assets/Certificate.png')}
                                postId={elem._id}
                                isBlue={elem.like_members.includes(loggedIn)}
                                file_attachments={elem.file_attachments}
                                memberIn={elem.poster === loggedIn}
                            />
                        ) : (
                            <PersonalContent
                                key={elem._id}
                                id2={elem.poster}
                                name={elem.name}
                                dp={require('../assets/Insha.png')}
                                date={elem.date}
                                comments={elem.commentsCount}
                                description={elem.description}
                                likes={elem.total_likes}
                                postId={elem._id}
                                isBlue={elem.like_members.includes(loggedIn)}
                                memberIn={elem.poster === loggedIn}
                            />
                        )
                    )))}

            </ScrollView>
        </View>
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

export default PersonalPost;