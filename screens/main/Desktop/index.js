import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemPreview from '../../../components/ItemPreview';
import * as PageActions from '../../../redux/pages/pages.actions';
import { getDesktopItemsStart } from '../../../redux/desktop/desktop.actions';
import NotFound from '../../../components/NotFound';
import PageWrapper from '../../../components/Containers/PageWrapper';
import { getUserStart } from '../../../redux/user/user.actions';
import { uploadFilesInQue } from '../../../redux/files_que/files_que.reducer';

const Desktop = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const filter = useSelector((state) => state.desktop.filter);
  const { user_id } = useSelector((state) => state.user);
  const desktopItems = useSelector((state) => state?.desktop?.items);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(PageActions.changeRoute('Desktop'));
    });
    return unsubscribe;
  }, [navigation]);
  const files_in_que = useSelector((state) => state.files_in_que);
  useEffect(() => {
    if (files_in_que?.tasks?.length
        || files_in_que?.entity_tasks?.length || files_in_que?.tickets?.length) {
      dispatch(uploadFilesInQue({ files_in_que, token }));
    }
  }, []);
  useEffect(() => {
    dispatch(getDesktopItemsStart(token, filter));
  }, []);
  useEffect(() => {
    dispatch(getUserStart(token, user_id));
  }, []);

  return (
    <PageWrapper
      onRefresh={() => dispatch(getDesktopItemsStart(token, filter))}
    >
      {desktopItems?.length ? desktopItems?.map((item) => (
        <ItemPreview
          key={item.id}
          navigation={navigation}
          itemInfo={item}
          task={!!item?.task_template}
          app={!!item?.ticket_priority}
          check={!!item?.entity_task_items}
        />
      )) : <NotFound />}
    </PageWrapper>

  );
};

export default Desktop;
