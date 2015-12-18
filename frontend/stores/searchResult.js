var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SearchResultsStore = new Store(AppDispatcher);
var SearchResultsConstants = require('../constants/searchResultsConstants');

var _results = []

function add(results) {
  _results = results
}

SearchResultsStore.getAll = function() {
  return _results;
}

SearchResultsStore.__onDispatch = function(action) {
  switch (action.actionType) {
    case SearchResultsConstants.SEARCH_RESULTS_RECEIVED:
      add(action.results);
      SearchResultsStore.__emitChange();
  }
};


module.exports = SearchResultsStore;
