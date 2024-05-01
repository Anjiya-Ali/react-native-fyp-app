import React, { useEffect, useState, useContext,useCallback } from "react";
import { Dimensions, ScrollView, View, Text, StyleSheet,RefreshControl } from "react-native";
import CommunityContext from '../context/Community/CommunityContext';
import CommunityPostContext from "../context/Posts/CommunityPostContext";

import CommunityMembers from "./CommunityMembers";
import * as Animatable from "react-native-animatable";


const CommunityMembersRendering = (props) => {
    const [loading, setLoading] = useState(true);

    const { creator } = props
    const communityContext = useContext(CommunityContext);
    const { joinedMembers, joinedMem, setJoinedMembers } = communityContext
    useEffect(() => {

        const fetchData = async () => {
            await joinedMembers(props.id);
            setLoading(false);  // <-- Set loading to false after data fetching
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (joinedMem === null) {
            joinedMembers(props.id)
        }
    }, [joinedMem]);
    useEffect(() => {
        return (() => {
            setJoinedMembers(null)
        })
    }, []);
    const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const getFeeder = async () => {
      await getfeed();
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
            {
                joinedMem && joinedMem.map((elem) => {
                    return (
                        <CommunityMembers key={elem._id} name={elem.first_name + ' ' + elem.last_name} bioInfo="is part of the community" accId={elem._id} id={props.id} id2={elem._id} creator={creator} memberId={elem._id} />
                    )
                })
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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

export default CommunityMembersRendering;
