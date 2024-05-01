import React, { createContext, useState, useContext } from "react";
import MyCommentsContext from "./MyCommentsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNewsFeed } from '../NewsFeed/NewsFeedState';
import { useNewsFeed1 } from '../PersonalPosts/PersonalPostState';

const MyCommentState = (props) => {
  const { allPosts1, setAllPosts1 } = useNewsFeed();

  const { allPosts, setAllPosts } = useNewsFeed1();
  const countTotalComments = (comments) => {
    let totalCount = 0;

    comments.forEach((comment) => {
      totalCount++;
      if (comment.childComments && comment.childComments.length > 0) {
        totalCount += countTotalComments(comment.childComments);
      }
    });

    return totalCount;
  };
  const findCommentById = (comments, targetId) => {
    for (const comment of comments) {
      if (comment.comment._id === targetId) {
        return comment;
      }
      const foundChild = findCommentById(comment.childComments, targetId);
      if (foundChild) {
        return foundChild;
      }
    }

    return null;
  };
  const deleteCommentById = (comments, targetId) => {
    const filteredComments = comments.filter(
      (comment) => comment.comment._id !== targetId
    );
    const updatedComments = filteredComments.map((comment) => ({
      ...comment,
      childComments: deleteCommentById(comment.childComments, targetId),
    }));

    return updatedComments;
  };
  const updateCommentDescription = (comments, commentId, newDescription) => {
    for (const comment of comments) {
      if (comment.comment._id === commentId) {
        // Update the description if the comment is found
        comment.comment.description = newDescription;
        return true; // Indicate that the comment was found and updated
      }

      // Recursively check childComments
      if (comment.childComments && comment.childComments.length > 0) {
        const childCommentUpdated = updateCommentDescription(
          comment.childComments,
          commentId,
          newDescription
        );
        if (childCommentUpdated) {
          return true; // Stop searching if the comment was found in childComments
        }
      }
    }

    return false; // Comment was not found
  };
  const host = "http://192.168.0.147:3000";
  const [communityComments, setAllCommunityComments] = useState(null);
  const [createdComment, setCreatedComment] = useState(null);
  const [repliedComment, setRepliedComment] = useState(null);
  const [membersLiked, setMembersLiked] = useState([]);
  const [updatedComment, setUpdatedComment] = useState(null);
  const [likeComment, setLikeComment] = useState(null);
  const [message, setMessage] = useState(null);
  const [deletion, setDeletion] = useState(null);

  const id = AsyncStorage.getItem("id");
  const [loggedIn, setLoggedIn] = useState(id);
  const reset = async () => {
    return new Promise((resolve) => {
      setMembersLiked([]);
      // Set a small timeout to ensure the state updates have completed
      setTimeout(() => {
        resolve();
      }, 0);
    });
  };
  const resetComments = async () => {
    return new Promise((resolve) => {
      setAllCommunityComments(null);
      // Set a small timeout to ensure the state updates have completed
      setTimeout(() => {
        resolve();
      }, 0);
    });
  };
  const getMyComments = async (postId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Post/${postId}/Comment/getAllComments`,
        {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        }
      );
      if (!response.ok) {
        console.error(
          "Error Fetching All Comments of My Posts:",
          response.status
        );
        return;
      }
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      const data = await response.json();
      if (data.commentsInOrder) {
        setAllCommunityComments(data);
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Fetching All Comments of My Posts:", error.message);
    }
  };
  const createMyComment = async (postId, description) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Post/${postId}/Comment/createComment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ description }),
        }
      );
      if (!response.ok) {
        console.error("Error Creating a Comment on My Posts:", response.status);
        return;
      }
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      const data = await response.json();
      if (data.comment) {
        const newCommunityComments = { ...communityComments };
        newCommunityComments.commentsInOrder.push({
          comment: data.comment,
          childComments: [],
        });
        setAllCommunityComments(newCommunityComments);
        setCreatedComment(data.comment);
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Creating a Comment on My Posts:", error.message);
    }
  };
  const createMyCommentReply = async (postId, commentId, description) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Post/${postId}/Comment/createCommentReply/${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ description }),
        }
      );
      if (!response.ok) {
        console.error(
          "Error Creating Comment Reply on My Post:",
          response.status
        );
        return;
      }
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      const data = await response.json();
      if (data.repliedComment) {
        const newCommunityComments = { ...communityComments };

        const parentComment = findCommentById(
          newCommunityComments.commentsInOrder,
          commentId
        );

        if (parentComment) {
          parentComment.childComments.push({
            comment: data.repliedComment,
            childComments: [],
          });
        }

        setAllCommunityComments(newCommunityComments);
        setRepliedComment(data.repliedComment);
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Creating Comment Reply on My Post:", error.message);
    }
  };
  const likeMyComment = async (postId, commentId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Post/${postId}/Comment/likeComment/${commentId}`,
        {
          method: "PUT",
          headers: {
            "auth-token": token,
          },
        }
      );
      if (!response.ok) {
        console.error("Error Updating Like on My Posts:", response.status);
        return;
      }
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      const data = await response.json();
      if (data.updatedComment) {
        setLikeComment(data.updatedComment);
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Updating Like on My Posts:", error.message);
    }
  };
  const deleteMyComment = async (postId, commentId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Post/${postId}/Comment/deleteComment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "auth-token": token,
          },
        }
      );
      if (!response.ok) {
        console.error("Error Deleting Comment of My Posts:", response.status);
        return;
      }
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      const data = await response.json();
      if (data.message) {
        const newCommunityComments = { ...communityComments };
        newCommunityComments.commentsInOrder = deleteCommentById(
          newCommunityComments.commentsInOrder,
          commentId
        );
        const totalComments = countTotalComments(newCommunityComments.commentsInOrder);
        const index = allPosts1.findIndex(post => post.post_id._id === postId);

        if (index !== -1) {
          const tempArray = [...allPosts1];
          tempArray[index].commentsCount = totalComments;
          setAllPosts1(tempArray);
        }

        const index1 = allPosts.findIndex(post => post._id === postId);

        if (index1 !== -1) {
          const tempArray = [...allPosts];
          tempArray[index1].commentsCount = totalComments;
          setAllPosts(tempArray);
        }
        setAllCommunityComments(newCommunityComments);
        setDeletion(data.message);
      }
    } catch (error) {
      console.error("Error Deleting Comment of My Posts:", error.message);
    }
  };
  const likeMyCommentMembers = async (postId, commentId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Post/${postId}/Comment/likeMembers/${commentId}`,
        {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        }
      );
      if (!response.ok) {
        console.error(
          "Error Fetching All Liked Members of Comments of My Posts:",
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
        setMembersLiked(data.membersLiked);
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(
        "Error Fetching All Liked Members of Comments of My Posts",
        error.message
      );
    }
  };
  const updateMyComment = async (postId, commentId, description) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Post/${postId}/Comment/updateComment/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({ description }),
        }
      );
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      if (!response.ok) {
        console.error("Error Updating My Posts Comment:", response.status);
        return;
      }

      const data = await response.json();
      if (data.comment) {
        const commentUpdated = updateCommentDescription(
          communityComments.commentsInOrder,
          commentId,
          description
        );
        if (commentUpdated) {
          setAllCommunityComments({ ...communityComments });
        }
        setUpdatedComment(data.comment);
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Updating My Posts Comment:", error.message);
    }
  };
  return (
    <MyCommentsContext.Provider
      value={{
        reset,
        resetComments,
        deletion,
        message,
        likeComment,
        updatedComment,
        membersLiked,
        repliedComment,
        createdComment,
        communityComments,
        updateMyComment,
        getMyComments,
        createMyComment,
        createMyCommentReply,
        likeMyComment,
        deleteMyComment,
        likeMyCommentMembers,
        loggedIn,
      }}
    >
      {props.children}
    </MyCommentsContext.Provider>
  );
};

export default MyCommentState;
