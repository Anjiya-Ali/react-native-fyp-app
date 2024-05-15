// CommunityPage.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import RealHeader from './RealHeader';
import meetingSchedulingContext from "../context/MeetingScheduling/MeetingSchedulingContext";

const ScheduledListItems = (props) => {
    const meetingContext = useContext(meetingSchedulingContext);
    const { schMeetings, setschMeetings,deleteSchedule } = meetingContext;

    const [deletePop, setDelete] = useState(false)
    const handleDeletion = () => {
        setDelete(!deletePop)
    }

    const handleConfirm = () => {
        const temp = [...schMeetings];
        const filteredTemp = temp.filter(item => item._id !== props.id);
        deleteSchedule(props.id)
        setschMeetings(filteredTemp);
    }
    const dateObj = new Date(props.time);

    let hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getUTCSeconds();

    let am_pm = 'AM';
    if (hours >= 12) {
        am_pm = 'PM';
        if (hours > 12) {
            hours -= 12;
        }
    }
    if (hours === 0) {
        hours = 12;
    }
    return (
        <>
            {deletePop ? (
                <View
                    style={{
                        backgroundColor: 'red',
                        height: 70,
                        flexDirection: 'row',
                        marginVertical: 5,
                        borderRadius: 5
                    }}
                >
                    <View style={{ flex: 5 / 7, marginLeft: 15 }}>
                        <View style={{ flex: 1 / 3, justifyContent: 'center' }}>
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: '800',
                                    fontFamily: 'Inter-ExtraBold',
                                    color: 'black'
                                }}
                            >
                                Are You Sure?
                            </Text>
                        </View>
                        <View style={{ flex: 1.5 / 3, flexDirection: 'row', alignItems: 'center' }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '500',
                                    fontFamily: 'Inter-ExtraBold',
                                    color: 'black'
                                }}
                            >
                                to remove
                            </Text><Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: '800',
                                    fontFamily: 'Inter-ExtraBold',
                                    color: 'white',
                                    left: 5
                                }}
                            >
                                {props.title}
                            </Text>
                        </View>
                        <View style={{ flex: 1 / 3, justifyContent: 'center' }}>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '500',
                                    fontFamily: 'Inter-ExtraBold',
                                    color: 'black'
                                }}
                            >
                                from scheduled meetings list
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 2 / 7, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={handleConfirm} style={{ flex: 1 / 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                                source={require('../assets/check.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1 / 2, justifyContent: 'center', alignItems: 'center' }}
                            onPress={handleDeletion}
                        >
                            <Image
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                                source={require('../assets/Cancel.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View
                    style={{
                        backgroundColor: props.color,
                        height: 70,
                        flexDirection: 'row',
                        marginVertical: 5,
                        borderRadius: 5
                    }}
                >
                    <View style={{ flex: 6 / 7, marginLeft: 15 }}>
                        <View style={{ flex: 2 / 3, justifyContent: 'center' }}>
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: '800',
                                    fontFamily: 'Inter-ExtraBold',
                                    color: '#373eb2'
                                }}
                            >
                                {props.title}
                            </Text>
                        </View>
                        <View style={{ flex: 1 / 3, justifyContent: 'center' }}>
                            <Text
                                style={{
                                    fontSize: 10,
                                    fontWeight: '500',
                                    fontFamily: 'Inter-ExtraBold',
                                    color: '#373eb2'
                                }}
                            >
                                {`${hours}:${minutes}:${seconds} ${am_pm}`}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 / 7, flexDirection: 'row' }}>

                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            onPress={handleDeletion}
                        >
                            <Image
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                                source={require('../assets/deleted.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>

    );
};

export default ScheduledListItems;