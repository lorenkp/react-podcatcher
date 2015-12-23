
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
  },

  fetchEpisodes: function(id) {
    $.ajax({
      method: 'GET',
      url: 'api/podcasts/' + id + '/episodes',
      success: function(episodes) {
        ApiActions.receivedEpisodes(episodes);
      }
    })
  }
};

var ApiActions = require('../actions/apiActions.js')
