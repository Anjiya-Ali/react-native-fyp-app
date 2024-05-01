import React, { useState, useEffect, useContext } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import CommunityPostContext from '../context/Posts/CommunityPostContext';

import MainConfig from '../MainConfig';
const lHost = MainConfig.localhost;

const PostCarousel = (props) => {
    const { fileAttachments } = props
    return (
        <View style={{ height: 200, width: 200 }}>
            <Swiper>
                {fileAttachments.map((elem, index) => (
                    <View key={index} style={{ height: 200, width: 200 }}>
                        <Image source={{ uri: `${lHost}/${elem} ` }} resizeMode="cover" style={{ height: 200, width: 200 }} />
                    </View>
                ))}
            </Swiper>
        </View>
    )

};

export default PostCarousel;
