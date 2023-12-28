import React, { useMemo } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
} from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const FormContainer = ({
  dimensionCode,
  carCountCarPriceCarBrandC,
  carQuantityCarNumber,
  carCountTextCarQuantityTe,
  carCountTextCarQuantityTe2,
  carCountTextCarQuantityTe3,
  carCode,
  carDimensions,
  carCountTextCarQuantityTe4,
  propColor,
  propBackgroundColor,
  propColor1,
  propBackgroundColor1,
  propColor2,
  propBackgroundColor2,
  propColor3,
  propBackgroundColor3,
  propColor4,
  propBackgroundColor4,
  propColor5,
  propColor6,
}) => {
  const dayStyle = useMemo(() => {
    return {
      ...getStyleValue("color", propColor),
    };
  }, [propColor]);

  const middleStyle = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", propBackgroundColor),
    };
  }, [propBackgroundColor]);

  const day1Style = useMemo(() => {
    return {
      ...getStyleValue("color", propColor1),
    };
  }, [propColor1]);

  const middle1Style = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", propBackgroundColor1),
    };
  }, [propBackgroundColor1]);

  const day2Style = useMemo(() => {
    return {
      ...getStyleValue("color", propColor2),
    };
  }, [propColor2]);

  const middle2Style = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", propBackgroundColor2),
    };
  }, [propBackgroundColor2]);

  const day3Style = useMemo(() => {
    return {
      ...getStyleValue("color", propColor3),
    };
  }, [propColor3]);

  const middle3Style = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", propBackgroundColor3),
    };
  }, [propBackgroundColor3]);

  const day4Style = useMemo(() => {
    return {
      ...getStyleValue("color", propColor4),
    };
  }, [propColor4]);

  const middle4Style = useMemo(() => {
    return {
      ...getStyleValue("backgroundColor", propBackgroundColor4),
    };
  }, [propBackgroundColor4]);

  const day5Style = useMemo(() => {
    return {
      ...getStyleValue("color", propColor5),
    };
  }, [propColor5]);

  const day6Style = useMemo(() => {
    return {
      ...getStyleValue("color", propColor6),
    };
  }, [propColor6]);

  return (
    <View style={styles.week}>
      <View style={styles.day}>
        <Image
          style={styles.startIconLayout}
          resizeMode="cover"
          source={dimensionCode}
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
        <Text style={[styles.day1, dayStyle]}>{carCountCarPriceCarBrandC}</Text>
      </View>
      <View style={styles.day}>
        <Image
          style={[styles.startIcon1, styles.startIconLayout]}
          resizeMode="cover"
          source={require("../assets/start1.png")}
        />
        <View style={[styles.middle1, styles.middlePosition, middleStyle]} />
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
        <Text style={[styles.day1, day1Style]}>{carQuantityCarNumber}</Text>
      </View>
      <View style={styles.day}>
        <Image
          style={[styles.startIcon1, styles.startIconLayout]}
          resizeMode="cover"
          source={require("../assets/start1.png")}
        />
        <View style={[styles.middle1, styles.middlePosition, middle1Style]} />
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
        <Text style={[styles.day1, day2Style]}>
          {carCountTextCarQuantityTe}
        </Text>
      </View>
      <View style={styles.day}>
        <Image
          style={[styles.startIcon1, styles.startIconLayout]}
          resizeMode="cover"
          source={require("../assets/start1.png")}
        />
        <View style={[styles.middle1, styles.middlePosition, middle2Style]} />
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
        <Text style={[styles.day1, day3Style]}>
          {carCountTextCarQuantityTe2}
        </Text>
      </View>
      <View style={styles.day}>
        <Image
          style={[styles.startIcon1, styles.startIconLayout]}
          resizeMode="cover"
          source={require("../assets/start1.png")}
        />
        <View style={[styles.middle1, styles.middlePosition, middle3Style]} />
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
        <Text style={[styles.day1, day4Style]}>
          {carCountTextCarQuantityTe3}
        </Text>
      </View>
      <View style={styles.day}>
        <Image
          style={[styles.startIcon1, styles.startIconLayout]}
          resizeMode="cover"
          source={require("../assets/start1.png")}
        />
        <View style={[styles.middle1, styles.middlePosition, middle4Style]} />
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
        <Text style={[styles.day1, day5Style]}>{carCode}</Text>
      </View>
      <View style={styles.day}>
        <Image
          style={[styles.startIcon1, styles.startIconLayout]}
          resizeMode="cover"
          source={require("../assets/start1.png")}
        />
        <View style={[styles.middle, styles.middlePosition]} />
        <Image
          style={styles.endIconLayout}
          resizeMode="cover"
          source={carDimensions}
        />
        <Image
          style={styles.selectedIcon}
          resizeMode="cover"
          source={require("../assets/selected.png")}
        />
        <Text style={[styles.day1, day6Style]}>
          {carCountTextCarQuantityTe4}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  day1: {
    fontSize: FontSize.size_mini,
    lineHeight: 22,
    fontFamily: FontFamily.sFProDisplay,
    color: Color.colorWhite,
    textAlign: "center",
    zIndex: 4,
    marginTop: 10,
  },
  day: {
    backgroundColor: Color.colorWhite,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 52,
  },
  startIcon1: {
    display: "none",
  },
  middle1: {
    backgroundColor: Color.colorSlateblue,
  },
  week: {
    flexDirection: "row",
    marginTop: 8,
  },
});

export default FormContainer;
