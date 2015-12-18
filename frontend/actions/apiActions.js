var Dispatcher = require('../dispatcher/dispatcher.js');
var SearchResultsConstants = require('../constants/searchResultsConstants.js');

module.exports = {
  receiveSearchResults: function(results) {
    Dispatcher.dispatch({
      actionType: SearchResultsConstants.SEARCH_RESULTS_RECEIVED,
      results: results
    });
  }
};
