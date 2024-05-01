import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Color } from "../GlobalStyles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import teacherProfileContext from "../context/TeacherProfile/teacherProfileContext";
import { useNavigation } from "@react-navigation/native";

const ProfileInfoScreen = (props) => {
    const [bio, setBio] = useState('');
    const { name, email } = props.route.params;
    const [profilePicture, setProfilePicture] = useState(null);
    const [isAddEducationModalVisible, setAddEducationModalVisible] = useState(false);
    const [educationList, setEducationList] = useState([]);
    const [educationArray, setEducationArray] = useState([]);
    const [isAddLanguageModalVisible, setAddLanguageModalVisible] = useState(false);
    const [languageList, setLanguageList] = useState([]);
    const [languageArray, setLanguageArray] = useState([]);
    const [isAddExperienceModalVisible, setAddExperienceModalVisible] = useState(false);
    const [experienceList, setExperienceList] = useState([]);
    const [experienceArray, setExperienceArray] = useState([]);
    const [isAddCertificateModalVisible, setAddCertificateModalVisible] = useState(false);
    const [projectList, setProjectList] = useState([]);
    const [projectArray, setProjectArray] = useState([]);
    const [isAddProjectModalVisible, setAddProjectModalVisible] = useState(false);
    const [certificateList, setCertificateList] = useState([]);
    const [certificateArray, setCertificateArray] = useState([]);
    const [isAddHonorsModalVisible, setAddHonorsModalVisible] = useState(false);
    const [honorsList, setHonorsList] = useState([]);
    const [honorsArray, setHonorsArray] = useState([]);
    const [isAddSkillModalVisible, setAddSkillModalVisible] = useState(false);
    const [skillsList, setSkillsList] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setendDatePickerVisibility] = useState(false);
    const context = useContext(teacherProfileContext);
    const [skillItems, setSkillItems] = useState([
        { label: 'Skill 1', value: 'Skill 1' },
        { label: 'Skill 2', value: 'Skill 2' },
        { label: 'Skill 3', value: 'Skill 3' },
    ]);
    const { getSkill, skills, addSkill, addEducation, addExperience, addProfilePic, addCertification, addHaw, addLanguage, addProject, addBio } = context;
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            await getSkill();
            const skillData = [];
            for (let i = 0; i < skills.length; i++) {
                const skillName = skills[i];
                skillData.push({ label: skillName, value: skillName });
            }
            setSkillItems(skillData);
        };

        fetchData();
    }, [getSkill, skills]);

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

    // Assuming you have the following state for experience information
    const [experienceForm, setExperienceForm] = useState({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        location: '',
    });

    const [skillForm, setSkillForm] = useState({
        name: '',
    });

    // Function to handle adding skill information
    const handleAddSkill = () => {
        setAddSkillModalVisible(true);
    };

    // Function to handle saving skill information
    const handleSaveSkill = () => {
        if (skillForm.name === '') {
            alert('Please fill in the skill name!');
            return;
        }
        const newSkill = `${skillForm.name}`;
        setSkillsList([...skillsList, newSkill]);

        // Clear the skill form
        setSkillForm({
            name: '',
        });

        // Close the skill modal
        setAddSkillModalVisible(false);
    };

    // Function to handle canceling skill addition
    const handleCancelSkill = () => {
        setSkillForm({
            name: '',
        });

        // Close the skill modal
        setAddSkillModalVisible(false);
    };

    const [honorsForm, setHonorsForm] = useState({
        title: '',
        description: '',
        date: '',
    });

    // Function to handle adding honors information
    const handleAddHonors = () => {
        setAddHonorsModalVisible(true);
    };

    // Function to handle saving honors information
    const handleSaveHonors = () => {
        if (honorsForm.title === '' || honorsForm.description === '' || honorsForm.date === '') {
            alert('Please fill in all the fields!');
            return;
        }

        const newHonors = `${honorsForm.title} - ${honorsForm.description}, Date: ${honorsForm.date}`;
        setHonorsList([...honorsList, newHonors]);

        const honor = `${honorsForm.title}, ${honorsForm.description}, ${honorsForm.date}`;
        setHonorsArray([...honorsArray, honor]);

        // Clear the honors form
        setHonorsForm({
            title: '',
            description: '',
            date: '',
        });

        // Close the honors modal
        setAddHonorsModalVisible(false);
    };

    // Function to handle canceling honors addition
    const handleCancelHonors = () => {
        setHonorsForm({
            title: '',
            description: '',
            date: '',
        });

        // Close the honors modal
        setAddHonorsModalVisible(false);
    };

    const [projectForm, setProjectForm] = useState({
        title: '',
        description: '',
        startYear: '',
        endYear: '',
        link: '',
    });

    // Function to handle adding project information
    const handleAddProject = () => {
        setAddProjectModalVisible(true);
    };

    // Function to handle saving project information
    const handleSaveProject = () => {
        if (projectForm.title === '' || projectForm.description === '' || projectForm.startYear === '' || projectForm.endYear === '' || projectForm.link === '') {
            alert('Please fill in all the fields!');
            return;
        }

        const newProject = `${projectForm.title} - ${projectForm.description}, ${projectForm.startYear} - ${projectForm.endYear}, Link: ${projectForm.link}`;
        setProjectList([...projectList, newProject]);

        const project = `${projectForm.title}, ${projectForm.description}, ${projectForm.startYear}, ${projectForm.endYear}, ${projectForm.link}`;
        setProjectArray([...projectArray, project]);

        // Clear the project form
        setProjectForm({
            title: '',
            description: '',
            startYear: '',
            endYear: '',
            link: '',
        });

        // Close the project modal
        setAddProjectModalVisible(false);
    };

    // Function to handle canceling project addition
    const handleCancelProject = () => {
        setProjectForm({
            title: '',
            description: '',
            startYear: '',
            endYear: '',
            link: '',
        });

        // Close the project modal
        setAddProjectModalVisible(false);
    };
    // Assuming you have the following state for certificate information
    const [certificateForm, setCertificateForm] = useState({
        title: '',
        issuer: '',
        link: '',
    });

    // Function to handle adding certificate information
    const handleAddCertificate = () => {
        setAddCertificateModalVisible(true);
    };

    // Function to handle saving certificate information
    const handleSaveCertificate = () => {
        if (certificateForm.title === '' || certificateForm.issuer === '' || certificateForm.link === '') {
            alert('Please fill in all the fields!');
            return;
        }

        const newCertificate = `${certificateForm.title} from ${certificateForm.issuer}, Link: ${certificateForm.link}`;
        setCertificateList([...certificateList, newCertificate]);

        const certif = `${certificateForm.title}, ${certificateForm.issuer}, ${certificateForm.link}`;
        setCertificateArray([...certificateArray, certif]);

        // Clear the certificate form
        setCertificateForm({
            title: '',
            issuer: '',
            link: '',
        });

        // Close the certificate modal
        setAddCertificateModalVisible(false);
    };

    // Function to handle canceling certificate addition
    const handleCancelCertificate = () => {
        setCertificateForm({
            title: '',
            issuer: '',
            link: '',
        });

        // Close the certificate modal
        setAddCertificateModalVisible(false);
    };

    // Function to handle adding experience information
    const handleAddExperience = () => {
        setAddExperienceModalVisible(true);
    };

    // Function to handle saving experience information
    const handleSaveExperience = () => {
        if (experienceForm.title === '' || experienceForm.company === '' || experienceForm.startDate === '' || experienceForm.endDate === '' || experienceForm.location === '') {
            alert('Please fill in all the fields!');
            return;
        }

        const newExperience = `${experienceForm.title} at ${experienceForm.company}, ${experienceForm.startDate} - ${experienceForm.endDate}, Location: ${experienceForm.location}`;
        setExperienceList([...experienceList, newExperience]);

        const experience = `${experienceForm.title}, ${experienceForm.company}, ${experienceForm.startDate}, ${experienceForm.endDate}, ${experienceForm.location}`;
        setExperienceArray([...experienceArray, experience]);

        // Clear the experience form
        setExperienceForm({
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            location: '',
        });

        // Close the experience modal
        setAddExperienceModalVisible(false);
    };

    // Function to handle canceling experience addition
    const handleCancelExperience = () => {
        setExperienceForm({
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            location: '',
        });

        // Close the experience modal
        setAddExperienceModalVisible(false);
    };


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
        const education = `${educationForm.school}, ${educationForm.degree}, ${educationForm.startDate}, ${educationForm.endDate}, ${educationForm.grade}`;

        setEducationList([...educationList, newEducation]);
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

    const generateYearItems = () => {
        const years = [];

        // Generate a list of years from 1980 to 2040
        for (let year = 1980; year <= 2040; year++) {
            years.push({ label: `${year}`, value: `${year}` });
        }

        return years;
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

    const handleExpConfirm = (date) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const dateString = date.toLocaleDateString(undefined, options);
        setExperienceForm({ ...experienceForm, startDate: dateString })
        hideDatePicker();
    };

    const handleExpEndDate = (date) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const dateString = date.toLocaleDateString(undefined, options);
        setExperienceForm({ ...experienceForm, endDate: dateString })
        hideendDatePicker();
    };

    const handleSaveProfile = async () => {

        if (!bio) {
            Alert.alert('Error', 'Please fill in the bio field!');
            return;
        }

        // Check if any of the lists are empty
        if (!profilePicture || educationList.length === 0 || experienceList.length === 0 || projectList.length === 0 || honorsList.length === 0 || skillsList.length === 0 || certificateList.length === 0 || languageList.length === 0) {
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

        for (const experienceEntry of experienceArray) {
            const [title, company, startDate, endDate, location] = experienceEntry.split(', ');
            await addExperience(title, company, startDate, endDate, location);
        }

        for (const honorsEntry of honorsArray) {
            const [title, description, date] = honorsEntry.split(', ');
            await addHaw(title, description, date);
        }

        for (const certificateEntry of certificateArray) {
            const [title, issuer, link] = certificateEntry.split(', ');
            await addCertification(title, issuer, link);
        }

        for (const projectEntry of projectArray) {
            const [title, description, startYear, endYear, link] = projectEntry.split(', ');
            await addProject(title, description, startYear, endYear, link);
        }

        for (const languageEntry of languageArray) {
            const [name, level] = languageEntry.split(', ');
            await addLanguage(name, level);
        }

        for (const skillEntry of skillsList) {
            await addSkill(skillEntry);
        }

        navigation.navigate('TeacherProfilePage');
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

                    <View>
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
                    </View>

                    <View>
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
                    </View>

                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.info}>Experience</Text>
                            <TouchableOpacity onPress={handleAddExperience}>
                                <Image source={require('../assets/qwd-3.png')} style={styles.bin} />
                            </TouchableOpacity>
                        </View>
                        {experienceList.map((experience, index) => (
                            <View key={index} style={styles.educationRow}>
                                <Text style={styles.educationRowText}>{experience}</Text>
                            </View>
                        ))}
                        <View
                            style={{
                                borderBottomColor: 'grey',
                                borderBottomWidth: 0.5,
                                marginBottom: 10,
                            }}
                        />
                    </View>

                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.info}>Certificates</Text>
                            <TouchableOpacity onPress={handleAddCertificate}>
                                <Image source={require('../assets/qwd-3.png')} style={styles.bin} />
                            </TouchableOpacity>
                        </View>

                        {certificateList.map((certificate, index) => (
                            <View key={index} style={styles.educationRow}>
                                <Text style={styles.educationRowText}>{certificate}</Text>
                            </View>
                        ))}

                        <View
                            style={{
                                borderBottomColor: 'grey',
                                borderBottomWidth: 0.5,
                                marginBottom: 10,
                            }}
                        />
                    </View>
                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.info}>Projects</Text>
                            <TouchableOpacity onPress={handleAddProject}>
                                <Image source={require('../assets/qwd-3.png')} style={styles.bin} />
                            </TouchableOpacity>
                        </View>

                        {projectList.map((project, index) => (
                            <View key={index} style={styles.educationRow}>
                                <Text style={styles.educationRowText}>{project}</Text>
                            </View>
                        ))}

                        <View
                            style={{
                                borderBottomColor: 'grey',
                                borderBottomWidth: 0.5,
                                marginBottom: 10,
                            }}
                        />
                    </View>

                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.info}>Honors and Rewards</Text>
                            <TouchableOpacity onPress={handleAddHonors}>
                                <Image source={require('../assets/qwd-3.png')} style={styles.bin} />
                            </TouchableOpacity>
                        </View>

                        {honorsList.map((honors, index) => (
                            <View key={index} style={styles.educationRow}>
                                <Text style={styles.educationRowText}>{honors}</Text>
                            </View>
                        ))}

                        <View
                            style={{
                                borderBottomColor: 'grey',
                                borderBottomWidth: 0.5,
                                marginBottom: 10,
                            }}
                        />
                    </View>

                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.info}>Skills</Text>
                            <TouchableOpacity onPress={handleAddSkill}>
                                <Image source={require('../assets/qwd-3.png')} style={styles.bin} />
                            </TouchableOpacity>
                        </View>

                        {skillsList.map((skill, index) => (
                            <View key={index} style={styles.educationRow}>
                                <Text style={styles.educationRowText}>{skill}</Text>
                            </View>
                        ))}

                        <View
                            style={{
                                borderBottomColor: 'grey',
                                borderBottomWidth: 0.5,
                                marginBottom: 10,
                            }}
                        />
                    </View>
                    <View>
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
                    </View>

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
                        visible={isAddExperienceModalVisible}
                        animationType="slide"
                        transparent={false}
                    >
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalHeading}>Add Experience</Text>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Title"
                                    value={experienceForm.title}
                                    onChangeText={(text) =>
                                        setExperienceForm({ ...experienceForm, title: text })
                                    }
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Company"
                                    value={experienceForm.company}
                                    onChangeText={(text) =>
                                        setExperienceForm({ ...experienceForm, company: text })
                                    }
                                />
                                <TouchableOpacity
                                    onPress={showDatePicker}
                                    style={styles.modalInput}
                                >
                                    {experienceForm.startDate ? (
                                        <Text style={styles.datePickerButtonText}>
                                            {experienceForm.startDate}
                                        </Text>
                                    ) : (
                                        <Text style={styles.placeholderText}>Select Start Date</Text>
                                    )}
                                </TouchableOpacity>

                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleExpConfirm}
                                    onCancel={hideDatePicker}
                                />

                                <TouchableOpacity
                                    onPress={showendDatePicker}
                                    style={styles.modalInput}
                                >
                                    {experienceForm.endDate ? (
                                        <Text style={styles.datePickerButtonText}>
                                            {experienceForm.endDate}
                                        </Text>
                                    ) : (
                                        <Text style={styles.placeholderText}>Select End Date</Text>
                                    )}
                                </TouchableOpacity>

                                <DateTimePickerModal
                                    isVisible={isEndDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleExpEndDate}
                                    onCancel={hideendDatePicker}
                                />

                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Location"
                                    value={experienceForm.location}
                                    onChangeText={(text) =>
                                        setExperienceForm({ ...experienceForm, location: text })
                                    }
                                />
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleSaveExperience}
                                >
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleCancelExperience}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        visible={isAddCertificateModalVisible}
                        animationType="slide"
                        transparent={false}
                    >
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalHeading}>Add Certificate</Text>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Title"
                                    value={certificateForm.title}
                                    onChangeText={(text) =>
                                        setCertificateForm({ ...certificateForm, title: text })
                                    }
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Issuer"
                                    value={certificateForm.issuer}
                                    onChangeText={(text) =>
                                        setCertificateForm({ ...certificateForm, issuer: text })
                                    }
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Link"
                                    value={certificateForm.link}
                                    onChangeText={(text) =>
                                        setCertificateForm({ ...certificateForm, link: text })
                                    }
                                />
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleSaveCertificate}
                                >
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleCancelCertificate}
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
                    <Modal
                        visible={isAddProjectModalVisible}
                        animationType="slide"
                        transparent={false}
                    >
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalHeading}>Add Project</Text>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Title"
                                    value={projectForm.title}
                                    onChangeText={(text) =>
                                        setProjectForm({ ...projectForm, title: text })
                                    }
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Description"
                                    value={projectForm.description}
                                    onChangeText={(text) =>
                                        setProjectForm({ ...projectForm, description: text })
                                    }
                                />
                                <RNPickerSelect
                                    onValueChange={(itemValue) =>
                                        setProjectForm({ ...projectForm, startYear: itemValue })
                                    }
                                    items={generateYearItems()}
                                    placeholder={{ label: 'Start Year', value: null }}
                                    value={projectForm.startYear}
                                    style={{
                                        inputAndroid: {
                                            backgroundColor: '#f4f4f4',
                                            color: 'black',
                                            marginBottom: 20,
                                        },
                                    }}
                                />
                                <RNPickerSelect
                                    onValueChange={(itemValue) =>
                                        setProjectForm({ ...projectForm, endYear: itemValue })
                                    }
                                    items={generateYearItems()}
                                    placeholder={{ label: 'End Year', value: null }}
                                    value={projectForm.endYear}
                                    style={{
                                        inputAndroid: {
                                            backgroundColor: '#f4f4f4',
                                            color: 'black',
                                            marginBottom: 20,
                                        },
                                    }}
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Link"
                                    value={projectForm.link}
                                    onChangeText={(text) =>
                                        setProjectForm({ ...projectForm, link: text })
                                    }
                                />
                            </View>

                            <View style={styles.modalButtons}>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleSaveProject}
                                >
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleCancelProject}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        visible={isAddHonorsModalVisible}
                        animationType="slide"
                        transparent={false}
                    >
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalHeading}>Add Honors and Rewards</Text>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Title"
                                    value={honorsForm.title}
                                    onChangeText={(text) =>
                                        setHonorsForm({ ...honorsForm, title: text })
                                    }
                                />
                                <TextInput
                                    style={styles.modalInput}
                                    placeholder="Description"
                                    value={honorsForm.description}
                                    onChangeText={(text) =>
                                        setHonorsForm({ ...honorsForm, description: text })
                                    }
                                />
                                <RNPickerSelect
                                    onValueChange={(itemValue) =>
                                        setHonorsForm({ ...honorsForm, date: itemValue })
                                    }
                                    items={generateYearItems()}
                                    placeholder={{ label: 'Date Issued', value: null }}
                                    value={honorsForm.date}
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
                                    onPress={handleSaveHonors}
                                >
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleCancelHonors}
                                >
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        visible={isAddSkillModalVisible}
                        animationType="slide"
                        transparent={false}
                    >
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalHeading}>Add Skill</Text>
                            <View style={styles.modalContent}>
                                <RNPickerSelect
                                    onValueChange={(itemValue) =>
                                        setSkillForm({ ...skillForm, name: itemValue })
                                    }
                                    items={skillItems}
                                    placeholder={{ label: 'Select Skill', value: null }}
                                    value={skillForm.name}
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
                                    onPress={handleSaveSkill}
                                >
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleCancelSkill}
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
