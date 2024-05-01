// CommunityPage.js
import React, { useEffect, useContext, useState,useCallback } from 'react';
import CommunityCommentContext from '../context/CommunityComments/CommunityCommentContext';
import { StyleSheet, Text, ScrollView, View,RefreshControl } from "react-native";
import LikedMembers from './LikedMembers';
import MyCommentsContext from '../context/MyComments/MyCommentsContext';
import RealHeader from './RealHeader'
import Empty from './Empty';
//*************** */
import * as Animatable from "react-native-animatable";
//*************** */

const MyLikedMembersCommentsScreen = ({ route }) => {

    const [loading, setLoading] = useState(true);
    const { postId, commentId } = route.params || {};
    const myCommentsContext = useContext(MyCommentsContext);
    const { likeMyCommentMembers, membersLiked, setMembersLiked, reset } = myCommentsContext
    useEffect(() => {
        const fetchData = async () => {
            await likeMyCommentMembers(postId, commentId);
            setLoading(false);  // <-- Set loading to false after data fetching
        };
        fetchData();
        return () => {
            reset()
        }
    }, []);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
      const getFeeder = async () => {
        
        await likeMyCommentMembers(postId, commentId);
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
        <>
            <RealHeader heading="Liked Comment Members" />
            <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
                {membersLiked.length === 0 ? (
                    <Empty message="No one has liked the Comment :)" top={10} />
                ) : (
                    <ScrollView>
                        {membersLiked.map((elem) => (
                            <LikedMembers name={elem.first_name + ' ' + elem.last_name} key={elem._id} id2={elem._id} />
                        ))}
                    </ScrollView>
                )}
            </ScrollView>
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

export default MyLikedMembersCommentsScreen;
