import { StyleSheet, Dimensions } from "react-native";
import { ITEM_MIN_HEIGHT } from ".";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    width,
    height: ITEM_MIN_HEIGHT,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  textContainer: {
    backgroundColor: "#000000",
    margin: 20,
    padding: 12,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
