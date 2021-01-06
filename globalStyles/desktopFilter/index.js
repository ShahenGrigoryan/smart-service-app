import { StyleSheet } from 'react-native';

const allButtonColor = '#fff';
const todayButtonColor = '#40b863';
const alarmButtonColor = 'red';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    width: '100%',

  },
  allButton: {
    borderColor: allButtonColor,
    height: 30,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
  },
  allText: {
    color: allButtonColor,
    fontSize: 12,
  },
  todayButton: {
    borderColor: todayButtonColor,
    height: 30,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  todayText: {
    color: todayButtonColor,
    fontSize: 12,
  },
  alarmButton: {
    borderColor: alarmButtonColor,
    height: 30,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  alarmText: {
    color: alarmButtonColor,
    fontSize: 12,
  },
});

export default styles;
