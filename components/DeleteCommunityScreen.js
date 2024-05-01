import React, { useContext, useEffect } from "react";
import { ScrollView, BackHandler ,View} from "react-native";
import CreateCommunityShowCaser from "./CreateCommunityShowCaser";
import DeleteCommunity from "./DeleteCommunity";
import CommunityContext from "../context/Community/CommunityContext";
import DeleteCommunityHeader from "./DeleteCommunityHeader";
import RealHeader from "./RealHeader"


import { useDispatch } from 'react-redux';
import { setCommunityImage } from '../redux/action';

const DeleteCommunityScreen = () => {
    const communityContext = useContext(CommunityContext);
    const { toBeDeleted } = communityContext
    const { id, community_name, community_description, community_image } = toBeDeleted
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
                heading="Delete Community"
                navigate="Community"
            />
            <ScrollView >
                <DeleteCommunityHeader name={community_name} description={community_description} communityImager={community_image} />
            </ScrollView>
            <DeleteCommunity communityName={community_name} id={id} />
        </View>
    );
};
export default DeleteCommunityScreen;
