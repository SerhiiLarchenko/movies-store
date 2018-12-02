import React from 'react';

import Search from './Search';
import Sort from './Sort';

const Panel = () => {
  return (
    <div className='container'>
      <div className='row'>
        <Sort />
        <Search />
      </div>
    </div>
  )
}

export default Panel;