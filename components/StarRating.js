import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StarRating = ({ rating, totalStars = 5, filledColor = '#D5B60A', emptyColor = '#373eb2', starSize = 20 }) => {
  const roundedRating = Math.round(rating);

  const stars = Array.from({ length: totalStars }, (_, index) => {
    const isFilled = index < roundedRating;
    const starColor = isFilled ? filledColor : emptyColor;

    return (
      <Text key={index} style={{ color: starColor, fontSize: starSize }}>
        ★
      </Text>
    );
  });

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 0,
    alignSelf: 'center'
  },
});

export default StarRating;