import * as React from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import FormContainer from "./FormContainer";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const MonthContainer1 = () => {
  return (
    <View style={styles.month}>
      <Text style={styles.october2022}>October 2022</Text>
      <View style={[styles.week, styles.weekSpaceBlock]}>
        <View style={styles.dayFlexBox}>
          <Image
            style={[styles.startIcon, styles.startIconLayout]}
            resizeMode="cover"
            source={require("../assets/start1.png")}
          />
          <View style={[styles.middle, styles.middlePosition]} />
          <Image
            style={[styles.endIcon, styles.endIconLayout]}
            resizeMode="cover"
            source={require("../assets/end.png")}
          />
          <Image
            style={styles.selectedIconPosition}
            resizeMode="cover"
            source={require("../assets/selected1.png")}
          />
          <Text style={[styles.day1, styles.dayTypo]}>1</Text>
        </View>
      </View>
      <FormContainer
        dimensionCode={require("../assets/start2.png")}
        carCountCarPriceCarBrandC="2"
        carQuantityCarNumber="3"
        carCountTextCarQuantityTe="4"
        carCountTextCarQuantityTe2="5"
        carCountTextCarQuantityTe3="6"
        carCode="7"
        carDimensions={require("../assets/end2.png")}
        carCountTextCarQuantityTe4="8"
        propColor="#050505"
        propBackgroundColor="#fff"
        propColor1="#050505"
        propBackgroundColor1="#fff"
        propColor2="#050505"
        propBackgroundColor2="#fff"
        propColor3="#050505"
        propBackgroundColor3="#fff"
        propColor4="#050505"
        propBackgroundColor4="#fff"
        propColor5="#050505"
        propColor6="#050505"
      />
      <FormContainer
        dimensionCode={require("../assets/start2.png")}
        carCountCarPriceCarBrandC="9"
        carQuantityCarNumber="10"
        carCountTextCarQuantityTe="11"
        carCountTextCarQuantityTe2="12"
        carCountTextCarQuantityTe3="13"
        carCode="14"
        carDimensions={require("../assets/end2.png")}
        carCountTextCarQuantityTe4="15"
        propColor="#050505"
        propBackgroundColor="#fff"
        propColor1="#050505"
        propBackgroundColor1="#fff"
        propColor2="#050505"
        propBackgroundColor2="#fff"
        propColor3="#050505"
        propBackgroundColor3="#fff"
        propColor4="#050505"
        propBackgroundColor4="#fff"
        propColor5="#050505"
        propColor6="#050505"
      />
      <View style={styles.weekSpaceBlock}>
        <View style={styles.dayFlexBox}>
          <Image
            style={styles.startIconLayout}
            resizeMode="cover"
            source={require("../assets/start2.png")}
          />
          <View style={[styles.middle, styles.middlePosition]} />
          <Image
            style={[styles.endIcon, styles.endIconLayout]}
            resizeMode="cover"
            source={require("../assets/end.png")}
          />
          <Image
            style={[styles.selectedIcon1, styles.selectedIconPosition]}
            resizeMode="cover"
            source={require("../assets/selected.png")}
          />
          <Text style={[styles.day1, styles.dayTypo]}>16</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Image
            style={[styles.startIcon, styles.startIconLayout]}
            resizeMode="cover"
            source={require("../assets/start1.png")}
          />
          <View style={[styles.middle2, styles.middlePosition]} />
          <Image
            style={[styles.endIcon, styles.endIconLayout]}
            resizeMode="cover"
            source={require("../assets/end.png")}
          />
          <Image
            style={[styles.selectedIcon1, styles.selectedIconPosition]}
            resizeMode="cover"
            source={require("../assets/selected.png")}
          />
          <Text style={[styles.day1, styles.dayTypo]}>17</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Image
            style={[styles.startIcon, styles.startIconLayout]}
            resizeMode="cover"
            source={require("../assets/start1.png")}
          />
          <View style={[styles.middle2, styles.middlePosition]} />
          <Image
            style={[styles.endIcon, styles.endIconLayout]}
            resizeMode="cover"
            source={require("../assets/end.png")}
          />
          <Image
            style={[styles.selectedIcon1, styles.selectedIconPosition]}
            resizeMode="cover"
            source={require("../assets/selected.png")}
          />
          <Text style={[styles.day1, styles.dayTypo]}>18</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Image
            style={[styles.startIcon, styles.startIconLayout]}
            resizeMode="cover"
            source={require("../assets/start1.png")}
          />
          <View style={[styles.middle, styles.middlePosition]} />
          <Image
            style={styles.endIconLayout}
            resizeMode="cover"
            source={require("../assets/end2.png")}
          />
          <Image
            style={[styles.selectedIcon1, styles.selectedIconPosition]}
            resizeMode="cover"
            source={require("../assets/selected.png")}
          />
          <Text style={[styles.day1, styles.dayTypo]}>19</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day11, styles.dayTypo]}>20</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day11, styles.dayTypo]}>21</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day15, styles.dayTypo]}>22</Text>
        </View>
      </View>
      <View style={styles.weekSpaceBlock}>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day15, styles.dayTypo]}>23</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day11, styles.dayTypo]}>24</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day11, styles.dayTypo]}>25</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day11, styles.dayTypo]}>26</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day11, styles.dayTypo]}>27</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day11, styles.dayTypo]}>28</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day15, styles.dayTypo]}>29</Text>
        </View>
      </View>
      <View style={styles.weekSpaceBlock}>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day15, styles.dayTypo]}>30</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day11, styles.dayTypo]}>31</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weekSpaceBlock: {
    marginTop: 8,
    flexDirection: "row",
  },
  startIconLayout: {
    zIndex: 0,
    height: 40,
    width: 52,
  },
  middlePosition: {
    zIndex: 1,
    left: "50%",
    top: "50%",
    marginLeft: -26,
    marginTop: -20,
    position: "absolute",
    height: 40,
    width: 52,
  },
  endIconLayout: {
    zIndex: 2,
    height: 40,
    width: 52,
  },
  dayTypo: {
    textAlign: "center",
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.sFProDisplay,
    lineHeight: 22,
  },
  selectedIconPosition: {
    zIndex: 3,
    width: 40,
    marginLeft: -20,
    left: "50%",
    top: "50%",
    marginTop: -20,
    position: "absolute",
    height: 40,
  },
  october2022: {
    fontSize: FontSize.bodyBold_size,
    fontWeight: "600",
    textAlign: "left",
    color: Color.gray900,
    fontFamily: FontFamily.sFProDisplay,
    lineHeight: 22,
  },
  startIcon: {
    display: "none",
  },
  middle: {
    backgroundColor: Color.colorLightgoldenrodyellow,
    display: "none",
  },
  endIcon: {
    display: "none",
  },
  day1: {
    zIndex: 4,
    marginTop: 10,
    color: Color.gray900,
  },
  dayFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 52,
    backgroundColor: Color.colorWhite,
  },
  week: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
  },
  selectedIcon1: {
    display: "none",
  },
  middle2: {
    backgroundColor: Color.colorWhite,
  },
  day11: {
    color: Color.gray900,
  },
  day15: {
    color: Color.red500,
  },
  month: {
    paddingHorizontal: Padding.p_smi,
    paddingVertical: Padding.p_base,
    backgroundColor: Color.colorWhite,
  },
});

export default MonthContainer1;
