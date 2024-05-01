import React, { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';
import { setCommunityImage } from '../redux/action';
import ImagePicker from 'react-native-image-crop-picker';
import CommunityContext from "../context/Community/CommunityContext";
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from 'react-redux';
import Error from "./Error";

const UpdateCommunity = ({ dispatchSetCommunityImage, communityName, communityDescription, setName, setDescription, setCImage, cImage }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    let pickedImage;

    const communityContext = useContext(CommunityContext);
    const { updatingCommunity, community, allComm, setAllCommunities } = communityContext
    const [path, setPath] = useState(null)
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        try {
            const pickedImage = await ImagePicker.openPicker({
                width: 375,
                height: 125,
                cropping: true,
                cropperStatusBarColor: '#373eb2',
                cropperActiveWidgetColor: '#373eb2',
                cropperToolbarColor: '#d9d9d9',
                cropperToolbarWidgetColor: '#373eb2'
            });

            setImage(pickedImage.path);
            dispatchSetCommunityImage(pickedImage.path);
            return pickedImage;
        } catch (error) {
            console.log('Error picking image:', error);
        }
    };

    const imageUploader = async () => {
        const imgPath = await pickImage()
        setCImage(imgPath.path)
        setPath(imgPath)
    }
    const cName = communityName
    const desc = communityDescription

    const [error, showError] = useState(false)
    const [message, setMessage] = useState('')
    const [initialCommunityName, setInitialCommunityName] = useState('');
    const [initialCommunityDescription, setInitialCommunityDescription] = useState('');

    useEffect(() => {
        setInitialCommunityName(communityName);
        setInitialCommunityDescription(communityDescription);
    }, []);

    const handleUpdation = () => {
        if (!communityName || communityName.trim() === "") {
            showError(true)
            setMessage('Please Enter a Community Name')
            setTimeout(() => {
                showError(false);
            }, 3000);
            return;
        }
        if (communityName.length < 3) {
            showError(true)
            setMessage('Community Name must be 3 characters long')
            setTimeout(() => {
                showError(false);
            }, 3000);
            return;
        }
        if (!communityDescription || communityDescription.trim() === "") {
            setMessage('Please Enter Community Description')
            showError(true);
            setTimeout(() => {
                showError(false);
            }, 3000);

            return;
        }
        if (initialCommunityName === communityName && initialCommunityDescription === communityDescription) {
            setMessage('You have not Updated anything')
            showError(true);
            setTimeout(() => {
                showError(false);
            }, 3000);

            return;
        }
        if (!path) {
            setMessage('Please Upload a New Community Cover')
            showError(true);
            setTimeout(() => {
                showError(false);
            }, 3000);

            return;
        }

        const updatedAllComm = [...allComm];
        const index = updatedAllComm.findIndex(comm => comm._id === community.id);
        if (index !== -1) {
            updatedAllComm[index].community_name = communityName;
            setAllCommunities(updatedAllComm);
        }
        if (path) {
            updatingCommunity(community.id, communityName, communityDescription, path)
        }
        else {
            updatingCommunity(community.id, communityName, communityDescription)
        }
        dispatch(setCommunityImage(null));
        navigation.pop()
    }
    return (
        <>
            {error ? (
                <Error error={message} />
            ) : null}
            <View style={styles.myCommunities}>
                <View style={{
                    width: "100%",
                    height: 300,
                    flex: 1,
                    backgroundColor: "#373eb2",
                    borderTopLeftRadius: 40, borderTopRightRadius: 40
                }}>
                    <TouchableOpacity onPress={handleUpdation} style={{ backgroundColor: '#373eb2', flex: 1 / 8, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "800",
                            fontFamily: "Inter-ExtraBold",
                            color: "#e4e3e3",
                            paddingBottom: 2,
                        }}>Update Community</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: '#d9d9d9', flex: 7 / 8, borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingTop: 10 }}>
                        <View style={{ flex: 1 / 4 }}>
                            <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: "800",
                                    fontFamily: "Calibri",
                                    color: '#373eb2',
                                }}>Community Name</Text>
                            </View>
                            <View style={{ flex: 2 / 3, justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Community Name"
                                    placeholderTextColor="white"

                                    value={communityName}
                                    onChangeText={(text) => setName(text)}
                                />
                            </View>

                        </View>
                        <View style={{ flex: 2 / 4 }}>
                            <View style={{ flex: 1 / 6, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: "800",
                                    fontFamily: "Calibri",
                                    color: '#373eb2',
                                }}>Community Description</Text>
                            </View>
                            <View style={{ flex: 5 / 6, justifyContent: 'center', alignItems: 'center' }}>
                                <TextInput
                                    style={[styles.input, { height: 100 }]}
                                    placeholder="Enter Community Description"
                                    placeholderTextColor="white"

                                    value={communityDescription}
                                    onChangeText={(text) => setDescription(text)}
                                />
                            </View>
                        </View>

                        <View style={{ flex: 1 / 4, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{
                                height: 40, width: 150, backgroundColor: '#373eb2', justifyContent: 'center', borderRadius: 40,
                                borderWidth: 1,
                                borderColor: 'black',
                            }}
                                onPress={imageUploader}
                            >
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: "800",
                                    fontFamily: "Calibri",
                                    color: 'white',
                                    textAlign: 'center'
                                }}>Upload Cover</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#373eb2',
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

const mapDispatchToProps = (dispatch) => ({
    dispatchSetCommunityImage: (imagePath) => dispatch(setCommunityImage(imagePath)),
});

export default connect(null, mapDispatchToProps)(UpdateCommunity);