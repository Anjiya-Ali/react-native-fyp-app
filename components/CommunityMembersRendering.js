import React, { useEffect, useState, useContext } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import CommunityContext from '../context/Community/CommunityContext';
import CommunityPostContext from "../context/Posts/CommunityPostContext";

import CommunityMembers from "./CommunityMembers";


const CommunityMembersRendering = (props) => {
    const { creator } = props
    const communityContext = useContext(CommunityContext);
    const { joinedMembers, joinedMem, setJoinedMembers } = communityContext
    useEffect(() => {
        if (joinedMem === null) {
            joinedMembers(props.id)
        }
    }, [joinedMem]);
    useEffect(() => {
        return (() => {
            setJoinedMembers(null)
        })
    }, []);

    return (
        <>
            {
                joinedMem && joinedMem.map((elem) => {
                    return (
                        <CommunityMembers key={elem._id} name={elem.first_name + ' ' + elem.last_name} bioInfo="is part of the community" accId={elem._id} id={props.id} id2={elem._id} creator={creator} memberId={elem._id} />
                    )
                })
            }
        </>
    );
};
export default CommunityMembersRendering;
