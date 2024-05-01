import React, { useState, useContext, useEffect} from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import MainConfig from '../MainConfig';
import UserContext from "../context/User/userContext";

const Approve = (props) => {
    const { name, communityName, id2 } = props
    const host = MainConfig.localhost;
    const context = useContext(UserContext);
    const { getProfilePicForOther } = context;
    const [imageUri, setImageUri] = useState(null);
  
    useEffect(() => {
      const fetchImageUri = async () => {
        try {
          const uri = await getProfilePicForOther(id2);
          setImageUri(`${host}/${uri}`);
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      };
  
      fetchImageUri();
    }, [id2]);
    const lower = name.toLowerCase()
    const spaceremoved = lower.replace(/\s/g, '');
    return (
        <View style={styles.myCommunities}>
            <View style={{
                width: "100%",
                height: 55,
                flex: 1,
                backgroundColor: "#94D82D",
                flexDirection: 'row'
            }}>
                <View style={{ flex: 1 / 4, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{
                            borderRadius: 50,
                            width: 40,
                            height: 40,
                        }}
                        source={{
                            uri: imageUri
                        }} />
                </View>
                <View style={{ flex: 3 / 4, justifyContent: 'center' }}>
                    <View style={{ flex: 1 / 3, justifyContent: 'flex-end' }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: "800",
                                fontFamily: "Calibri",
                                color: 'white',
                            }}
                        >{name}</Text>
                    </View>
                    <View style={{ flex: 2 / 3 }}>
                        <Text
                            style={{
                                fontSize: 11,
                                fontWeight: "300",
                                fontFamily: "Calibri",
                                color: 'black',
                            }}
                        >has sucessfully joined <Text style={{
                            fontSize: 14,
                            fontWeight: "800",
                            fontFamily: "Calibri",
                            color: 'white',
                        }}>{communityName}</Text></Text>
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
        marginVertical: 5
    },
});

export default Approve;
