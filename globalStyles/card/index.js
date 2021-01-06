import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardRoot: {
    marginHorizontal: 8,
    backgroundColor: 'transparent',
  },
  appCard: {
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
    borderColor: '#24b24e',
  },
  checkCard: {
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
    borderColor: '#04a3e8',
  },
  cardHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#414ccb',
    width: '80%',
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',

  },
  number: {
    fontSize: 14,
    color: '#06a2e8',
    alignItems: 'flex-end',
    textAlign: 'right',
    flex: 1,
    position: 'absolute',
    top: 5,
    right: 8,
  },
  date: {
    color: 'red',
  },
  bodyText: {
    fontWeight: 'bold',
    fontSize: 16,
  },

});

export default styles;
