import React, { useEffect, useState } from "react";
import { Image, Text, StyleSheet, View, ImageBackground, TouchableOpacity } from "react-native";
import MyCarousel from "./MyCarousel";

const EditablePostCardMy = (props) => {
    const { description } = props
    const handleReadMore = () => {
        console.warn('Hi')
    };
    return (
        <View style={styles.myCommunities}>
            <View style={{
                width: "100%",
                // height: 300,
                flex: 1,
                backgroundColor: "white",
                justifyContent: 'center'
            }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                    <Text
                        style={{
                            fontSize: 40,
                            fontWeight: "800",
                            fontFamily: "Calibri",
                            color: '#373eb2',
                        }}
                    >Preview</Text>
                </View>
                <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 15 }}>
                    <Text
                        style={{
                            fontSize: 12,
                            fontWeight: "300",
                            fontFamily: "Calibri",
                            color: 'black',
                            marginVertical: 10
                        }}
                    >{description || "Your Description to the Community Post"}</Text>
                </View>
                <View style={{ flex: 2 / 3, justifyContent: 'center', alignItems: 'center' }}>
                    <MyCarousel fals={false} />
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

export default EditablePostCardMy;