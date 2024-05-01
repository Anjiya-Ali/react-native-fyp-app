import React, { useEffect, useState, useContext } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import CommunityContext from '../context/Community/CommunityContext';
import Empty from "./Empty";

import CommunityMembersRequested from "./CommunityMembersRequested";
const PendingCommunityMembersRendering = (props) => {
    const communityContext = useContext(CommunityContext);
    const { pendingMembers, pendMem, message, setPendingMembers } = communityContext
    useEffect(() => {
        if (pendMem === null) {
            pendingMembers(props.id)
        }
    }, [pendMem]);
    useEffect(() => {

        return (() => {
            setPendingMembers(null)
        })
    }, []);
    return (
        <>
            {
                pendMem && pendMem.map((elem) => {
                    return (
                        <CommunityMembersRequested key={elem._id} id2={elem._id} name={elem.first_name + ' ' + elem.last_name} bioInfo="has requested to join the Community" id={props.id} pendId={elem._id} />
                    )
                })
            }
            {pendMem !== null && pendMem.length === 0 && <View style={{ flex: 1, height: 500 }}><Empty message="No Pending Members" /></View>}
            {pendMem === null && message && <View style={{ flex: 1 }}><Empty message={message} /></View>}

        </>
    );
};
export default PendingCommunityMembersRendering;
