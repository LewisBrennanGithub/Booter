import React from 'react';
import Slider from '@react-native-community/slider';

const CustomSlider = ({ value, onValueChange, step }) => (
  <Slider
    // style={{width: 200, height: 40}}
    minimumValue={0}
    maximumValue={5}
    minimumTrackTintColor="#FFFFFF"
    maximumTrackTintColor="#000000"
    step={step}
    value={value}
    onValueChange={onValueChange}
  />
);

export default CustomSlider;
