import React, { useState, useEffect, useContext } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import CommunityPostContext from '../context/Posts/CommunityPostContext';

import MainConfig from '../MainConfig';

const MyCarousel = (props) => {
    const { fals } = props;
    const lHost = MainConfig.localhost;
    const communityPostContext = useContext(CommunityPostContext);
    const { fileAttachments, setFileAttachments } = communityPostContext;

    // Create a local copy of fileAttachments
    const [localFileAttachments, setLocalFileAttachments] = useState([...fileAttachments]);

    const removeItem = (indexToRemove) => {
        // Update the local copy
        const updatedLocalAttachments = localFileAttachments.filter((_, index) => index !== indexToRemove);
        setLocalFileAttachments(updatedLocalAttachments);

        // Update the global state
        setFileAttachments(updatedLocalAttachments);
    };

    useEffect(() => {
        setLocalFileAttachments([...fileAttachments]);
    }, [fileAttachments]);

    return (
        localFileAttachments.length === 0 ? (
            <View style={{ flex: 1, backgroundColor: '#94D82D', justifyContent: 'center', alignItems: 'center', width: '100%', marginVertical: 10 }}>
                <Image
                    style={{
                        height: 50,
                        width: 50,
                        marginVertical: 5
                    }}
                    source={require('../assets/defaultCover.png')}
                />
                <Text style={{
                    marginVertical: 5,
                    fontSize: 15,
                    fontWeight: "300",
                    fontFamily: "Calibri",
                    color: 'white',
                }}>Your Uploaded Media</Text>
            </View>
        ) : (
            <View style={{ height: 220, width: 200, marginVertical: 10 }}>
                <Swiper>
                    {localFileAttachments.map((elem, index) => (
                        <View key={index} style={{ height: 200, width: 200, position: 'relative' }}>
                            <Image source={elem[0] === 'U'
                                ? { uri: `${lHost}/${elem}` }
                                : { uri: elem }} resizeMode="cover" style={{ height: 200, width: 200 }} />


                            {
                                fals !== false ? (

                                    <TouchableOpacity onPress={() => removeItem(index)} style={{ position: 'absolute', top: 5, right: 5 }}>
                                        <Image source={require('../assets/deleted.png')} style={{ height: 20, width: 20 }} />
                                    </TouchableOpacity>
                                ) : (<View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255, 0, 0, 0.5)' }} />
                                )
                            }
                        </View>
                    ))}
                </Swiper>
                {
                    !fals ? (
                        <View style={{ marginVertical: 10 }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 14,
                                    fontWeight: "800",
                                    fontFamily: "Inter-ExtraBold",
                                    color: "black",
                                    paddingBottom: 2,
                                }}
                            >The Post Images are not Editable</Text>
                        </View>) : (null)

                }
            </View>
        )
    );
};

export default MyCarousel;
