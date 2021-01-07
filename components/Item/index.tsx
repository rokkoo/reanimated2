import React from "react";
import {
  Image,
  Text,
  Dimensions,
  View,
  StyleSheet,
  Pressable,
  Alert,
  Button,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerEventExtra,
  PanGestureHandlerGestureEvent,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import styles from "./styles";

const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

export const ITEM_MAX_HEIGHT = ScreenHeight / 2;
export const ITEM_MIN_HEIGHT = 128;

interface Item {
  id: number;
  title: string;
  subtitle: string;
  picture: number;
}

interface ItemProps {
  y: Animated.SharedValue<number>;
  index: number;
  item: Item;
  onDelete?: (item: Item) => void;
}

const Item = ({ y, index, item, onDelete }: ItemProps) => {
  const translateX = useSharedValue(0);
  const leftFullSwipe = ScreenWidth;
  const editWidth = 120;
  const deleteWidth = 120;
  // from left to right
  const snapPoints = [-editWidth, 0, deleteWidth, leftFullSwipe];
  const { picture, title, subtitle } = item;
  const inputRange = [(index - 1) * ITEM_MAX_HEIGHT, index * ITEM_MAX_HEIGHT];

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

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = translationX + ctx.x;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(
        dest,
        {
          overshootClamping: true,
        },
        () => {
          if (translateX.value === leftFullSwipe && onDelete) {
            // return onDelete(item);
            runOnJS(onDelete)(item);
          }
        }
      );
    },
  });

  const containerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      y.value,
      inputRange,
      [ITEM_MIN_HEIGHT, ITEM_MAX_HEIGHT],
      Extrapolate.CLAMP
    ),
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const notifyStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < 0 ? 1 : 0,
    // width: interpolate(
    //   translateX.value,
    //   [translateX.value + editWidth, translateX.value],
    //   [0, 120]
    // ),
  }));

  return (
    <View>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "red",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            return Alert.alert("aaalfono");
          }}
          style={{
            width: deleteWidth,
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <Text
            onPress={() => {
              return Alert.alert("aaalfono");
            }}
            style={{ color: "white", fontWeight: "bold" }}
          >
            Delete
          </Text>
          <Button
            onPress={() => {
              if (onDelete) {
                onDelete(item);
              }
              return Alert.alert("aaalfono");
            }}
            title="Delete"
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "white",
            justifyContent: "center",
          },
          notifyStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              width: editWidth,
              alignSelf: "flex-end",
              alignItems: "center",
            },
            // notifyStyle,
          ]}
        >
          <Animated.View
            style={[
              {
                backgroundColor: "#06d6a0",
                padding: 10,
                borderRadius: 20,
              },
            ]}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Check
            </Text>
          </Animated.View>
        </Animated.View>
      </Animated.View>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        enabled
        activeOffsetX={[0, 5]}
        activeOffsetY={15}
      >
        <Animated.View style={[styles.container, containerStyle]}>
          <Image style={styles.picture} source={picture} />
          <Animated.View style={[styles.textContainer, TextContainer]}>
            <Text style={[styles.text]}>{title}</Text>
            <Text style={[styles.text]}>{subtitle}</Text>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Item;
