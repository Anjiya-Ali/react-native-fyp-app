import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import CommunityContext from "../context/Community/CommunityContext";
import { useNavigation } from '@react-navigation/native';
import Error from "./Error";

import { setCommunityImage } from '../redux/action';
import { useDispatch } from 'react-redux';
import NotificationContext from "../context/Notifications/notificationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DeleteCommunity = (props) => {
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const communityContext = useContext(CommunityContext);
    const { deletingCommunity, allComm, setAllCommunities, toBeDeleted } = communityContext

    const { communityName, id } = props
    const [enteredText, setEnteredText] = useState("");

    const handleTextChange = (text) => {
        setEnteredText(text);
    };
    const [message, setMessage] = useState('')
    const [erroneous, setErroneous] = useState(false)
    const notificationContext = useContext(NotificationContext);
    const { CreateNotification } = notificationContext;
    const notification = async () => {
      try {
        let username = await AsyncStorage.getItem('name');
        let idd = await AsyncStorage.getItem('id');
  
        if (!idd||!username) {
          throw new Error('Username or Id is missing.');
        }
        await CreateNotification(`"${username}", You have successfully deleted "${communityName}" Community, including all Community Posts.`, "Community", "Community Deletion Successfull", idd);
        console.log("Notification created successfully.");
      } catch (error) {
        console.error("Error in notification function:", error);
      }
    }
    const handleDelete = () => {
        if (enteredText.trim() === "") {
            showError(true)
            setMessage('Please Enter Exact Community Name to Delete')
            setTimeout(() => {
                showError(false);
            }, 3000);
            return;
        }
        if (enteredText !== communityName) {
            showError(true)
            setMessage('Entered Community Name does not Match')
            setTimeout(() => {
                showError(false);
            }, 3000);
            return;
        }
        if (enteredText === communityName) {
            const deletedAllComm = [...allComm];
            const index = deletedAllComm.findIndex(comm => comm._id === toBeDeleted.id);
            if (index !== -1) {
                deletedAllComm.splice(index, 1);
                setAllCommunities(deletedAllComm);
            }
            setErroneous(false)
            deletingCommunity(id)
            dispatch(setCommunityImage(null));
            notification()
            navigation.pop()
        } else {
            setErroneous(true)
        }
    };

    const [error, showError] = useState(false)
    return (
        <>
            {error ? (
                <Error error={message} />
            ) : null}
            <View style={styles.myCommunities}>
                <View style={{
                    width: "100%",
                    height: 150,
                    flex: 1,
                    backgroundColor: "#f14436",
                    borderTopLeftRadius: 40, borderTopRightRadius: 40
                }}>
                    <TouchableOpacity style={{ backgroundColor: '#f14436', flex: 1 / 3, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "800",
                            fontFamily: "Inter-ExtraBold",
                            color: "#e4e3e3",
                            paddingBottom: 2,

                        }}
                            onPress={handleDelete}
                        >Delete Community</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#d9d9d9', flex: 2 / 3, borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 10 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: "800",
                                        fontFamily: "Calibri",
                                        color: '#373eb2',
                                    }}>Type <Text style={{
                                        color: '#f14436',
                                    }}>"{communityName}"</Text> to Delete the Community</Text>
                                </View>
                            </View>
                            <View style={{ flex: 2 / 3, justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor="white"
                                    onChangeText={handleTextChange}
                                />
                            </View>

                        </View>

                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#f14436',
        color: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 5,
        width: 250,

        height: 35,
        fontSize: 11
    },
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
        width: "100%",
        overflow: "hidden",
        alignItems: "center",
        position: 'absolute',
        bottom: 0,
    },
});

export default DeleteCommunity;