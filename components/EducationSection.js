import * as React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const EducationSection = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.rectangleParent}>
      <View style={styles.groupChild} />
      <Text style={[styles.education, styles.agaContainerPosition]}>
        Education
      </Text>
      <View style={styles.icons8Plus301Parent}>
        <Pressable
          style={[styles.icons8Plus301, styles.icons8Layout]}
          onPress={() => navigation.navigate("AddEducation")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/icons8plus30-1.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.icons8Pencil302, styles.icons8Layout]}
          onPress={() => navigation.navigate("EditEducation")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/icons8pencil30-2.png")}
          />
        </Pressable>
      </View>
      <Text
        style={[
          styles.nationalUniversityOfContainer,
          styles.agaContainerPosition,
        ]}
      >
        <Text
          style={[styles.nationalUniversityOf, styles.educationTypo]}
        >{`National University of Computer and Emerging Sciences
`}</Text>
        <Text
          style={styles.bachelorsDegreeComputer}
        >{`Bachelor’s degree, Computer Science
2020 - 2024
Grade: CGPA: 3.9`}</Text>
      </Text>
      <Text
        style={[styles.agaKhanHigherContainer, styles.agaContainerPosition]}
      >
        <Text
          style={[styles.nationalUniversityOf, styles.educationTypo]}
        >{`Aga Khan Higher Secondary School, Karachi
`}</Text>
        <Text
          style={styles.bachelorsDegreeComputer}
        >{`Intermediate, Computer Science
Aug 2018 - May 2020
Grade: A+`}</Text>
      </Text>
      <Text
        style={[styles.agaKhanSchoolContainer, styles.agaContainerPosition]}
      >
        <Text
          style={[styles.nationalUniversityOf, styles.educationTypo]}
        >{`Aga Khan School, Garden
`}</Text>
        <Text
          style={styles.bachelorsDegreeComputer}
        >{`Matriculation, Pre Medical
Aug 2016 - May 2018
Grade: A+`}</Text>
      </Text>
      <View style={[styles.groupItem, styles.groupLayout]} />
      <View style={[styles.groupInner, styles.groupLayout]} />
    </View>
  );
};

const styles = StyleSheet.create({
  agaContainerPosition: {
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    left: 12,
    position: "absolute",
  },
  icons8Layout: {
    width: 15,
    height: 15,
    top: 0,
    position: "absolute",
  },
  educationTypo: {
    fontWeight: "700",
    fontFamily: FontFamily.calibri,
  },
  groupLayout: {
    height: 1,
    width: 329,
    borderTopWidth: 1,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    left: 12,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorWhite,
    top: 0,
    height: 258,
    width: 360,
    left: 0,
    position: "absolute",
  },
  education: {
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.calibri,
    fontWeight: "700",
    top: 13,
    color: Color.labelColorLightPrimary,
    left: 12,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
  icons8Plus301: {
    left: 0,
    width: 15,
  },
  icons8Pencil302: {
    left: 19,
  },
  icons8Plus301Parent: {
    left: 308,
    width: 34,
    height: 15,
    top: 13,
    position: "absolute",
  },
  nationalUniversityOf: {
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.calibri,
  },
  bachelorsDegreeComputer: {
    fontSize: FontSize.size_2xs,
    fontWeight: "300",
    fontFamily: FontFamily.calibri,
  },
  nationalUniversityOfContainer: {
    top: 40,
    width: 311,
  },
  agaKhanHigherContainer: {
    top: 117,
    width: 302,
  },
  agaKhanSchoolContainer: {
    top: 194,
    width: 289,
  },
  groupItem: {
    top: 104,
  },
  groupInner: {
    top: 183,
  },
  rectangleParent: {
    top: 260,
    height: 258,
    width: 360,
    position: "absolute",
    left: 0,
  },
});

export default EducationSection;
