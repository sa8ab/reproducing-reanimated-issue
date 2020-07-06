import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

const DotText = props => {
  // console.log(props.text);

  return (
    <View>
      <Text> onActiveValue: {props.text}</Text>
    </View>
  );
};

export default DotText;

const s = StyleSheet.create({
  dot: {
    width: 40,
    height: 40,
    backgroundColor: '#1abc9c',
    borderRadius: 4,
    position: 'absolute',
  },
});
