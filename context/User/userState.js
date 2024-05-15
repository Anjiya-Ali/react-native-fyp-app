import UserContext from "./userContext";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const UserState = (props) => {
  const host = "http://helloworld-nodejs-4714.azurewebsites.net"

  const registerUser = async (first_name, last_name, password, email, gender, country, dob, privilege) => {
    try {
      const response = await fetch(`${host}/api/User/CreateUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, password, email, gender, country, dob, privilege })
      });
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error adding user:', error.message);
    }
  }

  const getProfilePicForOther = async (id) => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/User/GetProfilePictureOther/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
      });
      const json = await response.json()
      return json.profile_picture;
    }
    catch (error) {
      console.error('Error adding user:', error.message);
    }
  }

  const handleUserLogin = async (email, password) => {
    try {
      const response = await fetch(`${host}/api/User/LoginUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        console.error('Error loging user:', response.status);
        return;
      }
      const json = await response.json()
      if (json.success) {
        await AsyncStorage.setItem('tokenn', json.authtoken);
        await AsyncStorage.setItem('role', json.role);
        await AsyncStorage.setItem('id', json.id);
        await AsyncStorage.setItem('name', json.name);
      }
      return json;
    }
    catch (error) {
      console.error('Error loging user:', error.message);
    }
  }

  const saveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const fcmToken = await messaging().getToken();
      const response = await fetch(`${host}/api/FirebaseToken/AddFirebaseToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({
          'token': fcmToken,
        })
      });
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error adding firebase token:', error.message);
    }
  }

  const removeToken = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/FirebaseToken/RemoveFirebaseToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
      });
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error removing firebase token:', error.message);
    }
  }

  const emailVerification = async (email) => {
    try {
      const response = await fetch(`${host}/api/User/ForgotPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });
      if (!response.ok) {
        console.error('Error verifying email:', response.status);
        return;
      }
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error verifying email:', error.message);
    }
  }

  const codeVerification = async (email, codee, code) => {
    try {
      const response = await fetch(`${host}/api/User/ValidateCode/${codee}/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      });
      if (!response.ok) {
        console.error('Error verifying code:', response.status);
        return;
      }
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error verifying code:', error.message);
    }
  }

  const passwordVerification = async (email, password, rePassword) => {
    try {
      const response = await fetch(`${host}/api/User/ChangePassword/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, rePassword })
      });
      if (!response.ok) {
        console.error('Error changing password:', response.status);
        return;
      }
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error changing password:', error.message);
    }
  }

  const GetAllUsers = async (id) => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/User/GetAllUsers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
      });
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error finding user:', error.message);
    }
  }

  return (
    <UserContext.Provider value={{ GetAllUsers, getProfilePicForOther, registerUser, handleUserLogin, saveToken, removeToken, emailVerification, codeVerification, passwordVerification }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;