import React from 'react';
// import SearchInput from './searchInput';
import SearchResultStore from '../../stores/SearchStore';
import SearchResultTable from './searchResultTable';
import SearchActions from '../../actions/SearchActions';

let searchDelay

let listenerToken

function getSearchState() {
  return SearchResultStore.getSearchState()
}

const SearchView = React.createClass({

  getInitialState: function() {
    return getSearchState();
  },

  fetchSearchResults: function() {
    if (this.state.searchTerm !== '') {
      SearchActions.fetchSearchResults(this.state.searchTerm);
    }
  },

  componentDidMount: function() {
    listenerToken = SearchResultStore.addListener(this._onChange);
  },

  componentWillUnmount: function() {
    listenerToken.remove();
  },

  handleOnChange: function(event) {
    searchDelay && clearTimeout(searchDelay);
    searchDelay = setTimeout(this.fetchSearchResults, 300);
    SearchActions.searchTermChange(event.target.value);
  },

  _onChange: function() {
    this.setState(getSearchState())
  },

  render: function() {
    return (
      <div className="search-view">
        <input placeholder="Search for Podcasts" onChange={ this.handleOnChange } value={ this.state.value }
        />
        { this.state.resultsReceived ? <SearchResultTable onBlur={ SearchActions.hideSearchResults } results={ this.state.results } /> : null }
      </div>
      )
  }
});

module.exports = SearchView;