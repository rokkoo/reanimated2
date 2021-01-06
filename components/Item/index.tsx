import React from "react";
import { Image, View, Text, Dimensions } from "react-native";
import styles from "./styles";

const { height: ScreenHeight } = Dimensions.get("window");

export const ITEM_MAX_SIZE = ScreenHeight / 2;
export const ITEM_MIN_SIZE = 180;

interface ItemProps {
  name: string;
  subtitle: string;
  url: number;
}

const Item = ({ url, name, subtitle }: ItemProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.picture} source={url} />
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{subtitle}</Text>
    </View>
  );
};

export default Item;
