import React from 'react';
import SearchInput from './searchInput';
import SearchResultStore from '../../stores/SearchStore';
import SearchResultTable from './searchResultTable';

let listenerToken

function getResults() {
  return SearchResultStore.getResults()
}

const SearchView = React.createClass({

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
    this.setState(getResults())
  },

  render: function() {
    return (
      <div className="search-view">
        <SearchInput />
        { this.state.resultsReceived ? <SearchResultTable results={ this.state.results } /> : null }
      </div>
      )
  }
});

module.exports = SearchView;