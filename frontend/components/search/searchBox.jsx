var React = require('react');
var SearchResultStore = require('../../stores/searchResult')
var SearchResultTable = require('./searchResultTable');
var SearchInput = require('./searchInput');

var listenerToken

function getResults() {
  return {
    results: SearchResultStore.getAll()
  };
}

var SearchBox = React.createClass({

  getInitialState: function() {
    return getResults();
  },

  componentDidMount: function() {
    listenerToken = SearchResultStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    listenerToken.remove();
  },

  _onChange: function() {
    this.setState(getResults());
  },

  render: function() {
    return (
      <div className="searchBox">
        <SearchInput />
        <SearchResultTable results={ this.state.results } />
      </div>
      );

  }
});

module.exports = SearchBox;
