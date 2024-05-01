import React, { useEffect, useContext, useState } from "react";
import { View, Text, Image, ScrollView, TextInput, Dimensions, TouchableOpacity, Pressable } from "react-native";
import RealHeader from "./RealHeader";
import MainConfig from "../MainConfig";
import Empty from "./Empty";
import ElearnContext from "../context/Elearn/ElearnContext";
import { useNavigation } from "@react-navigation/native";
import CommunityContext from '../context/Community/CommunityContext';

const CoursesSearch = ({ route }) => {

    const elearnContext = useContext(ElearnContext);
    const { getAllCourses, courses, setCourses } = elearnContext
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(null);

    const { categories } = route.params || {};
    useEffect(() => {
        getAllCourses(categories);
        setFilteredData(courses)
        return () => {
            setCourses(null)
        };
    }, []);
    useEffect(() => {
        if (!courses) {
            getAllCourses(categories);
        }
        if (!filteredData) {
            setFilteredData(courses)
        }
    }, [courses, filteredData]);

    const lHost = MainConfig.localhost;

    const meso1 = 1231;
    const meso2 = 1232;

    const navigation = useNavigation();

    const handleGoTo = (item) => {
        navigation.navigate("BuyCourse", {
            course_id: item,
            navigate:'Categories'
        })
    }
    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = courses.filter((comm) =>
            comm.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };
    const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));

    const availableSpaceOnRight = windowDimensions.width * 0.1; // Adjust the percentage as needed
    const shouldApplyPadding = availableSpaceOnRight > 40; // Adjust 157 based on your component width

    const leftPadding = shouldApplyPadding ? 15 : 0;

    return (
        <View style={{ flex: 1 }} >
            <RealHeader heading="All Courses" radius={true} />
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
            <ScrollView>
                {!filteredData ? (
                    <View key={meso1}>
                        <Text>Loading Courses...</Text>
                    </View>
                ) : filteredData.length === 0 ? (
                    <Empty message="No Courses Found" top={10} key={meso2} />
                ) : (


                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 10, bottom: 12 }}>
                        {
                            filteredData.map((item) => {
                                return (

                                    <View style={{ flexBasis: '50%', flex: 1 / 2, justifyContent: 'flex-end', marginTop: 30 }} key={item.course_id}>
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
                                            <View style={{ flex: 1 / 3, paddingHorizontal: 2, justifyContent: 'center', left: 5 }}>
                                                <Text style={{
                                                    fontSize: 12,
                                                    fontWeight: "800",
                                                    fontFamily: "Inter-Bold",
                                                    color: "#373eb2"
                                                }}>{item.title}</Text>
                                            </View>
                                            <View style={{ flex: 1 / 3, paddingHorizontal: 2 }}>
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <View style={{ flex: 2 / 7, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image
                                                            style={{ width: 30, height: 30, borderRadius: 50, borderColor: 'black', borderWidth: 0.5 }}
                                                            source={{ uri: `${lHost}/${item.authorProfilePicture}` }}
                                                        />
                                                    </View>
                                                    <View style={{ flex: 5 / 7 }}>
                                                        <View style={{ flex: 1 / 2 }}>
                                                            <Text style={{
                                                                color: "#000",
                                                                fontFamily: "Inter-Medium",
                                                                fontWeight: "500",
                                                                fontSize: 9,
                                                            }}>Instructor: </Text>
                                                        </View>
                                                        <View style={{ flex: 1 / 2, marginBottom: 5 }}>
                                                            <Text style={{
                                                                color: "#000",
                                                                fontFamily: "Inter-Medium",
                                                                fontWeight: "500",
                                                                fontSize: 9,
                                                            }}>{item.authorName}</Text>
                                                        </View>
                                                    </View>

                                                </View>


                                            </View>
                                            <View style={{ flex: 1 / 3, justifyContent: "flex-end", padding: 2 }}>
                                                <View style={{
                                                    top: 40,
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
                                                <Pressable onPress={()=>{handleGoTo(item.course_id)}}>
                                                    <Image
                                                        style={{ width: 20, height: 20, left: 5, bottom: 3 }}
                                                        resizeMode="cover"
                                                        source={require("../assets/goTo.png")}
                                                    />
                                                </Pressable>
                                                <Image
                                                    style={{ width: 80, height: 40, left: 87, top: 6, position: 'absolute' }}
                                                    resizeMode="cover"
                                                    source={{ uri: `${lHost}/${item.featured_image}` }}
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

export default CoursesSearch;
