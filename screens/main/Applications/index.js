import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Application from '../../../components/Application/Application';
import * as PageActions from '../../../redux/pages/pages.actions';
import { getTicketsStart } from '../../../redux/tickets/tickets.actions';
import NotFound from '../../../components/NotFound';
import PageWrapper from '../../../components/Containers/PageWrapper';

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
    <PageWrapper
      onRefresh={() => {
        dispatch(getTicketsStart(token));
      }}
    >
      {tickets?.length ? tickets?.map((item) => (
        <Application key={item.id} ticketInfo={item} navigation={navigation} />
      )) : <NotFound />}
    </PageWrapper>

  );
};

export default Applications;
