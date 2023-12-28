import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import FormContainer from "./FormContainer";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const MonthContainer = () => {
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
          <Text style={[styles.day23, styles.dayTypo]}>12</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Text style={[styles.day23, styles.dayTypo]}>13</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Image
            style={styles.startIconLayout}
            resizeMode="cover"
            source={require("../assets/start.png")}
          />
          <View style={[styles.middle, styles.middlePosition]} />
          <Image
            style={[styles.endIcon, styles.endIconLayout]}
            resizeMode="cover"
            source={require("../assets/end.png")}
          />
          <Image
            style={styles.selectedIcon}
            resizeMode="cover"
            source={require("../assets/selected.png")}
          />
          <Text style={[styles.day27, styles.dayTypo]}>14</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Image
            style={[styles.startIcon1, styles.startIconLayout]}
            resizeMode="cover"
            source={require("../assets/start1.png")}
          />
          <View style={[styles.middle1, styles.middlePosition]} />
          <Image
            style={[styles.endIcon, styles.endIconLayout]}
            resizeMode="cover"
            source={require("../assets/end.png")}
          />
          <Image
            style={styles.selectedIcon}
            resizeMode="cover"
            source={require("../assets/selected.png")}
          />
          <Text style={[styles.day27, styles.dayTypo]}>15</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Image
            style={[styles.startIcon1, styles.startIconLayout]}
            resizeMode="cover"
            source={require("../assets/start1.png")}
          />
          <View style={[styles.middle1, styles.middlePosition]} />
          <Image
            style={[styles.endIcon, styles.endIconLayout]}
            resizeMode="cover"
            source={require("../assets/end.png")}
          />
          <Image
            style={styles.selectedIcon}
            resizeMode="cover"
            source={require("../assets/selected.png")}
          />
          <Text style={[styles.day27, styles.dayTypo]}>16</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Image
            style={[styles.startIcon1, styles.startIconLayout]}
            resizeMode="cover"
            source={require("../assets/start1.png")}
          />
          <View style={[styles.middle, styles.middlePosition]} />
          <Image
            style={styles.endIconLayout}
            resizeMode="cover"
            source={require("../assets/end1.png")}
          />
          <Image
            style={styles.selectedIcon}
            resizeMode="cover"
            source={require("../assets/selected.png")}
          />
          <Text style={[styles.day27, styles.dayTypo]}>17</Text>
        </View>
      </View>
      <FormContainer
        dimensionCode={require("../assets/start.png")}
        carCountCarPriceCarBrandC="18"
        carQuantityCarNumber="19"
        carCountTextCarQuantityTe="20"
        carCountTextCarQuantityTe2="21"
        carCountTextCarQuantityTe3="22"
        carCode="23"
        carDimensions={require("../assets/end1.png")}
        carCountTextCarQuantityTe4="24"
      />
      <View style={styles.weekSpaceBlock}>
        <View style={styles.dayFlexBox}>
          <Image
            style={styles.startIconLayout}
            resizeMode="cover"
            source={require("../assets/start.png")}
          />
          <View style={[styles.middle, styles.middlePosition]} />
          <Image
            style={[styles.endIcon, styles.endIconLayout]}
            resizeMode="cover"
            source={require("../assets/end.png")}
          />
          <Image
            style={styles.selectedIcon}
            resizeMode="cover"
            source={require("../assets/selected.png")}
          />
          <Text style={[styles.day27, styles.dayTypo]}>25</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Image
            style={[styles.startIcon1, styles.startIconLayout]}
            resizeMode="cover"
            source={require("../assets/start1.png")}
          />
          <View style={[styles.middle1, styles.middlePosition]} />
          <Image
            style={[styles.endIcon, styles.endIconLayout]}
            resizeMode="cover"
            source={require("../assets/end.png")}
          />
          <Image
            style={styles.selectedIcon}
            resizeMode="cover"
            source={require("../assets/selected.png")}
          />
          <Text style={[styles.day27, styles.dayTypo]}>26</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Image
            style={[styles.startIcon1, styles.startIconLayout]}
            resizeMode="cover"
            source={require("../assets/start1.png")}
          />
          <View style={[styles.middle1, styles.middlePosition]} />
          <Image
            style={[styles.endIcon, styles.endIconLayout]}
            resizeMode="cover"
            source={require("../assets/end.png")}
          />
          <Image
            style={styles.selectedIcon}
            resizeMode="cover"
            source={require("../assets/selected.png")}
          />
          <Text style={[styles.day27, styles.dayTypo]}>27</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Image
            style={[styles.startIcon1, styles.startIconLayout]}
            resizeMode="cover"
            source={require("../assets/start1.png")}
          />
          <View style={[styles.middle1, styles.middlePosition]} />
          <Image
            style={[styles.endIcon, styles.endIconLayout]}
            resizeMode="cover"
            source={require("../assets/end.png")}
          />
          <Image
            style={styles.selectedIcon}
            resizeMode="cover"
            source={require("../assets/selected.png")}
          />
          <Text style={[styles.day27, styles.dayTypo]}>28</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Image
            style={[styles.startIcon1, styles.startIconLayout]}
            resizeMode="cover"
            source={require("../assets/start1.png")}
          />
          <View style={[styles.middle1, styles.middlePosition]} />
          <Image
            style={[styles.endIcon, styles.endIconLayout]}
            resizeMode="cover"
            source={require("../assets/end.png")}
          />
          <Image
            style={styles.selectedIcon}
            resizeMode="cover"
            source={require("../assets/selected.png")}
          />
          <Text style={[styles.day27, styles.dayTypo]}>29</Text>
        </View>
        <View style={styles.dayFlexBox}>
          <Image
            style={[styles.startIcon1, styles.startIconLayout]}
            resizeMode="cover"
            source={require("../assets/start1.png")}
          />
          <View style={[styles.middle, styles.middlePosition]} />
          <Image
            style={styles.endIconLayout}
            resizeMode="cover"
            source={require("../assets/end1.png")}
          />
          <Image
            style={styles.selectedIcon}
            resizeMode="cover"
            source={require("../assets/selected.png")}
          />
          <Text style={[styles.day27, styles.dayTypo]}>30</Text>
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
  dayTypo: {
    textAlign: "center",
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.sFProDisplay,
    lineHeight: 22,
  },
  middlePosition: {
    zIndex: 1,
    marginLeft: -26,
    left: "50%",
    top: "50%",
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
  startIconLayout: {
    zIndex: 0,
    height: 40,
    width: 52,
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
    height: 40,
    width: 52,
    backgroundColor: Color.colorWhite,
  },
  day5: {
    color: Color.red500,
  },
  week: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
  },
  day23: {
    color: Color.labelColorLightPrimary,
  },
  middle: {
    backgroundColor: Color.colorLightgoldenrodyellow,
    display: "none",
  },
  endIcon: {
    display: "none",
  },
  selectedIcon: {
    marginLeft: -20,
    width: 40,
    zIndex: 3,
    display: "none",
    left: "50%",
    top: "50%",
    marginTop: -20,
    position: "absolute",
    height: 40,
  },
  day27: {
    color: Color.colorWhite,
    zIndex: 4,
    marginTop: 10,
  },
  startIcon1: {
    display: "none",
  },
  middle1: {
    backgroundColor: Color.colorSlateblue,
  },
  month: {
    paddingHorizontal: Padding.p_smi,
    paddingVertical: Padding.p_base,
    backgroundColor: Color.colorWhite,
  },
});

export default MonthContainer;
