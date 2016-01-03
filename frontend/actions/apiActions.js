var Dispatcher = require('../dispatcher/dispatcher');
var SearchResultsConstants = require('../constants/searchResultsConstants');
var PodcastConstants = require('../constants/PodcastConstants');
var EpisodeConstants = require('../constants/EpisodeConstants');
import ApiConstants from '../constants/ApiConstants'

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
  },

  receivedEpisodes: function(episodes) {
    Dispatcher.dispatch({
      actionType: EpisodeConstants.RECEIVED_EPISODES,
      episodes: episodes
    })
  },

  receivedSubscriptions: function(subscriptions) {
    Dispatcher.dispatch({
      actionType: ApiConstants.RECEIVED_SUBSCRIPTIONS,
      subscriptions: subscriptions
    })
  },

  receivedSubConf: function(id) {
    Dispatcher.dispatch({
      actionType: ApiConstants.RECEIVED_SUB_CONF,
      podcast_id: id
    });
  }
};

