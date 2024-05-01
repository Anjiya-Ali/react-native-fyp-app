import React, { useState, useContext, useEffect } from "react";
import { ScrollView, BackHandler ,View} from "react-native";
import UpdateCommunityShowCaser from "./UpdateCommunityShowCaser";
import UpdateCommunity from "./UpdateCommunity";
import CommunityContext from "../context/Community/CommunityContext";
import RealHeader from './RealHeader'


import { useDispatch } from 'react-redux';
import { setCommunityImage } from '../redux/action';


const UpdateCommunityScreen = () => {

    const communityContext = useContext(CommunityContext);
    const { community } = communityContext

    const [name, setName] = useState(community.community_name)
    const [description, setDescription] = useState(community.community_description)
    const [cImage, setCImage] = useState(community.community_image)
    useEffect(() => {
    }, [cImage]);

    const dispatch = useDispatch();

    useEffect(() => {
        // Add event listener for the back button press
        const handleBackPress = () => {
            // Dispatch the action to set communityImage to null
            dispatch(setCommunityImage(null));

            // Return false to prevent the default back button behavior
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        // Cleanup the event listener when the component is unmounted
        return () => backHandler.remove();
    }, [dispatch]); // Include dispatch in the dependency array

    return (
        <View style={{ flex: 1 }}>
            <RealHeader
                heading='Edit Community'
                navigate="Community"
            />
            <UpdateCommunityShowCaser name={name} description={description} communityImager={cImage} />

            <UpdateCommunity setName={setName} setDescription={setDescription} communityName={name} communityDescription={description} setCImage={setCImage} cImage={cImage} />
        </View>
    );
};
export default UpdateCommunityScreen;
