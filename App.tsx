import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Item from "./components/Item";
import { items } from "./Model";

export default function App() {
  const value = useSharedValue(0);

  return (
    <View style={{ marginTop: 40 }}>
      <ScrollView>
        {items.map((item, index) => {
          return (
            <Item
              key={index}
              name={item.title}
              subtitle={item.subtitle}
              url={item.picture}
            />
          );
        })}
      </ScrollView>
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
