import React from 'react';

import Search from './Search';
import Sort from './Sort';
import AddFile from './AddFile';
import AddMovie from './AddMovie';

const Panel = () => {
  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <AddMovie />
        <AddFile />
      </div>
      <div className="row">
        <Sort />
        <Search />
      </div>
    </div>
  )
}

export default Panel;