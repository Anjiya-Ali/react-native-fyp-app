import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
const Empty = (props) => {
    const { message, top } = props;
    return (
        <View style={[styles.myCommunities, { top: top ? top : 0 }]}>
            <View
                style={{
                    width: "100%",
                    flex: 1,
                    backgroundColor: 'white',
                }}
            >

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{
                            top: 10,
                            borderRadius: 50,
                            borderColor: 'black',
                            borderWidth: 1,
                            width: 200,
                            height: 200,
                        }}
                        source={require('../assets/Empty.png')}
                    />
                </View>
                <View style={{ justifyContent: 'center', alignItems: "center", height: 100 }}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "800",
                            fontFamily: "Calibri",
                            color: 'red',
                        }}
                    >Sorry, <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "300",
                            fontFamily: "Calibri",
                            color: 'black',
                        }}
                    > {message}</Text></Text>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    myCommunities: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
});

export default Empty;
