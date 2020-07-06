import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {View} from 'react-native';
import React, {useRef} from 'react';
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';

const boxStyle = {
  width: 80,
  opacity: 1,
  height: 80,
  backgroundColor: 'black',
  margin: 40,
};
const containerStyle = {
  flex: 1,
};

export default function AnimatedStyleUpdateExample(props) {
  const panRef = useRef();
  const tapRef = useRef();

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handler = useAnimatedGestureHandler({
    onStart: (evt, ctx) => {
      scale.value = withSpring(0.5);
      opacity.value = withTiming(0.5);
    },
    onActive: (evt, ctx) => {
      console.log('onActive');
    },
    onEnd: (evt, ctx) => {
      scale.value = withSpring(1);
      opacity.value = withTiming(1);
    },
  });

  const panHandler = useAnimatedGestureHandler({
    onStart: (evt, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (evt, ctx) => {
      translateX.value = evt.translationX + ctx.startX;
      translateY.value = evt.translationY + ctx.startY;
    },
    onEnd: (evt, ctx) => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: scale.value},
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <View style={containerStyle}>
      <TapGestureHandler
        ref={tapRef}
        simultaneousHandlers={[panRef]}
        onGestureEvent={handler}>
        <Animated.View>
          <PanGestureHandler
            ref={panRef}
            simultaneousHandlers={[tapRef]}
            onGestureEvent={panHandler}>
            <Animated.View style={[boxStyle, style]} />
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
}
