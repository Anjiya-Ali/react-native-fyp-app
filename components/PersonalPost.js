import React, { useEffect, useState, useContext } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import PersonalContent from "./PersonalContent";
import PersonalContentOriginal from "./PersonalContentOriginal";
import PersonalPostContext from '../context/PersonalPosts/PersonalPostContext';
import CreateMyOwnPosts from "./CreateMyOwnPosts";
import RealHeader from './RealHeader'
import CommunityContext from "../context/Community/CommunityContext";

const PersonalPost = () => {
    const personalPostContext = useContext(PersonalPostContext);
    const { allPosts, getPersonalPosts,loggedIn } = personalPostContext;


    useEffect(() => {
        getPersonalPosts();
    }, []);

    useEffect(() => {
    }, [allPosts]);
    return (
        <View style={{ flex: 1 }}>
            <RealHeader
                heading="My Posts"
            />
            <ScrollView>
                <CreateMyOwnPosts />

                {!allPosts.length === 0 ? (
                    <View>
                        {/* Render a loading indicator or message */}
                        <Text>Loading posts...</Text>
                    </View>
                ) : (
                    allPosts.map((elem) => (
                        elem.file_attachments && elem.file_attachments.length !== 0 ? (
                            <PersonalContentOriginal
                                key={elem._id}
                                name={elem.name}
                                dp={require('../assets/Insha.png')}
                                date={elem.date}
                                comments={elem.commentsCount}
                                description={elem.description}
                                likes={elem.total_likes}
                                image={require('../assets/Certificate.png')}
                                postId={elem._id}
                                isBlue={elem.like_members.includes(loggedIn)}
                                file_attachments={elem.file_attachments}
                                memberIn={elem.poster === loggedIn}
                            />
                        ) : (
                            <PersonalContent
                                key={elem._id}
                                name={elem.name}
                                dp={require('../assets/Insha.png')}
                                date={elem.date}
                                comments={elem.commentsCount}
                                description={elem.description}
                                likes={elem.total_likes}
                                postId={elem._id}
                                isBlue={elem.like_members.includes(loggedIn)}
                                memberIn={elem.poster === loggedIn}
                            />
                        )
                    ))

                )}
            </ScrollView>
        </View>
    );
};
export default PersonalPost;
