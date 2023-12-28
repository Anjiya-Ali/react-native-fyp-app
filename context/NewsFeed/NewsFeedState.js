import React, { createContext, useState, useContext } from "react";
import NewsFeedContext from "./NewsFeedContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewsFeedState = (props) => {
  const host = "http://172.16.57.195:3000";
  const [message, setMessage] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const id = AsyncStorage.getItem("id");
  const [loggedIn, setLoggedIn] = useState(id);
  const getfeed = async () => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(`${host}/api/Post/feed`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        console.error("Error Fetching Feed:", response.status);
        return;
      }
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      const data = await response.json();

      if (data.posts) {
        setAllPosts(data.posts);
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Fetching Feed:", error.message);
    }
  };

  return (
    <NewsFeedContext.Provider value={{ loggedIn, allPosts, message, getfeed }}>
      {props.children}
    </NewsFeedContext.Provider>
  );
};

export default NewsFeedState;
