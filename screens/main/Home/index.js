import React from 'react';
import { useSelector } from 'react-redux';
import MainWrapper from '../../../components/Containers/MainWrapper';
import Desktop from '../Desktop';
import Applications from '../Applications';
import Checks from '../Checks';
import Tasks from '../Tasks';

const Home = () => {
  const route = useSelector((state) => state.pages.route);

  const getScreen = (route) => {
    switch (route) {
      case 'Desktop': {
        return <Desktop />;
      }
      case 'Apps': {
        return <Applications />;
      }
      case 'Checks': {
        return <Checks />;
      }
      case 'Tasks': {
        return <Tasks />;
      }
      default: return 'Desktop';
    }
  };

  return (
    <MainWrapper>
      {getScreen(route)}
    </MainWrapper>
  );
};

export default Home;
