import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { FontSize, FontFamily, Border, Color } from "../GlobalStyles";
import CourseContext from "../context/Courses/courseContext";

const SingleCourse = (props) => {
  const navigation = useNavigation();
  const context = useContext(CourseContext);
  const { getSingleCourse, course, user, getUser, getLessonsOfCourse, addQuizInProgress, markTopicCompleted, lessonsOfCourse, addTopicInProgress, getLessonItems } = context;
  const { courseId } = props.route.params;
  const [singlecourse, setSingleCourse] = useState(null);
  const [formattedDate, setDate] = useState('')
  const [instructor, setInstructor] = useState('')
  const [lessons, setLessons] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const host = 'http://192.168.0.147:3000';
  const playerRef = useRef(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [uri, setUri] = useState(null);
  const lessonIndexRef = useRef(currentLessonIndex);
  const topicIndexRef = useRef(currentTopicIndex);

  useEffect(() => {
    lessonIndexRef.current = currentLessonIndex;
    topicIndexRef.current = currentTopicIndex;
  }, [currentLessonIndex, currentTopicIndex]);

  useEffect(() => {
    getSingleCourse(courseId);
    getLessonsOfCourse(courseId);
  }, [courseId]);

  useEffect(() => {
    if (course) {
      setSingleCourse(course)
      const originalTimestamp = course.post_date;
      const dateObject = new Date(originalTimestamp);

      const day = dateObject.getDate().toString().padStart(2, '0');
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObject.getFullYear();

      datee = `${day}/${month}/${year}`;
      setDate(datee);
      getUser(course.author_user_id)
    }
  }, [course]);


  useEffect(() => {
    if (lessonsOfCourse) {
      const fetchLessonItems = async () => {
        const updatedLessons = [];

        for (const lesson of lessonsOfCourse) {
          const lessonItemsResponse = await getLessonItems(lesson._id);

          if (lessonItemsResponse.success) {
            lesson.topics = lessonItemsResponse.topicsWithLearningPosts;
            updatedLessons.push(lesson);
          }
        }

        setLessons(updatedLessons);
      };

      fetchLessonItems();
    }
  }, [lessonsOfCourse]);

  useEffect(() => {
    if (lessons) {
      if (lessons[currentLessonIndex].topics) {
        const video = lessons[currentLessonIndex].topics[currentTopicIndex].content;
        setUri(`${host}/${video}`);
      }
    }
  }, [lessons]);

  useEffect(() => {
    if (user) {
      setInstructor(user.first_name + ' ' + user.last_name);
    }
  }, [user]);

  const videoError = (error) => {
    console.error('Video Error:', error);
  };

  const FullScreen = () => {
    setFullScreen(true)
    Orientation.lockToLandscape();
  };

  const ExitFullScreen = () => {
    setFullScreen(false)
    Orientation.lockToPortrait();
  };

  const handleVideoEnd = () => {
    const id = lessons[lessonIndexRef.current].topics[topicIndexRef.current].post_id;

    if (lessons[lessonIndexRef.current].topics[topicIndexRef.current + 1]) {
      const nextId = lessons[lessonIndexRef.current].topics[topicIndexRef.current + 1].post_id;
      addTopicInProgress(nextId);
    } 

    else if (lessons[lessonIndexRef.current + 1] && lessons[lessonIndexRef.current + 1].topics[0]) {
      const nextId = lessons[lessonIndexRef.current + 1].topics[0].post_id;

      if (lessons[lessonIndexRef.current + 1].topics[0].post_type === 'quiz') {
        addQuizInProgress(nextId);
      } 
      else {
        addTopicInProgress(nextId);
      
      }
    }
    markTopicCompleted(id);
    getLessonsOfCourse(courseId);
  };

  const playTopic = (lessonIndex, topicIndex) => {
    const video = lessons[lessonIndex].topics[topicIndex].content;
    setUri(`${host}/${video}`);
    setCurrentLessonIndex(lessonIndex);
    setCurrentTopicIndex(topicIndex);
  };

  return (
    <View style={fullScreen ? styles.fullscreenVideo : styles.container}>
      {!fullScreen && singlecourse && (
        <Header
          heading={singlecourse.title}
          navigate="MyCourses"
          flag={false}
        />
      )}
      {uri && (
        <View style={fullScreen ? styles.fullvideobox : styles.videobox}>
          <VideoPlayer
            showOnStart='false'
            onEnd={handleVideoEnd}
            fullscreen={fullScreen}
            source={{ uri }}
            ref={playerRef}
            onError={videoError}
            toggleResizeModeOnFullscreen='true'
            style={styles.video}
            onEnterFullscreen={FullScreen}
            onExitFullscreen={ExitFullScreen}
            onBack={ExitFullScreen}
            tapAnywhereToPause='true'
          />
        </View>
      )}
      {!fullScreen && singlecourse && instructor && lessons && (
        <View style={[styles.outerlayout]}>
          <View style={[styles.courseDetailsChild, styles.courseLayout1]}>
            <Text style={[styles.courseDetails1, styles.textTypo]}>
              COURSE DETAILS
            </Text>
            <Text style={styles.duration12hInstructor}>
              Duration: {singlecourse.duration}   |   Instructor: {instructor}   |   Released: {formattedDate}
            </Text>
          </View>
          <FlatList
            data={lessons}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item, index }) => (
              <View style={styles.lessonContainer}>
                <View style={styles.lessonHeading}>
                  {index === lessons.length - 1 && (
                    <Text style={styles.lessonTitle}>{`${item.title}`}</Text>
                  )}
                  {index !== lessons.length - 1 && (
                    <Text style={styles.lessonTitle}>{`Lesson ${index + 1}: ${item.title}`}</Text>
                  )}
                </View>
                <FlatList
                  data={item.topics}
                  keyExtractor={(topic, topicIndex) => `${topicIndex}`}
                  renderItem={({ item: topic, index: topicIndex }) => (
                    <TouchableOpacity
                      style={[
                        topicIndex === item.topics.length - 1 ? styles.lastTopicContainer : styles.topicContainer,
                        { backgroundColor: topicIndex === currentTopicIndex && index === currentLessonIndex ? '#dddddd' : 'transparent' },
                      ]}
                      onPress={() => playTopic(index, topicIndex)}
                      disabled={topic.status === 'locked' || topic.post_type == 'quiz'}
                    >
                      {topic.status === 'completed' && (
                        <View style={styles.completedIcon}>
                          <Text style={{ color: 'green', fontSize: 18, fontWeight: 'bold' }}>✓</Text>
                        </View>
                      )}
                      <Text style={styles.topicTitle}> {`${topic.title}`}</Text>
                      {topic.status !== 'locked' && topic.post_type == 'topic' && (
                        <TouchableOpacity onPress={() => playTopic(index, topicIndex)}>
                          <Image
                            style={styles.hamburgerIcon}
                            resizeMode="cover"
                            source={require("../assets/icons8-play-64.png")}
                          />
                        </TouchableOpacity>
                      )}
                      {topic.status !== 'locked' && topic.post_type == 'quiz' && (
                        <TouchableOpacity onPress={() => navigation.navigate("Quiz", { quizId: topic.post_id, courseId: courseId })}>
                          <Image
                            style={styles.hamburgerIcon}
                            resizeMode="cover"
                            source={require("../assets/icons8-arrow-50.png")}
                          />
                        </TouchableOpacity>
                      )}
                      {topic.status === 'locked' && (
                        <Image
                          style={styles.hamburgerIcon}
                          resizeMode="cover"
                          source={require("../assets/icons8-lock-30.png")}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  videobox: {
    marginTop: 15,
    flex: 0.5,
  },
  fullvideobox: {
    flex: 1,
  },
  outerlayout: {
    marginTop: 10,
    marginBottom: 20,
    flex: 1
  },
  courseDetails1: {
    top: 3,
    paddingBottom: '2%',
    fontSize: FontSize.size_3xs,
    textAlign: "center",
    color: Color.labelColorLightPrimary,
  },
  textTypo: {
    color: 'white',
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  duration12hInstructor: {
    color: 'white',
    fontSize: FontSize.size_4xs,
    fontFamily: FontFamily.interRegular,
    textAlign: "center",
  },
  courseDetailsChild: {
    backgroundColor: Color.colorSlateblue,
    left: 0,
    top: 0,
  },
  courseLayout1: {
    height: 40,
    width: '100%',
  },
  video: {
    height: 20,
  },
  hamburgerIcon: {
    width: 22,
    height: 22
  },
  lastTopicContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 8,
    border: 'none'
  },
  lessonHeading: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  lessonContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#cccccc',
    paddingTop: 16,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  topicContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  topicTitle: {
    color: 'black',
    fontWeight: '500',
    flex: 1,
  },
  playButton: {
    backgroundColor: Color.colorSlateblue,
    color: 'white',
    padding: 8,
    borderRadius: 5,
  },
  fullscreenVideo: {
    backgroundColor: 'black',
    ...StyleSheet.absoluteFill,
    elevation: 1,
  },

});

export default SingleCourse;
