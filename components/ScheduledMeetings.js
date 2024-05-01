// CommunityPage.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import RealHeader from './RealHeader';
import ScheduledListItems from './ScheduledListItems';
import upDown from '../assets/upDown.png';
import down from '../assets/dropDown.png';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Error from './Error';
import meetingSchedulingContext from "../context/MeetingScheduling/MeetingSchedulingContext";
import * as Animatable from "react-native-animatable";

const ScheduledMeetings = () => {

    const meetingContext = useContext(meetingSchedulingContext);
    const { createScheduledMeeting, getAll, schMeetings, setschMeetings } = meetingContext;
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
    const years = [
        "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034"
    ]

    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const showTimePicker = () => setTimePickerVisible(true);
    const hideTimePicker = () => setTimePickerVisible(false);

    const [selectedYear, setSelectedYear] = useState(years[0]);

    const [dates, setDates] = useState([]);
    const [month, setMonth] = useState(months[0]);

    const [date, setDate] = useState(1)
    const [day, setDays] = useState("MON")
    const [i, setCounter] = useState(0);
    const getDayOfWeek = (date) => {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THURS', 'FRI', 'SAT'];
        return days[date.getDay()];
    };
    useEffect(() => {
        const today = new Date();
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const result = [];
        let count = 0;
        for (let i = 0; i < 31; i++) {
            const date = new Date(currentYear, currentMonth, i + 1);
            if (date.getDate() == 1 && count == 1) {
                break;
            }
            if (date.getDate() == 1) {
                count++;
            }
            result.push({
                date: date.getDate(),
                day: getDayOfWeek(date),
                month: date.toLocaleString('default', { month: 'long' }),
                year: date.getFullYear()
            });
        }
        setMonth(result[0].month)
        setCounter(months.indexOf(result[0].month))
        setSelectedYear(result[0].year)
        setDays(result[0].day)
        const d = today.getDate();
        const y = today.getFullYear();
        const indexOfValue = years.indexOf(y.toString());
        const newScrollX = ((d - 1) * 100) + 10;
        scrollViewRef.current.scrollTo({ x: newScrollX, animated: true });
        const newScrollY = ((indexOfValue) * 30) + 11;
        scrollViewRefVer.current.scrollTo({ y: newScrollY, animated: true });


        setDates(result);
    }, []);
    const forward = () => {
        if (i == 11) {
            setCounter(0)
            setMonth(months[0])
            const indexOfValue = years.indexOf(selectedYear.toString());
            const newScrollY = ((indexOfValue + 1) * 30) + 11;
            scrollViewRefVer.current.scrollTo({ y: newScrollY, animated: true });
            return;
        }
        setMonth(months[i + 1])
        setCounter(i + 1)
    }
    const backward = () => {
        if (i == 0) {
            setCounter(11)
            setMonth(months[11])
            const indexOfValue = years.indexOf(selectedYear.toString());
            const newScrollY = ((indexOfValue - 1) * 30) + 11;
            scrollViewRefVer.current.scrollTo({ y: newScrollY, animated: true });
            return;
        }
        setMonth(months[i - 1])
        setCounter(i - 1)
    }
    const handleScroll = (event) => {
        const { contentOffset } = event.nativeEvent;
        let y;
        if (contentOffset.y - 30 < 0) {
            y = 0
        }
        else {
            y = contentOffset.y - 10
            y = Math.floor(y / 30)

        }
        if (y >= 0 && y < years.length) {
            setSelectedYear(years[y]);
        }
    };
    const [adder, showAdder] = useState(false)
    const handleAdd = () => {
        showAdder(true)
    }
    const [hello, setHello] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(null)
    const handleAppend = () => {
        if (!communityName || communityName.trim() === "") {
            setMessage('Please Enter a Title')
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);

            return;
        }
        if (communityName.trim().length < 3) {
            setMessage('Title must be 3 characters long')
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);

            return;
        }
        if (time.trim().trim() === "" || !time) {
            setMessage('Please select a Time')
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);

            return;
        }
        const monthForm = (i + 1 < 10) ? `0${i + 1}` : `${i + 1}`;
        createScheduledMeeting(`${selectedYear}-${monthForm}-${date.toString().padStart(2, '0')}`, time, communityName)

        if (schMeetings) {
            // const tempArray = [...schMeetings];
            // const obj = {
            //     _id: schMeetings.length + 1,
            //     title: communityName,
            //     date: time
            // }

            // tempArray.push(obj)

            setHello(true)
            setschMeetings(null)
        }
        // setDeleteItems(items)
        showAdder(false)
        setTime('')
        setName('')

    }
    const [communityName, setName] = useState('')
    const [time, setTime] = useState('')
    const scrollViewRef = useRef(null);
    const scrollViewRefVer = useRef(null);
    const handleScrollHor = (event) => {

        const { contentOffset } = event.nativeEvent;
        let index = Math.floor(contentOffset.x / 100);
        const decimalPart = contentOffset.x % 100 / 100;
        if (decimalPart > 0.55) {
            index = Math.ceil(contentOffset.x / 100);
        }
        if (index >= 0 && index < dates.length) {
            setDate(dates[index].date)
            setDays(dates[index].day)
        }
    };
    const [upcoming, setUpcoming] = useState(false)

    const [upcomingL, setUpcomingL] = useState(true)

    const [past, setPast] = useState(false)
    const [pastL, setPastL] = useState(true)
    const [bye, setBye] = useState(false)
    const [bye1, setBye1] = useState(false)

    const scrollerUp = () => {

        setUpcoming(!upcoming)
        setUpcomingL(!upcomingL)
        if (bye || bye1) {
            setBye(false)
            setBye1(false)
        }
        const monthFormer = (i + 1 < 10) ? `0${i + 1}` : `${i + 1}`;
        const formattedDate = `${selectedYear}-${monthFormer}-${date.toString()}`;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const formattedDateObj = new Date(formattedDate);
        formattedDateObj.setHours(0, 0, 0, 0);

        if (formattedDateObj.getTime() < today.getTime()) {
            setBye1(true)
            return;
        }
        if (!schMeetings) {
            getAll(formattedDate);
        }

    }
    const scrollerPast = () => {

        setPast(!past)
        setPastL(!pastL)
        if (bye || bye1) {
            setBye(false)
            setBye1(false)
        }
        const monthFormer = (i + 1 < 10) ? `0${i + 1}` : `${i + 1}`;
        const formattedDate = `${selectedYear}-${monthFormer}-${date.toString()}`;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const formattedDateObj = new Date(formattedDate);
        formattedDateObj.setHours(0, 0, 0, 0);
        if (formattedDateObj.getTime() > today.getTime()) {
            setBye(true)
            return;
        }
        if (!schMeetings) {
            getAll(formattedDate);
        }
    }
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
    const onCancel = () => {
        showAdder(false)
        setTime('')
        setName('')
    }
    const mover = (index) => {
        var move = ((index - 1) * 100) + 10;
        scrollViewRef.current.scrollTo({ x: move, animated: true });
    }
    const moveY = (index) => {
        var move = (index * 30) + 15;
        scrollViewRefVer.current.scrollTo({ y: move, animated: true });
    }

    useEffect(() => {
        const fetchData = async () => {
            setschMeetings(null)
            setUpcoming(false)
            setUpcomingL(true)
            setPast(false)
            setPastL(true)
            setBye(false)
            setBye1(false)
        };

        fetchData();
    }, [date, selectedYear, i]);
    useEffect(() => {
        if (!schMeetings && hello) {
            const monthFormer = (i + 1 < 10) ? `0${i + 1}` : `${i + 1}`;

            const formattedDate = `${selectedYear}-${monthFormer}-${date.toString()}`;

            getAll(formattedDate);
            setHello(false)
        }
    }, [schMeetings]);
    useEffect(() => {
        const result = [];
        let count = 0;
        for (let j = 0; j < 31; j++) {
            const date = new Date(selectedYear, i, j + 1);
            if (date.getDate() == 1 && count == 1) {
                break;
            }
            if (date.getDate() == 1) {
                count++;
            }
            result.push({
                date: date.getDate(),
                day: getDayOfWeek(date),
                month: date.toLocaleString('default', { month: 'long' }),
                year: date.getFullYear()
            });
        }
        const today = new Date();
        const isTodayInResult = result.some(item =>
            item.date === today.getDate() &&
            item.month === today.toLocaleString('default', { month: 'long' }) &&
            item.year === today.getFullYear()
        );

        if (isTodayInResult) {

            const d = today.getDate();
            const newScrollX = ((d - 1) * 100) + 10;
            scrollViewRef.current.scrollTo({ x: newScrollX, animated: true });
        } else {
            scrollViewRef.current.scrollTo({ x: 10, animated: true });
        }
        setDates(result);
    }, [selectedYear, i]);
    
    return (
        <>{error ? (
            <Error error={message} />
        ) : null}
            <View style={{ flex: 1 }}>
                <RealHeader
                    heading="Schedule Meetings"
                    radius={true}
                />
                <View style={{ borderBottomRightRadius: 20, borderBottomStartRadius: 20, backgroundColor: '#373eb2', height: 200 }}>
                    <View style={{ backgroundColor: "#373eb2", flex: 1 / 4, flexDirection: 'row' }}>
                        <View style={{ backgroundColor: "#373eb2", flex: 1 / 5, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <TouchableOpacity onPress={() => { backward() }}>
                                <Image
                                    style={{
                                        borderRadius: 50,
                                        width: 25,
                                        height: 25,
                                    }}
                                    source={require("../assets/Back.png")}
                                />
                            </TouchableOpacity>

                        </View>
                        <View style={{ backgroundColor: "#373eb2", flex: 3 / 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <Text style={{
                                    color: 'black', fontSize: 20,
                                    fontWeight: "800",
                                    fontFamily: "Inter-ExtraBold",
                                    color: "white",
                                }}>{month} , </Text>
                            </View>
                            <ScrollView

                                showsVerticalScrollIndicator={false}
                                style={{ flex: 1 }}
                                onScroll={handleScroll}
                                scrollEventThrottle={16}
                                ref={scrollViewRefVer}
                            >
                                <View style={{ height: 20 }} />

                                {years.map((item, index) => (
                                    <Pressable key={index} style={{ justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => moveY(index)}
                                    >
                                        <Text style={{
                                            color: 'black', fontSize: 20, margin: 2,
                                            fontWeight: "800",
                                            fontFamily: "Inter-ExtraBold",
                                            color: item === selectedYear ? "#94D82D" : "white",
                                        }}> {item}</Text>
                                    </Pressable>
                                ))}
                                <View style={{ height: 20 }} />

                            </ScrollView>
                        </View>
                        <View style={{ backgroundColor: "#373eb2", flex: 1 / 5, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => { forward() }}>
                                <Image
                                    style={{
                                        borderRadius: 50,
                                        width: 25,
                                        height: 25,
                                    }}
                                    source={require("../assets/Forward.png")}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ backgroundColor: "#373eb2", flex: 2.5 / 4, flexDirection: 'row', flexWrap: 'wrap', padding: 5 }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{ flexDirection: 'row', flex: 2 / 4 }}
                            onScroll={handleScrollHor}
                            scrollEventThrottle={16}
                            ref={scrollViewRef}
                        >
                            <View style={{ width: 135 }} />
                            {dates.map((item, index) => (
                                <Pressable key={index} style={{ backgroundColor: item.date === date ? "white" : "#d9d9d9", borderRadius: 10, margin: 10, width: 80, height: 100, justifyContent: 'center', alignItems: 'center', borderColor: '#94D82D', borderWidth: item.date === date ? 5 : 0 }} onPress={() => mover(item.date)}>
                                    <View style={{ flex: 2 / 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{
                                            fontSize: 40, fontWeight: "800",
                                            fontFamily: "Inter-ExtraBold",
                                            color: "#373eb2",
                                        }}>{item.date}</Text>
                                    </View>
                                    <View style={{ flex: 1 / 3, alignItems: 'center' }}>
                                        <Text style={{
                                            fontSize: 15, fontWeight: "500",
                                            fontFamily: "Inter-ExtraBold",
                                            color: "#373eb2",
                                        }}>{item.day}</Text>
                                    </View>
                                </Pressable>
                            ))}
                            <View style={{ width: 160 }} />

                        </ScrollView>
                    </View>

                    <View style={{ backgroundColor: "#373eb2", alignItems: 'center', borderBottomRightRadius: 20, borderBottomStartRadius: 20, flex: 0.5 / 4 }}>
                        <Image
                            style={{
                                borderRadius: 50,
                                width: 20,
                                height: 20,
                            }}
                            source={require("../assets/Circle.png")}
                        />
                    </View>

                </View>

                <View style={{ flex: 1 }}>

                    <View style={{ flexDirection: 'row', height: 70, marginTop: 10 }}>

                        <View style={{ flex: 6 / 7, left: 20 }}>
                            <View style={{ flex: 2 / 3, justifyContent: 'center' }}>
                                <Text
                                    style={{

                                        fontSize: 30, fontWeight: "800",
                                        fontFamily: "Inter-ExtraBold",
                                        color: "#373eb2",
                                    }}
                                >{month.substring(0, 3)} {date}, {selectedYear}</Text>
                            </View>
                            <View style={{ flex: 1 / 3 }}>
                                <Text
                                    style={{

                                        fontSize: 15, fontWeight: "500",
                                        fontFamily: "Inter-ExtraBold",
                                        color: "#373eb2",
                                    }}
                                >{day}</Text>

                            </View>
                        </View>

                        <TouchableOpacity style={{ flex: 1 / 7, justifyContent: 'center' }} onPress={handleAdd}>
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                }}
                                source={require("../assets/Plus.png")}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        backgroundColor: '#373eb2',
                        height: 50,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginVertical: 10,
                        borderRadius: 50

                    }}>
                        <View style={{ flex: 6 / 7, justifyContent: 'center' }}>

                            <Text style={{
                                marginLeft: 20,
                                fontSize: 20, fontWeight: "800",
                                fontFamily: "Inter-ExtraBold",
                                color: "white",
                            }}>Upcoming</Text>
                        </View>

                        <TouchableOpacity style={{ flex: 1 / 7, justifyContent: 'center' }} onPress={scrollerUp}>
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                }}
                                source={upcomingL ? down : upDown}
                            />
                        </TouchableOpacity>

                    </View>
                    {upcoming ? (<ScrollView style={{ flex: 6 / 7 }}>
                        {
                            !schMeetings ? (
                                <View>{
                                    bye === false && bye1 == false ?
                                        <View style={{
                                            height: 70,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text

                                                style={{
                                                    fontSize: 20, fontWeight: "800",
                                                    fontFamily: "Inter-ExtraBold",
                                                    color: "#373eb2",
                                                }}
                                            >Loading...</Text>
                                        </View> : (
                                            <View style={{
                                                height: 70,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Text

                                                    style={{
                                                        fontSize: 14, fontWeight: "800",
                                                        fontFamily: "Inter-ExtraBold",
                                                        color: "red",
                                                    }}
                                                >No Upcoming Meetings were Scehduled</Text>
                                            </View>
                                        )
                                }
                                </View>
                            ) : schMeetings.length === 0 ? (
                                <View style={{
                                    height: 70,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text
                                        style={{
                                            fontSize: 14, fontWeight: "800",
                                            fontFamily: "Inter-ExtraBold",
                                            color: "red",
                                        }}
                                    >No Upcoming Meetings Scehduled</Text>
                                </View>
                            ) :

                                schMeetings.filter(item => new Date(item.date) >= new Date()).length === 0 ? (
                                    <View style={{
                                        height: 70,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text

                                            style={{
                                                fontSize: 14, fontWeight: "800",
                                                fontFamily: "Inter-ExtraBold",
                                                color: "red",
                                            }}
                                        >No Upcoming Meetings Scehduled</Text>
                                    </View>
                                ) : (

                                    schMeetings
                                        .filter(item => new Date(item.date) >= new Date()) // Filter items with time greater than current date
                                        .map(item => (
                                            <ScheduledListItems
                                                key={item._id}
                                                title={item.title}
                                                time={item.date}
                                                setDeleteItems={setschMeetings}
                                                deleteItems={schMeetings}
                                                id={item._id}
                                                color="#a2ffaa"
                                            />
                                        ))
                                )
                        }
                    </ScrollView>) : (null)}
                    <View style={{
                        backgroundColor: '#373eb2',
                        height: 50,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginVertical: 10,
                        borderRadius: 50
                    }}>
                        <View style={{ flex: 6 / 7, justifyContent: 'center' }}>

                            <Text style={{
                                marginLeft: 20,
                                fontSize: 20, fontWeight: "800",
                                fontFamily: "Inter-ExtraBold",
                                color: "white",
                            }}>Past</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 1 / 7, justifyContent: 'center' }} onPress={scrollerPast}>
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                }}
                                source={pastL ? down : upDown}
                            />
                        </TouchableOpacity>

                    </View>
                    {past ? (<ScrollView style={{ flex: 6 / 7 }}>
                        {
                            !schMeetings ? (
                                <View>{
                                    bye === false && bye1 == false ?
                                        <View style={{
                                            height: 70,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text

                                                style={{
                                                    fontSize: 20, fontWeight: "800",
                                                    fontFamily: "Inter-ExtraBold",
                                                    color: "#373eb2",
                                                }}
                                            >Loading...</Text>
                                        </View> : (<View style={{
                                            height: 70,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Text

                                                style={{
                                                    fontSize: 14, fontWeight: "800",
                                                    fontFamily: "Inter-ExtraBold",
                                                    color: "red",
                                                }}
                                            >No Past Meetings were Scehduled</Text>
                                        </View>)
                                }
                                </View>
                            ) : schMeetings.length === 0 ? (
                                <View style={{
                                    height: 70,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text

                                        style={{
                                            fontSize: 14, fontWeight: "800",
                                            fontFamily: "Inter-ExtraBold",
                                            color: "red",
                                        }}
                                    >No Past Meetings were Scehduled</Text>
                                </View>
                            ) :

                                schMeetings.filter(item => new Date(item.date) < new Date()).length === 0 ? (
                                    <View style={{
                                        height: 70,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text

                                            style={{
                                                fontSize: 14, fontWeight: "800",
                                                fontFamily: "Inter-ExtraBold",
                                                color: "red",
                                            }}
                                        >No Past Meetings were Scehduled</Text>
                                    </View>
                                ) :
                                    (

                                        schMeetings
                                            .filter(item => new Date(item.date) < new Date()) // Filter items with time greater than current date
                                            .map(item => (
                                                <ScheduledListItems
                                                    key={item._id}
                                                    title={item.title}
                                                    time={item.date}
                                                    setDeleteItems={setschMeetings}
                                                    deleteItems={schMeetings}
                                                    id={item._id}
                                                    color="#ff8c8c"
                                                />
                                            ))
                                    )
                        }
                    </ScrollView>) : (null)}

                </View>
                {
                    adder ? (<>
                        <View style={{
                            position: 'absolute', bottom: 0, height: 190, width: '100%',
                            backgroundColor: "#373eb2",
                            borderTopLeftRadius: 40, borderTopRightRadius: 40,
                            alignItems: 'center',

                        }} >
                            <TouchableOpacity onPress={handleAppend}>
                                <Text
                                    style={{
                                        marginTop: 3,
                                        fontSize: 20,
                                        fontWeight: "800",
                                        fontFamily: "Inter-ExtraBold",
                                        color: "white",
                                        zIndex: 1
                                    }}

                                >Create a Meeting Schedule</Text>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={onCancel} style={{ position: 'absolute', right: 25, bottom: 165 }}>
                                <Image
                                    source={require('../assets/Cancel.png')}
                                    resizeMode="cover"
                                    style={{ height: 20, width: 20 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            position: 'absolute', bottom: 0, height: 150, width: '100%',
                            backgroundColor: "#d9d9d9",
                            borderTopLeftRadius: 40, borderTopRightRadius: 40,
                            alignItems: 'center',

                        }} >
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1 / 2 }}>
                                    <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: "800",
                                            fontFamily: "Calibri",
                                            color: '#373eb2',
                                        }}>Title</Text>
                                    </View>
                                    <View style={{ flex: 2 / 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter Title"
                                            placeholderTextColor="white"
                                            value={communityName}
                                            onChangeText={(text) => setName(text)}
                                        />
                                    </View>

                                </View>
                                <View style={{ flex: 1 / 2 }}>
                                    <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: "800",
                                            fontFamily: "Calibri",
                                            color: '#373eb2',
                                        }}>Time</Text>
                                    </View>
                                    <Pressable style={{ flex: 2 / 3, justifyContent: 'center', alignItems: 'center' }} onPress={showTimePicker}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Select Time"
                                            placeholderTextColor="white"
                                            editable={false} // Disable editing
                                            value={time}
                                        />
                                    </Pressable>

                                </View>
                            </View>

                        </View>
                        <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={handleTimeConfirm}
                            onCancel={hideTimePicker}
                            contentContainerStyle={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}

                        />
                    </>) : null
                }

            </View >
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#373eb2',
        color: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 5,
        width: 250,

        height: 35,
        fontSize: 11
    },
    myCommunitiesInnerFlexBox: {
        alignItems: "flex-end",
    },
    upperStyle: {
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        backgroundColor: "#373eb2",

    },
    dataScienceEnthusiasts: {
        fontSize: 11,
        fontWeight: "700",
        fontFamily: "Calibri",
        color: "#e4e3e3",
        textAlign: "left",
    },
    dataScienceEnthusiastsWrapper: {
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        backgroundColor: "#373eb2",
        height: 30
    },
    myCommunitiesInner: {
        width: "100%",
        height: 150,
    },
    myCommunities: {
        flex: 1,
        width: "100%",
        overflow: "hidden",
        alignItems: "center",
        position: 'absolute',
        bottom: 0,
    },
});

export default ScheduledMeetings;