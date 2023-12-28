import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const SuccessCompletionForm = () => {
  return (
    <View style={styles.completion}>
      <View style={[styles.completionChild, styles.completionChildPosition]} />
      <Text style={[styles.congratulations, styles.textFlexBox]}>
        CONGRATULATIONS
      </Text>
      <Text style={[styles.youHaveSuccessfully, styles.textFlexBox]}>
        YOU HAVE SUCCESSFULLY COMPLETED YOUR TEST
      </Text>
      <Text style={[styles.text, styles.textFlexBox]}>15/20</Text>
      <Image
        style={[
          styles.blueProfessionalCertificate,
          styles.completionChildPosition,
        ]}
        resizeMode="cover"
        source={require("../assets/blue--professional-certificate-of-completion-1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  completionChildPosition: {
    left: 0,
    width: 329,
    position: "absolute",
  },
  textFlexBox: {
    textAlign: "center",
    position: "absolute",
  },
  completionChild: {
    top: 0,
    backgroundColor: Color.colorGainsboro_200,
    height: 146,
  },
  congratulations: {
    top: 20,
    left: 85,
    fontSize: FontSize.size_sm,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorDimgray_100,
  },
  youHaveSuccessfully: {
    top: 50,
    left: 45,
    fontSize: FontSize.bodyBold_size,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.labelColorLightPrimary,
    width: 241,
  },
  text: {
    top: 98,
    left: 117,
    fontSize: FontSize.size_11xl,
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
    color: Color.colorSlateblue,
  },
  blueProfessionalCertificate: {
    top: 167,
    height: 246,
  },
  completion: {
    top: 114,
    left: 14,
    height: 413,
    width: 329,
    position: "absolute",
  },
});

export default SuccessCompletionForm;
