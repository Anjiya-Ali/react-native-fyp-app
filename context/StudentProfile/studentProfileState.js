import StudentProfileContext from "./studentProfileContext";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const studentProfileState = (props) => {
    const host = "http://helloworld-nodejs-4714.azurewebsites.net"
    const userProfileInitial = []
    const [userProfile, setUserProfile] = useState(userProfileInitial)
    const [languages, setLanguages] = useState(userProfileInitial)
    const [educations, setEducations] = useState(userProfileInitial)
    const [interests, setInterests] = useState(userProfileInitial)
    const [myInterests, setMyInterests] = useState({})
  
    const getStudent = async () => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Student/GetProfile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });
        if (!response.ok) {
          console.error('Error fetching student profile:', response.status);
          return;
        }
        const json = await response.json()
        return json;
        return json;
      }
      catch (error) {
        console.error('Error fetching student profile:', error.message);
      }
    }

    const addLanguage = async (name, level) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Student/AddLanguages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({name, level})
        });
        if (!response.ok) {
          console.error('Error adding language:', response.status);
          return;
        }
        const json = await response.json()
        setLanguages(json.languages)
      }
      catch (error) {
        console.error('Error adding language:', error.message);
      }
    }

    const editLanguage = async (name, level, id) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Student/EditLanguage/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({name, level})
        });
        if (!response.ok) {
          console.error('Error updating language:', response.status);
          return;
        }
        await response.json()
      }
      catch (error) {
        console.error('Error updating language:', error.message);
      }
    }

    const deleteLanguage = async (languageId) => {
      try {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Student/DeleteLanguage/${languageId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });

        if (!response.ok) {
          console.error('Error deleting language:', response.status);
          return;
        }
        const json = await response.json()
        setLanguages(json.languages);
      } catch (error) {
        console.error('Error deleting language:', error);
      }
    };

    const addInterest = async (title, description) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Student/AddInterests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({title, description})
        });
        if (!response.ok) {
          console.error('Error adding interest:', response.status);
          return;
        }
        const json = await response.json()
        setMyInterests(json)
      }
      catch (error) {
        console.error('Error adding interest:', error.message);
      }
    }

    const editInterest = async (title, description, id) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Student/EditInterest/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({title, description})
        });
        if (!response.ok) {
          console.error('Error updating interest:', response.status);
          return;
        }
        const json = await response.json()
        setMyInterests(json)
      }
      catch (error) {
        console.error('Error updating interest:', error.message);
      }
    }

    const deleteInterest = async (interestId) => {
      try {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Student/DeleteInterest/${interestId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });

        if (!response.ok) {
          console.error('Error deleting interest:', response.status);
          return;
        }
        const json = await response.json()
        setInterests(json.interests);
      } catch (error) {
        console.error('Error deleting interest:', error);
      }
    };

    const addEducation = async (school, degree, start_date, end_date, grade) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Student/AddEducation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({school, degree, start_date, end_date, grade})
        });
        if (!response.ok) {
          console.error('Error adding education:', response.status);
          return;
        }
        const json = await response.json()
        setEducations(json)
      }
      catch (error) {
        console.error('Error adding education:', error.message);
      }
    }

    const editEducation = async (school, degree, start_date, end_date, grade, id) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Student/EditEducation/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({school, degree, start_date, end_date, grade})
        });
        if (!response.ok) {
          console.error('Error updating education:', response.status);
          return;
        }
        await response.json()
      }
      catch (error) {
        console.error('Error updating education:', error.message);
      }
    }

    const deleteEducation = async (educationId) => {
      try {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Student/DeleteEducation/${educationId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });

        if (!response.ok) {
          console.error('Error deleting education:', response.status);
          return;
        }
        const json = await response.json()
        setEducations(json.education);
      } catch (error) {
        console.error('Error deleting education:', error);
      }
    };

    const getProfilePicture = async () => {
      try {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Student/GetProfilePicture`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });
        const json = await response.json()
        return json;
      }
      catch (error) {
        console.error('Error getting profile pic:', error.message);
      }
    }

    const addBio = async (bio) => {
      try {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Student/AddBio`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({ bio })
        });
        if (!response.ok) {
          console.error('Error adding bio:', response.status);
          return;
        }
        await response.json()
      }
      catch (error) {
        console.error('Error adding bio:', error.message);
      }
    }

    const updateBio = async (bio) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Student/AddBio`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({bio})
        });
        if (!response.ok) {
          console.error('Error updating student bio:', response.status);
          return;
        }
        const json = await response.json()
      }
      catch (error) {
        console.error('Error updating student bio:', error.message);
      }
    }

    const addProfilePic = async (formData) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Student/UploadProfilePicture`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            "auth-token": token
          },
          body:formData
        });
        if (!response.ok) {
          console.error('Error adding profile pic:', response.status);
          return;
        }
        await response.json()
      }
      catch (error) {
        console.error('Error adding profile pic:', error.message);
      }
    }

    const getInterest = async () => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Admin/GetInterests`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          console.error('Error getting interests:', response.status);
          return;
        }
        const json = await response.json()
        setInterests(json.interests)
      }
      catch (error) {
        console.error('Error getting interests:', error.message);
      }
    }
  
    return (
    <StudentProfileContext.Provider value={{ getInterest, myInterests, interests, getStudent, userProfile, addLanguage, languages, addEducation, educations, addInterest, deleteInterest, deleteEducation, deleteLanguage, editInterest, editLanguage, editEducation, updateBio, addProfilePic, addBio, getProfilePicture }}>
      {props.children}
    </StudentProfileContext.Provider>
    )
  }
  
  export default studentProfileState;