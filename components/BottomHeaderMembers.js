import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

const BottomHeaderMembers = (props) => {
    const { name, onCommunityChange } = props
    const [rendered, setRendered] = useState(name)
    const handleJoin = () => {
        onCommunityChange('Joined')
        setRendered('Joined')
    }
    const handlePending = () => {
        onCommunityChange('Pending')
        setRendered('Pending')
    }
    return (
        <View style={styles.myCommunities}>
            <View style={{
                width: "100%",
                height: 50,
                flex: 1,
                backgroundColor: "#373eb2",
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,


            }}>
                <View style={{ flex: 2 / 3, flexDirection: 'row' }}>


                    <TouchableOpacity onPress={handleJoin} style={{ flex: 1 / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: "800",
                            fontFamily: "Calibri",
                            color: 'white',
                        }}>
                            Joined
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePending} style={{ flex: 1 / 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: "800",
                            fontFamily: "Calibri",
                            color: 'white',
                        }}>
                            Pending
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 / 2, justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row' }}>

                    <View style={{ flex: 1 / 2, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            rendered === 'Joined' ?
                                <Image
                                    style={{
                                        borderRadius: 50,
                                        width: 10,
                                        height: 10,
                                        bottom: 5
                                    }}
                                    source={require('../assets/Circle.png')}
                                /> : null
                        }
                    </View>
                    <View style={{ flex: 1 / 2, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            rendered === 'Pending' ?
                                <Image
                                    style={{
                                        borderRadius: 50,
                                        width: 10,
                                        height: 10,
                                        bottom: 5
                                    }}
                                    source={require('../assets/Circle.png')}
                                /> : null
                        }
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
        position: 'absolute',
        bottom: 0,

    },
});

export default BottomHeaderMembers;
