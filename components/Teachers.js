import React, { useEffect, useContext, useState } from "react";
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable } from "react-native";
import RealHeader from "./RealHeader";
import MainConfig from "../MainConfig";
import Empty from "./Empty";
import ElearnContext from "../context/Elearn/ElearnContext";
import { useNavigation } from "@react-navigation/native";

const Teachers = () => {

    const eLearnContext = useContext(ElearnContext);
    const { teachers, getTeachers } = eLearnContext;

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        getTeachers();
        setFilteredData(teachers)
    }, []);
    useEffect(() => {
        if (!teachers || !filteredData) {
            getTeachers();
            setFilteredData(teachers)
        }
    }, [teachers, filteredData]);
    const lHost = MainConfig.localhost;

    const meso1 = 1231;
    const meso2 = 1232;

    const navigation = useNavigation();

    const handleGoTo = (item) => {
        console.log("Hi", item)
        navigation.navigate("OtherProfilePage", {
            additionalData: item,
        })
    }
    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = teachers.filter((teacher) =>
            teacher.first_name.toLowerCase().includes(text.toLowerCase()) ||
            teacher.last_name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <View style={{ flex: 1 }} >
            <RealHeader heading="Teachers" radius={true} />
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
                        <Text>Loading teachers...</Text>
                    </View>
                ) : filteredData.length === 0 ? (
                    <Empty message="No Teachers Found" top={10} key={meso2} />
                ) : (


                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            filteredData.map((item) => {
                                return (

                                    <View style={{ flexBasis: '50%', flex: 1 / 2, justifyContent: 'flex-end', marginTop: 30 }} key={item._id}>

                                        <View style={{ height: 130, borderColor: 'black', borderWidth: 1.5, borderRadius: 10, backgroundColor: '#d9d9d9', margin: 7 }}>
                                            <View style={{
                                                position: 'absolute',
                                                zIndex: 1,
                                                top: -30,
                                                left: 70
                                            }}>
                                                <Image
                                                    resizeMode="cover"
                                                    style={{
                                                        height: 50,
                                                        width: 50,
                                                        borderRadius: 50,
                                                        borderColor: 'black',
                                                        borderWidth: 1.5
                                                    }}
                                                    source={{ uri: `${lHost}/${item.profile_picture}` }}
                                                />
                                            </View>
                                            <View style={{ flex: 1 / 6 }}>

                                            </View>
                                            <View style={{ flex: 1 / 6, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text
                                                    style={{
                                                        fontSize: 17,
                                                        fontWeight: "800",
                                                        fontFamily: "Calibri",
                                                        color: "#373eb2",
                                                    }}
                                                >{item.first_name} {item.last_name}</Text>
                                            </View>
                                            <View style={{ flex: 1 / 6, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                                                {Array.from({ length: item.feedback ? (JSON.parse(item.feedback))[0].feedback : 0 }, (_, starIndex) => (
                                                    <Image
                                                        key={starIndex}
                                                        resizeMode="cover"
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                            marginHorizontal: 3
                                                        }}
                                                        source={require("../assets/star-121.png")}
                                                    />
                                                ))}
                                                {Array.from({ length: item.feedback ? 5 - (JSON.parse(item.feedback))[0].feedback : 5 }, (_, emptyStarIndex) => (
                                                    <Image
                                                        key={`empty_${emptyStarIndex}`}
                                                        resizeMode="cover"
                                                        style={{
                                                            height: 17,
                                                            width: 17,
                                                            marginHorizontal: 3
                                                        }}
                                                        source={require("../assets/star-4.png")}
                                                    />
                                                ))}
                                            </View>
                                            <View style={{ flex: 2 / 6, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text
                                                    style={{
                                                        fontSize: 11,
                                                        fontWeight: "600",
                                                        fontFamily: "Calibri",
                                                        color: "black",
                                                    }}
                                                >{item.bio_information}</Text>
                                            </View>
                                            {
                                                console.log(item)
                                            }
                                            <View style={{ flex: 1 / 6, justifyContent: 'center', alignItems: 'flex-end', right: 5, bottom: 5 }}>
                                                <TouchableOpacity onPress={() => { handleGoTo(item.teacher_profile_id) }}>
                                                    <Image
                                                        resizeMode="cover"
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                        }}
                                                        source={require("../assets/goTo.png")}
                                                    />
                                                </TouchableOpacity>


                                            </View>
                                        </View>
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

export default Teachers;
