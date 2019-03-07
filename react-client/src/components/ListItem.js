import React, { Component } from 'react';
import PopOver from './Popover.js';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.showSnippet = this.showSnippet.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.onShowWidgets = this.onShowWidgets.bind(this);
    this.onHideWidgets = this.onHideWidgets.bind(this);
  }
  
  shouldComponentUpdate(nextProps, nextState) { 
    if (nextProps.item.note === this.props.item.note && 
      nextProps.item.cardColor === this.props.item.cardColor &&
      nextProps.item.title === this.props.item.title &&
      nextState.show === this.state.show
    ) return false;
    return true;
  }

  showSnippet(note) {
    if (note.length >= 380) return note.slice(0, 200) + '...';
    return note;
  }

  onShowWidgets() {
    this.setState({ show: true });
  }

  onHideWidgets() {
    this.setState({ show: false });
  }

  render() {
    const { show } = this.state;
    return (
      <div className='card h-100'
        onMouseEnter={this.onShowWidgets}
        onMouseLeave={this.onHideWidgets}
        style={{backgroundColor: this.props.item.cardColor || 'white'}}
      >
        <div className='card-body' onClick={this.props.handleModal}>
          <h5 className='card-title'>
            {this.props.item.title}
          </h5>
          <p className='card-text'>
            { this.showSnippet(this.props.item.note) }
          </p>
        </div>
        <div className='card-footer'>
        { show ? 
          <div>
            <button
              className='btn btn-outline-danger show-el'
              onClick={() => this.props.onDelete(this.props.item._id)}
            ><i className='far fa-trash-alt'></i>
            </button>
            <PopOver 
              id={this.props.item._id}
              onColorChange={this.props.onColorChange}
              item={this.props.item}
            />
          </div>
        :
          <button className='btn btn-outline-danger'
            onClick={() => this.props.onDelete(this.props.item._id)}>
            <i className='far fa-trash-alt'></i>
          </button>
        }
        </div>
      </div>
    );
  }
}