import * as React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const SectionPosts = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.groupParent, styles.groupParentLayout]}>
      <View style={[styles.rectangleParent, styles.groupParentLayout]}>
        <View style={[styles.groupChild, styles.groupParentLayout]} />
        <Image
          style={styles.inshasamnani2Icon}
          resizeMode="cover"
          source={require("../assets/inshasamnani-21.png")}
        />
        <Text style={styles.posts}>Posts</Text>
      </View>
      <View style={[styles.groupWrapper, styles.groupLayout]}>
        <View style={[styles.rectangleGroup, styles.groupLayout]}>
          <View style={[styles.groupItem, styles.groupLayout]} />
          <Text style={[styles.unveilingAchievementsIgniti, styles.postTypo]}>
            Unveiling Achievements, Igniting Ideas, and Welcoming Your Topic
            Requests!
          </Text>
        </View>
      </View>
      <Pressable
        style={[styles.postParent, styles.postLayout]}
        onPress={() => navigation.navigate("CreatePost")}
      >
        <Text style={[styles.post, styles.postTypo]}>Post</Text>
        <Image
          style={[styles.icons8Post501, styles.postLayout]}
          resizeMode="cover"
          source={require("../assets/icons8post50-1.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.topicRequestParent, styles.topicLayout]}
        onPress={() => navigation.navigate("CreateTopicRequest")}
      >
        <Text style={[styles.topicRequest, styles.postTypo]}>
          Topic Request
        </Text>
        <Image
          style={[styles.icons8Topic501, styles.topicLayout]}
          resizeMode="cover"
          source={require("../assets/icons8topic50-1.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  groupParentLayout: {
    height: 60,
    width: 360,
    left: 0,
    position: "absolute",
  },
  groupLayout: {
    height: 32,
    width: 272,
    position: "absolute",
  },
  postTypo: {
    fontSize: FontSize.size_2xs,
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.calibri,
    position: "absolute",
  },
  postLayout: {
    height: 11,
    position: "absolute",
  },
  topicLayout: {
    height: 12,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.colorWhite,
    top: 0,
  },
  inshasamnani2Icon: {
    top: 20,
    left: 13,
    borderRadius: Border.br_127xl,
    width: 26,
    height: 26,
    position: "absolute",
  },
  posts: {
    left: 11,
    fontSize: FontSize.size_smi,
    fontWeight: "700",
    width: 33,
    height: 19,
    textAlign: "left",
    color: Color.labelColorLightPrimary,
    fontFamily: FontFamily.calibri,
    top: 4,
    position: "absolute",
  },
  rectangleParent: {
    top: 0,
  },
  groupItem: {
    borderRadius: Border.br_83xl,
    backgroundColor: Color.colorGainsboro_100,
    top: 0,
    left: 0,
  },
  unveilingAchievementsIgniti: {
    left: 9,
    width: 253,
    height: 25,
    top: 4,
  },
  rectangleGroup: {
    top: 0,
    left: 0,
  },
  groupWrapper: {
    left: 62,
    top: 4,
  },
  post: {
    left: 16,
    width: 42,
    height: 9,
    top: 0,
  },
  icons8Post501: {
    width: 15,
    top: 0,
    left: 0,
  },
  postParent: {
    top: 44,
    left: 113,
    width: 58,
  },
  topicRequest: {
    left: 12,
    width: 69,
    height: 5,
    top: 0,
  },
  icons8Topic501: {
    width: 12,
    top: 0,
    left: 0,
  },
  topicRequestParent: {
    top: 43,
    left: 206,
    width: 81,
  },
  groupParent: {
    top: 118,
  },
});

export default SectionPosts;
