import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 999,
    top: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthButton: {
    borderColor: '#a8a8a8',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthButtonText: {
    marginRight: 5,
  },
  header: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderBottomWidth: 0,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 999,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  main: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopColor: '#a8a8a8',
    zIndex: 999,
  },
  monthItem: {
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 5,
    zIndex: 999,
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  monthItemActive: {
    backgroundColor: '#1977d0',
    borderRadius: 12,
  },

});

export default styles;
