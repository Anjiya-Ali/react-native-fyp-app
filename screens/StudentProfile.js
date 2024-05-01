import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Color } from "../GlobalStyles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import StudentProfileContext from '../context/StudentProfile/studentProfileContext';
import { useNavigation } from "@react-navigation/native";

const ProfileInfoScreen = (props) => {
    const [bio, setBio] = useState('');
    const { name, email } = props.route.params;
    const [profilePicture, setProfilePicture] = useState(null);
    const [isAddEducationModalVisible, setAddEducationModalVisible] = useState(false);
    const [educationList, setEducationList] = useState([]);
    const [isAddInterestModalVisible, setAddInterestModalVisible] = useState(false);
    const [interestList, setInterestList] = useState([]);
    const [isAddLanguageModalVisible, setAddLanguageModalVisible] = useState(false);
    const [languageList, setLanguageList] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setendDatePickerVisibility] = useState(false);
    const [educationArray, setEducationArray] = useState([]);
    const [languageArray, setLanguageArray] = useState([]);
    const [interestArray, setInterestArray] = useState([]);
    const context = useContext(StudentProfileContext);
    const { addEducation, addProfilePic, addLanguage, addBio, addInterest} = context;
    const navigation = useNavigation();

    const [interestForm, setInterestForm] = useState({
        title: '',
        description: '',
    });

    const [educationForm, setEducationForm] = useState({
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
        grade: '',
    });

    // Assuming you have the following state for language information
    const [languageForm, setLanguageForm] = useState({
        name: '',
        level: '',
    });

    const handleAddLanguage = () => {
        setAddLanguageModalVisible(true);
    };

    // Function to handle saving language information
    const handleSaveLanguage = () => {
        if (languageForm.name === '' || languageForm.level === '') {
            alert('Please fill in all the fields!');
            return;
        }

        const newLanguage = `${languageForm.name} - ${languageForm.level}`;
        setLanguageList([...languageList, newLanguage]);

        const langauge = `${languageForm.name}, ${languageForm.level}`;
        setLanguageArray([...languageArray, langauge]);

        setLanguageForm({
            name: '',
            level: '',
        });

        setAddLanguageModalVisible(false);
    };

    const handleCancelLanguage = () => {
        setLanguageForm({
            name: '',
            level: '',
        });

        setAddLanguageModalVisible(false);
    };

    const handleAddEducation = () => {
        setAddEducationModalVisible(true);
    };

    const handleSaveEducation = () => {
        if (educationForm.degree == '' || educationForm.school == '' || educationForm.startDate == '' || educationForm.endDate == '' || educationForm.grade == '') {
            alert('Please fill in all the fields!')
            return;
        }
        const newEducation = `${educationForm.degree} in ${educationForm.school}, ${educationForm.startDate} - ${educationForm.endDate}, Grade: ${educationForm.grade}`;
        setEducationList([...educationList, newEducation]);

        const education = `${educationForm.school}, ${educationForm.degree}, ${educationForm.startDate}, ${educationForm.endDate}, ${educationForm.grade}`;
        setEducationArray([...educationArray, education]);

        // Clear the education form
        setEducationForm({
            school: '',
            degree: '',
            startDate: '',
            endDate: '',
            grade: '',
        });

        // Close the education modal
        setAddEducationModalVisible(false);
    };

    const handleCancelEducation = () => {
        setEducationForm({
            school: '',
            degree: '',
            startDate: '',
            endDate: '',
            grade: '',
        });

        // Close the education modal
        setAddEducationModalVisible(false);
    };

    const handleAddInterest = () => {
        setAddInterestModalVisible(true);
    };

    const handleSaveInterest = () => {
        if (interestForm.title == '' || interestForm.description == '') {
            alert('Please fill in all the fields!')
            return;
        }
        const newInterest = `${interestForm.title} : ${interestForm.description}`;
        setInterestList([...interestList, newInterest]);
        
        const interest = `${interestForm.title}, ${interestForm.description}`;
        setInterestArray([...interestArray, interest]);

        setInterestForm({
            title: '',
            description: ''
        });

        // Close the education modal
        setAddInterestModalVisible(false);
    };

    const handleCancelInterest = () => {
        setInterestForm({
            title: '',
            description: ''
        });

        setAddInterestModalVisible(false);
    };

    const handleSelectProfilePicture = async () => {
        const options = {
            title: 'Select Profile Picture',
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
            setProfilePicture(response.assets[0]);
        }
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideendDatePicker = () => {
        setendDatePickerVisibility(false);
    };

    const showendDatePicker = () => {
        setendDatePickerVisibility(true);
    };

    const handleConfirm = (date) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const dateString = date.toLocaleDateString(undefined, options);
        setEducationForm({ ...educationForm, startDate: dateString })
        hideDatePicker();
    };

    const handleEndDate = (date) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const dateString = date.toLocaleDateString(undefined, options);
        setEducationForm({ ...educationForm, endDate: dateString })
        hideendDatePicker();
    };

    const handleSaveProfile = async () => {

        if (!bio) {
            Alert.alert('Error', 'Please fill in the bio field!');
            return;
        }

        // Check if any of the lists are empty
        if (!profilePicture || educationList.length === 0 || interestList.length === 0 || languageList.length === 0) {
            Alert.alert('Error', 'Please fill in all the details!');
            return;
        }

        if (profilePicture) {
            const formData = new FormData();
            formData.append('profilePicture', {
                uri: profilePicture.uri,
                type: profilePicture.type,
                name: profilePicture.fileName || 'profilePicture.jpg',
            });

            await addProfilePic(formData);
        }

        await addBio(bio)

        for (const educationEntry of educationArray) {
            const [school, degree, startDate, endDate, grade] = educationEntry.split(', ');
            await addEducation(school, degree, startDate, endDate, grade);
        }

        for (const languageEntry of languageArray) {
            const [name, level] = languageEntry.split(', ');
            await addLanguage(name, level);
        }

        for (const interestEntry of interestArray) {
            const [title, description] = interestEntry.split(', ');
            await addInterest(title, description);
        }

        navigation.navigate('StudentProfilePage');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerName}>{name}</Text>
            <Text style={styles.header}>{email}</Text>

            <View style={styles.pic}>
                <TouchableOpacity onPress={handleSelectProfilePicture}>
                    <Image source={profilePicture ? { uri: profilePicture.uri } : require('../assets/profile.png')} style={styles.profilePicture} />
                </TouchableOpacity>
            </View>
            <View style={styles.paybox2}>
                <Text style={styles.header2}>Enter Your Information</Text>
                <ScrollView style={styles.paybox} showsVerticalScrollIndicator={false}>
                    <Text style={styles.info}>Bio</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Briefly describe yourself"
                        value={bio}
                        onChangeText={(text) => setBio(text)}
                    />
                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 0.5,
                            marginBottom: 10,
                        }}
                    />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.info}>Education</Text>
                        <TouchableOpacity onPress={handleAddEducation}>
                            <Image source={require('../assets/qwd-3.png')} style={styles.bin} />
                        </TouchableOpacity>
                    </View>
                    {educationList.map((education, index) => (
                        <View key={index} style={styles.educationRow}>
                            <Text style={styles.educationRowText}>{education}</Text>
                        </View>
                    ))}
                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 0.5,
                            marginBottom: 10,
                        }}
                    />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.info}>Interests</Text>
                        <TouchableOpacity onPress={handleAddInterest}>
                            <Image source={require('../assets/qwd-3.png')} style={styles.bin} />
                        </TouchableOpacity>
                    </View>
                    {interestList.map((interest, index) => (
                        <View key={index} style={styles.educationRow}>
                            <Text style={styles.educationRowText}>{interest}</Text>
                        </View>
                    ))}
                    <View
                        style={{
                            borderBottomColor: 'grey',
                            borderBottomWidth: 0.5,
                            marginBottom: 10,
                        }}
                    />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.info}>Languages</Text>
                        <TouchableOpacity onPress={handleAddLanguage}>
                            <Image source={require('../assets/qwd-3.png')} style={styles.bin} />
                        </TouchableOpacity>
                    </View>
                    {languageList.map((language, index) => (
                        <View key={index} style={styles.educationRow}>
                            <Text style={styles.educationRowText}>{language}</Text>
                        </View>
                    ))}
                    <Modal
                        visible={isAddEducationModalVisible}
                        animationType="slide"
                        transparent={false}
                    >
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalHeading}>Add Education</Text>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="School/University Name"
                                    value={educationForm.school}
                                    onChangeText={(text) =>
                                        setEducationForm({ ...educationForm, school: text })
                                    }
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Degree"
                                    value={educationForm.degree}
                                    onChangeText={(text) =>
                                        setEducationForm({ ...educationForm, degree: text })
                                    }
                                />
                                <TouchableOpacity onPress={showDatePicker} style={styles.modalInput}>
                                    {educationForm.startDate ? (
                                        <Text style={styles.datePickerButtonText}>{educationForm.startDate}</Text>
                                    ) : (
                                        <Text style={styles.placeholderText}>Select Start Date</Text>
                                    )}
                                </TouchableOpacity>

                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />

                                <TouchableOpacity onPress={showendDatePicker} style={styles.modalInput}>
                                    {educationForm.endDate ? (
                                        <Text style={styles.datePickerButtonText}>{educationForm.endDate}</Text>
                                    ) : (
                                        <Text style={styles.placeholderText}>Select End Date</Text>
                                    )}
                                </TouchableOpacity>

                                <DateTimePickerModal
                                    isVisible={isEndDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleEndDate}
                                    onCancel={hideendDatePicker}
                                />

                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Grade"
                                    value={educationForm.grade}
                                    onChangeText={(text) =>
                                        setEducationForm({ ...educationForm, grade: text })
                                    }
                                />
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleSaveEducation}
                                >
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleCancelEducation}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        visible={isAddInterestModalVisible}
                        animationType="slide"
                        transparent={false}
                    >
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalHeading}>Add Interest</Text>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Title"
                                    value={interestForm.title}
                                    onChangeText={(text) =>
                                        setInterestForm({ ...interestForm, title: text })
                                    }
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Description"
                                    value={interestForm.description}
                                    onChangeText={(text) =>
                                        setInterestForm({ ...interestForm, description: text })
                                    }
                                />
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleSaveInterest}
                                >
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleCancelInterest}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        visible={isAddLanguageModalVisible}
                        animationType="slide"
                        transparent={false}
                    >
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalHeading}>Add Language</Text>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Name"
                                    value={languageForm.title}
                                    onChangeText={(text) =>
                                        setLanguageForm({ ...languageForm, name: text })
                                    }
                                />
                                <RNPickerSelect
                                    onValueChange={(itemValue) => setLanguageForm({ ...languageForm, level: itemValue })}
                                    items={[
                                        { label: 'Elementary Proficiency', value: 'Elementary Proficiency' },
                                        { label: 'Professional Working Proficiency', value: 'Professional Working Proficiency' },
                                        { label: 'Full Professional Proficiency', value: 'Full Professional Proficiency' }
                                    ]}
                                    placeholder={{ label: "Level", value: null }}
                                    value={languageForm.level}
                                    ColorValue='black'
                                    style={{
                                        inputAndroid: {
                                            backgroundColor: '#f4f4f4',
                                            color: 'black',
                                            marginBottom: 20,
                                        },
                                    }}
                                />
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleSaveLanguage}
                                >
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleCancelLanguage}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
                        <Text style={styles.buttonText}>Save Profile</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalHeading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 40,
        color: Color.colorSlateblue
    },
    educationRow: {
        backgroundColor: Color.colorGainsboro_100,
        padding: 15,
        marginBottom: 10,
        borderRadius: 1,
        borderWidth: 0.2
    },
    educationRowText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center'
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
        marginTop: 10,
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
    paybox: {
        marginBottom: 100,
        padding: 20,
        paddingTop: 30,
        height: '100%',
        width: '100%',
        marginTop: '5%',
        borderColor: Color.labelColorLightPrimary,
        borderStyle: "solid",
        borderRadius: 20,
        backgroundColor: Color.colorGainsboro_200,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
    },
    paybox2: {
        marginTop: 20,
        height: '80%',
        width: '100%',
        borderColor: Color.labelColorLightPrimary,
        borderStyle: "solid",
        borderRadius: 30,
        backgroundColor: Color.colorSlateblue,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
    },
    pic: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 200,
        marginBottom: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 40,
    },
    info: {
        marginLeft: 10,
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    header2: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
    },
    headerName: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: Color.colorSlateblue,
        textTransform: 'uppercase'
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    input: {
        height: 50,
        width: '100%',
        marginLeft: 5,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 16,
        color: '#333',

    },
});

export default ProfileInfoScreen;
