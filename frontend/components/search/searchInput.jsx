import React from 'react';
import SearchActions from '../../actions/SearchActions';

let searchDelay

var SearchInput = React.createClass({


  getInitialState: function() {
    return {
      value: ''
    };
  },

  fetchSearchResults: function() {
    if (this.state.value !== '') {
      SearchActions.fetchSearchResults(this.state.value);
    }
  },

  handleOnChange: function(event) {
    searchDelay && clearTimeout(searchDelay);
    searchDelay = setTimeout(this.fetchSearchResults, 300);
    this.setState({
      value: event.target.value
    })
  },

  render: function() {
    return (
      <input onChange={ this.handleOnChange } value={ this.state.value } />
      );
  }

});

module.exports = SearchInput;
