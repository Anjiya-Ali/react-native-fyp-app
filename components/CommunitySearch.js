import React, { useEffect, useContext, useState,useCallback } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TextInput, Dimensions, TouchableOpacity, Pressable, RefreshControl} from "react-native";
import RealHeader from "./RealHeader";
import MainConfig from "../MainConfig";
import Empty from "./Empty";
import ElearnContext from "../context/Elearn/ElearnContext";
import { useNavigation } from "@react-navigation/native";
import CommunityContext from '../context/Community/CommunityContext';

//*************** */
import * as Animatable from "react-native-animatable";
//*************** */
const CommunitySearch = () => {

    const [loading, setLoading] = useState(true);
    const communityContext = useContext(CommunityContext);
    const { allCommunities, allComm, message } = communityContext
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(null);
    useEffect(() => {
        const fetching = async () => {
            const communities = await allCommunities();
            setFilteredData(communities)
            setLoading(false);
        };

        fetching();
    }, []);
    useEffect(() => {
        const fetching = async () => {
            const communities = await allCommunities();
            setFilteredData(communities)
        };
        if (!allComm || !filteredData) {
            fetching();
        }
    }, [allComm, filteredData]);

    const lHost = MainConfig.localhost;

    const meso1 = 1231;
    const meso2 = 1232;

    const navigation = useNavigation();

    const handleGoTo = (item) => {
        console.log("Hi", item)
        navigation.navigate('CommunityInit', {
            id: item._id,
            community_name: item.community_name
        });
    }
    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = allComm.filter((comm) =>
            comm.community_name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };
    const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));

    const availableSpaceOnRight = windowDimensions.width * 0.1; // Adjust the percentage as needed
    const shouldApplyPadding = availableSpaceOnRight > 40; // Adjust 157 based on your component width

    const leftPadding = shouldApplyPadding ? 15 : 0;
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        const getFeeder = async () => {
            const communities = await allCommunities();
            setFilteredData(communities)
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
        <View style={{ flex: 1 }} >
            <RealHeader heading="All Communities" radius={true} />
            <View
                style={{ height: 70, backgroundColor: '#373eb2', borderBottomEndRadius: 30, borderBottomStartRadius: 30 }}
            >
                <View style={{ height: 50 }}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#d9d9d9',
                            marginVertical: 2,
                            marginHorizontal: 20,
                            borderRadius: 50,
                            borderColor: 'black',
                            borderWidth: 1,
                            flexDirection: 'row',
                            marginTop: 5
                        }}>

                        <View style={{ flex: 7.5 / 9, justifyContent: 'center', left: 10 }}>
                            <TextInput style={{ color: 'black', fontSize: 14 }}
                                placeholderTextColor="black"
                                placeholder="Search..."
                                value={searchText}
                                onChangeText={handleSearch}
                            />
                        </View>
                        <View style={{ flex: 1.5 / 9, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                style={{
                                    borderRadius: 50,
                                    width: 30,
                                    height: 30,
                                }}
                                source={require('../assets/Search.png')}
                            />
                        </View>

                    </View>
                </View>
            </View>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {!filteredData ? (
                    <View key={meso1}>
                        <Text>Loading Communities...</Text>
                    </View>
                ) : filteredData.length === 0 ? (
                    <Empty message="No Communities Found" top={10} key={meso2} />
                ) : (


                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 10 }}>
                        {
                            filteredData.map((item) => {
                                return (

                                    <View style={{ flexBasis: '50%', flex: 1 / 2, justifyContent: 'flex-end', marginTop: 30 }} key={item._id}>
                                        <Pressable style={{
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
                                                }}>{item.community_name}</Text>
                                            </View>
                                            <View style={{ flex: 1 / 3, paddingHorizontal: 2 }}>
                                                <View style={{ flex: 1 / 2 }}>
                                                    <Text style={{
                                                        color: "#000",
                                                        fontFamily: "Inter-Medium",
                                                        fontWeight: "500",
                                                        fontSize: 9,
                                                    }}>Created By {item.name}</Text>
                                                </View>
                                                <View style={{ flex: 1 / 2, marginBottom: 5 }}>
                                                    <Text style={{
                                                        color: "#000",
                                                        fontFamily: "Inter-Medium",
                                                        fontWeight: "500",
                                                        fontSize: 9,
                                                    }}>{item.total_members} Members</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1 / 3, justifyContent: "flex-end", padding: 2 }}>
                                                <View style={{
                                                    top: 30,
                                                    left: 80,
                                                    width: 90,
                                                    height: 55,
                                                    backgroundColor: "white",
                                                    borderColor: "#000",
                                                    borderStyle: "solid",
                                                    borderRadius: 5,
                                                    borderWidth: 1,
                                                    borderColor: "#000",
                                                }} />
                                                <Pressable onPress={() => { handleGoTo(item) }}>
                                                    <Image
                                                        style={{ width: 20, height: 20 }}
                                                        resizeMode="cover"
                                                        source={require("../assets/goTo.png")}
                                                    />
                                                </Pressable>
                                                <Image
                                                    style={{ width: 80, height: 40, left: 87, position: 'absolute' }}
                                                    resizeMode="cover"
                                                    source={{ uri: `${lHost}/Uploads/CommunityCovers/${item.community_name}.jpg` }}
                                                />
                                            </View>

                                        </Pressable>
                                    </View>
                                )
                            })
                        }
                        {filteredData.length % 2 !== 0 && (
                            <View
                                style={{
                                    flexBasis: '50%',
                                    flex: 1 / 2,
                                    justifyContent: 'flex-end',
                                    marginTop: 30
                                }}
                            >
                            </View>)}
                    </View >

                )}
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

export default CommunitySearch;
