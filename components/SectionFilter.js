import * as React from "react";
import { StyleSheet, View, Image, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const SectionFilter = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.rectangleParent, styles.groupChildLayout]}>
      <View style={[styles.groupChild, styles.groupChildPosition]} />
      <Image
        style={[styles.icons8Delete243, styles.icons8Layout]}
        resizeMode="cover"
        source={require("../assets/icons8delete24-3.png")}
      />
      <Image
        style={[styles.icons8Delete241, styles.icons8Layout]}
        resizeMode="cover"
        source={require("../assets/icons8delete24-3.png")}
      />
      <View style={styles.icons8Pencil302Parent}>
        <Image
          style={[styles.icons8Pencil302, styles.icons8Layout]}
          resizeMode="cover"
          source={require("../assets/icons8pencil30-2.png")}
        />
        <View style={[styles.icons8Pencil302Wrapper, styles.icons8Layout]}>
          <Image
            style={[styles.icons8Pencil302, styles.icons8Layout]}
            resizeMode="cover"
            source={require("../assets/icons8pencil30-2.png")}
          />
        </View>
      </View>
      <Pressable
        style={[styles.icons8Pencil302Container, styles.icons8Layout]}
        onPress={() => navigation.navigate("EditEducation2")}
      >
        <Image
          style={[styles.icons8Pencil302, styles.icons8Layout]}
          resizeMode="cover"
          source={require("../assets/icons8pencil30-2.png")}
        />
      </Pressable>
      <Text
        style={[
          styles.nationalUniversityOfContainer,
          styles.agaContainerPosition,
        ]}
      >
        <Text
          style={styles.nationalUniversityOf}
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
          style={styles.nationalUniversityOf}
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
        <Text style={styles.nationalUniversityOf}>{`Aga Khan School, Garden
`}</Text>
        <Text
          style={styles.bachelorsDegreeComputer}
        >{`Matriculation, Pre Medical
Aug 2016 - May 2018
Grade: A+`}</Text>
      </Text>
      <View style={[styles.groupItem, styles.groupLayout]} />
      <View style={[styles.groupInner, styles.groupLayout]} />
      <Image
        style={[styles.icons8Delete242, styles.icons8Layout]}
        resizeMode="cover"
        source={require("../assets/icons8delete24-3.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupChildLayout: {
    height: 239,
    width: 360,
    position: "absolute",
  },
  groupChildPosition: {
    top: 0,
    left: 0,
  },
  icons8Layout: {
    height: 15,
    width: 15,
    position: "absolute",
  },
  agaContainerPosition: {
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    left: 12,
    position: "absolute",
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
    height: 239,
    width: 360,
    position: "absolute",
  },
  icons8Delete243: {
    top: 194,
    left: 327,
    height: 15,
  },
  icons8Delete241: {
    top: 41,
    left: 327,
    height: 15,
  },
  icons8Pencil302: {
    top: 0,
    left: 0,
  },
  icons8Pencil302Wrapper: {
    top: 77,
    left: 0,
  },
  icons8Pencil302Parent: {
    height: 92,
    top: 98,
    width: 15,
    left: 327,
    position: "absolute",
  },
  icons8Pencil302Container: {
    top: 21,
    left: 327,
    height: 15,
  },
  nationalUniversityOf: {
    fontSize: FontSize.size_smi,
    fontWeight: "700",
    fontFamily: FontFamily.calibri,
  },
  bachelorsDegreeComputer: {
    fontSize: FontSize.size_2xs,
    fontWeight: "300",
    fontFamily: FontFamily.calibri,
  },
  nationalUniversityOfContainer: {
    width: 311,
    top: 21,
  },
  agaKhanHigherContainer: {
    width: 302,
    top: 98,
  },
  agaKhanSchoolContainer: {
    top: 175,
    width: 289,
  },
  groupItem: {
    top: 85,
  },
  groupInner: {
    top: 164,
  },
  icons8Delete242: {
    top: 117,
    left: 327,
    height: 15,
  },
  rectangleParent: {
    top: 88,
    left: 0,
  },
});

export default SectionFilter;
