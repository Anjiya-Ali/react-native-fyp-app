import React, { createContext, useState, useContext } from "react";
import PersonalPostContext from "./PersonalPostContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNewsFeed } from '../NewsFeed/NewsFeedState';

const PersonalPostState = (props) => {
  const host = "http://192.168.0.147:3000";

  const [allPosts, setAllPosts] = useState([]);
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

  const { allPosts1, setAllPosts1 } = useNewsFeed();

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
  const getPersonalPosts = async () => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(`${host}/api/Post/myAllPosts`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        console.error("Error Fetching All My Posts:", response.status);
        return;
      }
      const data = await response.json();
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      if (data.posts) {
        setAllPosts(data.posts);
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Fetching All My Posts:", error.message);
    }
  };
  const createPersonalPost = async (description, file_attachments) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const formData = new FormData();
      formData.append("description", description);
      if (file_attachments) {
        file_attachments.forEach((file, index) => {
          formData.append(`file_attachments`, {
            uri: file.path,
            type: file.mime,
            name: file.modificationDate + ".jpg", // You may need to adjust the file name as needed
          });
        });
      }
      const response = await fetch(`${host}/api/Post/createPost`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "auth-token": token,
        },
        body: formData,
      });
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      if (!response.ok) {
        console.error("Error Creating My Post:", response.status);
        return;
      }
      const data = await response.json();
      const id = await AsyncStorage.getItem("id");
      const name = await AsyncStorage.getItem("name");

      if (data.post) {
        console.log(data.post);
        const temp = {
          _id: data.post._id,
          name: name,
          poster: id,
          description: data.post.description,
          file_attachments: data.post.file_attachments,
          total_likes: data.post.total_likes,
          date: Date.now(),
          like_members: [],
          commentsCount: 0,
          isBlue: true,
          memberIn: true,
        };
        const temp1 = {
          commentsCount: 0,
          name: name,
          poster: id,
          isBlue: true,
          memberIn: true,
          post_id: {
            _id: data.post._id,
            date: Date.now(),
            like_members: [],
            total_likes: 0,
            description: data.post.description,
            file_attachments: data.post.file_attachments,
            isBlue: true,
            memberIn: true,
          }
        }
        setAllPosts1([temp1, ...allPosts1]);
        setAllPosts([temp, ...allPosts]);
        setIdGen(idGen + 1);
      } else if (data.message) {
        setNotification(data.message);
      }
    } catch (error) {
      console.error("Error Creating My Post:", error.message);
    }
  };

  const updateCommunityPost = async (postId, description) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(`${host}/api/Post/updatePost/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ description }),
      });
      if (!response.ok) {
        console.error("Error Updating Community Post:", response.status);
        return;
      }
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      const data = await response.json();

      if (data.posts) {
        const updatedPosts = [...allPosts];
        const indexToUpdate = updatedPosts.findIndex(
          (post) => post._id === postId
        );

        if (indexToUpdate !== -1) {
          updatedPosts[indexToUpdate].description = description;
          setAllPosts(updatedPosts);
        }

        setSuccess(data.success);
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Updating Community Post:", error.message);
    }
  };
  const deleteCommunityPost = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(`${host}/api/Post/deletePost/${postId}`, {
        method: "DELETE",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        console.error("Error Deleting Community Post:", response.status);
        return;
      }
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      const data = await response.json();
      if (data.message) {

        const updatedAllPosts = allPosts.filter((post) => post._id !== postId);

        const updatedAllPosts1 = allPosts1.filter((post) => post.post_id._id !== postId);
        setAllPosts1(updatedAllPosts1)
        setAllPosts(updatedAllPosts);
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Deleting Community Post:", error.message);
    }
  };
  const likeMyPost = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(`${host}/api/Post/updateLike/${postId}`, {
        method: "PUT",
        headers: {
          "auth-token": token,
        },
      });
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      if (!response.ok) {
        console.error("Error Updating Like on My Post:", response.status);
        return;
      }

      const data = await response.json();

      if (data.updatedPost) {
        setLike(data.updatedPost.total_likes);
      }
    } catch (error) {
      console.error("Error Updating Like on My Post:", error.message);
    }
  };
  const likedMembersMyPost = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(`${host}/api/Post/likeMembers/${postId}`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        console.error(
          "Error Fecthing Liked Members of My Post:",
          response.status
        );
        return;
      }
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      const data = await response.json();
      if (data.membersLiked) {
        setLikedMembers(data.membersLiked);
      }
    } catch (error) {
      console.error("Error Fetching Liked Members of My Post:", error.message);
    }
  };
  return (
    <PersonalPostContext.Provider
      value={{
        loggedIn,
        deleteCommunityPost,
        resetLikedMembers,
        resetAllPosts,
        resetFileAttachments,
        idGen,
        setIdGen,
        setFileAttachments,
        fileAttachments,
        createPersonalPost,
        likedMembersMyPost,
        likedMembers,
        like,
        likeMyPost,
        success,
        updateCommunityPost,
        notification,
        creation,
        message,
        getPersonalPosts,
        setAllPosts,
        allPosts,
      }}
    >
      {props.children}
    </PersonalPostContext.Provider>
  );
};

export default PersonalPostState;
export const useNewsFeed1 = () => useContext(PersonalPostContext);