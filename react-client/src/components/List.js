import React from 'react';
import uuidv4 from 'uuid/v4';
import ModalContainer from './Modal.js';

const List = (props) => (
  
  <div className='container'>
    <div className='row'>
      { props.items.map(item => 
        <ModalContainer
          item={item}
          key={uuidv4()}
          onDelete={props.onDelete}
          onColorChange={props.onUpdateColor}
          onModalUpdate={props.onModalUpdate}
        />
      )}
    </div>
  </div>
);

export default List;