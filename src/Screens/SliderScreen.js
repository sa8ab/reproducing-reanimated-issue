import React, {useRef, useState, useEffect} from 'react';
import {View, StatusBar, StyleSheet, TextInput, Text} from 'react-native';
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
  useDerivedValue,
  useAnimatedProps,
  interpolate,
  Extrapolate,
  withSpring,
} from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(TextInput);

const SliderScreen = () => {
  const tapRef = useRef();
  const panRef = useRef();
  const [refState, setRefState] = useState(0);
  const thing = useSharedValue(40);
  const scale = useSharedValue(1);

  useEffect(() => {
    // for activating the simultaneous handlers
    setRefState(1);
    console.log('changing state for rerender');
  });

  const activeValue = useDerivedValue(() => {
    return interpolate(thing.value, [0, 360 - 40], [0, 10], Extrapolate.CLAMP);
  });

  const tapHandler = useAnimatedGestureHandler({
    onStart: () => {
      scale.value = 1.8;
      console.log('Start');
    },
    onEnd: () => {
      scale.value = 1;
      console.log('End');
    },
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.tX = thing.value;
    },
    onActive: (event, context) => {
      const translation = context.tX + event.translationX;
      thing.value = translation;
    },
  });

  const sz = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: thing.value},
        {translateY: -22},
        {scale: withSpring(scale.value)},
      ],
    };
  });

  const props = useAnimatedProps(() => {
    return {
      text: `${activeValue.value}`,
    };
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar translucent />
      <View style={s.container}>
        <View style={s.line} />
        <TapGestureHandler
          ref={tapRef}
          simultaneousHandlers={[panRef]}
          onGestureEvent={tapHandler}
          maxDurationMs={20000}>
          <Animated.View>
            <PanGestureHandler
              ref={panRef}
              simultaneousHandlers={[tapRef]}
              onGestureEvent={gestureHandler}>
              <Animated.View style={[s.dot, sz]} />
            </PanGestureHandler>
          </Animated.View>
        </TapGestureHandler>
      </View>

      <AnimatedText
        editable={false}
        style={{
          backgroundColor: 'whitesmoke',
        }}
        animatedProps={props}
      />
    </View>
  );
};

export default SliderScreen;

const s = StyleSheet.create({
  container: {
    marginVertical: 100,
    // marginHorizontal: 20,
    height: 40,
    // backgroundColor: 'whitesmoke',
    justifyContent: 'center',
  },
  line: {
    width: '100%',
    height: 4,
    backgroundColor: 'lightgray',
  },
  dot: {
    width: 40,
    height: 40,
    backgroundColor: '#1abc9c',
    borderRadius: 20,
    position: 'absolute',
  },
});
