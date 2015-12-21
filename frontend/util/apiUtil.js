
module.exports = {
  fetchSearchResults: function(query) {
    $.ajax({
      method: 'GET',
      url: 'api/search',
      data: {
        term: query
      },
      success: function(results) {
        ApiActions.receiveSearchResults(results);
      }
    })
  },
  // searching itunes for the one podcast, bringing back its index
  fetchPodcastListing: function(id) {
    $.ajax({
      method: 'GET',
      url: 'api/search/' + id,
      success: function(podcast) {
        ApiActions.receivePodcastListing(podcast);
      }
    })
  }
};

var ApiActions = require('../actions/apiActions.js')
