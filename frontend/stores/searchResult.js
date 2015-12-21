var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SearchResultsStore = new Store(AppDispatcher);
var SearchResultsConstants = require('../constants/searchResultsConstants');

var _results = [];
var _listing = [];

function addResults(results) {
  _results = results
}

function addListing(listing) {
  _listing = listing
}

SearchResultsStore.getResults = function() {
  return _results
}

SearchResultsStore.getListing = function() {
  return _listing
}

SearchResultsStore.__onDispatch = function(action) {
  switch (action.actionType) {
    case SearchResultsConstants.SEARCH_RESULTS_RECEIVED:
      addResults(action.results);
      SearchResultsStore.__emitChange();
      break;
    case SearchResultsConstants.PODCAST_LISTING_RECEIVED:
      addListing(action.podcast)
      SearchResultsStore.__emitChange();
      break;
  }
};


module.exports = SearchResultsStore;
