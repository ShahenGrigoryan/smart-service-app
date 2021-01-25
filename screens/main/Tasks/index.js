import React, { useEffect } from 'react';

import {
  View, Content,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import Task from '../../../components/Task';
import * as PageActions from '../../../redux/pages/pages.actions';
import ContainerStyles from '../../../globalStyles/container';
import PagesBackground from '../../../components/Containers/PagesBackground';
import { getTasksStart } from '../../../redux/tasks/tasks.actions';
import NotFound from '../../../components/NotFound';
import PageWrapper from '../../../components/Containers/PageWrapper';

const Tasks = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const tasks = useSelector((state) => state.tasks.items);
  const isLoading = useSelector((state) => state.pages.loading);
  const filter = useSelector((state) => state.tasks.filter);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(PageActions.changeRoute('Tasks'));
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    dispatch(getTasksStart(token));
  }, []);

  return (

    <PageWrapper onRefresh={() => dispatch(getTasksStart(token,filter))}>
      <View style={ContainerStyles.root}>
        {tasks?.length
          ? tasks?.map((item) => <Task navigation={navigation} taskInfo={item} key={item.id} />)
          : <NotFound />}
      </View>
    </PageWrapper>
  );
};

export default Tasks;
