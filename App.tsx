import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Item, { ITEM_MAX_SIZE } from "./components/Item";
import { items } from "./Model";

export default function App() {
  const y = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y: value } }) => {
      y.value = value;
    },
  });

  return (
    <View style={{ marginTop: 40 }}>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ height: (items.length + 1) * ITEM_MAX_SIZE }}
        decelerationRate="fast"
      >
        {items.map((item, index) => {
          return <Item key={index} item={item} y={y} index={index} />;
        })}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
