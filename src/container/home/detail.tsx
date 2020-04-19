import * as React from 'react';

import HomeLayout from '../../component/layout/HomeLayout';

const HomeDetailContainer = () => {
  return (
    <HomeDetailProvider>
      <HomeLayout />
    </HomeDetailProvider>
  );
};

export default HomeDetailContainer;
