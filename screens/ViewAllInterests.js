import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, Border } from "../GlobalStyles";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const ViewAllInterests = ({ route }) => {
  const { additionalData, worth } = route.params;

  const navigation = useNavigation();
  const flexD = "column";

  return (
    <ScrollView style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}>
      <View style={[styles.headerPosition, { position: "relative" }]}>
        <View style={[styles.headerChild, { flex: 1, width: windowWidth }]} />
        <TouchableOpacity
          style={[styles.icons8Arrow241, { left: windowWidth * 0.035 }]}
          onPress={() => navigation.navigate("StudentProfilePage")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/icons8arrow24-1.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.sectionContainer}>
        {worth && (
          <View style={styles.sectionIconsContainer}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.sectionIconsContainer}>
            <TouchableOpacity onPress={() =>
                  navigation.navigate("EditInterestScreen", {
                    additionalData: additionalData,
                  })}>
              <Image
                style={styles.icon}
                resizeMode="cover"
                source={require("../assets/icons8pencil30-2.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("AddLanguageScreen")}>
              <Image
                style={styles.icon}
                resizeMode="cover"
                source={require("../assets/icons8plus30-1.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        )}
        {additionalData.map((interest, index) => (
          <View key={index}>
            <View style={styles.languageItem}>
              <Text style={styles.languageName}>{interest.title}</Text>
              <Text style={styles.educationData}>{interest.description}</Text>
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    educationData: {
        fontSize: FontSize.size_sm,
        color: "black",
      },
  icon: {
    width: 25,
    height: 25,
  },
  sectionIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  languageName: {
    fontWeight: "700",
    color: "black",
    fontSize: FontSize.size_lg,
  },
  languageLevel: {
    fontSize: FontSize.size_sm,
    color: Color.colorSlateblue,
  },
  languageItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingLeft: 5
  },
  separator: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 5,
  },
  sectionTitle: {
    color: "black",
    fontSize: FontSize.size_2xl,
    paddingBottom: 10,
    paddingLeft: 5,
    fontWeight: "700",
  },
  sectionContainer: {
    padding: 5,
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  headerPosition: {
    height: 81,
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  headerChild: {
    borderBottomRightRadius: Border.br_11xl,
    borderBottomLeftRadius: Border.br_11xl,
    backgroundColor: Color.colorSlateblue,
  },
  excelInAgile: {
    top: width < 600 ? 115 : 245,
    left: 7,
  },
  agile: {
    width: "100%",
  },
  icons8Arrow241: {
    left: 13,
    width: 26,
    height: 24,
    top: 30,
    position: "absolute",
  },
});

export default ViewAllInterests;