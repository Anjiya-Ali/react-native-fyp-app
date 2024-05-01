import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Modal, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import MultiSelect from 'react-native-multiple-select';
import Header from "../components/Header";
import CourseContext from "../context/Courses/courseContext"
import { useNavigation } from "@react-navigation/native";

const CourseBuilder = (props) => {
  const { getTeacherTopics, getTeacherQuizzes, createLesson, addTopic, addQuiz } = useContext(CourseContext);
  const [lessons, setLessons] = useState([]);
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);
  const [topics, setTopics] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [quizModalVisible, setQuizModalVisible] = useState(false);
  const { courseId } = props.route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const topics = await getTeacherTopics();
      const filteredTopics = topics.filter(topic => topic.status === 'published');

      const formattedTopics = filteredTopics.map(topic => ({
        id: topic._id,
        name: topic.title,
      }));

      setTopics(formattedTopics);

      const quizzes = await getTeacherQuizzes();
      const filteredQuizzes = quizzes.filter(quiz => quiz.status === 'published');

      const formattedQuizzes = filteredQuizzes.map(quiz => ({
        id: quiz._id,
        name: quiz.title,
      }));

      setQuiz(formattedQuizzes);
    };

    fetchData();
  }, [getTeacherTopics]);

  const addNewLesson = () => {
    if (newLessonTitle == '') {
      alert('Please enter lesson title');
      return;
    }
    const newLesson = { title: newLessonTitle, topics: selectedTopics };
    setLessons([...lessons, newLesson]);
    setNewLessonTitle('');
    setSelectedTopics([]);
    setSelectedLessonIndex(null);
    setModalVisible(false);
  };

  const addTopicsToLesson = () => {
    lessons[selectedLessonIndex].topics = selectedTopics;
    setModalVisible(false);
  };

  const addNewQuiz = () => {
    setQuizModalVisible(false);
  };

  const removeLesson = (index) => {
    const updatedLessons = [...lessons];
    updatedLessons.splice(index, 1);
    setLessons(updatedLessons);
  };

  const handleSaveCourse = () => {
    Alert.alert(
      'Are you sure?',
      'The course builder will not be editable again.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            await Promise.all(lessons.map(async (lesson, index) => {
              const response = await createLesson(lesson.title, index + 1, courseId);
              const lesson_id = response.data.lesson.id;
              await Promise.all(lesson.topics.map(async (topicId, index) => {
                await addTopic(lesson_id, topicId, index + 1, '1hr');
              }));
            }));
  
            const response1 = await createLesson('Quiz', lessons.length + 1, courseId);
            const quiz_lesson_id = response1.data.lesson.id;
  
            await Promise.all(selectedQuiz.map(async (quizId, index) => {
              await addQuiz(quiz_lesson_id, quizId, index + 1, '1hr');
            }));

            navigation.navigate('AdministrativeTools')
          },
        },
      ],
      { cancelable: false }
    );
  }
  

  const editLessonTitle = (index, newTitle) => {
    const updatedLessons = [...lessons];
    updatedLessons[index].title = newTitle;
    setLessons(updatedLessons);
  };

  return (
    <>
      <Header
        heading="COURSE BUILDER"
        navigate='AdministrativeTools'
      />
      <ScrollView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Topics</Text>
              <MultiSelect
                hideTags
                items={topics}
                uniqueKey="id"
                onSelectedItemsChange={(selectedItems) => setSelectedTopics(selectedItems)}
                selectedItems={selectedTopics}
                selectText="Pick Topics"
                searchInputPlaceholderText="Search Topics..."
                tagRemoveIconColor="#373eb2"
                tagBorderColor="#373eb2"
                tagTextColor="#373eb2"
                selectedItemTextColor="#373eb2"
                selectedItemIconColor="#373eb2"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#373eb2' }}
                submitButtonColor="#373eb2"
                submitButtonText="Submit"
              />
              <View style={styles.modalButtonsContainer}>
                <Button title="Add Topics" onPress={addTopicsToLesson} color="#373eb2" />
                <Button title="Cancel" onPress={() => setModalVisible(false)} color="#373eb2" />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={quizModalVisible}
          onRequestClose={() => {
            setQuizModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Quiz</Text>
              <MultiSelect
                hideTags
                items={quiz}
                single={true}
                uniqueKey="id"
                onSelectedItemsChange={(selectedItems) => setSelectedQuiz(selectedItems)}
                selectedItems={selectedQuiz}
                selectText="Pick Quiz"
                searchInputPlaceholderText="Search Quiz..."
                tagRemoveIconColor="#373eb2"
                tagBorderColor="#373eb2"
                tagTextColor="#373eb2"
                selectedItemTextColor="#373eb2"
                selectedItemIconColor="#373eb2"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#373eb2' }}
                submitButtonColor="#373eb2"
                submitButtonText="Submit"
              />
              <View style={styles.modalButtonsContainer}>
                <Button title="Add Quiz" onPress={addNewQuiz} color="#373eb2" />
                <Button title="Cancel" onPress={() => setQuizModalVisible(false)} color="#373eb2" />
              </View>
            </View>
          </View>
        </Modal>
        <TextInput
          style={styles.input}
          placeholder="Enter new lesson title"
          value={newLessonTitle}
          onChangeText={(text) => setNewLessonTitle(text)}
        />
        <Button title="Create New Lesson" onPress={addNewLesson} color="#373eb2" />
        {lessons.map((lesson, index) => (
          <View key={index} style={styles.lessonContainer}>
            <View style={styles.titleContainer}>
              <TextInput
                style={styles.title}
                value={lesson.title}
                onChangeText={(text) => editLessonTitle(index, text)}
              />

              <TouchableOpacity onPress={() => removeLesson(index)}>
                <Text style={{ color: 'red', fontSize: 16 }}>Remove</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.selectedTopicsContainer}>
              {lesson.topics.map((topicId) => {
                const topicObject = topics.find(topic => topic.id === topicId);
                const key = topicId;
                return (
                  <Text key={key} style={styles.selectedTopic}>
                    {topicObject.name}
                  </Text>
                );
              })}
            </View>
            <TouchableOpacity onPress={() => {
              setSelectedLessonIndex(index);
              setModalVisible(true);
            }}>
              <Text style={styles.topicButton}>Add Topics</Text>
            </TouchableOpacity>
          </View>
        ))}

        {lessons.length >= 1 && (
          <View style={{ marginTop: 20 }}>
            <View style={styles.selectedTopicsContainer}>
              {selectedQuiz.map((quizId) => {
                const quizObject = quiz.find(qui => qui.id === quizId);
                const key = quizId;
                return (
                  <Text key={key} style={styles.title}>
                    {quizObject.name}
                  </Text>
                );
              })}
            </View>
            <TouchableOpacity onPress={() => {
              setQuizModalVisible(true);
            }}>
              <Text style={styles.quizButton}>Add Quiz</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.addmodalButton}
          onPress={() => handleSaveCourse()}
        >
          <Text style={styles.addbuttonText}>Save Course</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  addmodalButton: {
    backgroundColor: Color.colorSlateblue,
    padding: 12,
    marginTop: 50,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center'
  },
  addbuttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  topicButton: {
    width: 100,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    marginLeft: 30,
    backgroundColor: "#373eb2",
    color: 'white',
    marginTop: 10,
    marginBottom: 20
  },
  quizButton: {
    width: 100,
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    backgroundColor: "#373eb2",
    color: 'white',
    marginTop: 10,
    marginBottom: 20
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black'
  },
  input: {
    borderWidth: 1,
    borderColor: '#373eb2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  lessonContainer: {
    marginTop: 15,
    borderBottomWidth: 2,
    borderColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#373eb2',
  },
  modalButtonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedTopic: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 30,
    marginBottom: 0,
  },
});

export default CourseBuilder;


