import React, { useContext, useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, Dimensions, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProgressCircle from 'react-native-progress-circle'
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
const windowWidth = Dimensions.get('window').width;
import CourseContext from "../context/Courses/courseContext";
import Header from '../components/Header';

const { height, width } = Dimensions.get('window');
const MyCourses = (props) => {
  const { getMyCourses } = useContext(CourseContext);
  const { getCourseCompletion, percentage } = useContext(CourseContext);
  const [myCourses, setMyCourses] = useState(null);
  const navigation = useNavigation();
  const host = 'http://helloworld-nodejs-4714.azurewebsites.net';

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getMyCourses();
      setMyCourses(courses);
    };
    fetchCourses();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const fetchCourses = async () => {
      const courses = await getMyCourses();
      setMyCourses(courses);
    };

    try {
      setRefreshing(true);
      await fetchCourses();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);
  
  if (!myCourses) {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <Header
          heading='MY COURSES'
          navigate="HomePage1"
        />
        <View>
          <Text>No Enrolled Courses Yet!</Text>
        </View>
      </View>
    );
  }
  return (
    <>
      <Header
            heading='MY COURSES'
            navigate="HomePage1"
      />
      <ScrollView style={{ flex: 1, flexDirection: 'column' }} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.parent}>
          {myCourses.map((course) => {
            getCourseCompletion(course._id);
            return (
              <View key={course._id} style={styles.box}>
                <TouchableOpacity
                  key={course._id}
                  style={styles.agile}
                  onPress={() => navigation.navigate("SingleCourse", { courseId: course._id })}
                >
                  <View style={styles.courseDetails}>
                    <View style={styles.image1Icon}>
                      <Image
                        style={styles.childIconLayout}
                        resizeMode="cover"
                        source={{ uri: `${host}/${course.featured_image}` }}
                      />
                    </View>
                    <View style={styles.headPosition}>
                      <Text style={[styles.excelInAgile, styles.excelInAgileTypo]}>
                        {course.title}
                      </Text>
                      <View style={styles.progressIcon}>
                        <ProgressCircle
                          percent={Math.round(percentage)}
                          radius={25}
                          borderWidth={8}
                          color="#373eb2"
                          shadowColor="#8e8e93"
                          bgColor="#fff"
                        >
                          <Text style={{ fontSize: 13 }}>{`${Math.round(percentage)}%`}</Text>
                        </ProgressCircle>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  courseDetails: {
    marginLeft: '5%',
    marginRight: '5%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  parent: {
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  headerPosition: {
    height: 81,
    position: "absolute",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16, // Add some padding for better spacing
    width: "100%", // Use 100% of the parent width
  },
  headPosition: {
    position: "absolute",
    width: "100%",
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
  progressIcon: {
    top: width < 600 ? 95 : 227,
    right: 0,
    position: "absolute",
  },
  box: {
    marginTop: '3%',
    margin: '0 auto',
    width: '100%',
    flex: 1,
    height: '100%',
    alignSelf: 'center',
  },
  excelInAgileTypo: {
    height: 46,
    width: 283,
    color: 'white',
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "900",
    fontSize: 20,
    textAlign: "left",
    position: "absolute",
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    elevation: 2, // This adds a shadow on Android
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
  image1Icon: {
    flex: 1,
    width: '100%',
    margin: '0 auto',
    height: width < 600 ? height / 5 : height / 2.8,
  },
  excelInAgile: {
    top: width < 600 ? 115 : 245,
    left: 7,
  },
  agile: {
    width: "100%", // Use 100% of the parent width
  },
  icons8Arrow241: {
    left: 13,
    width: 26,
    height: 24,
    top: 30,
    position: "absolute",
  },
});

export default MyCourses;