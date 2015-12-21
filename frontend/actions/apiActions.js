var Dispatcher = require('../dispatcher/dispatcher');
var SearchResultsConstants = require('../constants/searchResultsConstants');

module.exports = {
  receiveSearchResults: function(results) {
    Dispatcher.dispatch({
      actionType: SearchResultsConstants.SEARCH_RESULTS_RECEIVED,
      results: results
    });
  },

  receivePodcastListing: function(podcast) {
    Dispatcher.dispatch({
      actionType: SearchResultsConstants.PODCAST_LISTING_RECEIVED,
      podcast: podcast
    })
  }
};

