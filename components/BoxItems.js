import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

const BoxItems = (props) => {
    const { image } = props;

    const pressed = () => {
        console.warn('hi');
    };

    return (
        <View style={{ height: 200, width: 200 }}>
            <Image
                source={image}
                resizeMode="cover"
                style={{ height: 200, width: 200 }}
            />
            <TouchableOpacity onPress={pressed} style={{ position: 'absolute', left: 175, top: 5 }}>
                <Image
                    source={require('../assets/deleted.png')}
                    resizeMode="cover"
                    style={{ height: 20, width: 20 }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default BoxItems;
