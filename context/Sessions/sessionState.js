import SessionContext from "./sessionContext";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserState = (props) => {
    const host = "http://172.16.57.195:3000"
    const [currentSession, setCurrentSession] = useState('');

    const createSession = async (formData) => {
        try {
            const token = await AsyncStorage.getItem('tokenn');
            const response = await fetch(`${host}/api/LiveSession/CreateLiveSession`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "auth-token": token
                },
                body: formData
            });
            const json = await response.json()
            return json;
        }
        catch (error) {
            console.error('Error creating Session:', error.message);
        }
    }

    const UpdateLiveSessionHls = async (id, status) => {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/LiveSession/UpdateLiveSessionHls/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            },
            body: JSON.stringify({
                'status': status,
            })
        });
        await response.json();
    }

    const getMySessions = async () => {
        try {
            const token = await AsyncStorage.getItem('tokenn');
            const response = await fetch(`${host}/api/LiveSession/GetMyLiveSession`, {
                method: 'GET',
                headers: {
                    "auth-token": token
                },
            });
            const json = await response.json()
            return json;
        }
        catch (error) {
            console.error('Error getting teacher Sessions:', error.message);
        }
    }

    const getLiveSessions = async () => {
        try {
            const token = await AsyncStorage.getItem('tokenn');
            const response = await fetch(`${host}/api/LiveSession/GetAllCurrentLiveSessions`, {
                method: 'GET',
                headers: {
                    "auth-token": token
                },
            });
            const json = await response.json()
            return json;
        }
        catch (error) {
            console.error('Error getting teacher live Sessions:', error.message);
        }
    }

    return (
        <SessionContext.Provider value={{ createSession, getMySessions, currentSession, getLiveSessions, UpdateLiveSessionHls, setCurrentSession }}>
            {props.children}
        </SessionContext.Provider>
    )
}

export default UserState;