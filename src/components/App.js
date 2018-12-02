import React from 'react';

import Header from './Header';
import Panel from './Panel';
import Board from './Board';
import Cart from './Cart';
import Alert from './Alert';

const App = () => {
  return (
    <div>
      <Header />
      <Panel />
      <Board />
      <Cart />
      <Alert />
    </div>
  );
}

export default App;