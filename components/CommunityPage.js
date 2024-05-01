// CommunityPage.js
import React, { useState } from 'react';
import { View } from 'react-native';
import BottomHeader from './BottomHeader';
import AllCommunities from './AllCommunities';
import JoinedCommunities from './JoinedCommunties';
import PendingCommunities from './PendingCommunities';
import SearchBar from './SearchBar';
const CommunityPage = () => {
    const [selectedCommunity, setSelectedCommunity] = useState('All');

    const handleCommunityChange = (community) => {
        setSelectedCommunity(community);
    };
    const renderCommunity = () => {
        switch (selectedCommunity) {
            case 'All':
                return <AllCommunities />;
            case 'Joined':
                return <JoinedCommunities />;
            case 'Pending':
                return <PendingCommunities />;
            default:
                return null;
        }
    };
    return (
        <View style={{ flex: 1 }}>
            {renderCommunity()}
            <BottomHeader name={selectedCommunity} onCommunityChange={handleCommunityChange} />
        </View>
    );
};

export default CommunityPage;
