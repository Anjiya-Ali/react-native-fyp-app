import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { connect } from 'react-redux';
import MainConfig from '../MainConfig';

const CreateCommunityShowCaser = ({ communityImager, name, description }) => {

    const lHost = MainConfig.localhost;

    return (
        <ScrollView>
            <View style={styles.myCommunities}>
                <View style={{
                    width: "100%",
                    // height: 350,
                    backgroundColor: "white"
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
                    <View style={{ flex: 1 / 6, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "800",
                                fontFamily: "Calibri",
                                color: '#373eb2',
                            }}
                        >{name || "Your Community Name"}</Text>
                    </View>

                    <View style={{ flex: 3 / 6, alignItems: 'center', marginVertical: 10 }}>
                        {communityImager ? (
                            <Image
                                style={{
                                    height: 125,
                                    width: 375,
                                }}
                                resizeMode="cover"
                                source={{ uri: `${lHost}/${communityImager}` }}
                            />
                        ) : (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#94D82D', width: '100%' }}>
                                <Image
                                    style={{
                                        height: 50,
                                        width: 50,
                                        marginVertical: 5,
                                    }}
                                    source={require('../assets/defaultCover.png')}
                                />
                                <Text style={{
                                    marginVertical: 5,
                                    fontSize: 15,
                                    fontWeight: "300",
                                    fontFamily: "Calibri",
                                    color: 'white',
                                }}>Your Uploaded Cover Photo</Text>
                            </View>
                        )}

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
                        >{description || "Your Description to the Community"}</Text>
                    </View>
                </View>
            </View >
        </ScrollView >
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
        marginVertical: 5
    },
});

const mapStateToProps = (state) => ({
    communityImage: state.community.communityImage,
});

export default connect(mapStateToProps)(CreateCommunityShowCaser);