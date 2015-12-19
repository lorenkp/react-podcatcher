var Dispatcher = require('../dispatcher/dispatcher');
var SearchResultsConstants = require('../constants/searchResultsConstants');

module.exports = {
  receiveSearchResults: function(results) {
    Dispatcher.dispatch({
      actionType: SearchResultsConstants.SEARCH_RESULTS_RECEIVED,
      results: results
    });
  }
};