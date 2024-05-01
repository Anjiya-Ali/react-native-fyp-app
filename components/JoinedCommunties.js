import React, { useEffect, useState, useContext, useCallback} from 'react';
import { StyleSheet, ScrollView, View, FlatList, Text, Dimensions, Image,RefreshControl } from "react-native";
import Cards from './Cards';
import CommunityContext from '../context/Community/CommunityContext';
import Empty from './Empty';
import SearchBar from './SearchBar';
import RealHeader from './RealHeader';


import * as Animatable from "react-native-animatable";

const JoinedCommunities = () => {

    const [loading, setLoading] = useState(true);
    const communityContext = useContext(CommunityContext);
    const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));
    const { joinedCommunities, joinedComm, message } = communityContext
    const { setJoinedMembers, joinedMem } = communityContext
    // const [search, setSearch] = useState('');
    useEffect(() => {
        const fetching = async () => {
            const communities = await joinedCommunities();
            setFilteredData(communities);

            setLoading(false);
        };

        fetching();
    }, []);

    useEffect(() => {
        const fetching = async () => {
            const communities = await joinedCommunities();
            setFilteredData(communities)
        };

        fetching();
    }, [joinedMem]);

    // useEffect(() => {
    //     if (joinedComm) {
    //         const filtered = joinedComm.filter(item => item.community_name.toLowerCase().includes(search.toLowerCase()));
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


    const renderItem = ({ item, index }) => {
        const isLast = joinedComm.length % 2 === 0
            ? index === joinedComm.length - 1 || index === joinedComm.length - 2
            : index === joinedComm.length - 1;

        return (

            <Cards
                id={item._id}
                name={item.name}
                community_name={item.community_name}
                total_members={item.total_members}
                isLast={isLast}
                desc={item.community_description}
                creator_user_id={item.creator_user_id}
            />
        );
    };

    const [filteredData, setFilteredData] = useState(joinedComm);
    const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const getFeeder = async () => {
        const communities = await joinedCommunities();
        setFilteredData(communities);
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
                heading='Joined Communities'
            />
            <ScrollView style={[styles.container]} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
                {/* <View style={styles.searchBarContainer}>
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
                {joinedComm.length === 0 && message && <Empty message={message} top={10} />}
                {joinedComm.length > 0 && filteredData.length > 0 && <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    key={`${numColumns}`}
                    numColumns={numColumns}
                />}

            </ScrollView>
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
        borderRadius: 20,
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
export default JoinedCommunities;
