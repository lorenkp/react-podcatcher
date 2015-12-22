
module.exports = {
  // fetchSearchResults: function(query) {
  //   $.ajax({
  //     method: 'GET',
  //     url: 'api/search',
  //     data: {
  //       term: query
  //     },
  //     success: function(results) {
  //       ApiActions.receiveSearchResults(results);
  //     }
  //   })
  // },
  // searching itunes for the one podcast, bringing back its index
  fetchSearchResults: function(term) {
    $.ajax({
      method: 'GET',
      url: 'api/search/' + term,
      success: function(podcast) {
        ApiActions.receiveSearchResults(podcast);
      }
    })
  },

  fetchPodcast: function(id) {
    $.ajax({
      method: 'GET',
      url: 'api/podcasts/' + id,
      success: function(podcast) {
        ApiActions.receivedPodcast(podcast);
      }
    });
  }
};

var ApiActions = require('../actions/apiActions.js')
