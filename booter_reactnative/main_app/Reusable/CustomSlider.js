import React from 'react';
import Slider from '@react-native-community/slider';

const CustomSlider = ({ value, onValueChange, step }) => (
  <Slider
    minimumValue={0}
    maximumValue={5}
    minimumTrackTintColor="#068DA9"
    maximumTrackTintColor="#d44908"
    step={step}
    value={value}
    onValueChange={onValueChange}
  />
);

export default CustomSlider;
