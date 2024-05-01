import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import CourseContext from "../context/Courses/courseContext";
import CartContext from "../context/Cart/cartContext";

const BuyCourseCart = (props) => {
  const navigation = useNavigation();
  const cartContext = useContext(CartContext);
  const context = useContext(CourseContext);
  const { cart, addToCart, removeFromCart } = cartContext;
  const { getSingleCourse, course, user, getUser } = context;
  const host = 'http://192.168.0.147:3000';
  const [courseDetails, setCourseDetails] = useState(null);
  const [total, setTotal] = useState(0);
  const [instructors, setInstructors] = useState([]);
  const { navigate } = props.route.params || { navigate: 'HomePage1' };

  useEffect(() => {
    const fetchCourses = async () => {
      const courseDetailsPromises = cart.map(async (courseId) => {
        const courseee = await getSingleCourse(courseId);
        return courseee;
      });
  
      try {
        const courseDetailsData = await Promise.all(courseDetailsPromises);
        setCourseDetails(courseDetailsData);
  
        const newInstructors = [];
        let newTotal = 0;
  
        await Promise.all(courseDetailsData.map(async (course) => {
          await getUser(course.author_user_id);
          newInstructors.push(user.first_name + ' ' + user.last_name);
          newTotal += course.fees;
        }));

        setInstructors(newInstructors);
        setTotal(newTotal);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };
  
    if (cart.length > 0) {
      fetchCourses();
    } else {
      setCourseDetails(null);
    }
  }, [cart]);
  

  const handleRemoveFromCart = (courseId) => {
    removeFromCart(courseId);
  };

  return (
    <View style={[styles.buyCourseCart, styles.buyChildShadowBox1]}>
      <TouchableOpacity
        style={[styles.icons8Back481, styles.icons8Back481Position]}
        onPress={() => navigation.navigate(navigate)}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/icons8back48-1.png")}
        />
      </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.rectangleView}>
            <Image
              style={styles.topLeftLogo}
              source={require("../assets/picture4-2.png")}
            />
            <Image
              style={styles.bottomRightLogo}
              source={require("../assets/picture4-2.png")}
            />
            {courseDetails && total != 0 && (
              <View>
                <Text style={styles.yourTotalIs}>Your Total is :</Text>
                <Text style={[styles.text, styles.textText]}>{total}$</Text>
              </View>
            )}
            {(!cart || Array.isArray(cart) && cart.length === 0) && !courseDetails && (
              <View>
                <Text style={styles.emptycart}>YOUR CART IS EMPTY!!</Text>
                <Text style={styles.emptyottom}>Add Courses in the cart from ELearning Page :)</Text>
              </View>
            )}
          </View>
          {cart && courseDetails && instructors.length !== 0 && courseDetails.map((course, index) => (
          <View key={index} style={styles.div2}>
            <View style={styles.div4}>
              <View>
                <Image
                  style={styles.iconLayout}
                  resizeMode="cover"
                  source={{ uri: `${host}/${course.featured_image}` }}
                />
              </View>
              <View style={styles.buyChildShadowBox}>
                <View style={styles.cancel}>
                  <Text></Text>
                  <Text style={[styles.excelInAgile, styles.checkOutTypo]}>
                    {course.title}
                  </Text>
                  <TouchableOpacity onPress={() => handleRemoveFromCart(course._id)}>
                    <Text style={styles.cross}>X</Text>
                  </TouchableOpacity>                
                </View>
                <Text style={styles.muhummadTypo}>{instructors[index]}</Text>
                <View style={styles.div3}>
                  <View style={styles.div3}>
                    <Text style={[styles.text1, styles.textTypo]}>
                      {Math.round(course.rating)}
                    </Text>
                    <Image
                      style={styles.starIcon}
                      resizeMode="cover"
                      source={require('../assets/star-1.png')}
                    />
                  </View>
                  <Text style={[styles.text4, styles.textTypo]}>
                    {course.fees}$
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
        {courseDetails && (
          <View style={styles.checkout}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart3")}
              style={[styles.addLayout]}
            >
              <Text style={[styles.checkoutchild]}>
                CHECK OUT
              </Text>
            </TouchableOpacity>
          </View>
        )}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  div2: {
    width: '100%',
    flex: 1
  },
  cancel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutchild: {
    top: 11,
    color: 'white',
    textAlign: 'center'
  },
  cross: {
    marginRight: '2%',
    color: 'white',
    fontWeight: 'bold'
  },
  checkout: {
    marginTop: '20%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    flex: 1,
  },
  addLayout: {
    marginRight: '5%',
    width: 120,
    height: 40,
    backgroundColor: Color.colorSlateblue,
  },
  div4: {
    flexDirection: 'row', // Set flexDirection to 'row' for horizontal layout
    alignItems: 'center',
    width: '100%',
    marginTop: '10%',
    paddingTop: '8%',
  },
  div3: {
    flex: 1,
    flexDirection: 'row'
  },
  topLeftLogo: {
    position: 'absolute',
    top: -20,
    left: -10,
    width: 50, 
    height: 50, 
    resizeMode: 'contain',
  },
  bottomRightLogo: {
    position: 'absolute',
    bottom: -20,
    right: -10,
    width: 50, 
    height: 50, 
    resizeMode: 'contain',
  },
  buyChildShadowBox1: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  buyChildBg: {
    backgroundColor: Color.colorSlateblue,
    borderRadius: Border.br_21xl,
  },
  container: {
    flex: 1,
  },
  icons8Back481Position: {
    position: "absolute",
    left: 0,
  },
  buyChildShadowBox: {
    flex: 1,
    height: 59,
    width: '100%',
    marginRight: '2%',
    borderWidth: 1,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
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
  textText: {
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
  },
  buyChildLayout4: {
    height: 74,
    width: 96,
    backgroundColor: Color.colorGainsboro_100,
    left: 12,
    borderWidth: 1,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
    position: "absolute",
  },
  checkOutTypo: {
    color: Color.colorGainsboro_100,
    textAlign: "center",
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
  },
  muhummadTypo: {
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_4xs,
    color: Color.colorGainsboro_100,
    textAlign: "center",
  },
  buyChildLayout3: {
    height: 23,
    width: 23,
  },
  textTypo: {
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
  },
  buyChildLayout2: {
    height: 30,
    width: 26,
    left: 331,
    position: "absolute",
  },
  iconLayout1: {
    height: 56,
    width: 50,
  },
  iconLayout: {
    height: 60,
    width: 70,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: '2%',
    borderRadius: 10,
  },
  buyChildLayout1: {
    height: 9,
    width: 6,
    left: 340,
    position: "absolute",
  },
  buyChildLayout: {
    height: 8,
    width: 7,
    left: 340,
    position: "absolute",
  },
  buyCourseCartChild: {
    flex: 1,
    width: 360,
    height: 150,
    position: 'absolute',
    left: 0,
  },
  buyCourseCartItem: {
    borderRadius: Border.br_11xl,
    width: 384,
    height: 437,
    left: 0,
  },
  rectangleView: {
    flex: 0.2,
    alignSelf: 'center',
    paddingTop: '0%',
    marginTop: '10%',
    backgroundColor: Color.colorGainsboro_200,
    width: 259,
    padding: '6%',
    borderWidth: 1,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  text: {
    fontSize: FontSize.size_21xl,
    textAlign: "center",
    color: Color.colorSlateblue,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
  },
  yourTotalIs: {
    fontSize: FontSize.size_sm,
    textAlign: "center",
    color: Color.colorSlateblue,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
  },
  emptyottom: {
    marginTop: '10%',
    fontSize: FontSize.size_sm,
    textAlign: "center",
    color: Color.colorSlateblue,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
  },
  emptycart: {
    fontSize: 40,
    textAlign: "center",
    color: Color.colorSlateblue,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
  },
  buyCourseCartChild1: {
    top: 258,
  },
  excelInAgile: {
    color: Color.colorGainsboro_100,
    fontSize: FontSize.size_sm,
  },
  text1: {
    marginLeft: '3%',
    marginTop: '1%',
    color: Color.colorWhite,
    fontSize: FontSize.size_4xs,
  },
  buyCourseCartChild2: {
    top: 359,
  },
  buyCourseCartChild3: {
    top: 352,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  probabilisticModel: {
    top: 365,
    left: 119,
    color: Color.colorGainsboro_100,
    fontSize: FontSize.size_sm,
  },
  muhummadRafi1: {
    top: 384,
  },
  buyCourseCartChild4: {
    top: 399,
  },
  text2: {
    top: 402,
    left: 137,
    color: Color.colorWhite,
    fontSize: FontSize.size_4xs,
  },
  buyCourseCartChild5: {
    top: 460,
  },
  buyCourseCartChild6: {
    top: 453,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  softwareEngineering: {
    top: 466,
    left: 119,
    color: Color.colorGainsboro_100,
    fontSize: FontSize.size_sm,
  },
  romashaKhursheed: {
    top: 485,
  },
  buyCourseCartChild7: {
    top: 500,
  },
  text3: {
    top: 503,
    left: 137,
    color: Color.colorWhite,
    fontSize: FontSize.size_4xs,
  },
  text4: {
    marginRight: '2%',
    fontSize: FontSize.size_1xl,
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
  },
  text5: {
    top: 388,
    left: 284,
    fontSize: FontSize.size_6xl,
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
  },
  text6: {
    top: 489,
    left: 295,
    fontSize: FontSize.size_6xl,
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
  },
  buyCourseCartChild8: {
    top: 554,
    left: 65,
    width: 230,
    height: 51,
  },
  yourCart: {
    fontSize: FontSize.bodyBold_size,
  },
  items: {
    fontSize: FontSize.size_6xl,
  },
  yourCartHasContainer: {
    top: 183,
    left: 69,
  },
  ellipseIcon: {
    top: 257,
  },
  buyCourseCartChild9: {
    top: 352,
  },
  buyCourseCartChild10: {
    top: 449,
  },
  picture42Icon: {
    top: 15,
    left: 30,
  },
  picture43Icon: {
    top: 111,
    left: 285,
  },
  picture51: {
    top: 345,
    height: 91,
    width: 100,
    left: 12,
    position: "absolute",
  },
  picture222Icon: {
    top: 461,
    left: 12,
    height: 53,
  },
  lineIcon: {
    top: 264,
  },
  buyCourseCartChild11: {
    top: 263,
  },
  buyCourseCartChild12: {
    top: 456,
  },
  buyCourseCartChild13: {
    top: 455,
  },
  buyCourseCartChild14: {
    top: 359,
  },
  buyCourseCartChild15: {
    top: 358,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  icons8Back481: {
    top: 0,
    width: 35,
    height: 35,
    left: 0,
  },
  buyCourseCart: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
  },
});

export default BuyCourseCart;