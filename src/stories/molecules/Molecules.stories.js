import * as React from 'react';

import AvatarEmployee from '../../component/molecules/AvatarEmployee';
import { Employee } from '../../container/home/types';
import { storiesOf } from '@storybook/react';

storiesOf('Molecules', module)
  .add('직원', () =>
    React.createElement(() => {
      const [employee, setEmployee] = React.useState(new Employee('Jinbeom Jeong'));
      return (
        <AvatarEmployee employee={employee} />
      );
    }));
