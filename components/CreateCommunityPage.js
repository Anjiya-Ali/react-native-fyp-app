import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, View, BackHandler } from "react-native";
import CreateCommunity from "./CreateCommunity";
import CreateCommunityShowCaser from "./CreateCommunityShowCaser";
import RealHeader from "./RealHeader"

import { useDispatch } from 'react-redux';
import { setCommunityImage } from '../redux/action';

const CreateCommunityPage = () => {
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const handleBackPress = () => {
            dispatch(setCommunityImage(null));
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backHandler.remove();
    }, [dispatch]);
    return (
        <View style={{ flex: 1 }}>
            <RealHeader
                heading="Create Community"
                navigate="Community"
            />
            <ScrollView>
                <CreateCommunityShowCaser name={name} description={description} />
            </ScrollView>
            <CreateCommunity setName={setName} setDescription={setDescription} communityName={name} communityDescription={description} />
        </View>
    );
};

export default CreateCommunityPage;
