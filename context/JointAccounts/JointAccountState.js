import JointAccountContext from "./JointAccountContext";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const JointAccountState = (props) => {
    const host = "http://192.168.0.147:3000"
    const userProfileInitial = []
    const [courseName, setCourseName] = useState(userProfileInitial)
    const [connections, setConnections] = useState(userProfileInitial)
    const [pendingInvitations, setPendingInvitations] = useState(userProfileInitial)
    const [acceptedInvitations, setAcceptedInvitations] = useState(userProfileInitial)
    const [jointAccountRequests, setJointAccountRequests] = useState(userProfileInitial)
    const [detailsOfJointAccountRequests, setDetailsOfJointAccountRequests] = useState(userProfileInitial)
    const [privilege, setPrivilege] = useState("")

    const SendInvitationToTeacherForJointAccount = async (message, courseId, teacherId) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/JointAccount/SendInvitationToTeacherForJointAccount/${courseId}/${teacherId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
            body: JSON.stringify({message})
          });
          if (!response.ok) {
            console.error('Error sending invitation to teacher for joint account:', response.status);
            return;
          }
          const json = await response.json()
        }
        catch (error) {
          console.error('Error sending invitation to teacher for joint account:', error.message);
        }
      }

      const getConnections = async (courseId) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/JointAccount/GetMyConnections`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
            body: JSON.stringify({courseId})
          });
          if (!response.ok) {
            console.error('Error fetching connections:', response.status);
            return;
          }
          const json = await response.json()
          setConnections(json.connections)
          setPrivilege(json.privilege)
          return json;
        }
        catch (error) {
          console.error('Error fetching connections:', error.message);
        }
      }

      const getJointAccountRequests = async () => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/JointAccount/ViewJointAccountRequests`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching joint account requests:', response.status);
            return;
          }
          const json = await response.json()
          setJointAccountRequests(json.jointAccountRequestsInfo)
          return json;
        }
        catch (error) {
          console.error('Error fetching joint account requests:', error.message);
        }
      }

      const getPendingInvitations = async (courseId) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/JointAccount/ViewInvitedMembersForJointAccount/${courseId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            }
          });
          if (!response.ok) {
            console.error('Error fetching pending invitations:', response.status);
            return;
          }
          const json = await response.json()
          setPendingInvitations(json.memberInfo)
          return json;
        }
        catch (error) {
          console.error('Error fetching pending invitations:', error.message);
        }
      }

      const getAcceptedInvitations = async (courseId) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/JointAccount/ViewAcceptedMembersForJointAccount/${courseId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            }
          });
          if (!response.ok) {
            console.error('Error fetching accepted invitations:', response.status);
            return;
          }
          const json = await response.json()
          setAcceptedInvitations(json.memberInfo)
          return json;
        }
        catch (error) {
          console.error('Error fetching accepted invitations:', error.message);
        }
      }

      const withdrawInvitation = async (memberId, courseId) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/JointAccount/withdrawInvitation/${memberId}/${courseId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            }
          });
          if (!response.ok) {
            console.error('Error withdrawing invitation:', response.status);
            return;
          }
          const json = await response.json()
        }
        catch (error) {
          console.error('Error withdrawing invitation:', error.message);
        }
      }

      const getCourseById = async (id) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/JointAccount/getCourseById/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error getting course:', response.status);
            return;
          }
          const json = await response.json()
          setCourseName(json.title)
          return json;
        }
        catch (error) {
          console.error('Error getting course:', error.message);
        }
      }

      const getDetailsOfJointAccountRequest = async (id) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/JointAccount/ViewDetailsOfJoinAccountRequest/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching details of joint account requests:', response.status);
            return;
          }
          const json = await response.json()
          setDetailsOfJointAccountRequests(json.jointAccountRequestDetail)
          return json;
        }
        catch (error) {
          console.error('Error fetching details of joint account requests:', error.message);
        }
      }

      const acceptRequest = async (id) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/JointAccount/AcceptJointAccountRequest/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error accepting joint account requests:', response.status);
            return;
          }
          const json = await response.json()
        }
        catch (error) {
          console.error('Error accepting joint account requests:', error.message);
        }
      }

      const rejectRequest = async (id) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/JointAccount/RejectJointAccountRequest/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error rejecting joint account requests:', response.status);
            return;
          }
          const json = await response.json()
        }
        catch (error) {
          console.error('Error rejecting joint account requests:', error.message);
        }
      }
    
    return (
    <JointAccountContext.Provider value={{ SendInvitationToTeacherForJointAccount, getCourseById, courseName, getConnections, connections, pendingInvitations, getPendingInvitations, withdrawInvitation, acceptedInvitations, getAcceptedInvitations, getJointAccountRequests, jointAccountRequests, getDetailsOfJointAccountRequest, detailsOfJointAccountRequests, acceptRequest, rejectRequest }}>
      {props.children}
    </JointAccountContext.Provider>
    )
  }
  
  export default JointAccountState;