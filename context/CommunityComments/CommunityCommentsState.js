import React, { createContext, useState, useContext, useRef } from "react";
import CommunityCommentContext from "./CommunityCommentContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CommunityCommentState = (props) => {
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
  const host = "http://helloworld-nodejs-4714.azurewebsites.net";
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

  const getCommunityComments = async (id, postId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/Post/${postId}/Comment/getAllComments`,
        {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        }
      );
      if (!response.ok) {
        console.error(
          "Error Fetching All Comments of Community Posts:",
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
      console.error(
        "Error Fetching All Comments of Community Posts:",
        error.message
      );
    }
  };
  const createCommunityComment = async (id, postId, description) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/Post/${postId}/Comment/createComment`,
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
          "Error Creating a Comment on Community Posts:",
          response.status
        );
        return;
      }
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      const data = await response.json();
      if (data.comment) {
        const newCommunityComments = { ...communityComments };

        // Append the new comment to the commentsInOrder array
        newCommunityComments.commentsInOrder.push({
          comment: data.comment, // Assuming the new comment is returned in the 'comment' property of the response
          childComments: [], // You can modify this based on your data structure
        });

        // Update the state with the modified copy
        setAllCommunityComments(newCommunityComments);
        setCreatedComment(data.comment);
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(
        "Error Creating a Comment on Community Posts:",
        error.message
      );
    }
  };
  const createCommunityCommentReply = async (
    id,
    postId,
    commentId,
    description
  ) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/Post/${postId}/Comment/createCommentReply/${commentId}`,
        {
          method: "POST",
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
        console.error(
          "Error Creating Comment Reply on Community Post:",
          response.status
        );
        return;
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
      console.error(
        "Error Creating Comment Reply on Community Post:",
        error.message
      );
    }
  };
  const likeCommunityComment = async (id, postId, commentId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/Post/${postId}/Comment/likeComment/${commentId}`,
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
          "Error Updating Like on Community Posts:",
          response.status
        );
        return;
      }

      const data = await response.json();
      if (data.updatedComment) {
        setLikeComment(data.updatedComment);
      } else if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Updating Like on Community Posts:", error.message);
    }
  };
  const deleteCommunityComment = async (id, postId, commentId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/Post/${postId}/Comment/deleteComment/${commentId}`,
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
        console.error(
          "Error Delete Comment of Community Posts:",
          response.status
        );
        return;
      }

      const data = await response.json();
      if (data.message) {
        const newCommunityComments = { ...communityComments };
        newCommunityComments.commentsInOrder = deleteCommentById(
          newCommunityComments.commentsInOrder,
          commentId
        );
        setAllCommunityComments(newCommunityComments);
        setDeletion(data.message);
      }
    } catch (error) {
      console.error(
        "Error Deleting Comment of Community Posts:",
        error.message
      );
    }
  };
  const likeCommunityCommentMembers = async (id, postId, commentId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/Post/${postId}/Comment/likeMembers/${commentId}`,
        {
          method: "GET",
          headers: {
            "auth-token": token,
          },
        }
      );
      if (!response.ok) {
        console.error(
          "Error Fetching All Liked Members of Comments of Community Posts:",
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
        "Error Fetching All Liked Members of Comments of Community Posts",
        error.message
      );
    }
  };
  const updateCommunityComment = async (id, postId, commentId, description) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/Post/${postId}/Comment/updateComment/${commentId}`,
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
        console.error(
          "Error Updating Community Posts Comment:",
          response.status
        );
        return;
      }
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
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
      console.error("Error Updating Community Posts Comment:", error.message);
    }
  };
  return (
    <CommunityCommentContext.Provider
      value={{
        resetComments,
        reset,
        setMembersLiked,
        deletion,
        message,
        likeComment,
        updatedComment,
        membersLiked,
        repliedComment,
        createdComment,
        communityComments,
        updateCommunityComment,
        getCommunityComments,
        createCommunityComment,
        createCommunityCommentReply,
        likeCommunityComment,
        deleteCommunityComment,
        likeCommunityCommentMembers,
        loggedIn,
      }}
    >
      {props.children}
    </CommunityCommentContext.Provider>
  );
};

export default CommunityCommentState;
