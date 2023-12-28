import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";
import CourseContext from "../context/Courses/courseContext";
import Header from "../components/Header";

const Quiz = (props) => {
  const navigation = useNavigation();
  const { quizId } = props.route.params;
  const { courseId } = props.route.params;
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(null);
  const context = useContext(CourseContext);
  const { getQuizQuestions, updateQuizGraduation } = context;

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuizQuestions(quizId);
      setQuestions(data.questionAnswers);
    };

    fetchQuestions();
  }, [quizId]);

  useEffect(() => {
    if (questions) {
      setAnswers(Array(questions.length).fill(null));
    }
  }, [questions]);

  const handleAnswerSelect = (answerIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = () => {
    if (isQuizPassed) {
      updateQuizGraduation(quizId, courseId, 'pass');
      Alert.alert(
        'Congratulations!',
        'You passed the quiz!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Certificate', { courseId: courseId }),
          },
        ],
      );
    } else {
      updateQuizGraduation(quizId, courseId, 'fail');
      alert(`Quiz Failed, You need to try again :('`);
    }
  };

  const calculateScore = () => {
    if (questions && answers) {
      const correctAnswers = questions.reduce((acc, question, index) => {
        const selectedAnswerIndex = answers[index];
        const isAnswerCorrect =
          selectedAnswerIndex !== null &&
          question.answers[selectedAnswerIndex].is_true;

        return isAnswerCorrect ? acc + question.question.marks : acc;
      }, 0);

      const totalMarks = questions.reduce(
        (acc, question) => acc + question.question.marks,
        0
      );

      const percent = (correctAnswers / totalMarks) * 100;

      return percent;
    }
  };

  const isQuizPassed = calculateScore() >= 80;

  return (
    <View style={{ flex: 1 }}>
      <Header
        heading='Certification Awaits!'
        navigate="MyCourses"
        flag={false}
      />
      {questions && answers && (
        <View style={{ flex: 1, marginTop: 20 }}>
          <Text style={[styles.note]}>You need to score 80% to pass this quiz and to get your certificate!</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {questions.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  borderWidth: 2,
                  borderColor: index == currentQuestionIndex ? Color.colorSlateblue : 'grey',
                  backgroundColor: answers[index] !== null ? Color.colorSlateblue : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5,
                }}
              >
                <Text style={[{ color: answers[index] !== null ? 'white' : 'black' }]}>{index + 1}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.groupPosition]}>
            <View style={[styles.question]}>
              <Text style={[styles.text]}>{currentQuestionIndex + 1}  {questions[currentQuestionIndex].question.content}</Text>
              <View style={[styles.coin]}>
                <Text style={[styles.text]}>{questions[currentQuestionIndex].question.marks}</Text>
                <Image
                  resizeMode="cover"
                  source={require("../assets/icons8coins48-1.png")}
                />
              </View>
            </View>

            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswerSelect(index)}
                style={{
                  backgroundColor: answers[currentQuestionIndex] === index ? Color.colorSlateblue : Color.colorGainsboro_200,
                  ...styles.groupItem,
                }}
              >
                <Text style={{
                  color: answers[currentQuestionIndex] === index ? 'white' : 'black',
                  fontWeight: '600'
                }}>{String.fromCharCode(65 + index)}. {answer.title}</Text>
              </TouchableOpacity>
            ))}

            <View
              style={{
                flexDirection: 'row',
                alignSelf: currentQuestionIndex === 0 ? 'flex-end' : 'auto',
                justifyContent: 'space-between',
                padding: 20,
              }}
            >
              {currentQuestionIndex !== 0 && (
                <TouchableOpacity onPress={handleBack}>
                  <Text style={[styles.button]}>Back</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity onPress={currentQuestionIndex === questions.length - 1 ? handleFinish : handleNext}>
                <Text style={[styles.button]}>
                  {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  note: {
    marginBottom: 20,
    color: 'green',
    fontSize: 10,
    textAlign: 'center'
  },
  button: {
    color: 'white',
    backgroundColor: Color.colorSlateblue,
    padding: 5,
    width: 70,
    textAlign: 'center'
  },
  question: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20
  },
  coin: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  groupPosition: {
    backgroundColor: Color.colorGainsboro_200,
    borderRadius: Border.br_xl,
    left: 0,
    top: 0,
    padding: 20,
    margin: 20
  },
  text: {
    color: 'black',
    fontWeight: '600'
  },
  groupItem: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 14,
    shadowOpacity: 2,
    borderStyle: "solid",
    borderColor: Color.labelColorLightPrimary,
    borderWidth: 0.2,
    borderRadius: Border.br_xl,
    left: 0,
    top: 0,
    padding: 10,
    margin: 10
  },
});

export default Quiz;