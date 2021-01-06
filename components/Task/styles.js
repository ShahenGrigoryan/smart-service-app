import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
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
    flexDirection: 'row',
    borderColor: '#ff8028',
  },
  radio: {
    marginRight: 10,
  },
  cardTime: {
    position: 'absolute',
    color: '#a8a8a8',
    fontSize: 12,
    top: 5,
    right: 10,
  },
  deadline: {
    fontSize: 11,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#45d6cf',
    marginTop: 5,
    borderRadius: 50,
    textAlign: 'center',
    alignSelf: 'flex-start',

  },
});

export default styles;
