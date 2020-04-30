import * as React from 'react';

import Spinner from '../../component/atoms/Spinner';
import { storiesOf } from '@storybook/react';

storiesOf('Atoms', module)
.add('로딩', () =>
    React.createElement(() =>
    {
      return (
        <div style={{display: 'flex', backgroundColor: 'lightGray', justifyContent: 'space-around'}}>
          <Spinner />
        </div>
      );
  }))