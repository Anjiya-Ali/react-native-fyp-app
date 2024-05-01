import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Dimensions, Text } from "react-native";

const LockedCommunity = () => {
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
        <View style={{ flex: 2 / 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <View style={{ height: 30, width: 30 }}>
                <Image
                    style={styles.lock}
                    resizeMode="cover"
                    source={require("../assets/communityLock.png")}
                />
            </View>
            <View style={{ height: 30, width: 60, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.lockText]}>LOCKED</Text>
            </View>
        </View>

    );
};
const styles = StyleSheet.create({
    cover: {
        height: 128,
        width: 360,
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

export default LockedCommunity;
