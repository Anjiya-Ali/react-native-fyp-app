import React from "react";
import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const Section1Screen = () => {
    const flexD = "column";
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: flexD, backgroundColor: Color.colorGainsboro_200, justifyContent: "center", marginBottom: '30%' }}>
        <Image
          source={require("../assets/image1.png")}
          style={styles.imageStyle}
          
        />
        <Text style={styles.heading}>COURSE HUB</Text>
        <Text style={styles.description}>
         Streamlined platform for teachers to upload courses and students to enroll, fostering accessible education.
        </Text>
        <View style={styles.ellipsesContainer}>
          <Image
            source={require("../assets/eclipse1.png")}
            style={styles.ellipseImage}
          />
          <Image
            source={require("../assets/eclipse2.png")}
            style={styles.ellipseImage}
          />
          <Image
            source={require("../assets/eclipse2.png")}
            style={styles.ellipseImage}
          />
        </View>
      </View>
      <View style={styles.headerPosition1}>
        <View style={styles.headerChild1}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('Register1')}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.loginLink}> Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    ellipsesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
      },
      ellipseImage: {
        width: 13,
        height: 13,
        marginHorizontal: 8,
      },
    imageStyle: {
        width: "100%",
        height: 300,
        borderRadius: 10,
      },
      heading: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "center",
        color: "black",
        fontFamily: FontFamily.javaneseText,
      },
      description: {
        fontSize: 15,
        margin: 8,
        textAlign: 'center',
        color: 'black',
        fontFamily: FontFamily.javaneseText,
      },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#d9d9d9",
  },
  scrollViewContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#d9d9d9",
  },
  headerPosition: {
    height: 100,
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerPosition1: {
    height: 130,
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerChild1: {
    borderTopRightRadius: Border.br_11xl,
    borderTopLeftRadius: Border.br_11xl,
    backgroundColor: Color.colorSlateblue,
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  getStartedButton: {
    backgroundColor: Color.colorGainsboro_100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: Border.br_31xl,
    marginBottom: 10,
    width: "80%",
  },
  getStartedButtonText: {
    fontSize: FontSize.size_base,
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.jaldiRegular,
    textAlign: "center"
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.jaldiRegular,
    marginRight: 5,  // Add some space between the text and link
    color: Color.colorGainsboro_100,
  },
  loginLink: {
    color: "#f8ee08",
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.jaldiRegular,
  },
});

export default Section1Screen;