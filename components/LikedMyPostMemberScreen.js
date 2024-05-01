// CommunityPage.js
import React, { useEffect, useContext, useState,useCallback } from 'react';

import { ScrollView, View, Text, StyleSheet ,RefreshControl} from "react-native";
import LikedMembers from './LikedMembers';
import PersonalPostContext from '../context/PersonalPosts/PersonalPostContext';
import RealHeader from './RealHeader'
//*************** */
import * as Animatable from "react-native-animatable";
//*************** */
const LikedMyPostMemberScreen = ({ route }) => {
    const [loading, setLoading] = useState(true);

    const { postId } = route.params || {};
    const personalPostContext = useContext(PersonalPostContext);
    const { likedMembersMyPost, likedMembers, resetLikedMembers } = personalPostContext
    useEffect(() => {
        const fetchData = async () => {
            await likedMembersMyPost(postId);
            setLoading(false);
        };
        fetchData();
        return () => {
            resetLikedMembers()

        }
    }, []);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        const getFeeder = async () => {

            await likedMembersMyPost(postId);
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
                heading="Liked Members"
            />
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {
                    likedMembers.map((elem) => {
                        return (
                            <LikedMembers name={elem.first_name + ' ' + elem.last_name} key={elem._id} id2={elem._id} />
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

//*************** */

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

//*************** */

export default LikedMyPostMemberScreen;
