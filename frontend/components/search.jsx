var React = require('react');
var ApiUtil = require('../util/apiUtil.js')

var ENTER_KEY_CODE = 13;
var SearchBox = React.createClass({


  getInitialState: function() {
    return {
      value: ''
    };
  },

  fetchSearchResults: function() {
    ApiUtil.fetchSearchResults(this.state.value);
  },

  render: function() {
    return (
      <input
        onChange={this._onChange}
        value={this.state.value}
        onKeyDown={this._onKeyDown}
      />
    );
  },

  _onChange: function(event) {
    this.setState({
      value: event.target.value
    })
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.fetchSearchResults();
    }
  }
});

module.exports = SearchBox;
