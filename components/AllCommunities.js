import React, { useEffect, useState, useContext,useCallback } from 'react';
import { StyleSheet, View, FlatList, Text, Dimensions, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput,RefreshControl } from "react-native";
import Cards from './Cards';
import CommunityContext from '../context/Community/CommunityContext';
import Empty from './Empty';
import SearchBar from './SearchBar';
import { useNavigation } from '@react-navigation/native';
import RealHeader from './RealHeader';

import * as Animatable from "react-native-animatable";

const AllCommunities = () => {
    const [loading, setLoading] = useState(true);

    const communityContext = useContext(CommunityContext);
    const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));
    const { allCommunities, allComm, message } = communityContext
    const { setJoinedMembers, joinedMem } = communityContext
    // const [search, setSearch] = useState('');

    // useEffect(() => {
    //     const fetching = async () => {
    //         const communities = await allCommunities();
    //         setFilteredData(communities)
    //     };

    //     fetching();
    // }, []);

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

        fetching();
    }, [allComm, joinedMem]);


    // useEffect(() => {
    //     if (allComm) {
    //         const filtered = allComm.filter(item => item.community_name.toLowerCase().includes(search.toLowerCase()));
    //         setFilteredData(filtered);
    //     }
    // }, [search]);

    const determineNumColumns = () => {
        const { height } = windowDimensions;
        return height > 700 ? 2 : 4;
    };
    const [numColumns, setNumColumns] = useState(determineNumColumns());

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

    const navigation = useNavigation();
    const handleAddCommunity = () => {
        navigation.navigate('CreateCommunity');
    }
    const renderItem = ({ item, index }) => {
        const isLast = allComm.length % 2 === 0
            ? index === allComm.length - 1 || index === allComm.length - 2
            : index === allComm.length - 1;
        return (
            <Cards
                id={item._id}
                name={item.name}
                community_name={item.community_name}
                total_members={item.total_members}
                isLast={isLast}
                desc={item.community_description}
                creator_user_id={item.creator_user_id}
                community_image={item.community_image}
            />
        );
    };

    const [filteredData, setFilteredData] = useState(allComm);
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
            <View style={[styles.container, {
                justifyContent: 'center',
                alignItems: 'center',
            }]}>
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
            <RealHeader
                heading='All Communities'
            />

            <ScrollView style={[styles.container]}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* <View style={[styles.searchBarContainer]}>
                    <TextInput
                        style={[styles.searchBar, { color: 'black' }]}
                        placeholder="Search..."
                        value={search}
                        onChangeText={setSearch}
                        placeholderTextColor="black"
                    />
                    <Image
                        style={styles.searchIcon}
                        source={require('../assets/Search.png')} // Replace with your search icon
                    />
                </View> */}
                {allComm.length === 0 && message && <Empty message={message} top={10} />}
                {filteredData.length === 0 && <Empty message={"No Communities Found "} top={10} />}

                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    key={`${numColumns}`}
                    numColumns={numColumns}
                    contentContainerStyle={{
                        justifyContent: 'space-around',
                        // paddingLeft: leftPadding, // Adjust left padding based on window width
                        // Set equal spacing around items
                    }}
                />
            </ScrollView>
            <TouchableOpacity onPress={handleAddCommunity} style={{ position: 'absolute', bottom: 90, right: 20 }}>
                <Image
                    style={{
                        width: 60,
                        height: 60,
                    }}
                    source={require('../assets/Add.png')}
                />
            </TouchableOpacity>

        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 8,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20
    },
    searchBar: {
        flex: 1,
        height: 40,
        padding: 8,
        borderRadius: 8,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: '2%',
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
})

export default AllCommunities;
