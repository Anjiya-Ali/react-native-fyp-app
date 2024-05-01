// CommunityPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
const SearchBar = (props) => {
    const { text, value, onChangeText } = props;
    return (
        <View style={{ height: 50 }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#d9d9d9',
                    marginVertical: 2,
                    marginHorizontal: 20,
                    borderRadius: 50,
                    borderColor: 'black',
                    borderWidth: 1,
                    flexDirection: 'row',
                    marginTop: 5
                }}>

                <View style={{ flex: 7.5 / 9, justifyContent: 'center', left: 10 }}>
                    <TextInput style={{ color: 'black', fontSize: 14 }}
                        placeholderTextColor="black"
                        placeholder={text}
                        value={value}
                        onChangeText={onChangeText}
                    />
                </View>
                <View style={{ flex: 1.5 / 9, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        style={{
                            borderRadius: 50,
                            width: 30,
                            height: 30,
                        }}
                        source={require('../assets/Search.png')}
                    />
                </View>

            </View>
        </View>
    );
};

export default SearchBar;
