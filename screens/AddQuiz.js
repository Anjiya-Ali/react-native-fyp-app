import React, { useContext, useState, useEffect } from 'react';
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import CourseContext from "../context/Courses/courseContext"
import { useNavigation } from "@react-navigation/native";

const AddQuiz = (props) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentPoints, setCurrentPoints] = useState('');
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [answers, setAnswers] = useState([]);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
    const { quizid } = props.route.params;
    const { updateQuestionApi, createAnswer, deleteAnswer, updateAnswerApi, getQuizQuuestions, createQuestion, deleteQuestion } = useContext(CourseContext);
    const navigation = useNavigation();


    useEffect(() => {
        fetchQuizQuestions();
    }, []);

    const fetchQuizQuestions = async () => {
        try {
            const quizQuestionsResponse = await getQuizQuuestions(quizid); // Assuming getQuizQuestions is an asynchronous function that fetches questions
            const questionAnswers = quizQuestionsResponse;

            const updatedQuestions = questionAnswers.map(({ question, answers }) => ({
                ...question,
                answers: answers
            }));
            setQuestions(updatedQuestions);

        } catch (error) {
            console.error('Error fetching quiz questions:', error);
        }
    };

    const addQuestion = async () => {
        if (currentQuestion.trim() === '' || currentPoints.trim() === '' || answers.length < 2 || correctAnswerIndex === null) {
            Alert.alert('Error', 'Please fill out all fields and select the correct answer');
            return;
        }

        try {
            // Create question
            var length = 1;
            if (questions.length > 0) {
                length = questions.length + 1;
            }
            const newQuestion = await createQuestion(quizid, currentPoints, length, currentQuestion);
            const questionId = newQuestion.data.question.id;

            // Create answers
            const newAnswers = [];
            for (let index = 0; index < answers.length; index++) {
                const isTrue = index === correctAnswerIndex;
                const createdAnswer = await createAnswer(answers[index], index + 1, isTrue, questionId);
                newAnswers.push(answers[index]);
            }

            newQuestion.answers = newAnswers;
            fetchQuizQuestions();
            setCurrentQuestion('');
            setCurrentPoints('');
            setAnswers([]);
            setCorrectAnswerIndex(null);
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };

    const addAnswer = async () => {
        if (currentAnswer.trim() === '') {
            Alert.alert('Error', 'Please enter an answer');
            return;
        }

        try {
            setAnswers([...answers, currentAnswer]);
        } catch (error) {
            console.error('Error adding answer:', error);
        }

        setCurrentAnswer('');
    };

    const done = () => {
        navigation.navigate('AdministrativeTools')
    }

    const updateQuestion = async (questionId, marks, order, content) => {
        try {
            await updateQuestionApi(questionId, marks, order, content);
            fetchQuizQuestions();
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    const updateAnswer = async (answerId, title, order, is_true) => {
        try {
            await updateAnswerApi(answerId, title, order, is_true);
            fetchQuizQuestions();
        } catch (error) {
            console.error('Error updating answer:', error);
        }
    };

    const removeAnswer = async (questionId, answerId) => {
        try {
            // Delete answer
            await deleteAnswer(answerId);
            fetchQuizQuestions();
        } catch (error) {
            console.error('Error removing answer:', error);
        }
    };

    const removeQuestion = async (questionId, index) => {
        try {
            // Delete question
            await deleteQuestion(questionId);
            fetchQuizQuestions();
        } catch (error) {
            console.error('Error removing question:', error);
        }
    };

    const markAsCorrectAnswer = (questionId, correctAnswerIndex) => {
        if (correctAnswerIndex === null) {
            Alert.alert('Error', 'Please select an answer to mark as correct');
            return;
        }

        // Set is_true property of the selected answer to true
        const updatedAnswers = questions.map(question => {
            if (question._id === questionId) {
                return {
                    ...question,
                    answers: question.answers.map((answer, index) => ({
                        ...answer,
                        is_true: index === correctAnswerIndex
                    }))
                };
            }
            return question;
        });

        setQuestions(updatedAnswers);
    };


    return (
        <View style={styles.container}>
            <ScrollView style={styles.quesCont}>
                {questions.length > 0 ? (
                    questions.map((question, index) => (
                        <View key={index} style={styles.questionContainer}>
                            <View style={styles.numbertext}>
                                <Text style={styles.questionText}>{index + 1}) </Text>
                                <TextInput
                                    value={question.content}
                                    onChangeText={(text) => updateQuestion(question._id, question.marks, index, text)}
                                    style={styles.questionText}
                                />
                            </View>
                            <TextInput
                                value={question.marks.toString()}
                                onChangeText={(text) => updateQuestion(question._id, text, index, question.content)}
                                style={styles.questionPoints}
                                keyboardType="numeric"
                            />
                            {question.answers.map((answer, answerIndex) => (
                                <View key={answerIndex} style={styles.answerContainer}>
                                    <TextInput
                                        value={answer.title}
                                        onChangeText={(text) => updateAnswer(answer._id, text, answerIndex, answer.is_true)}
                                        style={styles.answerText}
                                    />
                                    {answer.is_true && <Text style={styles.correctAnswerText}>Correct Answer</Text>}
                                    {!answer.is_true && <TouchableOpacity onPress={() => markAsCorrectAnswer(question._id, answerIndex)} style={styles.markCorrectButton}>
                                        <Text style={styles.markCorrectButtonText}>Mark as Correct</Text>
                                    </TouchableOpacity>}
                                    {!answer.is_true &&
                                        <TouchableOpacity onPress={() => removeAnswer(question._id, answer._id)} style={styles.deleteButton}>
                                            <Text style={styles.deleteButtonText}>Delete</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            ))}
                            <TouchableOpacity onPress={() => removeQuestion(question._id, index)} style={styles.deleteQuestionButton}>
                                <Text style={styles.deleteQuestionButtonText}>Delete Question</Text>
                            </TouchableOpacity>
                        </View>

                    ))
                ) : (
                    <Text></Text>
                )}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter Question"
                    value={currentQuestion}
                    onChangeText={setCurrentQuestion}
                    style={styles.inputField}
                />
                <TextInput
                    placeholder="Points"
                    value={currentPoints}
                    onChangeText={setCurrentPoints}
                    keyboardType="numeric"
                    style={styles.inputField}
                />
                <TextInput
                    placeholder="Enter Answer"
                    value={currentAnswer}
                    onChangeText={setCurrentAnswer}
                    style={styles.inputField}
                />
                <TouchableOpacity onPress={addAnswer} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add Answer</Text>
                </TouchableOpacity>
                <View style={styles.answerOptions}>
                    {answers.map((answer, index) => (
                        <TouchableOpacity key={index} onPress={() => setCorrectAnswerIndex(index)} style={[styles.optionButton, correctAnswerIndex === index && styles.correctOptionButton]}>
                            <Text style={[styles.optionText, correctAnswerIndex === index && styles.correctOptionText]}>{String.fromCharCode(65 + index)}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <TouchableOpacity onPress={addQuestion} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add Question</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={done} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    numbertext: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
    },
    questionContainer: {
        marginBottom: 30,
    },
    questionText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
        marginBottom: 20,
    },
    questionPoints: {
        color: 'black',
        borderWidth: 1,
        width: 100,
        padding: 7,
        marginBottom: 5,
    },
    answerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    answerText: {
        color: 'black',
        flex: 1,
    },
    correctAnswerText: {
        color: Color.colorSlateblue,
        marginLeft: 10,
    },
    deleteButton: {
        marginLeft: 10,
    },
    deleteButtonText: {
        color: 'red',
    },
    deleteQuestionButton: {
        marginTop: 10,
    },
    deleteQuestionButtonText: {
        color: 'red',
        paddingBottom: 20,
        borderBottomWidth: 1.5,
        borderBottomColor: Color.colorGainsboro_200,
    },
    inputContainer: {
        marginTop: 20,
    },
    inputField: {
        marginBottom: 10,
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    addButton: {
        backgroundColor: Color.colorSlateblue,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    addButtonText: {
        color: 'white',
    },
    answerOptions: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    optionButton: {
        backgroundColor: Color.colorGainsboro_200,
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        width: '20%',
    },
    correctOptionButton: {
        backgroundColor: Color.colorSlateblue,
    },
    optionText: {
        color: 'black',
    },
    correctOptionText: {
        color: 'white',
    },
});

export default AddQuiz;
