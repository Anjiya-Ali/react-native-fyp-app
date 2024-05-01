import SocialHubContext from "./SocialHubContext";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SocialHubState = (props) => {

    const host = "http://192.168.0.147:3000"
    
    const userProfileInitial = []
    const [connectionCreation, setConnectionCreation] = useState(false)
    const [connectionAcception, setConnectionAcception] = useState(false)
    const [connectionCancellation, setConnectionCancellation] = useState(false)
    const [connectionRemoval, setConnectionRemoval] = useState(false)
    const [followingCancellation, setFollowingCancellation] = useState(false)
    const [otherUserProfile, setOtherUserProfile] = useState(userProfileInitial)
    const [connections, setConnections] = useState(userProfileInitial)
    const [pendingConnections, setPendingConnections] = useState(userProfileInitial)
    const [followers, setFollowers] = useState(userProfileInitial)
    const [privilege, setPrivilege] = useState("")

    const getOtherProfile = async (id) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/User/GetProfileForOther/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });
        if (!response.ok) {
          console.error('Error fetching other student profile:', response.status);
          return;
        }
        const json = await response.json()
        setOtherUserProfile(json)
        return json;
      }
      catch (error) {
        console.error('Error fetching other student profile:', error.message);
      }
    }
  
    const createConnection = async (id) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/SocialHub/CreateConnection/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });
        if (!response.ok) {
          console.error('Error creating connection:', response.status);
          return;
        }
        const json = await response.json()
        setConnectionCreation(true)
      }
      catch (error) {
        console.error('Error creating connection:', error.message);
      }
    }

    const acceptConnection = async (id) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/SocialHub/AcceptRequest/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error accepting connection:', response.status);
            return;
          }
          const json = await response.json()
          setConnectionAcception(true)
        }
        catch (error) {
          console.error('Error accepting connection:', error.message);
        }
      }

      const cancelRequest = async (id) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/SocialHub/CancelRequest/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error cancelling connection:', response.status);
            return;
          }
          const json = await response.json()
          setConnectionCancellation(true)
        }
        catch (error) {
          console.error('Error cancelling connection:', error.message);
        }
      }

      const rejectRequest = async (id) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/SocialHub/RejectRequest/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error cancelling connection:', response.status);
            return;
          }
          const json = await response.json()
        }
        catch (error) {
          console.error('Error cancelling connection:', error.message);
        }
      }

      const cancelFollowing = async (id) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/SocialHub/CancelFollowing/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error cancelling following:', response.status);
            return;
          }
          const json = await response.json()
          setFollowingCancellation(true)
        }
        catch (error) {
          console.error('Error cancelling following:', error.message);
        }
      }

      const cancelFollowingByTeacher = async (id) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/SocialHub/CancelFollowingByTeacher/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error cancelling following by teacher:', response.status);
            return;
          }
          const json = await response.json()
        }
        catch (error) {
          console.error('Error cancelling following by teacher:', error.message);
        }
      }

      const removeConnection = async (id) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/SocialHub/RemoveConnection/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error removing connection:', response.status);
            return;
          }
          const json = await response.json()
          setConnectionRemoval(true)
        }
        catch (error) {
          console.error('Error removing connection:', error.message);
        }
      }

      const getConnections = async () => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/SocialHub/GetMyConnections`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching connections:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error fetching connections:', error.message);
        }
      }

      const getFollowers = async () => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/SocialHub/GetMyFollowers`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching followers:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error fetching followers:', error.message);
        }
      }
  
      const getPendingConnections = async () => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/SocialHub/GetPendingConnections`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching pending connections:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error fetching pending connections:', error.message);
        }
      }
  
      const acceptRequest = async (id) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/SocialHub/AcceptRequest/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error accepting request', response.status);
            return;
          }
          const json = await response.json()
        }
        catch (error) {
          console.error('Error accepting request', error.message);
        }
      }
  
    return (
    <SocialHubContext.Provider value={{ createConnection, connectionCreation, acceptConnection, connectionAcception, getOtherProfile, otherUserProfile, connections, getConnections, pendingConnections, getPendingConnections, acceptRequest, getFollowers, followers, privilege, connectionCancellation, cancelRequest, connectionRemoval, removeConnection, cancelFollowing, followingCancellation, cancelFollowingByTeacher, rejectRequest }}>
      {props.children}
    </SocialHubContext.Provider>
    )
  }
  
  export default SocialHubState;