
module.exports = {
  fetchSearchResults: function(term) {
    $.ajax({
      method: 'GET',
      url: 'api/search/' + encodeURIComponent(term),
      success: function(podcast) {
        ApiActions.receiveSearchResults(podcast);
      }
    });
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
    });
  },

  fetchSubscriptions: function() {
    $.ajax({
      method: 'GET',
      url: 'api/subscriptions',
      success: function(subscriptions) {
        ApiActions.receivedSubscriptions(subscriptions)
      }
    })
  },

  subscribe: function(podcast) {
    $.ajax({
      method: 'POST',
      url: 'api/subscriptions',
      data: {
        subscription: {
          artist_name: podcast.artistName,
          collection_name: podcast.collectionName,
          feed_url: podcast.feedUrl,
          artwork_url_600: podcast.artworkUrl600,
          podcast_id: podcast.collectionId
        }

      },
      success: function(sub) {
        ApiActions.receivedSubConf(sub)
      }
    });
  },

  unsubscribe: function(podcast) {
    $.ajax({
      method: 'DELETE',
      url: 'api/subscriptions/' + podcast.collectionId,
      success: function(e) {}
    });
  }
};

var ApiActions = require('../actions/apiActions.js')
