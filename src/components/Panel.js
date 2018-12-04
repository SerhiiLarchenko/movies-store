import React from 'react';

import Search from './Search';
import Sort from './Sort';
import AddFile from './AddFile';

const Panel = () => {
  return (
    <div className='container'>
      <div className='row'>
        <Sort />
        <Search />
      </div>
      <div className="row">
        <AddFile />
      </div>
    </div>
  )
}

export default Panel;