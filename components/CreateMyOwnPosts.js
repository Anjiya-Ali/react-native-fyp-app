import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';


import AsyncStorage from "@react-native-async-storage/async-storage";
import StudentProfileContext from "../context/StudentProfile/studentProfileContext";
import TeacherProfileContext from "../context/TeacherProfile/teacherProfileContext";

const CreateMyOwnPosts = () => {
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
    const context = useContext(StudentProfileContext);
    const { getProfilePicture } = context;
    const context1 = useContext(TeacherProfileContext);
    const { getTeacherProfilePicture } = context1;
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [teacherProfilePictureUrl, setTeacherProfilePictureUrl] = useState("");
    const [role, setRole] = useState("");
    useEffect(() => {
        const fetchProfilePicture = async () => {
            const role = await AsyncStorage.getItem("role");
            setRole(role);
            const response = await getProfilePicture();
            setProfilePictureUrl(`${host}/${response.profilePictureUrl}`);

            const response1 = await getTeacherProfilePicture();
            setTeacherProfilePictureUrl(`${host}/${response1.profilePictureUrl}`);
        };

        fetchProfilePicture();
    }, []);
    useEffect(() => {
    }, [profilePictureUrl, teacherProfilePictureUrl]);

    const navigation = useNavigation();
    const handleClick = () => {
        navigation.navigate('CreateMyPost');
    }

    return (
        <View style={{
            flex: 1 / 4, height: 100, justifyContent: 'center', backgroundColor: 'white',
            marginTop: 10
        }}>

            <View style={{ flex: 3 / 4, flexDirection: 'row' }}>
                <View style={{ flex: 2 / 8, alignItems: 'flex-end', top: 5 }}>
                    <Image
                        style={{
                            borderRadius: 50,
                            width: 40,
                            height: 40,
                        }}
                        source={{ uri: role === "Student" ? profilePictureUrl : teacherProfilePictureUrl }}
                    />
                </View>
                <TouchableOpacity onPress={handleClick} style={{ flex: 6 / 8, backgroundColor: '#d9d9d9', margin: 5, borderRadius: 25, marginRight: 40, borderColor: 'black', borderWidth: 1 }}>
                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: "500",
                            fontFamily: "Calibri",
                            color: 'black',
                            left: 17,
                            top: 9
                        }}
                    >What's on your mind?</Text>
                </TouchableOpacity>
            </View>
        </View>


    );
};
const styles = StyleSheet.create({
    cover: {
        height: 128,
        width: '100%',
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

export default CreateMyOwnPosts;