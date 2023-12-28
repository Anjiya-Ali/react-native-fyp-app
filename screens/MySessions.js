import React, { useState, useContext, useEffect } from "react";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, Modal, TextInput } from 'react-native';
import Header from "../components/Header";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { createMeeting, getToken } from '../src/api/api';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from '../src/navigators/screenNames';
import SessionContext from "../context/Sessions/sessionContext";
import Toast from 'react-native-toast-message';
import CourseContext from "../context/Courses/courseContext";

const MySessions = () => {
    const navigation = useNavigation();
    const [meetingId, setMeetingId] = useState('');
    const [token, setToken] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [coverPicture, setCoverPicture] = useState('');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [isAddSessionModalVisible, setAddSessionModalVisible] = useState(false);
    const context = useContext(SessionContext);
    const { createSession, getMySessions, currentSession, setCurrentSession } = context;
    const course_context = useContext(CourseContext);
    const { getUser } = course_context;
    const [sessionsData, setSessionsData] = useState(null);
    const showDatePicker = () => setDatePickerVisible(true);
    const hideDatePicker = () => setDatePickerVisible(false);
    const showTimePicker = () => setTimePickerVisible(true);
    const hideTimePicker = () => setTimePickerVisible(false);
    const host = 'http://172.16.57.195:3000';

    useEffect(() => {
        const getMySessionsData = async () => {
            const token = await getToken();
            setToken(token);
            const response = await getMySessions();
            if (response.liveSessionsByTeacher) {
                setSessionsData(response.liveSessionsByTeacher);
            }
        };
        getMySessionsData();
    }, []);

    const extractDate = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);

        // Extract date and time separately
        const date = dateTime.getDate();
        const month = dateTime.toLocaleString('default', { month: 'long' });
        const year = dateTime.getFullYear();

        // Format the date as '27th Oct 2023'
        const formattedDate = `${date}${ordinalSuffix(date)} ${month} ${year}`;

        function ordinalSuffix(number) {
            const suffixes = ['th', 'st', 'nd', 'rd'];
            const v = number % 100;
            return (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
        }

        return formattedDate;
    };

    const extractTime = (dateTimeString) => {
        const timestamp = "2023-12-26T02:00:00.000+00:00";
        const userTimezone = 'Asia/Karachi';
        const dateObject = new Date(dateTimeString);

        dateObject.setMinutes(dateObject.getMinutes() + dateObject.getTimezoneOffset() + (Intl.DateTimeFormat().resolvedOptions().timeZone === userTimezone ? 0 : new Date().getTimezoneOffset()));

        const formattedTime = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).format(dateObject);

        return formattedTime;
    };

    const handleConfirm = (selectedDate) => {
        const isoFormattedDate = selectedDate.toISOString().split('T')[0];
        setDate(isoFormattedDate);
        hideDatePicker();
    };

    const handleStartSession = async (meetingId) => {
        const foundSession = sessionsData.find((session) => session.meeting_id === meetingId);
        if (foundSession) {
            const sessionid = foundSession._id;
            const teacherId = foundSession.teacher_id;
            const userData = await getUser(teacherId);
            setCurrentSession(sessionid);
            const name = userData.first_name + ' ' + userData.last_name;
            navigation.navigate(SCREEN_NAMES.Home, { name: name, token: token, meetingId: meetingId })
        }
    };

    const handleTimeConfirm = (selectedTime) => {
        const userTimezone = 'Asia/Karachi';

        const userTimeFormat = new Intl.DateTimeFormat('en-US', {
            timeZone: userTimezone,
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });

        const formattedTime = userTimeFormat.format(selectedTime);

        setTime(formattedTime);
        hideTimePicker();
    };

    const handleSaveSession = async () => {

        if (title === '' || coverPicture === '' || date === '' || time === '') {
            alert('Please fill in all the fields!');
            return;
        }

        const _meetingId = await createMeeting({ token });
        setMeetingId(_meetingId);

        const formData = new FormData();

        formData.append('title', title);
        formData.append('date', date);
        formData.append('time', time);
        formData.append('meeting_id', _meetingId);

        if (coverPicture) {
            formData.append('featured_image', {
                uri: coverPicture.uri,
                type: coverPicture.type,
                name: coverPicture.fileName || 'coverPicture.jpg',
            });
        }

        const response = await createSession(formData);
        setTitle('');
        setDate('');
        setTime('');
        setCoverPicture('');

        const getMySessionsData = async () => {
            const token = await getToken();
            setToken(token);
            const response = await getMySessions();
            if (response.liveSessionsByTeacher) {
                setSessionsData(response.liveSessionsByTeacher);
            }
        };
        getMySessionsData();

        setAddSessionModalVisible(false);

        if (!response.success) {
            showError(response.error);
        }
        else {
            showSuccess('Session Created Successfully');
        }
    };

    const showError = (message) => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: message,
            position: 'top',
            topOffset: 80,
        });
    };

    const showSuccess = (message) => {
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: message,
            position: 'top',
            topOffset: 80,
        });
    };

    const selectImage = async () => {
        const options = {
            title: 'Select Cover Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        const response = await launchImageLibrary(options);
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error:', response.error);
        } else {
            setCoverPicture(response.assets[0]);
        }
    };

    const handleCancelSession = () => {
        setTitle('');
        setDate('');
        setTime('');
        setCoverPicture('');

        setAddSessionModalVisible(false);
    };

    const handleAddSession = () => {
        setAddSessionModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Header
                heading={'My Sessions'}
                navigate="TeacherHomePage"
            />
            <TouchableOpacity
                onPress={handleAddSession}
            >
                <Image style={styles.createSessionButton} source={require("../assets/qwd-1.png")}
                />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
                {sessionsData && sessionsData.map((session) => (
                    <View key={session.meeting_id} style={styles.sessionBox}>
                        <Image source={{ uri: `${host}/${session.featured_image}` }} style={styles.sessionImage} />
                        <View style={styles.sessionDetails}>
                            <View>
                                <Text style={styles.sessionHeading}>{session.title}</Text>
                            </View>
                            <View>
                                <Text style={styles.sessionDateTime}>{extractDate(session.day)}</Text>
                                <Text style={styles.sessionDateTime}>{extractTime(session.day)}</Text>
                                <TouchableOpacity
                                    onPress={() => handleStartSession(session.meeting_id)}
                                    style={styles.startButton}
                                >
                                    <Text style={styles.startButtonText}>Enter</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))
                }
            </ScrollView>
            <Modal
                visible={isAddSessionModalVisible}
                animationType="slide"
                transparent={false}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeading}>Add Session</Text>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Title"
                            value={title}
                            onChangeText={(text) =>
                                setTitle(text)
                            }
                        />
                        <TouchableOpacity onPress={showDatePicker} style={styles.modalInput}>
                            {date ? (
                                <Text style={styles.datePickerButtonText}>{date}</Text>
                            ) : (
                                <Text style={styles.placeholderText}>Select Date</Text>
                            )}
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            minimumDate={new Date()}
                        />

                        <TouchableOpacity onPress={showTimePicker} style={styles.modalInput}>
                            {time ? (
                                <Text style={styles.datePickerButtonText}>{time}</Text>
                            ) : (
                                <Text style={styles.placeholderText}>Select Time</Text>
                            )}
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={handleTimeConfirm}
                            onCancel={hideTimePicker}
                        />

                        <TouchableOpacity
                            onPress={selectImage}
                            style={styles.coverImageInput}
                        >
                            {coverPicture ? (
                                <Image
                                    source={{ uri: coverPicture.uri }}
                                    style={styles.coverImage}
                                />
                            ) : (
                                <Text style={styles.placeholderText}>Select Cover Image</Text>
                            )}
                        </TouchableOpacity>

                    </View>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleSaveSession}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleCancelSession}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View >
    );
};

const styles = StyleSheet.create({
    coverImageInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#f4f4f4',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 16,
        height: 150,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },

    coverImage: {
        width: 250,
        height: 100,
        borderRadius: 5,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    createSessionButton: {
        width: 35,
        height: 35,
        margin: 10,
        marginRight: 20,
        alignSelf: 'flex-end',
    },
    createSessionButtonText: {
        color: 'white',
        fontSize: 18,
    },
    sessionBox: {
        backgroundColor: Color.colorGainsboro_200,
        flexDirection: 'column',
        marginBottom: 16,
        borderWidth: 1,
        width: '90%',
        marginLeft: 18,
        borderColor: '#ddd',
        borderRadius: 15,
        overflow: 'hidden',
    },
    sessionImage: {
        width: '100%',
        height: 150, // adjust the height as needed
    },
    sessionDetails: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
    },
    sessionHeading: {
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        flexWrap: 'wrap',
        color: 'black'
    },
    sessionDateTime: {
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 8,
    },
    startButton: {
        backgroundColor: Color.colorSlateblue,
        padding: 6,
        alignItems: 'center',
        borderRadius: 4,
    },
    startButtonText: {
        color: 'white',
        fontSize: 18,
    },
    modalHeading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 40,
        color: Color.colorSlateblue
    },
    addButton: {
        backgroundColor: Color.colorSlateblue,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 16, // Adjust the font size as needed
    },
    placeholderText: {
        marginTop: 8,
        fontSize: 15.5,
        color: 'gray',
    },
    datePickerButtonText: {
        marginTop: 8,
        fontSize: 15.5,
        color: 'black',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        maxHeight: 300,
        width: '80%',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    modalButton: {
        backgroundColor: Color.colorSlateblue,
        padding: 10,
        margin: 20,
        borderRadius: 10,
        width: '40%',
    },
    button: {
        backgroundColor: Color.colorSlateblue,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: 150,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 150,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    deleteButtonContainer: {
        position: 'absolute',
        bottom: 5,
        right: 20,
    },
    bin: {
        width: 25,
        height: 25
    },
    modalInput: {
        height: 40,
        width: '100%',
        backgroundColor: '#f4f4f4',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
        // Adding shadow for a subtle lift
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
});

export default MySessions;
