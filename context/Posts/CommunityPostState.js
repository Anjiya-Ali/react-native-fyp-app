import React, { createContext, useState, useContext } from "react";
import CommunityPostContext from "./CommunityPostContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CommunityPostState = (props) => {
  const host = "http://helloworld-nodejs-4714.azurewebsites.net";

  const [allPosts, setAllPosts] = useState([]);
  const [tempPosts, setTempPosts] = useState([]);
  const [message, setMessage] = useState(null);
  const [notification, setNotification] = useState(null);
  const [creation, setCreation] = useState(null);
  const [success, setSuccess] = useState(null);
  const [like, setLike] = useState(null);
  const [likedMembers, setLikedMembers] = useState([]);
  const [fileAttachments, setFileAttachments] = useState([]);
  const [idGen, setIdGen] = useState(1);
  const id = AsyncStorage.getItem("id");
  const [loggedIn, setLoggedIn] = useState(id);
  const resetLikedMembers = async () => {
    return new Promise((resolve) => {
      setLikedMembers([]);
      // Set a small timeout to ensure the state updates have completed
      setTimeout(() => {
        resolve();
      }, 0);
    });
  };
  const resetAllPosts = async () => {
    return new Promise((resolve) => {
      setAllPosts([]);
      // Set a small timeout to ensure the state updates have completed
      setTimeout(() => {
        resolve();
      }, 0);
    });
  };
  const resetFileAttachments = async () => {
    return new Promise((resolve) => {
      setFileAttachments([]);
      // Set a small timeout to ensure the state updates have completed
      setTimeout(() => {
        resolve();
      }, 0);
    });
  };

  const getCommunityPosts = async (id) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/Post/allPosts`,
        {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        }
      );
      if (!response.ok) {
        console.error("Error Fetching All Community Posts:", response.status);
        return;
      }
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      const data = await response.json();

      if (data.posts) {
        setAllPosts(data.posts);
        setTempPosts(data.posts)
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Fetching All Community Posts:", error.message);
    }
  };
  // const createCommunityPost = async (id, description, file_attachments) => {
  //     try {
  //         console.log("hiii", file_attachments[0])
  //         const response = await fetch(`${host}/api/Community/getOne/${id}/Post/createCommunityPost`, {
  //             method: 'POST',
  //             headers: {
  //                 "Content-Type": "application/json",
  //                 "auth-token": token
  //             },
  //             body: JSON.stringify({ description, file_attachments })
  //         });
  //         if (!response.ok) {
  //             console.error('Error Creating Community Post:', response.status);
  //             return;
  //         }
  //         const data = await response.json();
  //         if (data.post) {
  //             const temp = {
  //                 _id: idGen + 1,
  //                 community_id: id,
  //                 name: "Muhummad Rafi",
  //                 poster: "655f19862f491d486054dc7f",
  //                 post_id: data.post
  //             }
  //             setAllPosts([...allPosts, temp])
  //             setIdGen(idGen + 1)
  //             setCreation(data.communities)
  //         }
  //         else if (data.message) {
  //             setNotification(data.message)
  //         }
  //     } catch (error) {
  //         console.error('Error Creating Community Post:', error.message);
  //     }
  // };

  const createCommunityPost = async (id, description, file_attachments) => {
    try {
      console.log(id);
      console.log("Created");
      const token = await AsyncStorage.getItem("tokenn");

      const formData = new FormData();
      formData.append("description", description);

      // Loop through each file in the file_attachments array and append them to the FormData
      if (file_attachments) {
        file_attachments.forEach((file, index) => {
          formData.append(`file_attachments`, {
            uri: file.path,
            type: file.mime,
            name: id + file.modificationDate + ".jpg", // You may need to adjust the file name as needed
          });
        });
      }
      const response = await fetch(
        `${host}/api/Community/getOne/${id}/Post/createCommunityPost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": token,
          },
          body: formData,
        }
      );
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      if (!response.ok) {
        console.error("Error Creating Community Post:", response.status);
        return;
      }
      const data = await response.json();
      const id2 = await AsyncStorage.getItem("id");
      const name = await AsyncStorage.getItem("name");

      if (data.post) {
        const temp = {
          _id: idGen + 1,
          community_id: id,
          name: name,
          poster: id2,
          commentsCount: 0,
          post_id: data.post,
        };

        setAllPosts((prevPosts) => [temp, ...prevPosts]);
        setTempPosts((prevPosts) => [temp, ...prevPosts])
        setIdGen(idGen + 1);
        setCreation(data.communities);
      } else if (data.message) {
        setNotification(data.message);
      }
    } catch (error) {
      console.error("Error Creating Community Post:", error.message);
    }
  };

  const updateCommunityPost = async (id, postId, description) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/Post/updatePost/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ description }),
        }
      );
      if (!response.ok) {
        console.error("Error Updating Community Post:", response.status);
        return;
      }

      const data = await response.json();
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      if (data.userPost) {
        const updatedAllPosts = allPosts.map((post) => {
          // Check if the post ID matches the updated post ID
          if (post.post_id._id === postId) {
            // Update the description of the post in the temporary array
            return {
              ...post,
              post_id: {
                ...post.post_id,
                description: description,
              },
            };
          }
          return post;
        });

        // Set allPosts to the updated temporary array
        setAllPosts(updatedAllPosts);
        setSuccess(data.success);
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Updating Community Post:", error.message);
    }
  };
  const deleteCommunityPost = async (id, postId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/Post/deletePost/${postId}`,
        {
          method: "DELETE",
          headers: {
            "auth-token": token,
          },
        }
      );
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      if (!response.ok) {
        console.error("Error Deleting Community Post:", response.status);
        return;
      }

      const data = await response.json();
      if (data.message) {
        const updatedAllPosts = allPosts.filter(
          (post) => post.post_id._id !== postId
        );
        setAllPosts(updatedAllPosts);
        // setTempPosts(udate)
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Deleting Community Post:", error.message);
    }
  };
  const likeCommunityPost = async (id, postId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/Post/updateLike/${postId}`,
        {
          method: "PUT",
          headers: {
            "auth-token": token,
          },
        }
      );
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      if (!response.ok) {
        console.error(
          "Error Updating Like on Community Post:",
          response.status
        );
        return;
      }

      const data = await response.json();

      if (data.updatedPost) {
        setLike(data.updatedPost.total_likes);
      }
    } catch (error) {
      console.error("Error Updating Like on Community Post:", error.message);
    }
  };
  const likedMembersCommunityPost = async (id, postId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/Post/likeMembers/${postId}`,
        {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        }
      );
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      if (!response.ok) {
        console.error(
          "Error Fecthing Liked Members of Community Post:",
          response.status
        );
        return;
      }

      const data = await response.json();
      if (data.membersLiked) {
        setLikedMembers(data.membersLiked);
      }
    } catch (error) {
      console.error(
        "Error Fetching Liked Members of Community Post:",
        error.message
      );
    }
  };
  return (
    <CommunityPostContext.Provider
      value={{
        loggedIn,
        resetFileAttachments,
        resetAllPosts,
        resetLikedMembers,
        idGen,
        setIdGen,
        setFileAttachments,
        fileAttachments,
        createCommunityPost,
        likedMembersCommunityPost,
        likedMembers,
        likedMembersCommunityPost,
        like,
        likeCommunityPost,
        deleteCommunityPost,
        success,
        updateCommunityPost,
        notification,
        creation,
        message,
        getCommunityPosts,
        setAllPosts,
        allPosts,
        tempPosts, setTempPosts
      }}
    >
      {props.children}
    </CommunityPostContext.Provider>
  );
};

export default CommunityPostState;
