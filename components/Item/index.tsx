import React from "react";
import { Image, Text, Dimensions } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import styles from "./styles";

const { height: ScreenHeight } = Dimensions.get("window");

export const ITEM_MAX_SIZE = ScreenHeight / 2;
export const ITEM_MIN_SIZE = 120;

interface Item {
  title: string;
  subtitle: string;
  picture: number;
}

interface ItemProps {
  y: Animated.SharedValue<number>;
  index: number;
  item: Item;
}

const Item = ({ y, index, item }: ItemProps) => {
  const { picture, title, subtitle } = item;
  const inputRange = [(index - 1) * ITEM_MAX_SIZE, index * ITEM_MAX_SIZE];

  const containerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      y.value,
      inputRange,
      [ITEM_MIN_SIZE, ITEM_MAX_SIZE],
      Extrapolate.CLAMP
    ),
  }));

  const TextContainer = useAnimatedStyle(() => ({
    opacity: interpolate(y.value, inputRange, [0, 1], Extrapolate.CLAMP),
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Image style={styles.picture} source={picture} />
      <Animated.View style={TextContainer}>
        <Text style={[styles.text]}>{title}</Text>
        <Text style={[styles.text]}>{subtitle}</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Item;
