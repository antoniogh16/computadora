import React from 'react';

const DivTable = ({ children, col, off, classTable, classLoad }) => {
  return (
    <div className='row mt-3'>
      <div className={'col-md-' + col + ' offset-md-' + off}>
        <div className={'card border border-white text-center ' + classLoad}>
          <div className='card-body'>
            <img src="/cat-shocked.gif" className='img-fluid'></img>
          </div>
        </div>
        <div className={'table-responsive ' + classTable}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DivTable;
