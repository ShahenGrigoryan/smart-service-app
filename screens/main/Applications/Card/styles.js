import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    position: 'relative',
    zIndex: 0,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  content: {
    color: '#3d4ccd',
    fontWeight: 'bold',
    fontSize: 17,
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 5,
    borderRadius: 50,
    paddingHorizontal: 5,
    paddingVertical: 5,
    zIndex: 50,
  },
  addButton: {
    height: 30,
    marginLeft: 'auto',
    marginRight: 20,
    marginBottom: 40,
    borderRadius: 10,
  },
});

export default styles;
