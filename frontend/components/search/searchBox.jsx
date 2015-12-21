import React from 'react';
import SearchResultStore from '../../stores/searchResult';
import SearchResultTable from './searchResultTable';
import SearchInput from './searchInput';

let listenerToken

function getResults() {
  return {
    results: SearchResultStore.getResults()
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
      <div>
        <h1>{ 'Search' }</h1>
        <div className="searchBox">
          <SearchInput />
          <SearchResultTable results={ this.state.results } />
        </div>
      </div>
      );

  }
});

module.exports = SearchBox;
