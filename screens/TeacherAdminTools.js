import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Modal, Text, Image, Alert, TouchableOpacity, Dimensions, TextInput } from "react-native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CourseContext from "../context/Courses/courseContext"
import { launchImageLibrary } from 'react-native-image-picker';
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import MultiSelect from 'react-native-multiple-select';


const windowWidth = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();

const IndicatorBall = () => (
    <View style={styles.indicatorBall} />
);

function Courses() {
    const navigation = useNavigation();
    
    const { getTeacherCourses, updateCourseStatus, deleteCourse, createCourse, updateCourse } = useContext(CourseContext);
    const [teacherCourses, setTeacherCourses] = useState([]);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [requestId, setRequestId] = useState('');
    const [originalCourses, setOriginalCourses] = useState([]);
    const [filter, setFilter] = useState('published');
    const [action, setAction] = useState('');
    const [editId, setEditId] = useState('');
    const [addCourseModalVisible, setAddCourseModalVisible] = useState(false);
    const [imageUri, setImageUri] = useState('');
    const [imageType, setImageType] = useState('');
    const [imageName, setImageName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [charges, setCharges] = useState('');
    const [language, setLanguage] = useState('');
    const [categories, setCategories] = useState([]);

    const categoriesList = ['Data Science Enthusiast', 'Mobile Application Development', 'Web App Development', 'Machine Learning', 'Artificial Intelligence', 'Cybersecurity', 'Blockchain Technology', 'Internet of Things (IoT)', 'Cloud Computing', 'Game Development', 'UI/UX Design', 'DevOps', 'Big Data Analytics', 'Augmented Reality (AR)', 'Virtual Reality (VR)', 'Embedded Systems', 'Robotics', 'Natural Language Processing (NLP)', 'Quantum Computing', 'Frontend Development', 'Backend Development', 'Full Stack Development', 'Software Testing', 'Data Engineering', 'Mobile Game Development', 'Cross-Platform Development', 'Network Security', 'Database Management', 'Responsive Web Design', 'UI/UX Research', 'Mobile User Interface (UI) Design', 'Accessibility in Design', '3D Printing Technologies', 'Travel Enthusiast', 'Photography', 'Cooking and Culinary Arts', 'Fitness and Wellness', 'Sustainable Living', 'Art and Creativity', 'Gardening', 'Music Lover', 'Film and Cinema', 'Bookworm', 'History Buff', 'Science Fiction', 'Astronomy', 'Fashion and Style', 'DIY and Crafting', 'Sports Fanatic', 'Meditation and Mindfulness', 'Nature and Wildlife', 'Environmental Activism', 'Animal Welfare', 'Home Decor', 'Personal Finance', 'Language Learning', 'Vintage Collecting', 'Social Justice and Advocacy', 'Volunteering', 'Psychology', 'Philosophy', 'Geocaching', 'Car Enthusiast', 'Accounting and Finance', 'Data Analytics in Business', 'Human Resource Management', 'International Business', 'Corporate Law', 'Retail Management', 'Entrepreneurship', 'Supply Chain Management', 'E-commerce Trends', 'Marketing and Advertising', 'Business Strategy', 'Business Ethics', 'Risk Management', 'Tax Planning', 'Investment Banking', 'Pharmacology', 'Anatomy and Physiology', 'Medicine and Healthcare', 'Radiology', 'Psychiatry', 'Neurology', 'Public Health', 'Obstetrics and Gynecology', 'Pediatrics', 'Surgery', 'Dentistry', 'Nursing', 'Medical Research', 'Alternative Medicine', 'Nutrition and Dietetics', 'Medical Technology', 'Physical Therapy', 'Healthcare Administration', 'Medical Ethics', 'Orthopedics'];

    useEffect(() => {
        const fetchData = async () => {
            const courses = await getTeacherCourses();
            const filteredCourses = courses.filter(course => course.status === filter);
            setOriginalCourses(courses);
            setTeacherCourses(filteredCourses);
        };

        fetchData();
    }, [getTeacherCourses]);

    const handleAddCourse = () => {
        setAction('add');
        setAddCourseModalVisible(true);
    };

    const handleFilter = (newFilter) => {
        setFilter(newFilter);
        setTeacherCourses(originalCourses.filter(course => course.status === newFilter));
    };

    const handleEdit = (id, title, description, duration, language, charges, content) => {
        const fileName = content.split('/').pop();
        setTitle(title);
        setDescription(description);
        setDuration(duration);
        setLanguage(language);
        setCharges(String(charges));
        setImageName(fileName);
        setEditId(id)

        setAction('edit');
        setAddCourseModalVisible(true);
    };

    const handleDelete = (courseId) => {
        setShowRejectModal(true);
        setRequestId(courseId);
    };

    const handleDeleteCourse = async () => {
        await deleteCourse(requestId);
        setOriginalCourses(originalCourses.filter((course) => course._id !== requestId))
        setTeacherCourses(teacherCourses.filter((course) => course._id !== requestId));
        setShowRejectModal(false);
    }

    const handlePublish = async (courseId, status) => {
        if (status == 'published') {
            await updateCourseStatus(courseId, 'draft');
            const courses = await getTeacherCourses();
            setTeacherCourses(originalCourses.filter((course) => course._id !== courseId));
            setOriginalCourses(courses);
        }
        else {
            await updateCourseStatus(courseId, 'published');
            const courses = await getTeacherCourses();
            setTeacherCourses(originalCourses.filter((course) => course._id !== courseId));
            setOriginalCourses(courses);
        }
    };

    const handleCancelCourse = () => {
        setAddCourseModalVisible(false);
        setTitle('')
        setDescription('')
        setDuration('')
        setLanguage('')
        setCharges('')
        setCategories([])

        setImageUri('');
        setImageName('');
        setImageType('');
    }

    const handleCreateCourse = async () => {

        if (title === '' || imageName === '' || description === '' || duration === '' || language === '' || charges === '' || categories.length === 0) {
            alert('Please fill in all the fields!');
            return;
        }

        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('language', language);
        formData.append('charges', charges);
        formData.append('duration', duration);
        formData.append('categories', categories);

        formData.append('featured_image', {
            uri: imageUri,
            type: imageType,
            name: imageName,
        });

        const course_response = await createCourse(formData);

        const courses = await getTeacherCourses();
        const filteredcourses = courses.filter(course => course.status === filter);
        setOriginalCourses(courses);
        setTeacherCourses(filteredcourses);

        setAddCourseModalVisible(false);

        setTitle('')
        setDescription('')
        setDuration('')
        setLanguage('')
        setCharges('')
        setCategories([])

        setImageUri('');
        setImageName('');
        setImageType('');

        navigation.navigate('CourseBuilder', { courseId: course_response.data.course.id });
    }

    const selectImage = async () => {
        const options = {
            mediaType: 'image',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error:', response.error);
            } else if (response.assets[0].type.includes('image')) {
                const fileName = response.assets[0].fileName;
                setImageUri(response.assets[0].uri);
                setImageName(fileName);
                setImageType(response.assets[0].type);
            }
            else {
                Alert.alert(
                    'No image Selected',
                    'Please select a image.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                );
            }
        });
    };

    const handleEditCourse = async () => {

        if (title === '' || imageName === '' || description === '' || duration === '' || language === '' || charges === '') {
            alert('Please fill in all the fields!');
            return;
        }

        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('language', language);
        formData.append('charges', charges);
        formData.append('duration', duration);

        if (imageUri !== '') {
            formData.append('featured_image', {
                uri: imageUri,
                type: imageType,
                name: imageName,
            });
        }

        await updateCourse(editId, formData);

        const courses = await getTeacherCourses();
        const filteredcourses = courses.filter(course => course.status === filter);
        setOriginalCourses(courses);
        setTeacherCourses(filteredcourses);

        setAddCourseModalVisible(false);

        setTitle('')
        setDescription('')
        setDuration('')
        setLanguage('')
        setCharges('')
        setCategories([])

        setImageUri('');
        setImageName('');
        setImageType('');
    }

    const handleDropdownChange = (categories) => {
        setCategories(categories);
    };

    return (
        <View>
            <Header
                heading="ADMINISTRATIVE TOOLS"
                navigate='TeacherHomePage'
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={showRejectModal}
                onRequestClose={() => setShowRejectModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure?</Text>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={require("../assets/Logo2.png")}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => handleDeleteCourse()}
                        >
                            <Text style={styles.modalButtonText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setShowRejectModal(false)}
                        >
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={addCourseModalVisible}
                animationType="slide"
                transparent={false}
            >
                <View style={styles.addmodalContainer}>
                    <Text style={styles.addmodalHeading}>Create New Course</Text>
                    <View style={styles.addmodalContent}>
                        <TextInput
                            style={styles.addmodalInput}
                            placeholder="Course Title"
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />

                        {action === "add" && (
                            <MultiSelect
                                hideTags
                                items={categoriesList.map(category => ({ id: category, name: category }))}
                                uniqueKey="id"
                                onSelectedItemsChange={handleDropdownChange}
                                selectedItems={categories}
                                selectText="Select Categories"
                                searchInputPlaceholderText="Search Categories..."
                                altFontFamily="ProximaNova-Light"
                                tagRemoveIconColor="#CCC"
                                tagBorderColor="#CCC"
                                tagTextColor="#CCC"
                                selectedItemTextColor="#CCC"
                                selectedItemIconColor="#CCC"
                                itemTextColor="#000"
                                displayKey="name"
                                searchInputStyle={{ color: 'blue' }}
                                styleItemsContainer={{ color: '#CCC', height: 150 }}
                                submitButtonColor={Color.colorSlateblue}
                                submitButtonText="Submit"
                            />
                        )}

                        <TextInput
                            style={styles.addmodalInput}
                            placeholder="Course Description"
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        />

                        <TextInput
                            style={styles.addmodalInput}
                            placeholder="Course Duration"
                            value={duration}
                            onChangeText={(text) => setDuration(text)}
                        />

                        <TextInput
                            style={styles.addmodalInput}
                            placeholder="Course language"
                            value={language}
                            onChangeText={(text) => setLanguage(text)}
                        />

                        <TextInput
                            style={styles.addmodalInput}
                            placeholder="Course Charges"
                            value={charges}
                            onChangeText={(text) => setCharges(text)}
                        />

                        <TouchableOpacity onPress={selectImage}>
                            <TextInput
                                style={styles.addmodalInput}
                                placeholder="Course Featured Image"
                                value={imageName}
                                editable={false}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.addCoursemodalButtons}>
                        <TouchableOpacity
                            style={styles.addmodalButton}
                            onPress={() => action === 'add' ? handleCreateCourse() : handleEditCourse()}
                        >
                            <Text style={styles.addbuttonText}>{action === 'add' ? 'Create Course' : 'Save Course'}</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.addmodalButton}
                            onPress={handleCancelCourse}
                        >
                            <Text style={styles.addbuttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.createCourseText}>My Courses</Text>
                <TouchableOpacity
                    onPress={handleAddCourse}
                >
                    <Image style={styles.createCourseButton} source={require("../assets/qwd-1.png")}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={() => handleFilter('published')}>
                    <Text style={filter === 'published' ? styles.selectedFilter : styles.filter}>Published</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilter('draft')}>
                    <Text style={filter === 'draft' ? styles.selectedFilter : styles.filter}>Drafts</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flexDirection: 'column', marginTop: 20, height: 430 }}>
                {teacherCourses.map(course => (
                    <View key={course._id} style={{ borderBottomWidth: 2, borderColor: '#ddd' }}>
                        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'black', fontSize: 16, width: 170 }}>{course.title}</Text>
                            <TouchableOpacity onPress={() => handlePublish(course._id, course.status)}>
                                <Text style={{ color: Color.colorSlateblue, fontSize: 14 }}>
                                    {course.status === 'published' ? 'Draft' : 'Publish'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleEdit(course._id, course.title, course.content, course.duration, course.language, course.fees, course.featured_image)}>
                                <Text style={{ color: Color.colorSlateblue, fontSize: 14 }}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(course._id)}>
                                <Text style={{ color: 'red', fontSize: 14 }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => navigation.navigate("ViewMemberForJointAccount", {
                                additionalData: course._id,
                            })}>
                                <Text style={{ color: Color.colorSlateblue, fontSize: 14, fontWeight: 'bold', marginRight: 12, marginBottom: 10 }}>Send Joint Account Request</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

function Topics() {
    const { getTeacherTopics, createTopic, updateTopicStatus, updateTopic, deleteTopic } = useContext(CourseContext);
    const [teacherTopics, setTeacherTopics] = useState([]);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [addTopicModalVisible, setAddTopicModalVisible] = useState(false);
    const [requestId, setRequestId] = useState('');
    const [originalTopics, setOriginalTopics] = useState([]);
    const [filter, setFilter] = useState('published');

    const [videoUri, setVideoUri] = useState('');
    const [videoType, setVideoType] = useState('');
    const [videoName, setVideoName] = useState('');
    const [title, setTitle] = useState('');
    const [action, setAction] = useState('');
    const [editId, setEditId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const topics = await getTeacherTopics();
            const filteredTopics = topics.filter(topic => topic.status === filter);
            setOriginalTopics(topics);
            setTeacherTopics(filteredTopics);
        };

        fetchData();
    }, [getTeacherTopics]);

    const handleAddTopic = () => {
        setAction('add');
        setAddTopicModalVisible(true);
    };

    const handleFilter = (newFilter) => {
        setFilter(newFilter);
        setTeacherTopics(originalTopics.filter(topic => topic.status === newFilter));
    };

    const handleEdit = (id, title, content) => {
        const fileName = content.split('/').pop();
        setTitle(title)
        setVideoName(fileName);
        setEditId(id)

        setAction('edit');
        setAddTopicModalVisible(true);
    };

    const handleEditTopic = async () => {

        if (title === '' || videoName === '') {
            alert('Please fill in all the fields!');
            return;
        }

        const formData = new FormData();

        formData.append('title', title);

        if (videoUri !== '') {
            formData.append('content_video', {
                uri: videoUri,
                type: videoType,
                name: videoName,
            });
        }

        await updateTopic(editId, formData);

        const topics = await getTeacherTopics();
        const filteredTopics = topics.filter(topic => topic.status === filter);
        setOriginalTopics(topics);
        setTeacherTopics(filteredTopics);

        setAddTopicModalVisible(false);

        setTitle('')
        setVideoUri('');
        setVideoName('');
        setVideoType('');
    }

    const handleDelete = (courseId) => {
        setShowRejectModal(true);
        setRequestId(courseId);
    };

    const handleDeleteCourse = async () => {
        await deleteTopic(requestId);
        setOriginalTopics(originalTopics.filter((topic) => topic._id !== requestId))
        setTeacherTopics(teacherTopics.filter((topic) => topic._id !== requestId));
        setShowRejectModal(false);
    }

    const handlePublish = async (topicId, status) => {
        if (status == 'published') {
            await updateTopicStatus(topicId, 'draft');
            const topics = await getTeacherTopics();
            setTeacherTopics(originalTopics.filter((topic) => topic._id !== topicId));
            setOriginalTopics(topics);
        }
        else {
            await updateTopicStatus(topicId, 'published');
            const topics = await getTeacherTopics();
            setTeacherTopics(originalTopics.filter((topic) => topic._id !== topicId));
            setOriginalTopics(topics);
        }
    };

    const handleCancelTopic = () => {
        setAddTopicModalVisible(false);
        setTitle('')
        setVideoUri('');
        setVideoName('');
        setVideoType('');
    }

    const handleCreateTopic = async () => {

        if (title === '' || videoName === '') {
            alert('Please fill in all the fields!');
            return;
        }

        const formData = new FormData();

        formData.append('title', title);

        formData.append('content_video', {
            uri: videoUri,
            type: videoType,
            name: videoName,
        });

        await createTopic(formData);

        const topics = await getTeacherTopics();
        const filteredTopics = topics.filter(topic => topic.status === filter);
        setOriginalTopics(topics);
        setTeacherTopics(filteredTopics);

        setAddTopicModalVisible(false);

        setTitle('')
        setVideoUri('');
        setVideoName('');
        setVideoType('');
    }

    const selectVideo = async () => {
        const options = {
            mediaType: 'video',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error:', response.error);
            } else if (response.assets[0].type.includes('video')) {
                const fileName = response.assets[0].fileName;
                setVideoUri(response.assets[0].uri);
                setVideoName(fileName);
                setVideoType(response.assets[0].type);
            }
            else {
                Alert.alert(
                    'No Video Selected',
                    'Please select a video.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                    { cancelable: false }
                );
            }
        });
    };

    return (
        <View>
            <Header
                heading="ADMINISTRATIVE TOOLS"
                navigate='TeacherHomePage'
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={showRejectModal}
                onRequestClose={() => setShowRejectModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure?</Text>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={require("../assets/Logo2.png")}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => handleDeleteCourse()}
                        >
                            <Text style={styles.modalButtonText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setShowRejectModal(false)}
                        >
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={addTopicModalVisible}
                animationType="slide"
                transparent={false}
            >
                <View style={styles.addmodalContainer}>
                    <Text style={styles.addmodalHeading}>Create New Topic</Text>
                    <View style={styles.addmodalContent}>
                        <TextInput
                            style={styles.addmodalInput}
                            placeholder="Topic Title"
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />

                        <TouchableOpacity onPress={selectVideo}>
                            <TextInput
                                style={styles.addmodalInput}
                                placeholder="Topic Content Video"
                                value={videoName}
                                editable={false}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.addmodalButtons}>
                        <TouchableOpacity
                            style={styles.addmodalButton}
                            onPress={() => action === 'add' ? handleCreateTopic() : handleEditTopic()}
                        >
                            <Text style={styles.addbuttonText}>{action === 'add' ? 'Create Topic' : 'Save Topic'}</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.addmodalButton}
                            onPress={handleCancelTopic}
                        >
                            <Text style={styles.addbuttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.createCourseText}>My Topics</Text>
                <TouchableOpacity
                    onPress={handleAddTopic}
                >
                    <Image style={styles.createCourseButton} source={require("../assets/qwd-1.png")}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={() => handleFilter('published')}>
                    <Text style={filter === 'published' ? styles.selectedFilter : styles.filter}>Published</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilter('draft')}>
                    <Text style={filter === 'draft' ? styles.selectedFilter : styles.filter}>Drafts</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flexDirection: 'column', marginTop: 20 }}>
                {teacherTopics.map(topic => (
                    <View key={topic._id} style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between', borderBottomWidth: 2, borderColor: '#ddd' }}>
                        <Text style={{ color: 'black', fontSize: 16, width: 170 }}>{topic.title}</Text>
                        <TouchableOpacity onPress={() => handlePublish(topic._id, topic.status)}>
                            <Text style={{ color: Color.colorSlateblue, fontSize: 14 }}>
                                {topic.status === 'published' ? 'Draft' : 'Publish'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleEdit(topic._id, topic.title, topic.content)}>
                            <Text style={{ color: Color.colorSlateblue, fontSize: 14 }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(topic._id)}>
                            <Text style={{ color: 'red', fontSize: 14 }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

function Quizzes() {
    const { updateQuiz, createQuiz, deleteQuiz, updateQuizStatus, getTeacherQuizzes } = useContext(CourseContext);
    const [teacherQuizzes, setTeacherQuizzes] = useState([]);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [addQuizModalVisible, setAddQuizModalVisible] = useState(false);
    const [requestId, setRequestId] = useState('');
    const [originalQuizzes, setOriginalQuizzes] = useState([]);
    const [filter, setFilter] = useState('published');

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [action, setAction] = useState('');
    const [editId, setEditId] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            const quizs = await getTeacherQuizzes();
            const filteredQuizzes = quizs.filter(quiz => quiz.status === filter);
            setOriginalQuizzes(quizs);
            setTeacherQuizzes(filteredQuizzes);
        };

        fetchData();
    }, [getTeacherQuizzes]);

    const handleAddQuiz = () => {
        setAction('add');
        setAddQuizModalVisible(true);
    };

    const handleFilter = (newFilter) => {
        setFilter(newFilter);
        setTeacherQuizzes(originalQuizzes.filter(quiz => quiz.status === newFilter));
    };

    const handleEdit = (id, title, content) => {
        setTitle(title)
        setContent(content);
        setEditId(id)

        setAction('edit');
        setAddQuizModalVisible(true);
    };

    const handleEditQuiz = async () => {

        if (title === '' || content === '') {
            alert('Please fill in all the fields!');
            return;
        }

        const json = await updateQuiz(editId, title, content);

        const quizs = await getTeacherQuizzes();
        const filteredQuizzes = quizs.filter(quiz => quiz.status === filter);
        setOriginalQuizzes(quizs);
        setTeacherQuizzes(filteredQuizzes);

        setAddQuizModalVisible(false);

        navigation.navigate('AddQuiz', { quizid: json.quiz._id });

        setTitle('')
        setContent('')
    }

    const handleDelete = (courseId) => {
        setShowRejectModal(true);
        setRequestId(courseId);
    };

    const handleDeleteCourse = async () => {
        await deleteQuiz(requestId);
        setOriginalQuizzes(originalQuizzes.filter((quiz) => quiz._id !== requestId))
        setTeacherQuizzes(teacherQuizzes.filter((quiz) => quiz._id !== requestId));
        setShowRejectModal(false);
    }

    const handlePublish = async (quizId, status) => {
        if (status == 'published') {
            await updateQuizStatus(quizId, 'draft');
            const quizs = await getTeacherQuizzes();
            setTeacherQuizzes(originalQuizzes.filter((quiz) => quiz._id !== quizId));
            setOriginalQuizzes(quizs);
        }
        else {
            await updateQuizStatus(quizId, 'published');
            const quizs = await getTeacherQuizzes();
            setTeacherQuizzes(originalQuizzes.filter((quiz) => quiz._id !== quizId));
            setOriginalQuizzes(quizs);
        }
    };

    const handleCancelQuiz = () => {
        setAddQuizModalVisible(false);
        setTitle('')
        setContent('')
    }

    const handleCreateQuiz = async () => {

        if (title === '' || content === '') {
            alert('Please fill in all the fields!');
            return;
        }

        const json = await createQuiz(title, content);

        const quizs = await getTeacherQuizzes();
        const filteredQuizzes = quizs.filter(quiz => quiz.status === filter);
        setOriginalQuizzes(quizs);
        setTeacherQuizzes(filteredQuizzes);

        setAddQuizModalVisible(false);

        setTitle('')
        setContent('')

        navigation.navigate('AddQuiz', { quizid: json.data.post.id });
    }

    return (
        <View>
            <Header
                heading="ADMINISTRATIVE TOOLS"
                navigate='TeacherHomePage'
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={showRejectModal}
                onRequestClose={() => setShowRejectModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure?</Text>
                        <View style={styles.imageContainer}>
                            <Image
                                style={styles.image}
                                source={require("../assets/Logo2.png")}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => handleDeleteCourse()}
                        >
                            <Text style={styles.modalButtonText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setShowRejectModal(false)}
                        >
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={addQuizModalVisible}
                animationType="slide"
                transparent={false}
            >
                <View style={styles.addmodalContainer}>
                    <Text style={styles.addmodalHeading}>Create New Quiz</Text>
                    <View style={styles.addmodalContent}>
                        <TextInput
                            style={styles.addmodalInput}
                            placeholder="Quiz Title"
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                        />

                        <TextInput
                            style={styles.addmodalInput}
                            placeholder="Quiz Content"
                            value={content}
                            onChangeText={(text) => setContent(text)}
                        />
                    </View>

                    <View style={styles.addmodalButtons}>
                        <TouchableOpacity
                            style={styles.addmodalButton}
                            onPress={() => action === 'add' ? handleCreateQuiz() : handleEditQuiz()}
                        >
                            <Text style={styles.addbuttonText}>{action === 'add' ? 'Create Quiz' : 'Save Quiz'}</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.addmodalButton}
                            onPress={handleCancelQuiz}
                        >
                            <Text style={styles.addbuttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.createCourseText}>My Quizzes</Text>
                <TouchableOpacity
                    onPress={handleAddQuiz}
                >
                    <Image style={styles.createCourseButton} source={require("../assets/qwd-1.png")}
                    />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={() => handleFilter('published')}>
                    <Text style={filter === 'published' ? styles.selectedFilter : styles.filter}>Published</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilter('draft')}>
                    <Text style={filter === 'draft' ? styles.selectedFilter : styles.filter}>Drafts</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flexDirection: 'column', marginTop: 20 }}>
                {teacherQuizzes.map(quiz => (
                    <View key={quiz._id} style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between', borderBottomWidth: 2, borderColor: '#ddd' }}>
                        <Text style={{ color: 'black', fontSize: 16, width: 170 }}>{quiz.title}</Text>
                        <TouchableOpacity onPress={() => handlePublish(quiz._id, quiz.status)}>
                            <Text style={{ color: Color.colorSlateblue, fontSize: 14 }}>
                                {quiz.status === 'published' ? 'Draft' : 'Publish'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleEdit(quiz._id, quiz.title, quiz.content)}>
                            <Text style={{ color: Color.colorSlateblue, fontSize: 14 }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(quiz._id)}>
                            <Text style={{ color: 'red', fontSize: 14 }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

function MyTabs() {
    return (
        <Tab.Navigator
            swipeEnabled={true}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#373eb2',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                tabBarLabelStyle: { fontSize: 16, paddingBottom: 5 },
                tabBarShowIcon: false,
                tabBarShowLabel: true,
                tabBarIcon: ({ focused }) => {
                    if (focused) {
                        return <IndicatorBall />;
                    }
                    return null;
                },
            })}
        >
            <Tab.Screen name="Courses" component={Courses} />
            <Tab.Screen name="Topics" component={Topics} />
            <Tab.Screen name="Quizzes" component={Quizzes} />
        </Tab.Navigator>
    );
}

const AdministrativeTools = () => {
    return (
        <MyTabs />
    );
};

const styles = StyleSheet.create({
    selectedFilter: {
        fontSize: 16,
        backgroundColor: Color.colorGainsboro_200,
        margin: 10,
        width: 100,
        textAlign: 'center',
        padding: 5,
        color: 'black',
        borderWidth: 1,
    },

    addmodalHeading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 40,
        color: Color.colorSlateblue
    },

    addmodalInput: {
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

    addbuttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },

    addmodalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addmodalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        maxHeight: 300,
        width: '80%',
    },
    addmodalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    addCoursemodalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 170,
    },
    addmodalButton: {
        backgroundColor: Color.colorSlateblue,
        padding: 10,
        margin: 20,
        borderRadius: 10,
        width: '40%',
    },
    filter: {
        fontSize: 16,
        backgroundColor: Color.colorGainsboro_200,
        margin: 10,
        width: 100,
        textAlign: 'center',
        padding: 5,
        color: 'black',
    },
    videoUploader: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoName: {
        fontSize: 16,
        color: 'black',
    },
    image: {
        width: 50,
        height: 50,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: 300,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
        color: Color.colorSlateblue,
        textAlign: "center",
        fontWeight: "400",
    },
    modalButton: {
        backgroundColor: Color.colorSlateblue,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    modalButtonText: {
        color: "white",
        fontSize: 16,
    },

    createCourseText: {
        fontSize: 25,
        padding: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    createCourseButton: {
        width: 35,
        height: 35,
        margin: 20,
        marginRight: 20,
    },
    flatList: {
        marginRight: '2%',
        flex: 1,
    },
    ratingText: {
        color: '#8e8e93',
        fontWeight: 'bold'
    },
    feesText: {
        color: '#8e8e93',
        fontWeight: 'bold'
    },
    ratingFeesContainer: {
        flexDirection: 'row',
        marginTop: 1,
        alignSelf: 'center'
    },
    feesContainer: {
        marginTop: 1,
        marginLeft: 10,
    },
    indicatorBall: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        position: 'absolute',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 8,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
    },
    searchBar: {
        flex: 1,
        height: 40,
        padding: 8,
        borderRadius: 8,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: '2%',
    },
    container: {
        margin: '2%',
        borderWidth: 1.5,
        borderColor: 'black',
        borderRadius: 10,
        padding: 8,
        alignItems: 'center',
    },
    itemContainer: {
        flex: 1,
        margin: 8,
        borderRadius: 8,
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        marginTop: 10,
        fontSize: 10,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
    },
    headerPosition: {
        height: 81,
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16, // Add some padding for better spacing
        width: "100%", // Use 100% of the parent width
    },
    childIconLayout: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    headerChild: {
        borderBottomRightRadius: Border.br_11xl,
        borderBottomLeftRadius: Border.br_11xl,
        backgroundColor: Color.colorSlateblue,
    },
    hamburgerIcon: {
        top: 33,
        left: windowWidth - 40,
        width: 25,
        height: 16,
        position: "absolute",
    },
    myCourses1: {
        fontSize: FontSize.size_xl,
        fontWeight: "500",
        fontFamily: FontFamily.interMedium,
        color: Color.colorWhite,
        width: 185,
        height: 26,
        textAlign: "center",
        top: 30,
        position: "absolute",
    },
    icons8Arrow241: {
        left: 13,
        width: 26,
        height: 24,
        top: 30,
        position: "absolute",
    },
});

export default AdministrativeTools;