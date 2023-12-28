import * as React from "react";
import { StyleSheet, View } from "react-native";
import ContainerCardFormFilter from "./ContainerCardFormFilter";

const PopularCoursesContainer = () => {
  return (
    <View style={styles.popularCoursesWhole}>
      <ContainerCardFormFilter
        dimensionCode={require("../assets/image-51.png")}
        dimensionCodeImageUrl={require("../assets/group-1.png")}
        dimensionCodeText={require("../assets/group-12.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  popularCoursesWhole: {
    position: "absolute",
    top: 406,
    left: 14,
    width: 346,
    height: 177,
  },
});

export default PopularCoursesContainer;
