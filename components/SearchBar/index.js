import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderLogo from '../UI/HeaderLogo';
import styles, { SearchView, SearchIcon } from './styles';
import { getDesktopItemsStart } from '../../redux/desktop/desktop.actions';
import { getTicketsStart } from '../../redux/tickets/tickets.actions';
import { getChecksStart } from '../../redux/checks/checks.actions';
import { getTasksStart } from '../../redux/tasks/tasks.actions';

const SearchBar = () => {
  const [search, setSearch] = useState({ open: false, value: '' });
  const route = useSelector((state) => state.pages.route);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  let inputRef = null;
  const getItems = route === 'Desktop'
    ? getDesktopItemsStart : route === 'Applications'
      ? getTicketsStart : route === 'Checks' ? getChecksStart
        : route === 'Tasks' ? getTasksStart : () => null;

  useEffect(() => {
    setSearch({ open: false, value: '' });
  }, [route]);
  const makeSearch = () => {
    if (!search.open) {
      setSearch({ ...search, open: true });
    } else {
      const filter = { params: `?status[]=pending&status[]=processing&search=${search.value}` };
      dispatch(getItems(token, filter));
    }
  };
  const showSearch = route?.match(/Tasks|Checks|Applications|Desktop/g);
  useEffect(() => {
    if (search.open) {
      inputRef?.focus();
    }
  }, [search.open]);

  const handleInputChange = (text) => {
    if (!text) {
      setSearch({ open: false, value: '' });
      dispatch(getItems(token));
    } else {
      setSearch({ ...search, value: text });
    }
  };
  return (
    <>
      {!search.open && <HeaderLogo />}
      {search.open && (
      <TextInput
        ref={(input) => {
          inputRef = input;
        }}
        onChangeText={handleInputChange}
        style={styles.input}
        placeholder="Номер, тема, описание, ..."
        onSubmitEditing={makeSearch}
      />
      )}
      {showSearch && (
      <SearchView>
        <SearchIcon activeOpacity={0.5} onPress={makeSearch}>
          <AntDesign name="search1" size={20} color="#fff" />
        </SearchIcon>
      </SearchView>
      )}
    </>
  );
};

export default SearchBar;
