import React from 'react';
import { Button, Text } from 'native-base';
import FilterStyles from '../../../globalStyles/desktopFilter';

const FilterButton = ({
  active, children, style = {}, onPress,
}) => (
  <Button onPress={onPress} bordered style={{ ...FilterStyles.allButton, backgroundColor: active ? '#fff' : 'transparent', ...style }}>
    <Text style={{ ...FilterStyles.allText, color: active ? '#000' : '#fff' }}>
      {children}
    </Text>
  </Button>
);

export default FilterButton;
