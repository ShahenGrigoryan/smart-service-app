import React, { useEffect } from 'react';
import { Content } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import Application from '../../../components/Application/Application';
import * as PageActions from '../../../redux/pages/pages.actions';
import PagesBackground from '../../../components/Containers/PagesBackground';
import { getTicketsStart } from '../../../redux/tickets/tickets.actions';
import NotFound from '../../../components/NotFound';

const Applications = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const tickets = useSelector((state) => state.tickets.items);

  const isLoading = useSelector((state) => state.pages.loading);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(PageActions.changeRoute('Applications'));
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    dispatch(getTicketsStart(token));
  }, []);
  return (
    <Content
      refreshControl={(
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            dispatch(getTicketsStart(token));
          }}
        />
          )}
    >
      <PagesBackground items={tickets}>

        {tickets?.length ? tickets?.map((item) => (
          <Application key={item.id} ticketInfo={item} navigation={navigation} />
        )) : <NotFound />}
      </PagesBackground>
    </Content>
  );
};

export default Applications;
