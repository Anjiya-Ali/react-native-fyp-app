import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Dimensions, Text } from "react-native";

const CoverCommunity = (props) => {
    const { image } = props
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
    return (
        <View style={{ flex: 1 / 4, height: 150, justifyContent: 'center' }}>
            <Image
                style={styles.cover}
                resizeMode="cover"
                source={image}
            />
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

export default CoverCommunity;
