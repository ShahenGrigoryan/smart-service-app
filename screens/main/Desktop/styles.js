import { Dimensions, StyleSheet } from 'react-native';

const FONT_SIZE = Dimensions.get('window').width < 360 ? 9 : 10;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'transparent',
    position: 'relative',
    height: 60,
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  buttonText: {
    fontSize: FONT_SIZE,
    color: '#fff',
  },
  buttonIconActive: {
    color: '#2b9f98',
  },
  buttonIcon: {
    color: '#fff',
  },
  buttonTextActive: {
    color: '#fef721',
    fontSize: FONT_SIZE,
  },
});

export default styles;
