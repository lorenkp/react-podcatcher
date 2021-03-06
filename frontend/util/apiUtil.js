module.exports = {

  fetchEpisodes: function(collectionId, feedUrl) {
    $.ajax({
      method: 'GET',
      url: 'api/podcasts/' + collectionId + '/episodes',
      data: {
        feedUrl: feedUrl
      },
      success: function(episodes) {
        ApiActions.receivedEpisodes(episodes);
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

  fetchSearchResults: function(term) {
    $.ajax({
      method: 'GET',
      url: 'api/search/' + encodeURIComponent(term),
      success: function(podcast) {
        ApiActions.receiveSearchResults(podcast);
      }
    });
  },

  fetchNewReleases: function() {
    $.ajax({
      method: 'GET',
      url: 'api/subscriptions/new_releases',
      success: function(newReleases) {
        ApiActions.receivedNewReleases(newReleases)
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
          collection_id: podcast.collectionId
        }

      },
      success: function(sub) {
        ApiActions.receivedSubConf(sub)
        this.fetchEpisodes(sub.podcast.collectionId, sub.podcast.feedUrl)
      }.bind(this)
    });
  },

  unsubscribe: function(id) {
    $.ajax({
      method: 'DELETE',
      url: 'api/subscriptions/' + id,
      success: function(sub) {
        this.fetchEpisodes(sub.podcast.collectionId, sub.podcast.feedUrl)
      }.bind(this)
    });
  },

  updateEpisodeStatus: function(id, payload) {
    $.ajax({
      method: 'PATCH',
      url: 'api/episode_statuses/' + id,
      data: {
        status: payload
      }
    });
  }
};

var ApiActions = require('../actions/apiActions.js')
