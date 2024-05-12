import CourseContext from "./courseContext";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CourseState = (props) => {
  const host = "http://helloworld-nodejs-4714.azurewebsites.net"
  const [course, setCourse] = useState(null)
  const [user, setUser] = useState(null)
  const [myCourses, setMyCourses] = useState(null);
  const [allCourses, setAllCourses] = useState(null);
  const [lessonsOfCourse, setLessonsOfCourse] = useState(null);
  const [orderCourseStatus, setOrderCourseStatus] = useState(null);
  const [percentage, setPercentage] = useState(0);

  const getMyCourses = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/CourseProgression/GetMyCourses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
      });
      const json = await response.json()
      if (json.success){
        setMyCourses(json.coursesWithLearningPosts);
        return json.coursesWithLearningPosts;
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  const getCourses = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/CourseEnrollment/GetCourses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
      });
      const json = await response.json()
      setAllCourses(json.coursesWithLearningPosts);
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  const getCourseCompletion = async (id) => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/CourseProgression/CalculateCourseCompletion/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
      });
      const json = await response.json()
      if (json.success)
        setPercentage(json.completionPercentage);
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  const getSingleCourse = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/CourseEnrollment/GetCourse/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    const json = await response.json()
    if (json.success) {
      setCourse(json.courseWithLearningPost)
      return json.courseWithLearningPost
    }
  }

  const payCourse = async (total, courseids) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/CourseEnrollment/PayCourse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({
        'amount': total,
        'courseIds': courseids
      })
    });
    await response.json();
  }

  const updateQuizGraduation = async (quizId, courseId, graduation) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/CourseProgression/UpdateQuizGraduation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({
        'quiz_id': quizId,
        'course_id': courseId,
        'graduation': graduation
      })
    });
    await response.json();
  }

  const markTopicCompleted = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/CourseProgression/MarkTopicCompleted/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    await response.json();
  }

  const addTopicInProgress = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/CourseProgression/AddTopicInProgress/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    await response.json();
  }

  const addQuizInProgress = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/CourseProgression/AddQuizInProgress/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    await response.json();
  }

  const addCourseRating = async (id, stars) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/CourseProgression/AddCourseRating/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({
        'rating': stars,
      })
    });
    await response.json();
  }

  const getTeacherCourses = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/TeacherCourses/GetCourses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
      });
      const json = await response.json()
      return json.coursesWithLearningPosts;
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  const updateCourseStatus = async (id, status) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/TeacherCourses/UpdateCourseStatus/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({
        'status': status,
      })
    });
    await response.json();
  }

  const deleteCourse = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/TeacherCourses/DeleteCourse/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    await response.json();
  }

  const createCourse = async (formData) => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/TeacherCourses/CreateCourse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          "auth-token": token
        },
        body: formData
      });
      const json = await response.json()
      console.log(json);
      return json;
    }
    catch (error) {
      console.error('Error creating course', error.message);
    }
  }

  const updateCourse = async (id, formData) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/TeacherCourses/UpdateCourse/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
        "auth-token": token
      },
      body: formData
    });
    await response.json();
  }

  const getTeacherTopics = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/TeacherTopics/GetTopics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
      });
      const json = await response.json()
      return json.topics;
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  const updateTopicStatus = async (id, status) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/TeacherTopics/UpdateTopicStatus/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({
        'status': status,
      })
    });
    await response.json();
  }

  const deleteTopic = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/TeacherTopics/DeleteTopic/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    await response.json();
  }

  const createTopic = async (formData) => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/TeacherTopics/CreateTopic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          "auth-token": token
        },
        body: formData
      });
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error creating topic', error.message);
    }
  }

  const updateTopic = async (id, formData) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/TeacherTopics/UpdateTopic/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data',
        "auth-token": token
      },
      body: formData
    });
    await response.json();
  }

  
  const getTeacherQuizzes = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/TeacherQuizzes/GetQuizzes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
      });
      const json = await response.json()
      return json.quizzes;
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  const updateQuizStatus = async (id, status) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/TeacherQuizzes/UpdateQuizStatus/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({
        'status': status,
      })
    });
    await response.json();
  }

  const deleteQuiz = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/TeacherQuizzes/DeleteQuiz/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    await response.json();
  }

  const createQuiz = async (title, content) => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/TeacherQuizzes/CreateQuiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
        body: JSON.stringify({
          'title': title,
          'content': content
        })
      });
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error creating quiz', error.message);
    }
  }

  const updateQuiz = async (id, title, content) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/TeacherQuizzes/UpdateQuiz/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({
        'title': title,
        'content': content
      })
    });
    const json = await response.json();
    return json;
  }

  const deleteQuestion = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/TeacherQuizzes/DeleteQuestion/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    await response.json();
  }

  const createQuestion = async (post_id, marks, question_order, content) => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/TeacherQuizzes/CreateQuestion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
        body: JSON.stringify({
          'quiz_id': post_id,
          'marks': marks,
          'order': question_order,
          'content': content
        })
      });
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error creating question', error.message);
    }
  }

  const getQuizQuuestions = async (id) => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/TeacherQuizzes/GetQuestions/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
      });
      const json = await response.json()
      return json.questionAnswers;
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  const updateQuestionApi = async (id, marks, question_order, content) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/TeacherQuizzes/UpdateQuestion/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({
        'marks': marks,
        'order': question_order,
        'content': content
      })
    });
    await response.json();
  }

  const deleteAnswer = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/TeacherQuizzes/DeleteAnswer/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    await response.json();
  }

  const createAnswer = async (title, order, is_true, question_id) => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/TeacherQuizzes/CreateAnswer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
        body: JSON.stringify({
          'title': title,
          'question_id': question_id,
          'is_true': is_true,
          'order': order
        })
      });
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error creating answer', error.message);
    }
  }

  const updateAnswerApi = async (id, title, order, is_true) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/TeacherQuizzes/UpdateAnswer/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({
        'title': title,
        'is_true': is_true,
        'order': order
      })
    });
    await response.json();
  }

  const getOrderCourseStatus = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/CourseEnrollment/GetOrderCourseStatus/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    const json = await response.json()
    if (json.success)
      setOrderCourseStatus(json.payment_status)
  }

  const createLesson = async (title, lesson_order, course_id) => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/TeacherLessons/CreateLesson`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
        body: JSON.stringify({
          'title': title,
          'lesson_order': lesson_order,
          'course_id': course_id,
        })
      });
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error creating lesson', error.message);
    }
  }

  const addTopic = async (lesson_id, post_id, item_order, duration) => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/TeacherTopics/AddTopic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
        body: JSON.stringify({
          'lesson_id': lesson_id,
          'post_id': post_id,
          'item_order': item_order,
          'duration' : duration
        })
      });
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error adding topic', error.message);
    }
  }

  const addQuiz = async (lesson_id, post_id, item_order, duration) => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/TeacherQuizzes/AddQuiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
        body: JSON.stringify({
          'lesson_id': lesson_id,
          'post_id': post_id,
          'item_order': item_order,
          'duration' : duration
        })
      });
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error adding quiz', error.message);
    }
  }

  const getLessonsOfCourse = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/CourseProgression/GetLessonsOfCourse/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    const json = await response.json()
    if (json.success)
      setLessonsOfCourse(json.lessons)
  }

  const getCerificateDetails = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/CourseProgression/GetCerificateDetails/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    return await response.json();
  }

  const getLessonItems = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/CourseProgression/GetLessonItems/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    return await response.json();
  }

  const getQuizQuestions = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/CourseProgression/GetQuestions/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    return await response.json();
  }

  const getUser = async (id) => {
    const token = await AsyncStorage.getItem('tokenn');
    const response = await fetch(`${host}/api/User/GetUser/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    const json = await response.json()
    if (json.success) {
      setUser(json.user_data)
      return json.user_data;
    }
    return json;
  }

  const GetRecommendedCourses = async () => {
    try{
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch("https://venv-one-snowy.vercel.app/api/GetRecommendedCourses", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token
        },
      });
      if (!response.ok) {
        console.error('Error getting recommended courses for students:', response.status);
        return;
      }
      const json = await response.json()
      return json;
    }
    catch (error) {
      console.error('Error getting recommended courses for students:', error.message);
    }
  }

  return (
    <CourseContext.Provider value={{ GetRecommendedCourses, myCourses, addQuiz, addTopic, createLesson, updateAnswerApi, createCourse, updateCourse, getQuizQuuestions, createAnswer, deleteAnswer, updateQuestionApi, createQuestion, deleteQuestion, updateTopic, updateQuiz, createQuiz, deleteQuiz, updateQuizStatus, getTeacherQuizzes, createTopic, deleteTopic, updateTopicStatus, getTeacherTopics, updateCourseStatus, getTeacherCourses, deleteCourse, payCourse, getMyCourses, getCourseCompletion, percentage, allCourses, getCourses, course, getSingleCourse, getUser, user, addCourseRating, addTopicInProgress, updateQuizGraduation, addQuizInProgress, getOrderCourseStatus, orderCourseStatus, setCourse, getLessonsOfCourse, lessonsOfCourse, getLessonItems, markTopicCompleted, getQuizQuestions, getCerificateDetails }}>
      {props.children}
    </CourseContext.Provider>
  )
}

export default CourseState;