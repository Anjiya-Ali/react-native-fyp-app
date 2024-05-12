import React, { createContext, useState, useContext } from "react";
import MeetingSchedulingContext from "./MeetingSchedulingContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MeetingSchedulingState = (props) => {

    const host = "http://helloworld-nodejs-4714.azurewebsites.net";
    const [message, setMessage] = useState(null)
    const id = AsyncStorage.getItem("id");
    const [loggedIn, setLoggedIn] = useState(id);
    const [schMeetings, setschMeetings] = useState(null);

    const createScheduledMeeting = async (date, time, title) => {
        try {
            // console.log("heyyyyy")
            const isoDateTime = new Date(`${date}T${time}Z`).toISOString();

            const token = await AsyncStorage.getItem("tokenn");

            const response = await fetch(
                `${host}/api/ScheduledMeetings/CreateScheduledMeeting`,
                {
                    method: "POST",
                    headers: {
                        "auth-token": token,
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify({
                        date
                        , time, title
                    })
                }
            );
            // console.log("akfgauidfgiasdfasf")
            if (!response.ok) {
                console.error(
                    "Error Creating a Schedule for Meetings",
                    response.status
                );
                return;
            }

            const data = await response.json();
            if (data.scheduled_meeting) {
                console.log("everything went well")
            }
        } catch (error) {
            console.error("Error Creating a Schedule for Meetings", error.message);
        }
    };
    const getAll = async (date) => {
        try {
            const token = await AsyncStorage.getItem("tokenn");

            const response = await fetch(
                `${host}/api/ScheduledMeetings/GetAllScheduledMeeting`,
                {
                    method: "POST",
                    headers: {
                        "auth-token": token,
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify({
                        date
                    })
                }
            );
            if (!response.ok) {
                console.error(
                    "Error Creating a Schedule for Meetings",
                    response.status
                );
                return;
            }

            const data = await response.json();
            if (data.scheduled_meetings) {
                console.log("again", data.scheduled_meetings)
                setschMeetings(data.scheduled_meetings)
            }
            else {
                setschMeetings([])
            }
        } catch (error) {
            console.error("Error Creating a Schedule for Meetings", error.message);
        }
    };
    const deleteSchedule = async (key) => {
        try {
            const token = await AsyncStorage.getItem("tokenn");

            const response = await fetch(
                `${host}/api/ScheduledMeetings/DeleteScheduledMeeting/${key}`,
                {
                    method: "DELETE",
                    headers: {
                        "auth-token": token,
                        "Content-Type": "application/json",

                    }
                }
            );
            if (!response.ok) {
                console.error(
                    "Error Deleting a Schedule",
                    response.status
                );
                return;
            }

            const data = await response.json();
            if (!data.success) {
                console.error(
                    "Error Deleting a Schedule",
                    response.status
                );
            }
        } catch (error) {
            console.error("Error Creating a Schedule for Meetings", error.message);
        }
    };
    return (
        <MeetingSchedulingContext.Provider
            value={{
                getAll,
                createScheduledMeeting,
                message,
                setLoggedIn,
                setMessage,
                loggedIn,
                schMeetings,
                setschMeetings,
                deleteSchedule
            }}
        >
            {props.children}
        </MeetingSchedulingContext.Provider>
    );
};

export default MeetingSchedulingState;