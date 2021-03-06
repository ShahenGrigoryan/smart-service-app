import React, { useState, useEffect } from 'react';
import {
  Header,
} from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import SideMenuStyles from '../../globalStyles/sideMenu';
import HeaderStyles from './styles';
import ComponentsBackground from '../Containers/ComponentsBackground';
import FilterStyles from '../../globalStyles/desktopFilter';
import FilterButton from '../UI/FilterButton';
import { getDesktopItemsStart } from '../../redux/desktop/desktop.actions';
import { getTasksStart } from '../../redux/tasks/tasks.actions';
import SearchBar from '../SearchBar';

const startDate = new Date(Date.now());
startDate.setFullYear(startDate.getFullYear() - 1);

const desktopFilters = [
  { name: 'Все', id: 'all', params: null },
  {
    name: 'Сегодня',
    id: 'today',
    params: `?status[]=pending&status[]=processing&startDate=${moment().startOf('day').toISOString()}&endDate=${moment().endOf('day').toISOString()}`,
  },
  {
    name: 'Alarm',
    id: 'alarm',
    params: `?status[]=pending&status[]=processing&startDate=${startDate.toISOString()}&endDate=${moment().endOf('day').toISOString()}`,
  },
];

const AppHeader = ({ menuOpen }) => {
  const state = useSelector((state) => state);
  const storeDesktopFilter = state.desktop.filter;
  const storeTasksFilter = state.tasks.filter;
  const [desktopFilter, setDesktopFilter] = useState(storeDesktopFilter ?? desktopFilters[0]);
  const token = state?.user?.token;
  const id = state?.user?.user_id;
  const dispatch = useDispatch();
  const isDesktop = state.pages.route === 'Desktop';
  const isTasks = state.pages.route === 'Tasks';

  useEffect(() => {
    setDesktopFilter(storeDesktopFilter ?? desktopFilters[0]);
  }, [storeDesktopFilter]);
  const tasksFilters = [
    {
      name: 'Все',
      id: 'all',
      params: '?status[]=pending&status[]=processing',
    },
    {
      name: 'Мои',
      id: 'my',
      params: `?users[]=${id}&status[]=pending&status[]=processing`,
    },
    {
      name: 'Поручил',
      id: 'instructed',
      params: `?owners[]=${id}&status[]=pending&status[]=processing`,
    },
    {
      name: 'Наблюдаю',
      id: 'watching',
      params: `?supervisors[]=${id}&status[]=pending&status[]=processing`,
    },
  ];
  const [tasksFilter, setTasksFilter] = useState(storeTasksFilter ?? tasksFilters[0]);
  useEffect(() => {
    setTasksFilter(storeTasksFilter ?? tasksFilters[0]);
  }, [storeTasksFilter]);

  const applyDesktopFilter = (filter) => {
    dispatch(getDesktopItemsStart(token, filter));
  };
  const applyTaskFilter = (filter) => {
    dispatch(getTasksStart(token, filter));
  };

  return (
    <ComponentsBackground>
      <Header style={{ ...HeaderStyles.root, elevation: isDesktop || isTasks ? 0 : 1 }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={SideMenuStyles.burgerButton}
          onPress={menuOpen}
        >
          <MaterialCommunityIcons name="menu" size={35} color="#fff" />
        </TouchableOpacity>
        <SearchBar />
      </Header>
      {isDesktop && (
        <View style={FilterStyles.root}>
          {desktopFilters.map((item) => (
            <FilterButton
              onPress={() => applyDesktopFilter(item)}
              key={item.id}
              active={desktopFilter.id === item.id}
            >
              {item.name}
            </FilterButton>
          ))}
        </View>
      )}
      {isTasks && (
        <View style={FilterStyles.root}>
          {tasksFilters.map((item) => (
            <FilterButton
              onPress={() => applyTaskFilter(item)}
              key={item.id}
              active={tasksFilter.id === item.id}
            >
              {item.name}
            </FilterButton>
          ))}
        </View>
      )}
    </ComponentsBackground>
  );
};

export default AppHeader;
