import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import StarRating from "../components/StarRating";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import CourseContext from "../context/Courses/courseContext";
import CartContext from "../context/Cart/cartContext";

const BuyCourse = (props) => {
  const navigation = useNavigation();
  const context = useContext(CourseContext);
  const cartContext = useContext(CartContext);
  const { getSingleCourse, course, user, getUser, getOrderCourseStatus, orderCourseStatus } = context;
  const [singlecourse, setSingleCourse] = useState(null);
  const { addToCart } = cartContext;
  const host = 'http://helloworld-nodejs-4714.azurewebsites.net';
  const [formattedDate, setDate] = useState('')
  const [instructor, setInstructor] = useState('')
  const [cartText, setCartText] = useState('')
  const { course_id, navigate } = props.route.params;

  useEffect(() => {
    getSingleCourse(course_id);
    getOrderCourseStatus(course_id);
  }, [course_id]);

  useEffect(() => {
    if (course) {
      setSingleCourse(course)
      setCartText(orderCourseStatus)
      if(orderCourseStatus == 'paid'){
        setCartText('enrolled')
      }
      const originalTimestamp = course.post_date;
      const dateObject = new Date(originalTimestamp);

      const day = dateObject.getDate().toString().padStart(2, '0');
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObject.getFullYear();

      datee = `${day}/${month}/${year}`;
      setDate(datee);
      getUser(course.author_user_id)
    }
  }, [course, orderCourseStatus]);

  useEffect(() => {
    if (user) {
      setInstructor(user.first_name + ' ' + user.last_name);
    }
  }, [user]);

  const handleAddToCart = () => {
    addToCart(course_id);
    navigation.navigate("BuyCourseCart", { navigate: navigate });
  };
  
  return (
    <View style={styles.container}>
      <Header
        heading="ENROLL NOW!"
        navigate={navigate}
      />
      {singlecourse && instructor && (
        <>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: `${host}/${singlecourse.featured_image}` }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.upperContainer}>
            <View style={[styles.courseContentChild, styles.headerChildPosition]} />
            <Text style={[styles.excelInAgile, styles.headerLayout]}>
              {singlecourse.title}
            </Text>
          </View>
          <View style={[styles.courseDetailsChild, styles.courseLayout1]}>
            <Text style={[styles.courseDetails1, styles.textTypo]}>
              COURSE DETAILS
            </Text>
            <Text style={styles.duration12hInstructor}>
              Duration: {singlecourse.duration}   |   Instructor: {instructor}   |   Released: {formattedDate}
            </Text>
          </View>
          <View style={[styles.textContainer, styles.excel]}>
            <Text style={[styles.learnToExcel, styles.enrollNowTypo]}>
              {singlecourse.content}
            </Text>
          </View>
          <StarRating rating={singlecourse.rating} starSize={25} />
          <View style={styles.cart}>
            <Text style={[styles.text, styles.textTypo]}>${singlecourse.fees}</Text>
            <TouchableOpacity
              style={[
                styles.addLayout,
                { backgroundColor: cartText === 'pending' ? 'grey' : cartText === 'enrolled' ? 'darkgreen' : Color.colorSlateblue },
              ]}
              onPress={cartText === 'ADD TO CART' ? handleAddToCart : null}
              disabled={cartText !== 'ADD TO CART'}
            >
              <Text style={styles.addToCartChild}>{cartText}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  courseLayout1: {
    flex: 0.3,
    height: 38,
    width: '100%',
  },
  textTypo: {
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  courseLayout: {
    flex: 1
  },
  thumbnailLayout: {
    flex: 1,
    height: '100%',
    width: '100%',
    left: 0,
  },
  addLayout: {
    marginRight: '5%',
    width: 120,
    height: 40,
    backgroundColor: Color.colorSlateblue,
  },
  enrollNowClr: {
    color: Color.colorWhite,
    textAlign: "left",
  },
  headerChildPosition: {
    width: '100%',
    left: 0,
    top: 0,
  },
  headerLayout: {
    height: 81,
    position: "absolute",
  },
  enrollNowTypo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  courseDetailsChild: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorGainsboro_200,
    left: 0,
    top: 0,
  },
  duration12hInstructor: {
    fontSize: FontSize.size_4xs,
    fontFamily: FontFamily.interRegular,
    textAlign: "center",
    color: Color.labelColorLightPrimary,
  },
  courseDetails1: {
    top: 3,
    paddingBottom: '2%',
    fontSize: FontSize.size_3xs,
    textAlign: "center",
    color: Color.labelColorLightPrimary,
  },
  courseDetailsItem: {
    left: 196,
  },
  courseDetailsInner: {
    left: 95,
  },
  courseDetails: {
    flex: 1
  },
  thumbnail: {
    flex: 1,
  },
  addToCartChild: {
    top: 11,
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  addToCart1: {
    textAlign: 'left',
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  text: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    marginTop: '3%',
    marginRight: '4%',
    color: Color.labelColorLightPrimary,
    left: 0,
  },
  cart: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    flex: 1,
    marginTop: 30,
  },
  courseContentChild: {
    borderBottomRightRadius: Border.br_xl,
    borderBottomLeftRadius: Border.br_xl,
    height: 43,
    backgroundColor: Color.colorGainsboro_200,
    position: "absolute",
  },
  excelInAgile: {
    top: 6,
    fontSize: FontSize.size_5xl,
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
    color: Color.colorSlateblue,
    width: '100%',
    textAlign: "center",
  },
  learnToExcel: {
    textAlign: "center",
    fontSize: FontSize.size_xs,
    color: Color.labelColorLightPrimary,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  upperContainer: {
    flex: 0.4,
  },
  excel: {
    padding: '4%',
    width: '100%',
    alignSelf: 'center',
  },
  courseContent: {
    width: 369,
    height: 227,
    flex: 1,
    left: 0,
    position: "absolute",
  },
  starsIcon: {
    top: 547,
    left: 123,
    width: 107,
    height: 23,
    position: "absolute",
  },
  enrollNow: {
    top: 30,
    left: 105,
    fontSize: FontSize.size_xl,
    width: 185,
    height: 19,
    color: Color.colorWhite,
    textAlign: "left",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  buyCourse: {
    flexDirection: 'row',
    backgroundColor: Color.colorWhite,
  },
});

export default BuyCourse;
