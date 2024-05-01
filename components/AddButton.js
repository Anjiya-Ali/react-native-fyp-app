import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity } from "react-native";

const AddButton = (props) => {
    const { text, onCancel, onJoin } = props
    const [windowDimensions, setWindowDimensions] = useState({
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
    });
    const imageRender=()=>{
        if(text==='Pending'){
            return require('../assets/Pending.png')
        }
        if(text==='Joined'){
            return require('../assets/Joined.png')
        }
        if(text==='Join'){
            return require('../assets/Join.png')
        }
    }
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
    const handleFunc = () => {
        if (text === 'Joined') {
            onCancel();
        }
        if (text === 'Join') {
            onJoin();
        }

    }
    return (
        <View style={{ flex: 1 / 2, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 10 }}>
            <View style={{ backgroundColor: text === "Joined" ? 'red' : '#373eb2', height: 30, width: 30, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}>
                <Image
                    style={{ height: 20, width: 20 }}
                    resizeMode="cover"
                    source={imageRender()}
                />
            </View>
            <TouchableOpacity onPress={handleFunc} style={{ backgroundColor: text === "Joined" ? 'red' : '#373eb2', height: 30, width: 60, justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>
                <Text style={[styles.kMembers, { color: 'white', fontSize: 13 }]}>{text === 'Joined' ? "Leave" : text}</Text>
            </TouchableOpacity>
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

export default AddButton;
