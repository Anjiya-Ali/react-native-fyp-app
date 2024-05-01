import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import ImagePicker from "react-native-image-crop-picker";
import CommunityPostContext from "../context/Posts/CommunityPostContext";
import { useNavigation } from "@react-navigation/native";
import Error from "./Error";

const EditingCommunityPost = ({ description, setDescription, id, postId }) => {
  const navigation = useNavigation();
  const [des, setDes] = useState("");
  useEffect(() => {
    setDes(description);
  }, []);
  let attachments = [];
  const communityPostContext = useContext(CommunityPostContext);
  const { updateCommunityPost, fileAttachments, setFileAttachments } =
    communityPostContext;

  const pickImage = async () => {
    try {
      const pickedImages = await ImagePicker.openPicker({
        mediaType: "photo",
        multiple: true,
      });

      const tempFileAttachments = [];
      for (const image of pickedImages) {
        const croppedImage = await ImagePicker.openCropper({
          path: image.path,
          width: 200,
          height: 200,
          cropperStatusBarColor: "#373eb2",
          cropperActiveWidgetColor: "#373eb2",
          cropperToolbarColor: "#d9d9d9",
          cropperToolbarWidgetColor: "#373eb2",
        });
        tempFileAttachments.push(croppedImage.path);
        attachments.push(croppedImage);
      }
      setFileAttachments([...fileAttachments, ...tempFileAttachments]);
      return attachments;
    } catch (error) {
      console.log("Error picking and cropping images:", error);
    }
  };

  const [path, setPath] = useState(null);
  const [image, setImage] = useState(null);
  const imageUploader = async () => {
    const imgPath = await pickImage();
    setPath(imgPath);
  };

  const pickVideo = async () => {
    try {
      const pickedVideos = await ImagePicker.openPicker({
        mediaType: "video",
        multiple: true,
        videoQuality: "medium",
        durationLimit: 30,
      });
      pickedVideos.forEach((video) => {
        console.log("Selected Video Path:", video.path);
        console.log("Video Duration:", video.duration);
        console.log("Videos", video);
      });
    } catch (error) {
      console.log("Error picking videos:", error);
    }
  };
  const [message, setMessage] = useState("");
  const [error, showError] = useState(false);

  const handlePostCreation = () => {
    if (description.trim().length === 0) {
      setMessage("Post must have a Description also");
      showError(true);
      setTimeout(() => {
        showError(false);
      }, 3000);
      return;
    }
    if (description.trim().length < 5) {
      setMessage("Post Description must be 5 characters long");
      showError(true);
      setTimeout(() => {
        showError(false);
      }, 3000);
      return;
    }
    if (des === description) {
      setMessage("Nothing have been changed");
      showError(true);
      setTimeout(() => {
        showError(false);
      }, 3000);
      return;
    }

    if (description) updateCommunityPost(id, postId, description);
    navigation.pop();
  };
  return (
    <>
      {error ? <Error error={message} /> : null}

      <View style={styles.myCommunities}>
        <View
          style={{
            width: "100%",
            height: 180,
            flex: 1,
            backgroundColor: "#373eb2",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <TouchableOpacity
            onPress={handlePostCreation}
            style={{
              backgroundColor: "#373eb2",
              flex: 1.5 / 8,
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                fontFamily: "Inter-ExtraBold",
                color: "#e4e3e3",
                paddingBottom: 2,
              }}
            >
              Edit Community Post
            </Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: "#d9d9d9",
              flex: 7 / 8,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              paddingTop: 10,
            }}
          >
            <View style={{ flex: 2 / 3 }}>
              <View
                style={{
                  flex: 1 / 6,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "800",
                    fontFamily: "Calibri",
                    color: "#373eb2",
                  }}
                >
                  Community Post Description
                </Text>
              </View>
              <View
                style={{
                  flex: 5 / 6,
                  justifyContent: "center",
                  alignItems: "center",
                  top: 20,
                }}
              >
                <TextInput
                  style={[styles.input, { height: 100 }]}
                  placeholder="Enter Community Post Description"
                  placeholderTextColor="white"
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#373eb2",
    color: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    paddingLeft: 5,
    width: 250,

    height: 35,
    fontSize: 11,
  },
  myCommunitiesInnerFlexBox: {
    alignItems: "flex-end",
  },
  upperStyle: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: "#373eb2",
  },
  dataScienceEnthusiasts: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Calibri",
    color: "#e4e3e3",
    textAlign: "left",
  },
  dataScienceEnthusiastsWrapper: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: "#373eb2",
    height: 30,
  },
  myCommunitiesInner: {
    width: "100%",
    height: 150,
  },
  myCommunities: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
});

export default EditingCommunityPost;
