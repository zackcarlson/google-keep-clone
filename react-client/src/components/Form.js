import React, { Component } from 'react';
import $ from 'jquery';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'Take a note...',
      note: '',
      title: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.validInput = this.validInput.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    let date = Date.now();
    const { note, title } = this.state;
    this.clearInput();
    this.props.onFormSubmit(note, title, date);
  }

  clearInput() {
    $('.title-input').val('');
    $('.form-control').val('');
    this.setState({
      title: '',
      note: ''
    });
  }

  validInput() {
    let input = $('.form-control').val();
    if (!input || input.trim().length === 0) {
      return (
        <button
          className='btn btn-outline-primary btn-md'
          disabled
        > Submit </button>
      );
    }
    return (
      <button 
        onClick={this.onFormSubmit}
        className='btn btn-outline-primary btn-md'
      > Submit </button>
    );
  }

  render() {
    const { placeholder } = this.state;
    return (
      <div className='col-lg-6 col-centered'>
        <div className='form-group' 
          tabIndex='0'
        >
          <input
            className='title-input'
            type='text'
            name='title'
            onChange={this.handleChange}
            placeholder='Title'
            autoComplete='off'
          />
          <input
            type='text'
            className='form-control'
            name='note'
            onChange={this.handleChange}
            placeholder={placeholder}
            autoComplete='off'
          />
          <nav className='navbar navbar-light bg-light'>
            { this.validInput() }
            <button 
              className='btn btn-outline-dark'
              onClick={this.clearInput}
            >Close</button>
          </nav>
        </div>
      </div>
    );
  }
}