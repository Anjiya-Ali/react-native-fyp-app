import React, { useState } from 'react';
import { View, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ImagePicker = () => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        try {
            const pickedImage = await ImagePicker.openPicker({
                width: 100,
                height: 100,
                cropping: true,

                cropperStatusBarColor: '#373eb2',
                cropperActiveWidgetColor: '#373eb2',
                cropperToolbarColor: '#d9d9d9',
                cropperToolbarWidgetColor: '#373eb2'
            });

            setImage(pickedImage.path);
            console.warn(pickedImage.path)
        } catch (error) {
            console.log('Error picking image:', error);
        }
    };

    return (
        <View>
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}

            <Button title="Pick Image" onPress={pickImage} />
        </View>
    );
};

export default ImagePicker;
