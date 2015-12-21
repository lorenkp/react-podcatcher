import React from 'react';
import SearchActions from '../../actions/SearchActions';

var ENTER_KEY_CODE = 13;
var SearchInput = React.createClass({


  getInitialState: function() {
    return {
      value: ''
    };
  },

  fetchSearchResults: function() {
    SearchActions.fetchSearchResults(this.state.value);
  },

  handleOnChange: function(event) {
    this.setState({
      value: event.target.value
    })
  },

  handleOnKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.fetchSearchResults();
    }
  },

  render: function() {
    return (
      <input onChange={ this.handleOnChange } onKeyDown={ this.handleOnKeyDown } value={ this.state.value }
      />

      );
  }

});

module.exports = SearchInput;
