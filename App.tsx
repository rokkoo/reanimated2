import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Item, { ITEM_MAX_HEIGHT } from "./components/Item";
import { items } from "./Model";

export default function App() {
  const y = useSharedValue(0);
  const [scrollItems, setScrollItems] = useState(items);

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
        contentContainerStyle={{
          height: (scrollItems.length + 1) * ITEM_MAX_HEIGHT,
        }}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      >
        {scrollItems.map((item, index) => {
          return (
            <Item
              key={item.id}
              item={item}
              y={y}
              index={index}
              onDelete={(item) => {
                const filterItems = scrollItems.filter(
                  ({ id }) => id != item.id
                );
                setScrollItems(filterItems);
              }}
            />
          );
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
