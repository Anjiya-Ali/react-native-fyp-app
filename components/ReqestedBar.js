import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import CommunityContext from "../context/Community/CommunityContext";
const RequestedBar = (props) => {
    // const { removeClicked, id, accId } = props

    return (
        <View style={styles.myCommunities}>
            <View style={{
                width: "100%",
                height: 45,
                flex: 1,
                backgroundColor: "#94D82D",
                flexDirection: 'row'
            }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 2 / 3, justifyContent: 'center' }}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: "800",
                            fontFamily: "Calibri",
                            color: 'white',
                            paddingLeft: 10
                        }}>Requested for Approval</Text>
                    </View>
                    <View style={{ flex: 2 / 3, flexDirection: 'row', alignItems: 'center' }}>
                        <View >
                            <Text
                                style={{
                                    paddingLeft: 10,
                                    fontSize: 11,
                                    fontWeight: "500",
                                    fontFamily: "Calibri",
                                    color: 'black',
                                }}
                            >Please Hang Tightly, We have Notified</Text>
                        </View>
                        <View>
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: "800",
                                    fontFamily: "Calibri",
                                    color: 'white',
                                }}
                            > Community's Creator</Text>
                        </View>
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
        flex: 0.5,
        width: "100%",
        overflow: "hidden",
        alignItems: "center",
        marginVertical: 5
    },
});

export default RequestedBar;
