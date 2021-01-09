import React, { useEffect } from 'react';
import { Content } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import Check from '../../../components/Check/Check';
import * as PageActions from '../../../redux/pages/pages.actions';
import PagesBackground from '../../../components/Containers/PagesBackground';
import { getChecksStart } from '../../../redux/checks/checks.actions';
import NotFound from '../../../components/NotFound';
import PageWrapper from '../../../components/Containers/PageWrapper';

const Checks = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user?.token);
  const checks = useSelector((state) => state?.checks?.items);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(PageActions.changeRoute('Checks'));
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    dispatch(getChecksStart(token));
    console.log('Bearer:',token);
  }, []);
  return (
    <PageWrapper
      onRefresh={() => dispatch(getChecksStart(token))}
    >
      {checks?.length ? checks?.map((item) => (
        <Check navigation={navigation} key={item.id} itemInfo={item} />
      )) : <NotFound />}
    </PageWrapper>

  );
};

export default Checks;
