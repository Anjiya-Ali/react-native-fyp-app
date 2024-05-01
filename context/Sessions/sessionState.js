import SessionContext from "./sessionContext";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserState = (props) => {
    const host = "http://192.168.0.147:3000"
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

    const GetAllUpcomingSessions = async () => {
        try {
            const token = await AsyncStorage.getItem('tokenn');
            const response = await fetch(`${host}/api/LiveSession/GetAllUpcomingSessions`, {
                method: 'GET',
                headers: {
                    "auth-token": token
                },
            });
            const json = await response.json()
            return json.liveSessions;
        }
        catch (error) {
            console.error('Error getting student live Sessions:', error.message);
        }
    }

    const AddInterestedSession = async (session_id) => {
        try {
            const token = await AsyncStorage.getItem('tokenn');
            const response = await fetch(`${host}/api/LiveSession/AddInterestedSession`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": token
                },
                body: JSON.stringify({ session_id })
            });
            await response.json()
        }
        catch (error) {
            console.error('Error adding interested Session:', error.message);
        }
    }

    const DeleteLiveSession = async (id) => {
        try {
            const token = await AsyncStorage.getItem('tokenn');
            const response = await fetch(`${host}/api/LiveSession/DeleteLiveSession/${id}`, {
                method: 'DELETE',
                headers: {
                    "auth-token": token
                },
            });
            await response.json()
        }
        catch (error) {
            console.error('Error deleting teacher live Sessions:', error.message);
        }
    }

    const UpdateLiveSession = async (formData, id) => {
        console.log(formData)
        console.log(id)
        try {
            const token = await AsyncStorage.getItem('tokenn');
            const response = await fetch(`${host}/api/LiveSession/UpdateLiveSession/${id}`, {
                method: 'PUT',
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
            console.error('Error updating Session:', error.message);
        }
    }

    return (
        <SessionContext.Provider value={{ UpdateLiveSession, DeleteLiveSession, AddInterestedSession, GetAllUpcomingSessions, createSession, getMySessions, currentSession, getLiveSessions, UpdateLiveSessionHls, setCurrentSession }}>
            {props.children}
        </SessionContext.Provider>
    )
}

export default UserState;