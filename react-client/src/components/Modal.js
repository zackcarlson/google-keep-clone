import React from 'react';
import Rodal from 'rodal';
import $ from 'jquery';
import 'rodal/lib/rodal.css';
import ListItem from './ListItem.js';
import PopOver from './Popover.js';

export default class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modalNote: this.props.item.note,
      modalTitle: this.props.item.title
    };
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleModalUpdate = this.handleModalUpdate.bind(this);
  }

  handleKeyUp(e) {
    let value = e.target.innerText;
    let key = e.target.getAttribute('name');
    this.setState({
      [key]: value
    });
  }

  handleModalUpdate(id, updatedNote, updatedTitle) {
    this.props.onModalUpdate(id, updatedNote, updatedTitle);
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal(){
    const { modalNote, modalTitle } = this.state;
    const { _id } = this.props.item;
    $('.modal-header').removeClass('modal_header_shadow');
    $('.modal-footer').removeClass('modal_footer_shadow');
    this.setState({ open: false });
    if (modalNote !== this.props.item.note || modalTitle !== this.props.item.title) {
      this.handleModalUpdate(_id, modalNote, modalTitle);
    } 
  }

  onScroll(e) {
    if (e.target.scrollTop > 0) {
      $('.modal-header').addClass('modal_header_shadow');
      $('.modal-footer').addClass('modal_footer_shadow'); 
    } else {
      $('.modal-header').removeClass('modal_header_shadow');
      $('.modal-footer').removeClass('modal_footer_shadow'); 
    }
  }

  render() {
    const { open } = this.state;
    return (
      <div className='col-md-6'>
        <ListItem
          item={this.props.item}
          handleModal={this.onOpenModal}
          onDelete={this.props.onDelete}
          onColorChange={this.props.onColorChange}
        />
        <Rodal 
          visible={open}
          onClose={this.onCloseModal}
          animation='zoom'
          customStyles={{
            backgroundColor: this.props.item.cardColor,
          }}>
            <div className='modal-header'>
              <h2 
                contentEditable={true}
                suppressContentEditableWarning={true} 
                name='modalTitle'
                onKeyUp={this.handleKeyUp}
              >
                { this.props.item.title }
              </h2>
            </div>
            <div className='modal-content' onScroll={this.onScroll}>
              <p 
                contentEditable={true}
                suppressContentEditableWarning={true}
                name='modalNote'
                onKeyUp={this.handleKeyUp}
              >
                { this.props.item.note }
              </p>
            </div>
            <div className='modal-footer'>
              <button
                className='btn btn-outline-danger show-el'
                onClick={() => this.props.onDelete(this.props.item._id)}
              >
                <i className='far fa-trash-alt'></i>
              </button>
              <PopOver 
                id={this.props.item._id}
                onColorChange={this.props.onColorChange}
                item={this.props.item}
              />
              <button 
                className='btn btn-outline-dark'
                onClick={this.onCloseModal}
              >
                Close
              </button>
            </div>
        </Rodal>
      </div>
    );
  }
}