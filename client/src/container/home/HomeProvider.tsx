import * as React from 'react';

import { Provider } from '../../context/HomeDetailContext';

// Set State

interface Props {
  children?: React.ReactElement;
}

const HomeProvider = (props: Props): React.ReactElement => {
  // Define Action List
  const states = {
  };
  const actions = {
  };

  return (
    <Provider value={{ ...states, ...actions }}>{props.children}</Provider>
  );
};

export default HomeProvider;
