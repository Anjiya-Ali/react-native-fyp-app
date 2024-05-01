import React, { createContext, useState, useContext } from "react";
import NewsFeedContext from "./NewsFeedContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewsFeedState = (props) => {
  const host = "http://192.168.0.147:3000";
  const [message, setMessage] = useState(null);
  const [allPosts1, setAllPosts1] = useState([]);
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
        setAllPosts1(data.posts);
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Fetching Feed:", error.message);
    }
  };

  return (
    <NewsFeedContext.Provider value={{ loggedIn, allPosts1, message, getfeed,setAllPosts1  }}>
      {props.children}
    </NewsFeedContext.Provider>
  );
};

export default NewsFeedState;
export const useNewsFeed = () => useContext(NewsFeedContext);