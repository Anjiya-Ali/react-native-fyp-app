import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontSize, FontFamily, Color, Padding, Border } from "../styles/GlobalStyles";

const Notifications = () => {
  return (
    <View style={[styles.view, styles.viewFlexBox]}>
      <View style={[styles.frame, styles.frameFlexBox1]}>
        <View style={[styles.frame1, styles.frameFlexBox1]}>
          <View style={[styles.frame2, styles.frameFlexBox]}>
            <View style={[styles.frame3, styles.frameFlexBox]}>
              <Image
                style={styles.icon}
                resizeMode="cover"
                source={require("../assets/active.png")}
              />
              <Text style={styles.communities}>Communities</Text>
            </View>
            <Image
              style={styles.picture3333Icon}
              resizeMode="cover"
              source={require("../assets/active.png")}
            />
          </View>
          <View style={[styles.frame4, styles.frameFlexBox]}>
            <Text style={styles.search}>Search</Text>
            <Image
              style={[styles.ask1Icon, styles.viewFlexBox]}
              resizeMode="cover"
              source={require("../assets/active.png")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewFlexBox: {
    overflow: "hidden",
    flex: 1,
  },
  frameFlexBox1: {
    alignItems: "center",
    overflow: "hidden",
  },
  frameFlexBox: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    width: 25,
    height: 25,
  },
  communities: {
    fontSize: FontSize.size_11xl,
    fontWeight: "800",
    fontFamily: FontFamily.interExtraBold,
    color: Color.colorGainsboro_100,
    marginLeft: 27,
    textAlign: "left",
  },
  frame3: {
    height: 36,
    flex: 1,
  },
  picture3333Icon: {
    width: 30,
    marginLeft: 55,
    height: 30,
  },
  frame2: {
    alignSelf: "stretch",
  },
  search: {
    fontSize: 20,
    fontFamily: FontFamily.interRegular,
    color: Color.colorSlateblue,
    textAlign: "left",
    flex: 1,
  },
  ask1Icon: {
    maxWidth: "100%",
    marginLeft: 158,
    height: 30,
  },
  frame4: {
    borderRadius: 20,
    backgroundColor: Color.colorGainsboro_200,
    paddingHorizontal: Padding.p_lg,
    paddingVertical: 7,
    marginTop: 15,
    alignSelf: "stretch",
  },
  frame1: {
    borderRadius: Border.br_21xl,
    backgroundColor: Color.colorSlateblue,
    justifyContent: "flex-end",
    paddingLeft: 15,
    paddingTop: Padding.p_xl,
    paddingRight: Padding.p_lg,
    paddingBottom: Padding.p_xl,
    alignSelf: "stretch",
  },
  frame: {
    position: "absolute",
    top: -594,
    left: -4,
    width: 370,
  },
  view: {
    backgroundColor: Color.colorWhite,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    width: "100%",
    height: 640,
  },
});

export default Notifications;
