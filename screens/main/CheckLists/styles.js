import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    marginRight: 5,
    color: '#3e49cc',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  numberText: {
    color: '#f98228',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerTextView: {
    paddingVertical: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '70%',
  },
  listsDescription: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
});

export default styles;
