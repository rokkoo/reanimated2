import React from "react";
import { Image, Text, Dimensions } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import styles from "./styles";

const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

export const ITEM_MAX_HEIGHT = ScreenHeight / 2;
export const ITEM_MIN_HEIGHT = 128;

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
  const inputRange = [(index - 1) * ITEM_MAX_HEIGHT, index * ITEM_MAX_HEIGHT];

  const containerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      y.value,
      inputRange,
      [ITEM_MIN_HEIGHT, ITEM_MAX_HEIGHT],
      Extrapolate.CLAMP
    ),
  }));

  const TextContainer = useAnimatedStyle(() => ({
    opacity: interpolate(y.value, inputRange, [0, 1], Extrapolate.CLAMP),
    transform: [
      {
        translateX: interpolate(
          y.value,
          inputRange,
          [ScreenWidth, 0],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Image style={styles.picture} source={picture} />
      <Animated.View style={[styles.textContainer, TextContainer]}>
        <Text style={[styles.text]}>{title}</Text>
        <Text style={[styles.text]}>{subtitle}</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Item;
