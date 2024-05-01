import * as React from "react";
import { Text, StyleSheet, View, ImageBackground } from "react-native";

const CommunitiesList = (props) => {
    const { image, communityName } = props
    return (
        <View style={styles.myCommunities}>
            <ImageBackground
                style={[styles.myCommunitiesInner, styles.myCommunitiesInnerFlexBox]}
                resizeMode="cover"
                source={image}
            >
                <View style={[styles.upperStyle, { backgroundColor: '#373eb2', height: 30, paddingRight: 6, paddingLeft: 6, position: 'absolute', justifyContent: 'center' }]}>
                    <Text style={[{ color: 'white', padding: 2 }, styles.upperHeading]}>{communityName}</Text>
                </View>
            </ImageBackground>
        </View>
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
        backgroundColor: "#e4e3e3",
        flex: 1,
        width: "100%",
        overflow: "hidden",
        alignItems: "center",
        paddingVertical: 10,
    },
});

export default CommunitiesList;
