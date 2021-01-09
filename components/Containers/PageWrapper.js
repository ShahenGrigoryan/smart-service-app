import React from 'react';
import { Dimensions, RefreshControl, View } from 'react-native';
import { Content } from 'native-base';
import { useSelector } from 'react-redux';
import PagesBackground from './PagesBackground';

const PageWrapper = ({ children, onRefresh = () => null }) => {
  const { loading, route } = useSelector((state) => state?.pages);
  const isDesktop = route === 'Desktop';
  const isTasks = route === 'Tasks';
  const viewMinHeight = Dimensions.get('window').height - (100 + (isDesktop || isTasks ? 50 : 0));
  return (
    <Content
      scrollEnabled={!loading}
      refreshControl={(
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
        />
            )}
    >
      <PagesBackground>
        <View style={{ minHeight: viewMinHeight, height: '100%' }}>
          {children}
        </View>
      </PagesBackground>
    </Content>
  );
};
export default PageWrapper;
