import React, { useEffect, useState, useContext } from "react";
import { Image, Text, StyleSheet, View, Dimensions, ImageBackground, TouchableOpacity, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import CommunityContext from "../context/Community/CommunityContext";

import MainConfig from '../MainConfig';
const lHost = MainConfig.localhost;

const Cards = (props) => {

    const communityContext = useContext(CommunityContext);
    const { setCommunity, setToBeDeleted, creatorCard, setCreatorCard, loggedIn } = communityContext
    const navigation = useNavigation();
    const { name, isLast, community_name, total_members, id, desc, creator_user_id, community_image } = props

    const handleGoTo = () => {
        setCreatorCard(creator_user_id)
        navigation.navigate('CommunityInit', {
            id: id,
            community_name
        });
    }
    const [opt, setOpt] = useState(false)
    const handleOptions = async () => {
        if (creator_user_id === loggedIn) {
            setOpt(true)
        }
    }
    const handleEdit = () => {
        const tempCommunity = {
            id,
            community_name,
            community_description: desc,
            community_image
        }
        setCommunity(tempCommunity)
        navigation.navigate('UpdateCommunity');
    }
    const handleDel = () => {
        const tempCommunity = {
            id,
            community_name,
            community_description: desc,
            community_image
        }
        setToBeDeleted(tempCommunity)
        navigation.navigate('DeleteCommunity');
    }
    const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));

    useEffect(() => {
        const updateDimensions = () => {
            setWindowDimensions(Dimensions.get("window"));
            setNumColumns(determineNumColumns());
        };

        Dimensions.addEventListener("change", updateDimensions);
        return () => {
            if (Dimensions.removeEventListener) {
                Dimensions.removeEventListener("change", updateDimensions);
            }
        };
    }, []);
    // const leftPadding = windowDimensions.height > windowDimensions.width * 2 && windowDimensions.height < windowDimensions.width * 2.3 ? 0 : 0; // Adjust the threshold as needed
    const availableSpaceOnRight = windowDimensions.width * 0.1; // Adjust the percentage as needed
    const shouldApplyPadding = availableSpaceOnRight > 40; // Adjust 157 based on your component width

    const leftPadding = shouldApplyPadding ? 10 : 0;

    return (
        <View style={[styles.myCommunities, isLast && styles.lastItemPadding]}>
            <Pressable onLongPress={handleOptions} style={{
                width: 157,
                height: 100,
                flex: 1,
                backgroundColor: "#d9d9d9",
                borderWidth: 1,
                borderColor: "#000",
                borderStyle: "solid",
                borderRadius: 5,
                marginLeft: leftPadding
            }}>
                <View style={{ flex: 1 / 3, paddingHorizontal: 2, justifyContent: 'center' }}>
                    <Text style={{
                        fontSize: 12,
                        fontWeight: "800",
                        fontFamily: "Inter-Bold",
                        color: "#373eb2"
                    }}>{community_name}</Text>
                </View>
                <View style={{ flex: 1 / 3, paddingHorizontal: 2 }}>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{
                            color: "#000",
                            fontFamily: "Inter-Medium",
                            fontWeight: "500",
                            fontSize: 9,
                        }}>Created By {name}</Text>
                    </View>
                    <View style={{ flex: 1 / 2, marginBottom: 5 }}>
                        <Text style={{
                            color: "#000",
                            fontFamily: "Inter-Medium",
                            fontWeight: "500",
                            fontSize: 9,
                        }}>{total_members} Members</Text>
                    </View>
                </View>
                <View style={{ flex: 1 / 3, justifyContent: "flex-end", padding: 2 }}>
                    <View style={{
                        top: 30,
                        left: 80,
                        width: 90,
                        height: 55,
                        backgroundColor: opt === false ? "white" : "#373EB2",
                        borderColor: "#000",
                        borderStyle: "solid",
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#000",
                    }} />
                    <Pressable onPress={handleGoTo}>
                        <Image
                            style={{ width: 20, height: 20 }}
                            resizeMode="cover"
                            source={require("../assets/goTo.png")}
                        />
                    </Pressable>
                    {
                        opt === false ? (
                            <Image
                                style={{ width: 80, height: 40, left: 87, position: 'absolute' }}
                                resizeMode="cover"
                                source={{ uri: `${lHost}/Uploads/CommunityCovers/${community_name}.jpg` }}
                            />
                        ) : (
                            <>
                                <TouchableOpacity onPress={handleEdit}>
                                    <Image
                                        style={{ width: 25, height: 25, left: 85, bottom: 5, position: 'absolute' }}
                                        resizeMode="cover"
                                        source={require("../assets/edit.png")}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleDel}>
                                    <Image
                                        style={{ width: 25, height: 25, left: 113, bottom: 5, position: 'absolute' }}
                                        resizeMode="cover"
                                        source={require("../assets/deleted.png")}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setOpt(false) }}>
                                    <Image
                                        style={{ width: 25, height: 25, left: 142, bottom: 5, position: 'absolute' }}
                                        resizeMode="cover"
                                        source={require("../assets/Cancel.png")}
                                    />
                                </TouchableOpacity>

                            </>
                        )
                    }


                </View>

            </Pressable>
        </View >
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
        backgroundColor: "white",
        width: "100%",
        overflow: "hidden",
        paddingVertical: 10,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
        paddingHorizontal: 3,
        //if its the last element rendered than only add the below style

    },
    lastItemPadding: {
        paddingBottom: 60
    }
});

export default Cards;
