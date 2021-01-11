import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: '100%',
    left: 0,
    right: 0,
    zIndex: 30,
    backgroundColor: 'rgba(0,0,0,0.95)',
    width: '100%',
    minHeight: Dimensions.get('window').height,
    justifyContent: 'center',
    elevation: 10,
  },
});

export default styles;
