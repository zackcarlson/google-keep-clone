import React from 'react';
import { PopoverBody, UncontrolledPopover } from 'reactstrap';
import uuidv4 from 'uuid/v4';

export default class PopOver extends React.Component {
  constructor(props) {
    super(props);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(e) {
    let color = e.target.style.backgroundColor;
    this.props.onColorChange(this.props.id, color);
  }

  render() {
    return (
      <span>
        <button 
          className='btn btn-outline-danger show-el'
          id={'PopoverLegacy'+this.props.id}
        >
          <i className='fas fa-palette'></i>
        </button>
        <UncontrolledPopover
          trigger='legacy'
          placement='top'
          target={'PopoverLegacy'+this.props.id}
        >
          <PopoverBody>
          <div className='row'>
            {
              ['white', 'dodgerblue',
               'teal', 'lightgreen',
               'yellow', 'orange',
               'lightgray', 'grey',
               'mediumpurple', 'maroon', 
               'red', 'pink'
              ].map(color => {
                return (
                  <div className='col' key={uuidv4()}>
                    { this.props.item.cardColor === color ? 
                        <button 
                          className={'btn-circle ' + color}
                          onClick={this.handleColorChange}
                          style={{backgroundColor: color, border: color}}
                        >
                          <i className='fa fa-check'></i>
                        </button> 
                        : 
                        <button 
                          className={'btn-circle ' + color}
                          style={{backgroundColor: color, border: color}}
                          onClick={this.handleColorChange}>
                        </button>
                      } 
                  </div>
                );
              })
            }
          </div>
          </PopoverBody>
        </UncontrolledPopover>
      </span>
    );
  }
}