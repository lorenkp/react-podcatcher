import { Store } from 'flux/utils';
import AppDispatcher from '../dispatcher/dispatcher'
let SearchResultsStore = new Store(AppDispatcher);
import SearchResultsConstants from '../constants/searchResultsConstants'

var _searchState = {
  resultsReceived: false,
  searchTerm: '',
  results: null
}

function addResults(results) {
  _searchState.results = results;
  _searchState.resultsReceived = true;
}

function hideSearchResults() {
  _searchState.resultsReceived = false;
}

function changeSearchTerm(term) {
  _searchState.searchTerm = term;
  if (term === '') {
    hideSearchResults();
  }
}

SearchResultsStore.getSearchState = function() {
  return _searchState;
}

SearchResultsStore.__onDispatch = function(action) {
  switch (action.actionType) {
    case SearchResultsConstants.SEARCH_RESULTS_RECEIVED:
      addResults(action.results);
      SearchResultsStore.__emitChange();
      break;
    case SearchResultsConstants.HIDE_SEARCH_RESULTS:
      hideSearchResults()
      SearchResultsStore.__emitChange();
      break;
    case SearchResultsConstants.SEARCH_TERM_CHANGE:
      changeSearchTerm(action.term);
      SearchResultsStore.__emitChange();
      break;
  }
};

module.exports = SearchResultsStore;
