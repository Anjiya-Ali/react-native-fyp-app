import React from 'react';
import { StyleSheet, View, FlatList } from "react-native";
import Header from './Header';
import Cards from './Cards';
import CommunityPage from './CommunityPage';
import BottomHeader from './BottomHeader';
import CommunityState from '../context/Community/CommunityState';

function CommunityHandler() {
    const members = [
        { id: 1, name: "Ismail", /* other properties */ },
        { id: 2, name: "Insha Samnani", /* other properties */ },
        { id: 3, name: "Insha Samnani", /* other properties */ },
        { id: 4, name: "Insha Samnani", /* other properties */ },
        { id: 5, name: "Insha Samnani", /* other properties */ },
        { id: 6, name: "Insha Samnani", /* other properties */ },
        { id: 7, name: "Insha Samnani", /* other properties */ },
        { id: 8, name: "Insha Samnani", /* other properties */ },
        { id: 9, name: "Insha Samnani", /* other properties */ },
        { id: 10, name: "Insha Samnani", /* other properties */ },
        { id: 11, name: "Insha Samnani", /* other properties */ },
        { id: 12, name: "Insha Samnani", /* other properties */ },
        { id: 13, name: "Insha Samnani", /* other properties */ },
    ];
    const renderItem = ({ item }) => (
        <Cards name={item.name} />
    );
    return (
        <View style={[styles.container, { backgroundColor: '#e4e3e3' }]}>
            <View style={{ flex: 1 / 5 }}>
                <Header name='Community' subHeading='Mobile App Developer Enthusiasts' />
            </View>
            <View style={{ flex: 4 / 5 }}>
                <CommunityState>
                    <CommunityPage />
                </CommunityState>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CommunityHandler;
