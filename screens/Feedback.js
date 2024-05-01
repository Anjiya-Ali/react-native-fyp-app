import * as React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SuccessCompletionForm from "../components/SuccessCompletionForm";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const Feedback = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.feedback}>
      <View style={[styles.header, styles.headerLayout]}>
        <View style={[styles.headerChild, styles.childPosition]} />
        <TouchableOpacity
          style={styles.icons8Arrow241}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/icons8arrow24-1.png")}
          />
        </TouchableOpacity>
        <Text style={[styles.quiz, styles.quizTypo]}>
          Claim Your Certificate!
        </Text>
      </View>
      <SuccessCompletionForm />
      <View style={[styles.next, styles.nextLayout]}>
        <View style={[styles.nextChild, styles.nextLayout]} />
        <Text
          style={[styles.downloadCerificate, styles.downloadCerificateTypo]}
        >
          Download Cerificate
        </Text>
      </View>
      <View style={[styles.feedback1, styles.feedbackLayout]}>
        <View style={[styles.feedbackChild, styles.feedbackLayout]} />
        <Image
          style={styles.starsIcon}
          resizeMode="cover"
          source={require("../assets/stars1.png")}
        />
        <View style={[styles.rectangleParent, styles.groupChildLayout]}>
          <TouchableOpacity
            style={[styles.groupChild, styles.groupChildLayout]}
            onPress={() => navigation.navigate("Certificate")}
          />
          <Text style={[styles.done, styles.quizTypo]}>Done</Text>
        </View>
        <Text
          style={[
            styles.pleaseRateThisContainer,
            styles.downloadCerificateTypo,
          ]}
        >
          <Text style={styles.quizTypo}>{`Please rate this course `}</Text>
          <Text>
            <Text style={[styles.your, styles.quizTypo]}>your</Text>
            <Text style={styles.quizTypo}> opinion matters!!</Text>
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerLayout: {
    width: 360,
    position: "absolute",
  },
  childPosition: {
    backgroundColor: Color.colorSlateblue,
    left: 0,
    top: 0,
  },
  quizTypo: {
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
  },
  nextLayout: {
    height: 28,
    width: 223,
    position: "absolute",
  },
  downloadCerificateTypo: {
    fontSize: FontSize.bodyBold_size,
    position: "absolute",
  },
  feedbackLayout: {
    height: 200,
    width: 329,
    position: "absolute",
  },
  groupChildLayout: {
    height: 32,
    width: 98,
    position: "absolute",
  },
  headerChild: {
    borderBottomRightRadius: Border.br_11xl,
    borderBottomLeftRadius: Border.br_11xl,
    height: 81,
    width: 360,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  icons8Arrow241: {
    left: 16,
    width: 26,
    height: 24,
    top: 28,
    position: "absolute",
  },
  quiz: {
    left: 31,
    width: 292,
    height: 114,
    textAlign: "center",
    color: Color.colorWhite,
    fontSize: FontSize.size_lg,
    fontWeight: "500",
    position: "absolute",
    top: 28,
  },
  header: {
    height: 142,
    left: 0,
    top: 0,
  },
  nextChild: {
    backgroundColor: Color.colorSlateblue,
    left: 0,
    top: 0,
  },
  downloadCerificate: {
    top: 3,
    left: 33,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    textAlign: "left",
    color: Color.colorWhite,
  },
  next: {
    top: 560,
    left: 68,
  },
  feedbackChild: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorGainsboro_200,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: Color.labelColorLightPrimary,
    borderWidth: 1,
    left: 0,
    top: 0,
  },
  starsIcon: {
    top: 88,
    left: 90,
    width: 135,
    height: 29,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorSlateblue,
    left: 0,
    top: 0,
  },
  done: {
    top: 4,
    left: 21,
    width: 61,
    height: 21,
    textAlign: "center",
    color: Color.colorWhite,
    fontSize: FontSize.size_lg,
    fontWeight: "500",
    position: "absolute",
  },
  rectangleParent: {
    top: 155,
    left: 111,
  },
  your: {
    fontStyle: "italic",
  },
  pleaseRateThisContainer: {
    top: 23,
    left: 14,
    color: Color.labelColorLightPrimary,
    width: 293,
    height: 43,
    textAlign: "center",
  },
  feedback1: {
    top: 185,
    left: 15,
  },
  feedback: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 651,
    overflow: "hidden",
    width: "100%",
  },
});

export default Feedback;
