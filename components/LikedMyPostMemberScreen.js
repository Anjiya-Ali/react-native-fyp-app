// CommunityPage.js
import React, { useEffect, useContext } from 'react';

import { ScrollView } from "react-native";
import LikedMembers from './LikedMembers';
import PersonalPostContext from '../context/PersonalPosts/PersonalPostContext';
import RealHeader from './RealHeader'
const LikedMyPostMemberScreen = ({ route }) => {
    const { postId } = route.params || {};
    const personalPostContext = useContext(PersonalPostContext);
    const { likedMembersMyPost, likedMembers, resetLikedMembers } = personalPostContext
    useEffect(() => {
        likedMembersMyPost(postId);
        return () => {
            resetLikedMembers()

        }
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <RealHeader
                heading="Liked Members"
            />
            <ScrollView>
                {
                    likedMembers.map((elem) => {
                        return (
                            <LikedMembers name={elem.first_name + ' ' + elem.last_name} key={elem._id} />
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

export default LikedMyPostMemberScreen;
