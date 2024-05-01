// CommunityPage.js
import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import RealHeader from './RealHeader';
import { useNavigation } from "@react-navigation/native";

const ELearning = () => {
    
  const navigation = useNavigation();
    const goToComm = () => {
        navigation.navigate("CommunitySearch");
    }
    const goToCour = () => {
        navigation.navigate("Categories");
    }
    const goToTeach = () => {
        navigation.navigate("Teachers");
    }
    const slideAnim = useRef(new Animated.Value(500)).current; 

    useEffect(() => {
        Animated.timing(
            slideAnim,
            {
                toValue: 0,
                duration: 1000, 
                useNativeDriver: true,
            }
        ).start();
    }, [slideAnim]);

    return (
        <View style={{ flex: 1 }}>
            <RealHeader
                heading="E-Learning"
            />
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity style={{ position: 'absolute' }} onPress={goToComm}>
                    <Image
                        style={{
                            height: 140,
                            width: 140
                        }}
                        source={require("../assets/Communities.png")}
                    />
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: "900",
                        fontFamily: "Inter-ExtraBold",
                        color: '#373eb2'
                    }}>Communities</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', left: 1, top: 120 }} onPress={goToTeach}>
                    <Image
                        style={{
                            height: 140,
                            width: 140
                        }}
                        source={require("../assets/Teachers.png")}
                    />

                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: "900",
                        fontFamily: "Inter-ExtraBold",
                        color: '#373eb2'
                    }}>Teachers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', right: 1, top: 120 }} onPress={goToCour}>
                    <Image
                        style={{
                            height: 140,
                            width: 140
                        }}
                        source={require("../assets/Courses.png")}
                    />

                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: "900",
                        fontFamily: "Inter-ExtraBold",
                        color: '#373eb2'
                    }}>Courses</Text>
                </TouchableOpacity>
                <View style={{ position: 'absolute', bottom: 0 }}>
                    <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
                        <Image
                            style={{
                                height: 400,
                                width: 250
                            }}
                            source={require("../assets/eLearn.png")}
                        /></Animated.View>

                </View>
                <View style={{
                    position: 'absolute', bottom: 0, zIndex: 1, backgroundColor: '#373eb2', position: 'absolute', bottom: 0, height: 100, width: '100%',
                    backgroundColor: "#373eb2",
                    borderTopLeftRadius: 40, borderTopRightRadius: 40,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{ width: '80%' }}>

                        <Text
                            style={{
                                marginTop: 3,
                                padding: 5,
                                fontSize: 30,
                                fontWeight: "800",
                                fontFamily: "Inter-ExtraBold",
                                color: "white",
                                zIndex: 1,
                                textAlign: 'center'
                            }}

                        >From where do you want to Start ?</Text>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default ELearning;
