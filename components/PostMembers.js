import React, { useEffect, useState, useContext } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import LockedCommunity from "./LockedCommunity";
import CoverCommunity from "./CoverCommunity";
import CommunityDescription from "./CommunityDescription";
import CommunityContext from '../context/Community/CommunityContext';
import CommunityPostContext from "../context/Posts/CommunityPostContext";
import Posts from "./Posts";
import PostsOriginal from "./PostsOriginal";
import CommunityMembers from "./CommunityMembers";
import CommunityMembersRequested from "./CommunityMembersRequested";
import BottomHeaderMembers from "./BottomHeaderMembers";
import CommunityMembersRendering from "./CommunityMembersRendering";
import PendingCommunityMembersRendering from "./PendingCommunityMembersRendering";
import RealHeader from './RealHeader'
const PostMembers = ({ route }) => {
    const { id, creator,communityName } = route.params || {};
    const [selectedCommunityMem, setSelectedCommunityMem] = useState('Joined');

    const handleCommunityMembersChange = (communityMem) => {
        setSelectedCommunityMem(communityMem);
    };
    const renderCommunityMembers = () => {
        switch (selectedCommunityMem) {
            case 'Joined':
                return <CommunityMembersRendering id={id} creator={creator} />;
            case 'Pending':
                return <PendingCommunityMembersRendering id={id} communityName={communityName}/>;
            default:
                return null;
        }
    };
    const switcher = () => {
        switch (selectedCommunityMem) {
            case 'Joined':
                return <RealHeader
                    heading='All Joined Members'
                />;
            case 'Pending':
                return <RealHeader
                    heading='All Pending Members'
                />;
            default:
                return null;
        }
    };
    return (
        <View style={{ flex: 1 }}>
            {switcher()}
            <ScrollView >
                {renderCommunityMembers()}
            </ScrollView>
            {
                creator === true ? (

                    <BottomHeaderMembers name="Joined" onCommunityChange={handleCommunityMembersChange} />
                ) : (null)
            }
        </View>
    );
};
export default PostMembers;
