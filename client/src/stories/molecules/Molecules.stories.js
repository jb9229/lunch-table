import * as React from 'react';

import AvatarEmployee from '../../component/molecules/AvatarEmployee';
import { Employee } from '../../container/home/types';
import TextInput from '../../component/molecules/TextInput';
import { storiesOf } from '@storybook/react';

storiesOf('Molecules', module)
  .add('입력창', () =>
    React.createElement(() =>
    {
      return (
        <TextInput onChange={() => {}} />
      );
    }))
  .add('직원', () =>
    React.createElement(() =>
    {
      const [employee] = React.useState(new Employee('Jinbeom Jeong long name'));
      return (
        <div style={{display: 'flex', backgroundColor: 'lightGray', justifyContent: 'space-around'}}>
          <AvatarEmployee employee={employee} />
          <AvatarEmployee employee={employee} onClickDelete={() => alert('delete action~~')} />
        </div>
      );
    }))
;
