import TopicRequestContext from "./TopicRequestContext";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const TopicRequestState = (props) => {
    const host = "http://192.168.0.147:3000"
    const userProfileInitial = []
    // const [userProfile, setUserProfile] = useState(userProfileInitial)

    const GetStudentsTopicRequest = async () => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/StudentTopicRequests/GetStudentTopicRequest`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });
        if (!response.ok) {
          console.error('Error fetching students topic request:', response.status);
          return;
        }
        const json = await response.json()
        return json;
      }
      catch (error) {
        console.error('Error fetching students topic request:', error.message);
      }
    }

    const DeleteStudentsTopicRequest = async (id) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/StudentTopicRequests/DeleteTopicRequest/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error deleting students topic request:', response.status);
            return;
          }
          const json = await response.json()
          return json.success;
        }
        catch (error) {
          console.error('Error deleting students topic request:', error.message);
        }
      }

      const CreateTopicRequest = async (title, description, estimated_hours, rate_per_hour, skills_required, language) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/StudentTopicRequests/CreateStudentTopicRequest`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
            body: JSON.stringify({title, description, estimated_hours, rate_per_hour, skills_required, language})
          });
          if (!response.ok) {
            console.error('Error creating students topic request:', response.status);
            return;
          }
          await response.json()
        }
        catch (error) {
          console.error('Error creating students topic request:', error.message);
        }
      }

      const ViewProposalsOfTopicRequest = async (id) => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/StudentTopicRequests/ViewTopicRequestProposals/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching topic request proposals:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error fetching topic request proposals:', error.message);
        }
      }

      const GetAllProposals = async () => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/StudentTopicRequests/GetAllProposals`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching proposals:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error fetching proposals:', error.message);
        }
      }

      const ViewSingleProposal = async (id) => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/StudentTopicRequests/ViewSingleProposal/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching single proposal:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error fetching single proposal:', error.message);
        }
      }

      const GetRequestedProposals = async (id) => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/StudentTopicRequests/GetRequestedProposals`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching requested proposals:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error fetching requested proposals:', error.message);
        }
      }

      const GetActiveProposals = async (id) => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/StudentTopicRequests/GetActiveProposals`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching active proposals:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error fetching active proposals:', error.message);
        }
      }

      const GetClosedProposals = async (id) => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/StudentTopicRequests/GetClosedProposals`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching closed proposals:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error fetching closed proposals:', error.message);
        }
      }

      const AddFeedback = async (id, feedback, feedback_text) => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/Teacher/AddFeedback/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
            body: JSON.stringify({feedback, feedback_text})
          });
          if (!response.ok) {
            console.error('Error adding feedback:', response.status);
            return;
          }
          await response.json()
        }
        catch (error) {
          console.error('Error adding feedback:', error.message);
        }
      }

      const EndContract = async (id) => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/StudentTopicRequests/EndContract/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error ending contract:', response.status);
            return;
          }
          await response.json()
        }
        catch (error) {
          console.error('Error ending contract:', error.message);
        }
      }

      const DeleteProposal = async (proposal_id, topic_request_id) => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/StudentTopicRequests/DeleteTeacherProposal/${proposal_id}/${topic_request_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error deleting proposal:', response.status);
            return;
          }
          await response.json()
        }
        catch (error) {
          console.error('Error deleting proposal:', error.message);
        }
      }

      const GetPayDetails = async (id) => {
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/StudentTopicRequests/getPayTopicRequestDetails/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error getting pay proposal details:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error getting pay proposal details:', error.message);
        }
      }

      const PayTopicRequest = async (id, amount) => {
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/StudentTopicRequests/PayTopicRequest/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
            body: JSON.stringify({ amount })
          });
          if (!response.ok) {
            console.error('Error paying proposal payment:', response.status);
            return;
          }
          await response.json()
        }
        catch (error) {
          console.error('Error paying proposal payment:', error.message);
        }
      }

      const GetTeacherTopicRequest = async () => {
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/TeacherTopicRequests/GetTeacherTopicRequest`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error getting topic requests for teachers:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error getting topic requests for teachers:', error.message);
        }
      }

      const GetSingleTeacherTopicRequest = async (id) => {
        try{
          console.log(id)
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/TeacherTopicRequests/GetSingleTeacherTopicRequest/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error getting single topic requests for teachers:', response.status);
            return;
          }
          const json = await response.json()
          console.log(json)
          return json;
        }
        catch (error) {
          console.error('Error getting single topic requests for teachers:', error.message);
        }
      }

      const CreateProposalBid = async (id, description, rate_per_hour) => {      
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/TeacherTopicRequests/CreateProposalBid/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
            body: JSON.stringify({description, rate_per_hour})
          });
          if (!response.ok) {
            console.error('Error creating proposal for topic request:', response.status);
            return;
          }
          await response.json()
        }
        catch (error) {
          console.error('Error creating proposal for topic request:', error.message);
        }
      }

      const GetAllProposalsT = async () => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/TeacherTopicRequests/GetAllProposals`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching proposals:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error fetching proposals:', error.message);
        }
      }

      const ViewSingleProposalT = async (id) => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/TeacherTopicRequests/ViewSingleProposal/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching single proposal:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error fetching single proposal:', error.message);
        }
      }

      const GetRequestedProposalsT = async (id) => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/TeacherTopicRequests/GetRequestedProposals`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching requested proposals:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error fetching requested proposals:', error.message);
        }
      }

      const GetActiveProposalsT = async (id) => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/TeacherTopicRequests/GetActiveProposals`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching active proposals:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error fetching active proposals:', error.message);
        }
      }

      const GetClosedProposalsT = async (id) => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/TeacherTopicRequests/GetClosedProposals`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error fetching closed proposals:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error fetching closed proposals:', error.message);
        }
      }

      const WithdrawProposal = async (proposal_id) => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/TeacherTopicRequests/WithdrawProposal/${proposal_id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error withdrawing proposal:', response.status);
            return;
          }
          await response.json()
        }
        catch (error) {
          console.error('Error withdrawing proposal:', error.message);
        }
      }

      const AddFeedbackStudent = async (student_id, topic_request_id, feedback) => {   
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/Student/AddFeedback/${student_id}/${topic_request_id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
            body: JSON.stringify({feedback})
          });
          if (!response.ok) {
            console.error('Error adding feedback:', response.status);
            return;
          }
          await response.json()
        }
        catch (error) {
          console.error('Error adding feedback:', error.message);
        }
      }

      const GetRecommendedTeacherTopicRequest = async () => {
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch("http://192.168.0.147:5000/api/GetRecommendedTeacherTopicRequest", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error getting recommended topic requests for teachers:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error getting recommended topic requests for teachers:', error.message);
        }
      }

      const GetPopularCommunities = async () => {
        try{
          const token = await AsyncStorage.getItem('tokenn');
          const response = await fetch(`${host}/api/TeacherTopicRequests/GetPopularCommunities`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": token
            },
          });
          if (!response.ok) {
            console.error('Error getting communities for teachers:', response.status);
            return;
          }
          const json = await response.json()
          return json;
        }
        catch (error) {
          console.error('Error getting communities for teachers:', error.message);
        }
      }
  
    return (
    <TopicRequestContext.Provider value={{ GetPopularCommunities, GetRecommendedTeacherTopicRequest, AddFeedbackStudent, WithdrawProposal, ViewSingleProposalT, GetAllProposalsT, GetRequestedProposalsT, GetActiveProposalsT, GetClosedProposalsT, CreateProposalBid, GetSingleTeacherTopicRequest, GetTeacherTopicRequest, PayTopicRequest, GetPayDetails, DeleteProposal, AddFeedback, EndContract, GetActiveProposals, GetClosedProposals, GetRequestedProposals, ViewSingleProposal, GetAllProposals, GetStudentsTopicRequest, DeleteStudentsTopicRequest, CreateTopicRequest, ViewProposalsOfTopicRequest }}>
      {props.children}
    </TopicRequestContext.Provider>
    )
  }
  
  export default TopicRequestState;