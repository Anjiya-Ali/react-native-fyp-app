// CommunityPage.js
import React, { useEffect, useContext } from 'react';
import CommunityCommentContext from '../context/CommunityComments/CommunityCommentContext';
import { ScrollView } from "react-native";
import LikedMembers from './LikedMembers';
import MyCommentsContext from '../context/MyComments/MyCommentsContext';
import RealHeader from './RealHeader'
import Empty from './Empty';
const MyLikedMembersCommentsScreen = ({ route }) => {
    const { postId, commentId } = route.params || {};
    const myCommentsContext = useContext(MyCommentsContext);
    const { likeMyCommentMembers, membersLiked, setMembersLiked, reset } = myCommentsContext
    useEffect(() => {
        likeMyCommentMembers(postId, commentId);
        return () => {
            reset()
        }
    }, []);

    return (
        <>
            <RealHeader heading="Liked Comment Members" />
            <ScrollView>
                {membersLiked.length === 0 ? (
                    <Empty message="No one has liked the Comment :)" top={10} />
                ) : (
                    <ScrollView>
                        {membersLiked.map((elem) => (
                            <LikedMembers name={elem.first_name + ' ' + elem.last_name} key={elem._id} />
                        ))}
                    </ScrollView>
                )}
            </ScrollView>
        </>
    );
};

export default MyLikedMembersCommentsScreen;
