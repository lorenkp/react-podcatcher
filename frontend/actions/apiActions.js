var Dispatcher = require('../dispatcher/dispatcher');
var SearchResultsConstants = require('../constants/searchResultsConstants');
var PodcastConstants = require('../constants/PodcastConstants');

module.exports = {
  receiveSearchResults: function(results) {
    Dispatcher.dispatch({
      actionType: SearchResultsConstants.SEARCH_RESULTS_RECEIVED,
      results: results
    });
  },

  receivedPodcast: function(podcast) {
    Dispatcher.dispatch({
      actionType: PodcastConstants.RECEIVED_PODCAST,
      podcast: podcast
    })
  }
};

