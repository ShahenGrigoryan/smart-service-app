import React from 'react';
import { Spinner } from 'native-base';
import { BlurView } from 'expo-blur';
import styles from './styles';

const Loader = ({ noIcon }) => (
  <BlurView
    intensity={135}
    tint="light"
    style={styles.root}
  >
    {!noIcon && <Spinner />}
  </BlurView>
);
export default Loader;
