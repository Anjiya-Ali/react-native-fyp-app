import React, { useEffect, useContext, useState, useRef, useCallback } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TextInput, Animated, TouchableOpacity, Pressable, RefreshControl } from "react-native";
import RealHeader from "./RealHeader";
import MainConfig from "../MainConfig";
import Empty from "./Empty";
import ElearnContext from "../context/Elearn/ElearnContext";
import { useNavigation } from "@react-navigation/native";

//*************** */
import * as Animatable from "react-native-animatable";
//*************** */
const Categories = () => {
    // const [isLoaded, setIsLoaded] = useState(false);

    const [loading, setLoading] = useState(true);
    const colorPalette = ['#373eb2', '#3775b2', '#0CAFFF', '#1560bd', '#000080', '#1d1d47', '#0000FF']
    const [items, setItems] = useState([]);
    const elearnContext = useContext(ElearnContext);
    const { getAllCategories, categories } = elearnContext;
    useEffect(() => {
        const fetchData = async () => {
            await getAllCategories();
            setLoading(false);
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (!categories) {

            getAllCategories();
            // setIsLoaded(true)
        }
    }, [categories]);


    const navigation = useNavigation();

    const handleGoTo = (item) => {
        navigation.navigate('CoursesSearch', {
            categories: items
        });
    };

    const handleClick = (item) => {
        if (items.includes(item)) {
            setItems(prevItems => prevItems.filter(prevItem => prevItem !== item));
        } else {
            setItems(prevItems => [...prevItems, item]);
        }
        console.log(item)
    };
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        const getFeeder = async () => {
            await getAllCategories();
            console.log("refreshed")
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
            <RealHeader heading="Course Categories" />
            <View style={{ flex: 1, flexDirection: 'column' }}>

                <View style={{ height: 40, justifyContent: 'center', alignItems: 'center', borderBottomEndRadius: 30, borderBottomLeftRadius: 30 }}>
                    {items.length === 0 ? (

                        <Text
                            style={{
                                fontSize: 17, fontWeight: "800", fontFamily: "Calibri", color: "#373eb2"
                            }}
                        >Select as Many Categories you Like</Text>
                    ) : (
                        <Text
                            style={{
                                fontSize: 17, fontWeight: "800", fontFamily: "Calibri", color: "#373eb2"
                            }}
                        >You have selected <Text
                            style={{
                                fontSize: 24, fontWeight: "800", fontFamily: "Calibri", color: "#94D82D"
                            }}
                        >{items.length}</Text> {items.length === 1 ? "category" : "categories"}</Text>)
                    }
                </View>
                <ScrollView style={{ top: 10, }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', left: 5 }}>
                        {!categories ? (
                            <View key="meso1">
                                <Text>Loading Categories...</Text>
                            </View>
                        ) : categories.length === 0 ? (
                            <Empty message="No Categories Found" top={10} key="meso2" />
                        ) : (
                            categories.map((item, index) => {
                                const colorIndex = index % colorPalette.length;
                                const backgroundColor = colorPalette[colorIndex];
                                const isSelected = items.includes(item);
                                return (
                                    <TouchableOpacity onPress={() => handleClick(item)} key={index} style={{ borderColor: 'black', borderWidth: isSelected ? 2 : 0, backgroundColor: isSelected ? '#94D82D' : backgroundColor, margin: isSelected ? 3 : 5, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 12, fontWeight: "800", fontFamily: "Calibri", color: "white", padding: 10 }}>{item}</Text>
                                    </TouchableOpacity>
                                );
                            })
                        )}
                    </View>
                </ScrollView>
                <View style={{ height: 10 }}></View>
                <TouchableOpacity style={{
                    position: 'absolute', bottom: 100, right: 25,

                    backgroundColor: 'white',
                    borderColor: 'black', borderWidth: 3, borderRadius: 100
                }} onPress={handleGoTo}>
                    {
                        items.length > 0 ? (
                            <Image
                                resizeMode="cover"
                                style={{
                                    height: 60,
                                    width: 60,
                                }}
                                source={require("../assets/goToo.png")}
                            />
                        ) : (
                            <Image
                                resizeMode="cover"
                                style={{
                                    height: 60,
                                    width: 60,
                                }}
                                source={require("../assets/skip.png")}
                            />
                        )
                    }

                </TouchableOpacity>
            </View>
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

export default Categories;