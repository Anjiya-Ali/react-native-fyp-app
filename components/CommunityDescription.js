import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity } from "react-native";
import AddButton from "./AddButton";
import { useNavigation } from '@react-navigation/native';
import RemovingYourself from "./RemovingYourself";
import RequestedBar from "./ReqestedBar";
import CommunityContext from "../context/Community/CommunityContext";
import NotificationContext from "../context/Notifications/notificationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CommunityDescription = (props) => {
    const { members, status, id, member, creator,communityName,creator_user_id } = props

    const communityContext = useContext(CommunityContext);
    const { addingRequested, loggedIn } = communityContext
    const [desc, setDesc] = useState(props.description);

    const [windowDimensions, setWindowDimensions] = useState({
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
    });
    const [stat, useStat] = useState(false)
    useEffect(() => {
        const updateDimensions = () => {
            setWindowDimensions({
                height: Dimensions.get("window").height,
                width: Dimensions.get("window").width,
            });
        };
        Dimensions.addEventListener("change", updateDimensions);

        return () => {
        };

    }, []);
    const [showReadMore, setShowReadMore] = useState(false);

    const handleReadMore = () => {
        setShowReadMore(!showReadMore);
    };

    const navigation = useNavigation();
    const handleMembers = () => {
        navigation.navigate('PostMembers', {
            id: id,
            creator: creator,
            communityName
        });
    }
    const [cancel, setCancel] = useState(false)
    const [join, setJoin] = useState(false)
    const onCancel = () => {
        setCancel(!cancel)
    }
    const notificationContext = useContext(NotificationContext);
    const { CreateNotification } = notificationContext;
    const notification = async () => {
        try {
            let username = await AsyncStorage.getItem('name');

            if (!username) {
                throw new Error('Username is missing.');
            }
            await CreateNotification(`"${username}" has requested to Join ${communityName} Community".`, "Community", "Community Join Request", creator_user_id);
            console.log("Notification created successfully.");
        } catch (error) {
            console.error("Error in notification function:", error);
        }
    }
    const onJoin = () => {
        notification()
        addingRequested(id)
        setJoin(true)
    }

    const truncatedDesc = desc.slice(0, 100);
    return (
        <>
            {cancel === false ? (
                <View style={{ flex: 1 / 4, backgroundColor: 'white' }}>

                    {cancel === false && join === false ? (
                        <View style={{ flex: 1 / 3, flexDirection: 'row', marginTop: 10 }}>
                            <TouchableOpacity onPress={member ? handleMembers : () => { }} style={{ flex: 1 / 2, justifyContent: 'center', paddingLeft: 10 }}>
                                <Text style={[{ color: 'black', paddingLeft: 10 }, styles.kMembers]}> {members} {members == 1 ? " Member" : " Members"}</Text>
                            </TouchableOpacity>
                            {
                                creator == false ? (<AddButton text={status} onCancel={onCancel} onJoin={onJoin} />
                                ) : (null)
                            }
                        </View>
                    ) : (
                        <RequestedBar />
                    )}

                    <View style={{ flex: 0, justifyContent: 'center', marginVertical: 10, marginHorizontal: 10 }}>
                        <Text style={{
                            fontFamily: "Calibri",
                            color: 'black',
                            fontSize: 12,
                            fontWeight: "500",
                            fontFamily: "Calibri",
                        }}>{showReadMore ? desc : truncatedDesc + (desc.length > 100 ? "..." : "")}</Text>
                        {desc.length > 100 && (
                            <TouchableOpacity onPress={handleReadMore}>
                                <Text style={[{
                                    color: '#373eb2',
                                    fontSize: 12,
                                    fontWeight: "500",
                                    fontFamily: "Calibri",
                                }]}>
                                    {showReadMore ? "Read Less" : "Read More..."}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            ) : (
                cancel === true && join === false && creator === false ? (
                    <RemovingYourself removeClicked={onCancel} id={id} accId={loggedIn} />
                ) : null
            )}

        </>
    );
};
const styles = StyleSheet.create({
    cover: {
        height: 128,
        width: 360,
        position: "absolute",
    },
    lock: {
        width: 28,
        height: 28
    },
    lockText: {
        color: "#000",
        fontSize: 13,
        textAlign: "left",
        fontFamily: "Calibri",
    },
    fontDescription: {
        fontSize: 11,
        fontWeight: "400",
    },
    kMembers: {
        fontWeight: "700",
        fontFamily: "Calibri",
        fontSize: 17,
    }
});

export default CommunityDescription;
