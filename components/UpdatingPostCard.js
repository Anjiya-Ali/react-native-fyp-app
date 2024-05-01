import React, { useEffect, useState } from "react";
import { Image, Text, StyleSheet, View, ImageBackground, TouchableOpacity } from "react-native";
import Swiper from 'react-native-swiper';
import BoxItems from "./BoxItems";

const UpdatingPostCard = () => {
    const handleReadMore = () => {
        console.warn('Hi')
    };
    return (
        <View style={styles.myCommunities}>
            <View style={{
                width: "100%",
                height: 300,
                flex: 1,
                backgroundColor: "white",
                justifyContent: 'center'
            }}>
                <View style={{ flex: 0.75 / 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        style={{

                            fontSize: 13,
                            fontWeight: "500",
                            color: "black",
                            paddingHorizontal: 10
                        }}
                    >Description Likhdena hai yahan pe</Text>
                </View>
                <View style={{ flex: 2 / 3, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ height: 200, width: 200 }}>
                        <Swiper >
                            <BoxItems image={require('../assets/Certificate.png')} />
                            <BoxItems image={require('../assets/Certificate.png')} />
                            <BoxItems image={require('../assets/Certificate.png')} />
                            <BoxItems image={require('../assets/Certificate.png')} />
                            <BoxItems image={require('../assets/Certificate.png')} />
                            <BoxItems image={require('../assets/Certificate.png')} />
                            <BoxItems image={require('../assets/Certificate.png')} />
                        </Swiper>
                    </View>
                </View>

            </View>
        </View >
    );
};

const styles = StyleSheet.create({
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
        paddingVertical: 10,
    },
});

export default UpdatingPostCard;