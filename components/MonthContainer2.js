import * as React from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const MonthContainer2 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.month}>
      <Text style={styles.september2022}>September 2022</Text>
      <View style={[styles.week, styles.weekSpaceBlock]}>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>1</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>2</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day5, styles.dayTypo]}>3</Text>
        </View>
      </View>
      <View style={styles.weekSpaceBlock}>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day5, styles.dayTypo]}>4</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>5</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>6</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>7</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>8</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>9</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day5, styles.dayTypo]}>10</Text>
        </View>
      </View>
      <View style={styles.weekSpaceBlock}>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day5, styles.dayTypo]}>11</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>12</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>13</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Image
            style={[styles.startIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/start.png")}
          />
          <View style={[styles.middle, styles.middlePosition]} />
          <Image
            style={[styles.endIcon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/end.png")}
          />
          <Image
            style={[styles.selectedIcon, styles.middlePosition]}
            resizeMode="cover"
            source={require("../assets/selected2.png")}
          />
          <Text style={[styles.day27, styles.dayTypo]}>14</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>15</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>16</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day5, styles.dayTypo]}>17</Text>
        </View>
      </View>
      <View style={styles.weekSpaceBlock}>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day5, styles.dayTypo]}>18</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>19</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>20</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>21</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>22</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>23</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day5, styles.dayTypo]}>24</Text>
        </View>
      </View>
      <View style={styles.weekSpaceBlock}>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day5, styles.dayTypo]}>25</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>26</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>27</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>28</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day1, styles.dayTypo]}>29</Text>
        </View>
        <Pressable
          style={styles.dayFlexBox}
          onPress={() => navigation.navigate("EndDateSelected")}
        >
          <Text style={[styles.day1, styles.dayTypo]}>30</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weekSpaceBlock: {
    marginTop: 8,
    flexDirection: "row",
  },
  dayTypo: {
    textAlign: "center",
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.sFProDisplay,
    lineHeight: 22,
  },
  iconLayout: {
    display: "none",
    width: 52,
  },
  middlePosition: {
    left: "50%",
    top: "50%",
    marginTop: -20,
    position: "absolute",
    height: 40,
  },
  september2022: {
    fontSize: FontSize.bodyBold_size,
    fontWeight: "600",
    textAlign: "left",
    color: Color.gray900,
    fontFamily: FontFamily.sFProDisplay,
    lineHeight: 22,
  },
  day1: {
    color: Color.gray900,
  },
  dayFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 52,
    height: 40,
    backgroundColor: Color.colorWhite,
  },
  day5: {
    color: Color.red500,
  },
  week: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
  },
  startIcon: {
    zIndex: 0,
    height: 40,
    display: "none",
  },
  middle: {
    marginLeft: -26,
    backgroundColor: Color.colorSlateblue,
    zIndex: 1,
    display: "none",
    width: 52,
  },
  endIcon: {
    zIndex: 2,
    height: 40,
    display: "none",
  },
  selectedIcon: {
    marginLeft: -20,
    width: 40,
    zIndex: 3,
  },
  day27: {
    color: Color.colorWhite,
    zIndex: 4,
    marginTop: 10,
  },
  month: {
    paddingHorizontal: Padding.p_smi,
    paddingVertical: Padding.p_base,
    backgroundColor: Color.colorWhite,
  },
});

export default MonthContainer2;
