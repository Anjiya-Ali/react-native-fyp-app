import React, { useEffect, useState } from "react";
import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";

const CommentsReply = (props) => {
    const handleReadMore = () => {
        console.warn('Hi')
    };
    return (
        <View style={styles.myCommunities}>
            <View style={{
                width: "100%",
                height: 55,
                flex: 1,
                backgroundColor: "white",
                flexDirection: 'row'
            }}>
                <View style={{ backgroundColor: 'red', flex: 3 / 14, justifyContent: 'center', alignItems: 'flex-end', marginRight: 5 }}>
                    <Image
                        style={{
                            borderRadius: 50,
                            width: 40,
                            height: 40,
                        }}
                        source={require('../assets/Insha.png')}
                    />
                </View>
                <View style={{ flex: 10 / 14, backgroundColor: 'purple' }}>
                    <View style={{ flex: 1 / 4, justifyContent: 'flex-end' }}>
                        <Text style={{
                            fontSize: 10,
                            fontWeight: "800",
                            fontFamily: "Calibri",
                            color: 'black'
                        }}>Insha Samnani</Text>
                    </View>
                    <View style={{ flex: 2 / 4, justifyContent: 'center' }}>
                        <Text style={{
                            fontSize: 11,
                            fontWeight: "500",
                            fontFamily: "Calibri",
                            color: 'black',
                        }}>🎓 Proud to #DataAnalyti🎓 Proud to announce my achievement! 🚀 I have officially earned the Data</Text>
                    </View>
                    <View style={{ backgroundColor: 'yellow', flex: 1 / 4, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                fontSize: 10,
                                fontWeight: "100",
                                fontFamily: "Calibri",
                                color: 'black'
                            }}>Reply</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 / 14, backgroundColor: 'red' }}>
                    <View style={{ flex: 2 / 3, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{
                                width: 20,
                                height: 20
                            }}
                            source={require('../assets/Heart.png')}
                        />
                    </View>
                    <View style={{ flex: 1 / 3, backgroundColor: 'blue', alignItems: 'center' }}>
                        <Text
                            style={{
                                fontSize: 9,
                                fontWeight: "100",
                                fontFamily: "Calibri",
                                color: 'black'
                            }}
                        >(1)</Text>
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
        // paddingVertical: 10,
    },
});

export default CommentsReply;
