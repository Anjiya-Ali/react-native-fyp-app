import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity,ScrollView } from "react-native";
import PersonalContent from "./PersonalContent";
import RealHeader from "./RealHeader";
const Temporary = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <RealHeader heading="Post's Feed" />
            <ScrollView>
                <PersonalContent
                    name="asasfaf"
                    dp={require("../assets/Insha.png")}
                    date="{elem.post_id.date}"
                    comments="1"
                    description="{elem.post_id.description}"
                    likes="2"
                    image={require("../assets/Certificate.png")}
                    postId="{elem.post_id._id}"
                    isBlue=""
                />
            </ScrollView>

        </View>

    );
};
export default Temporary;
