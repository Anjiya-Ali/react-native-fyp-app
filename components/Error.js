import React, { useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const Error = ({ error }) => {
    // const [error, setError] = useState(null);

    return (
        error && (
            <>

                <Image
                    style={{
                        width: 50, height: 50, position: 'absolute',
                        top: 85,
                        left: 50,
                        zIndex: 2
                    }}
                    resizeMode="cover"
                    source={require("../assets/alert.png")}
                />
                <View style={styles.errorContainer}>


                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </>
        )
    );
};

const styles = StyleSheet.create({
    errorContainer: {
        position: 'absolute',
        height: 40,
        top: 80,
        width: '80%',
        right: 0,
        backgroundColor: 'red',
        padding: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginVertical: 10,
        justifyContent: 'center',
        zIndex:1
    },
    errorText: {
        color: 'white',
        textAlign: 'center',
        paddingLeft: 15
    },
});

export default Error;
