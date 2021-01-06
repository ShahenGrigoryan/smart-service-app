import styled from 'styled-components';
import { StyleSheet } from 'react-native';

export const SearchView = styled.View`
  position: absolute;
  width: 100%;
  flex-direction: row;
  z-index: 0;
  justify-content: flex-end;
  right: 0
`;
export const SearchIcon = styled.TouchableOpacity`
  padding-vertical: 15px;
  width: 50px;
  justify-content: center;
  align-items: center;

`;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    width: '80%',
    position: 'relative',
    zIndex: 999,
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
});

export default styles;
