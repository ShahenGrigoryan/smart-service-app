import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 5,
    borderStyle: 'solid',
    flexDirection: 'row',
    borderColor: '#ff8028',
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  date: {
    color: '#a8a8a8',
    fontSize: 12,
  },
});

export default styles;
