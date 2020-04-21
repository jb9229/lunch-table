import * as React from 'react';

import HomeLayout from '../../component/layout/HomeLayout';
import HomeProvider from './HomeProvider';

const HomeDetailContainer = () => {
  return (
    <HomeProvider>
      <HomeLayout />
    </HomeProvider>
  );
};

export default HomeDetailContainer;
