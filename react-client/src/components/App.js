import React, { Component } from 'react';
import $ from 'jquery';
import List from './List.js';
import Form from './Form.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    $.ajax({
      url: '/notes', 
      success: (data) => {
        this.setState({
          items: data
        });
        console.log('Data fetched successfully!');
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  postData(text, title, date) {
    $.ajax({
      type: 'POST',
      url: '/notes',
      data: {note: text, title, date},
      success: (data) => {
        this.setState({
          items: data
        });
        console.log('Note successfully added!');
      },
      error: (error) => {
        console.error('Note failed to add! ', error);
      }
    });
  }

  deleteData(id) {
    $.ajax({
      type: 'DELETE',
      url: '/notes', 
      data: {_id: id},
      success: (data) => {
        this.setState({
          items: data,
          deleted: true
        });
        console.log('Note successfully deleted!');
      },
      error: (error) => {
        console.error('Note failed to delete! ', error);
      }
    });
  }

  updateCardColorData(id, color) {
    $.ajax({
      type: 'PUT',
      url: '/notes',
      data: {id, color},
      success: (data) => {
        this.setState({
          items: data
        });
        console.log('Card successfully changed color!');
      },
      error: (error) => {
        console.error('Card failed to change color! ', error);
      }
    });
  }

  updateModalData(id, note, title) {
    $.ajax({
      type: 'PUT',
      url: '/modal-notes',
      data: {id, note, title},
      success: (data) => {
        this.setState({
          items: data
        });
        console.log('Card successfully updated!');
      },
      error: (error) => {
        console.error('Card failed to updated! ', error);
      }
    });
  }

  render() {
    return (
      <div>
        <Form onFormSubmit={this.postData.bind(this)} />
        <List 
          items={this.state.items}
          onDelete={this.deleteData.bind(this)}
          onUpdateColor={this.updateCardColorData.bind(this)}
          onModalUpdate={this.updateModalData.bind(this)}
        />
      </div>
    );
  }
}