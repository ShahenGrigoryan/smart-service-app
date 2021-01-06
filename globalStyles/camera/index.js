import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default styles;
