import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  burgerButton: {
    position: 'absolute',
    zIndex: 10,
    left: 0,
    paddingVertical: 7,
    width: 50,
    alignItems: 'center',
    // borderWidth:1,
    // borderStyle:'solid',
    // borderColor:"red"
  },
  userView: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '100%',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    marginBottom: 5,
    color: '#fff',
  },
  tel: {
    fontSize: 13,
    marginBottom: 5,
    color: '#fff',
  },

  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  ratingTextView: {
    alignItems: 'center',
    marginRight: 30,
  },
  ratingText: {
    color: '#2b9f98',
  },
  ratingInfoButton: {
    padding: 20,
  },

});

export default styles;
