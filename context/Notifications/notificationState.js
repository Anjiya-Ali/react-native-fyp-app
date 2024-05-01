import NotificationContext from "./notificationContext";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationState = (props) => {
    const host = "http://192.168.0.147:3000"

    const CreateNotification = async (message, redirect, title, user_id) => {
        try {
            const token = await AsyncStorage.getItem('tokenn');
            const response = await fetch(`${host}/api/Notifications/CreateNotification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": token
                },
                body: JSON.stringify({
                    'user_id': user_id,
                    'message': message,
                    'redirect': redirect,
                    'title': title
                })
            });
            const json = await response.json()
            return json;
        }
        catch (error) {
            console.error('Error creating Notification:', error.message);
        }
    }

    const MarkAsRead = async (id) => {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Notifications/MarkAsRead/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            },
        });
        await response.json();
    }

    const GetNotifications= async () => {
        try {
            const token = await AsyncStorage.getItem('tokenn');
            const response = await fetch(`${host}/api/Notifications/GetAllNotifications`, {
                method: 'GET',
                headers: {
                    "auth-token": token
                },
            });
            const json = await response.json()
            return json;
        }
        catch (error) {
            console.error('Error getting notifications:', error.message);
        }
    }

    return (
        <NotificationContext.Provider value={{ GetNotifications, MarkAsRead, CreateNotification }}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationState;