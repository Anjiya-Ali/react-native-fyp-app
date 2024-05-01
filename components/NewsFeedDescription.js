import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, ImageBackground } from "react-native";

const NewsFeedDescription = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
    });
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
        <>
            <View style={{ flex: 1 / 4, backgroundColor: 'white', height: 60, flexDirection: 'row' }}>

                <View style={{ flex: 2 / 3, justifyContent: 'center' }}>
                    <Text style={{
                        left: 20, fontSize: 40,
                        fontWeight: "900",
                        fontFamily: "Inter-ExtraBold",
                        color: "#373EB2",
                    }}>Posts Feed</Text>
                </View>
                <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'flex-end', right: 20 }}>
                    <Image
                        style={{
                            width: 40,
                            height: 40,

                        }}
                        source={require('../assets/NewsFeed.png')}
                    />
                </View>
            </View>

        </>
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

export default NewsFeedDescription;
