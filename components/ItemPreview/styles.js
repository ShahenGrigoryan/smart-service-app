import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,

  },
  dateView: {
    marginRight: 10,
    alignItems: 'center',
    width: '10%',
  },
  card: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    width: '100%',
    borderRadius: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 5,
    borderStyle: 'solid',

  },
  cardWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  cardText: {
    color: '#000',
    fontWeight: 'bold',
  },
  cardTime: {
    color: '#a8a8a8',
  },
  week: {
    fontSize: 20,
  },
  day: {
    fontSize: 16,
  },

});

export default styles;
