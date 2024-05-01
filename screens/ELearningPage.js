import * as React from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";

const ELearningPage = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.eLearningPage, styles.learningShadowBox]}>
       <View style={[styles.inner]}>
           <View>
               <TouchableOpacity
                  style={[styles.picture226]}
                  onPress={() => navigation.navigate("CoursesE1")}
                >
                  <Image
                    style={styles.icon}
                    resizeMode="cover"
                    source={require("../assets/picture22-6.png")}
                  />
              </TouchableOpacity>
          </View>
          <View>
            <Text style={[styles.courses, styles.coursesTypo]}>Courses</Text>
          </View>
      </View>

      <View style={[styles.innerr]}>
          <View>
              <TouchableOpacity
                style={[
                  styles.b78cf961d8624e3f25c98f65bf620,
                ]}
                onPress={() => navigation.navigate("CommunitiesE2")}
              >
                <Image
                  style={styles.icon}
                  resizeMode="cover"
                  source={require("../assets/800b78cf961d8624e3f25c98f65bf620-1.png")}
                />
              </TouchableOpacity>
              <Text style={[styles.coursesTypo]}>Communities</Text>
          </View>

          <View>
            <TouchableOpacity
              style={[
                styles.b78cf961d8624e3f25c98f65bf620,
                styles.teachers,
              ]}
                onPress={() => navigation.navigate("TeachersE1")}
            >
              <Image
                style={styles.icon}
                resizeMode="cover"
                source={require("../assets/professorteachingintheclassroomconceptfreevector-1.png")}
              />
            </TouchableOpacity>
            <Text style={[styles.teachers,styles.coursesTypo]}>Teachers</Text>
          </View>
      </View>

      <View style={[styles.inner]}>
          <Image
            style={styles.istockphoto11897697461024x10Icon}
            resizeMode="cover"
            source={require("../assets/istockphoto11897697461024x1024--1-removebgpreview-1.png")}
          />
          <View style={styles.container}>
            <Text style={styles.text}>From where do you want to start?</Text>
          </View>
      </View>

      <TouchableOpacity
        style={[styles.icons8Back481, styles.picture226Position]}
        onPress={() => navigation.navigate("HomePage2")}
      >
        <Image
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/icons8back48-1.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
 container: {
    marginTop:'-10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: Border.br_21xl,
    borderTopRightRadius: Border.br_21xl,
    backgroundColor: Color.colorSlateblue,
    width: '100%',
    height: 103,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inner: {
    flexDirection: 'column',
    alignItems: 'center',
  },
   innerr: {
     flexDirection: 'row',
     justifyContent: 'space-between',
  },
  learningShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  picture226Position: {
    top: 0,
    position: "absolute",
  },
  coursesTypo: {
    color: Color.colorSlateblue,
    fontSize: FontSize.size_xl,
    textAlign: "center",
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
  },
  icons8Back481: {
    left: 8,
    width: 35,
    height: 35,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  b78cf961d8624e3f25c98f65bf620: {
    width: 126,
    height: 132,
  },
  teacher0041: {
    width: 147,
    height: 153,
  },
  istockphoto11897697461024x10Icon: {
    justifyContent: 'center',
    width: 258,
    height: 408,
  },
  eLearningPageItem: {
    borderTopLeftRadius: Border.br_21xl,
    borderTopRightRadius: Border.br_21xl,
    backgroundColor: Color.colorSlateblue,
    width: '100%',
    height: 103,
  },
  picture226: {
    width: 200,
    height: 105,
  },
  eLearningPage: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    flexDirection: 'column',
    height: 640,
    overflow: "hidden",
    width: "100%",
  },
});

export default ELearningPage;