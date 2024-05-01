import React, { useState, useEffect, useContext } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import CommunityPostContext from '../context/Posts/CommunityPostContext';

const EditPostCarousel = (props) => {
    const { fileAttach } = props
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
        // Update the local copy when fileAttachments changes
        setLocalFileAttachments([...fileAttachments]);
    }, [fileAttachments]);

    return (
        fileAttach.length === 0 ? (
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
            <View style={{ height: 200, width: 200 }}>
                <Swiper>
                    {fileAttach.map((elem, index) => (
                        <View key={index} style={{ height: 200, width: 200, position: 'relative' }}>
                            <Image source={{ uri: elem }} resizeMode="cover" style={{ height: 200, width: 200 }} />
                            <TouchableOpacity onPress={() => removeItem(index)} style={{ position: 'absolute', top: 5, right: 5 }}>
                                <Image source={require('../assets/deleted.png')} style={{ height: 20, width: 20 }} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </Swiper>
            </View>
        )
    );
};

export default EditPostCarousel;
