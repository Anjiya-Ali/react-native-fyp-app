import ElearnContext from "./ElearnContext";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ElearnState = (props) => {
    const host = "http://helloworld-nodejs-4714.azurewebsites.net";
    const [teachers, setTeachers] = useState(null)
    const [courses, setCourses] = useState(null)
    const [categories, setCategories] = useState(null)

    const getTeachers = async () => {
        try {
            // 192.168.0.147:3000/api/Teacher/getAll
            const token = await AsyncStorage.getItem('tokenn');
            const response = await fetch(`${host}/api/Teacher/getAll`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": token
                },
            });
            if (!response.ok) {
                console.error('Error fetching all Teachers:', response.status);
                return;
            }
            const data = await response.json()
            setTeachers(data.teachers)
        }
        catch (error) {
            console.error('Error fetching teachers requests:', error.message);
        }
    }
    const getAllCourses = async (categories) => {
        try {
            const token = await AsyncStorage.getItem("tokenn");
            console.log("Hi", categories)
            const response = await fetch(
                `${host}/api/CourseEnrollment/getAllCourses/`,
                {
                    method: "POST",
                    headers: {
                        "auth-token": token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ categories }),

                }
            );
            if (!response.ok) {
                console.error(
                    "Error Fetching All Courses",
                    response.status
                );
                return;
            }

            const data = await response.json()
            console.log("Hello", data.courses)
            setCourses(data.courses)

        } catch (error) {
            console.error(
                "Error Fetching All Courses",
                error.message
            );
        }
    };
    const getAllCategories = async () => {
        try {
            const token = await AsyncStorage.getItem("tokenn");

            const response = await fetch(
                `${host}/api/CourseEnrollment/getAllCategories/`,
                {
                    method: "GET",
                    headers: {
                        "auth-token": token,
                    },
                }
            );
            if (!response.ok) {
                console.error(
                    "Error Fetching All Categories",
                    response.status
                );
                return;
            }

            const data = await response.json()
            setCategories(data.categories)

        } catch (error) {
            console.error(
                "Error Fetching All Categories",
                error.message
            );
        }
    };
    return (
        <ElearnContext.Provider value={{ setCategories, categories, teachers, setTeachers, getTeachers, getAllCourses, setCourses, courses, getAllCategories }}>
            {props.children}
        </ElearnContext.Provider>
    )
}

export default ElearnState;