import * as React from 'react';

import HomeLayout from '../../component/layout/HomeLayout';
import HomeSBProvider from './HomeSBProvider';
import { storiesOf } from '@storybook/react';

storiesOf('etc...', module)
  .add('homeLayout', () =>
    React.createElement(() =>
    {
      return (
        <HomeSBProvider>
          <HomeLayout />
        </HomeSBProvider>
      );
    }));
