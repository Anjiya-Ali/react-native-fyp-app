import React, { createContext, useState, useContext } from "react";
import CommunityContext from "./CommunityContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CommunityState = (props) => {
  const host = "http://192.168.0.147:3000";

  const [allComm, setAllCommunities] = useState([]);
  const [joinedComm, setJoinedCommunities] = useState([]);
  const [pendComm, setPendCommunities] = useState([]);
  const [message, setMessage] = useState("");
  const [singleComm, setSingleComm] = useState(null);
  const [joinedMem, setJoinedMembers] = useState(null);
  const [pendMem, setPendingMembers] = useState(null);
  const [newComm, setNewCommunity] = useState(null);
  const [updComm, setUpdatedCommunity] = useState(null);
  const [community, setCommunity] = useState(null);
  const [toBeDeleted, setToBeDeleted] = useState(null);
  const [creatorCard, setCreatorCard] = useState(null);
  const id = AsyncStorage.getItem("id");
  const [loggedIn, setLoggedIn] = useState(id);
  const resetSingleComm = async () => {
    return new Promise((resolve) => {
      setSingleComm(null);
      setTimeout(() => {
        resolve();
      }, 0);
    });
  };

  const resetCreator = async () => {
    return new Promise((resolve) => {
      setCreatorCard(null);
      setTimeout(() => {
        resolve();
      }, 0);
    });
  };
  const allCommunities = async () => {
    try {
      const token = await AsyncStorage.getItem("tokenn");
      const response = await fetch(`${host}/api/Community/allCommunities/`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        console.error("Error Fetching All Communities:", response.status);
        return;
      }
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      const data = await response.json();
      if (data.communities) {
        setAllCommunities(data.communities);
        return data.communities;
      } else if (data.message) {
        setMessage(data.message);
        return data.message;
      }
    } catch (error) {
      console.error("Error Fetching All Communities:", error.message);
    }
  };
  const joinedCommunities = async () => {
    try {
      const token = await AsyncStorage.getItem("tokenn");
      const response = await fetch(`${host}/api/Community/joinedCommunities/`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        console.error("Error Fetching Joined Communities:", response.status);
        return;
      }
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      const data = await response.json();
      if (data.joinedCommunities) {
        setJoinedCommunities(data.joinedCommunities);

        return data.joinedCommunities;
      } else if (data.message) {
        setMessage(data.message);
        return data.message;
      }
    } catch (error) {
      console.error("Error Fetching Joined Communities:", error.message);
    }
  };
  const pendingCommunities = async () => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(`${host}/api/Community/pendingCommunities`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      const authToken = await AsyncStorage.getItem("id");
      if (authToken) {
        setLoggedIn(authToken);
      }
      if (!response.ok) {
        console.error("Error Fetching Pending Communities:", response.status);
        return;
      }
      const data = await response.json();
      if (data.pendingCommunities) {
        setPendCommunities(data.pendingCommunities);
        return data.pendingCommunities;
      } else if (data.message) {
        setMessage(data.message);
        return data.message;
      }
    } catch (error) {
      console.error("Error Fetching Pending Communities:", error.message);
    }
  };
  const getOneCommunity = async (id) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/singleCommunity`,
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
        console.error("Error Fetching a Single Community:", response.status);
        return;
      }
      const data = await response.json();
      if (data.community) {

        setSingleComm(data);
        return data.community._id
      }
      else {
        setMessage("Error fetching a single communiyt")
      }
      console.log(data)
    } catch (error) {
      console.error("Error Fetching a Single Community:", error.message);
    }
  };
  const joinedMembers = async (id) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/allMembers`,
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
          "Error Fetching all Joined Members of Community",
          response.status
        );
        return;
      }
      const data = await response.json();
      if (data.members) {
        console.log(data.members);
        setJoinedMembers(data.members);
      }
    } catch (error) {
      console.error(
        "Error Fetching all Joined Members of Community",
        error.message
      );
    }
  };
  const pendingMembers = async (id) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/pendingMembers`,
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
          "Error Fetching all Pending Members of Community",
          response.status
        );
        return;
      }
      const data = await response.json();
      if (data.members) {
        setPendingMembers(data.members);
      }
      if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(
        "Error Fetching all Pending Members of Community",
        error.message
      );
    }
  };
  const addRequestedMembers = async (id, pendId) => {

    // Now updatedSingleComm contains the updated community data

    // Assuming setSingleComm is a function to update the state with the new community data
    // setSingleComm(updatedSingleComm);
    // setMessage(data.message)
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/acceptRequest/${pendId}`,
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
          "Error Adding Requested Member to Community",
          response.status
        );
        return;
      }
      const data = await response.json();
      if (data.message) {
        const updatedMembersId = [...singleComm.community.members_id, pendId];

        // Update the total_members count
        const updatedTotalMembers = updatedMembersId.length;

        // Update the community object with the new members_id and total_members count
        const updatedSingleComm = {
          ...singleComm,
          community: {
            ...singleComm.community,
            members_id: updatedMembersId,
            total_members: updatedTotalMembers
          }
        };
        setSingleComm(updatedSingleComm)

        setMessage(data.message);
      }
    } catch (error) {
      console.error(
        "Error Adding Requested Member to Community",
        error.message
      );
    }
  };
  const removingAddedMembers = async (id, pendId) => {
    try {

      // console.log(pendId)
      // console.log(updatedPendMem)

      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/removeMember/${pendId}`,
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
          "Error Removing Added Member to Community",
          response.status
        );
        return;
      }
      const data = await response.json();
      if (data.message) {
        const updatedPendMem = singleComm.community.members_id.filter((member) => member !== pendId);
        const updatedTotalMembers = updatedPendMem.length;

        // Update the community object with the new members_id and total_members count
        const updatedSingleComm = {
          ...singleComm,
          community: {
            ...singleComm.community,
            members_id: updatedPendMem,
            total_members: updatedTotalMembers
          }
        };
        setSingleComm(updatedSingleComm)
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error Removing Added Member to Community", error.message);
    }
  };
  const removingMyself = async (id, pendId) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/removeMyself/${pendId}`,
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
          "Error Removing Yourself from the Community",
          response.status
        );
        return;
      }
      const data = await response.json();
      if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(
        "Error Removing Yourself from the Community",
        error.message
      );
    }
  };
  const addingRequested = async (id) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/getOne/${id}/requestToJoin`,
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
          "Error Requesting to Join Yourself in the Community",
          response.status
        );
        return;
      }
      const data = await response.json();
      if (data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(
        "Error Requesting to Join Yourself in the Community",
        error.message
      );
    }
  };

  // const creatingCommunity = async (community_name, community_description, community_image) => {
  //     try {
  //         const response = await fetch(`${host}/api/Community/CreateCommunity`, {
  //             method: 'POST',
  //             headers: {
  //                 "Content-Type": "application/json",
  //                 "auth-token": token
  //             },
  //             body: JSON.stringify({ community_name, community_description, community_image })
  //         });
  //         if (!response.ok) {
  //             console.error('Error Creating a Community', response.status);
  //             return;
  //         }
  //         const data = await response.json();
  //         if (data.community) {
  //             setAllCommunities(prevAllComm => [...prevAllComm, data.community]);
  //             setNewCommunity(data.community)
  //         }
  //     } catch (error) {
  //         console.error('Error Creating a Community', error.message);
  //     }
  // };
  const creatingCommunity = async (
    community_name,
    community_description,
    community_image
  ) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const formData = new FormData();

      formData.append("community_image", {
        uri: community_image.path,
        type: community_image.mime,
        name: community_name + ".jpg",
      });
      formData.append("community_name", community_name);
      formData.append("community_description", community_description);
      const response = await fetch(`${host}/api/Community/CreateCommunity`, {
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
        console.error("Error Creating a Community", response.status);
        return;
      }

      const data = await response.json();
      if (data.community) {
        setAllCommunities((prevAllComm) => [...prevAllComm, data.community]);
        setNewCommunity(data.community);
      }
    } catch (error) {
      console.error("Error Creating a Community", error.message);
    }
  };

  const updatingCommunity = async (
    id,
    community_name,
    community_description,
    community_image
  ) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const formData = new FormData();

      formData.append("community_image", {
        uri: community_image.path,
        type: community_image.mime,
        name: community_name + ".jpg",
      });

      formData.append("community_name", community_name);
      formData.append("community_description", community_description);
      const response = await fetch(
        `${host}/api/Community/updateCommunity/${id}`,
        {
          method: "PUT",
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
        console.error("Error Updating the Community", response.status);
        return;
      }
      const data = await response.json();
      if (data.community) {
        setUpdatedCommunity(data.community);
      }
    } catch (error) {
      console.error("Error Updating the Community", error.message);
    }
  };
  const deletingCommunity = async (id) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");

      const response = await fetch(
        `${host}/api/Community/deleteCommunity/${id}`,
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
        console.error("Error Deleting the Community", response.status);
        return;
      }
      const data = await response.json();
      if (data.message) {
        setMessage(data.community);
      }
    } catch (error) {
      console.error("Error Deleting the Community", error.message);
    }
  };
  return (
    <CommunityContext.Provider
      value={{
        setPendingMembers,
        setJoinedMembers,
        loggedIn,
        resetCreator,
        resetSingleComm,
        creatorCard,
        setCreatorCard,
        toBeDeleted,
        setToBeDeleted,
        community,
        setCommunity,
        deletingCommunity,
        updComm,
        updatingCommunity,
        newComm,
        creatingCommunity,
        addingRequested,
        removingMyself,
        removingAddedMembers,
        addRequestedMembers,
        pendMem,
        pendingMembers,
        joinedMem,
        joinedMembers,
        singleComm,
        getOneCommunity,
        message,
        allCommunities,
        joinedCommunities,
        pendingCommunities,
        allComm,
        setAllCommunities,
        joinedComm,
        setJoinedCommunities,
        pendComm,
        setPendCommunities,
      }}
    >
      {props.children}
    </CommunityContext.Provider>
  );
};

export default CommunityState;
