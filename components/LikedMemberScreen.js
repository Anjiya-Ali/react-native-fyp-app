// CommunityPage.js
import React, { useEffect, useContext } from 'react';

import { ScrollView, View } from "react-native";
import LikedMembers from './LikedMembers';
import CommunityPostContext from '../context/Posts/CommunityPostContext';
import RealHeader from './RealHeader'
const LikedMemberScreen = ({ route }) => {
    const { id, postId } = route.params || {};
    const communityPostContext = useContext(CommunityPostContext);
    const { likedMembersCommunityPost, likedMembers, resetLikedMembers } = communityPostContext
    useEffect(() => {
        likedMembersCommunityPost(id, postId);
        return () => {
            resetLikedMembers()
        }
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <RealHeader
                heading='Liked Members'
            />
            <ScrollView>
                {
                    likedMembers.map((elem) => {
                        return (
                            <LikedMembers name={elem.first_name + ' ' + elem.last_name} key={elem._id} id2={elem._id} />
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

export default LikedMemberScreen;
