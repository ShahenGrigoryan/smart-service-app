import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 9,
    backgroundColor: 'rgba(0,0,0,0.95)',
    width: '100%',
    height: Dimensions.get('window').height,
    justifyContent: 'center',
  },
});

export default styles;
