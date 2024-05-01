import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Image, RefreshControl } from 'react-native';
import NotificationContext from '../context/Notifications/notificationContext';
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notification = ({ item, markAsRead }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        markAsRead(item._id);
        navigation.navigate(item.redirect);
    };

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.notification, item.read ? null : styles.unreadNotification]}>
            <Image
                style={styles.icon}
                resizeMode="cover"
                source={require("../assets/active-1.png")}
            />
            <View style={styles.notificationContent}>
                <Text style={[styles.notificationText, item.read ? null : styles.unreadNotificationText]}>{item.message}</Text>
                <Text style={[styles.notificationDate, item.read ? null : styles.unreadNotificationDate]}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
        </TouchableOpacity>
    );
};

const NotificationScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [navigate, setNavigate] = useState('');
    const notificationContext = useContext(NotificationContext);
    const { GetNotifications, MarkAsRead } = notificationContext;

    const fetchNotifications = async () => {
        try {
            const data = await GetNotifications();
            if (data.success) {
                const sortedNotifications = data.notifications.sort((a, b) => {
                    if (a.read && !b.read) return 1;
                    if (!a.read && b.read) return -1;
                    return 0;
                });
                setNotifications(sortedNotifications);
            }
            const role = await AsyncStorage.getItem("role");

            if (role == "Student") {
                setNavigate('HomePage1');
            }
            if (role == "Teacher") {
                setNavigate('TeacherHomePage');
            }

        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const onRefresh = useCallback(async () => {
        try {
            setRefreshing(true);
            await fetchNotifications();
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    const filterNotificationsByToday = () => {
        var currentTime = new Date().getTime();
        const timeRange = 1 * 24 * 60 * 60 * 1000;

        return notifications.filter((notification) => {
            const notificationTime = new Date(notification.createdAt).getTime();
            return currentTime - notificationTime < timeRange;
        });
    };

    const filterNotificationsBetween8And30Days = () => {
        const currentTime = new Date().getTime();
        const eightDaysAgo = currentTime - (8 * 24 * 60 * 60 * 1000); // Milliseconds in 8 days
        const thirtyDaysAgo = currentTime - (30 * 24 * 60 * 60 * 1000); // Milliseconds in 30 days

        return notifications.filter((notification) => {
            const notificationTime = new Date(notification.createdAt).getTime();
            return notificationTime >= thirtyDaysAgo && notificationTime <= eightDaysAgo;
        });
    };

    const filterNotificationsLast7DaysExcludingToday = () => {
        const currentTime = new Date().getTime();
        const sevenDaysAgo = currentTime - (7 * 24 * 60 * 60 * 1000); // Milliseconds in 7 days
        const startOfToday = new Date(new Date().setHours(0, 0, 0, 0)).getTime(); // Start of today in milliseconds

        return notifications.filter((notification) => {
            const notificationTime = new Date(notification.createdAt).getTime();
            return notificationTime >= sevenDaysAgo && notificationTime < startOfToday;
        });
    };


    const todayNotifications = filterNotificationsByToday();
    const last7DaysNotifications = filterNotificationsLast7DaysExcludingToday();
    const last30DaysNotifications = filterNotificationsBetween8And30Days();


    return (
        <View style={styles.container}>
            <Header
                heading="Notifications"
                navigate={navigate}
            />
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {todayNotifications.length > 0 && (
                    <View>
                        <Text style={styles.sectionHeader}>Today</Text>
                        <FlatList
                            data={todayNotifications}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <Notification item={item} markAsRead={MarkAsRead} />
                            )}
                            style={styles.inner}
                        />
                    </View>
                )}

                {last7DaysNotifications.length > 0 && (
                    <View>
                        <Text style={styles.sectionHeader}>Last 7 days</Text>
                        <FlatList
                            data={last7DaysNotifications}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <Notification item={item} markAsRead={MarkAsRead} />
                            )}
                            style={styles.inner}
                        />
                    </View>
                )}

                {last30DaysNotifications.length > 0 && (
                    <View>
                        <Text style={styles.sectionHeader}>Last 30 days</Text>
                        <FlatList
                            data={last30DaysNotifications}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <Notification item={item} markAsRead={MarkAsRead} />
                            )}
                            style={styles.inner}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    notification: {
        flexDirection: 'row',
        backgroundColor: Color.colorGainsboro_100,
        padding: 20,
        marginVertical: 5,
        borderRadius: 10,
    },
    notificationContent: {
        flex: 1,
    },
    icon: {
        marginRight: 10,
    },
    unreadNotificationText: {
        fontWeight: 'bold'
    },
    notificationText: {
        fontSize: 17,
        color: 'black'
    },
    notificationDate: {
        fontSize: 12,
        color: 'black',
    },
    sectionHeader: {
        fontWeight: 'bold',
        marginTop: 12,
        backgroundColor: Color.colorSlateblue,
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: 10,
        width: 150,
        textAlign: 'center'
    },
});

export default NotificationScreen;
