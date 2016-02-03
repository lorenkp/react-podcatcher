var Dispatcher = require('../dispatcher/dispatcher');
var SearchResultsConstants = require('../constants/searchResultsConstants');
var PodcastConstants = require('../constants/PodcastConstants');
var EpisodeConstants = require('../constants/EpisodeConstants');
var SubscribeConstants = require('../constants/SubscribeConstants');
import ApiConstants from '../constants/ApiConstants'

module.exports = {

  // fetchEpisodes: function(collectionId, feedUrl) {
  //   ApiUtil.fetchEpisodes(collectionId, feedUrl);
  // },

  receivedEpisodes: function(episodes) {
    Dispatcher.dispatch({
      actionType: EpisodeConstants.RECEIVED_EPISODES,
      episodes: episodes
    })
  },

  receivedNewReleases: function(newReleases) {
    Dispatcher.dispatch({
      actionType: SubscribeConstants.RECEIVED_NEW_RELEASES,
      newReleases: newReleases
    })
  },

  receivedPodcast: function(podcast) {
    Dispatcher.dispatch({
      actionType: PodcastConstants.RECEIVED_PODCAST,
      podcast: podcast
    })
  },

  receiveSearchResults: function(results) {
    Dispatcher.dispatch({
      actionType: SearchResultsConstants.SEARCH_RESULTS_RECEIVED,
      results: results
    });
  },
  receivedSubConf: function(sub) {
    let subscription = {};
    subscription[sub.podcast.collectionId] = sub.id;
    Dispatcher.dispatch({
      actionType: SubscribeConstants.ADD_SUBSCRIPTION,
      subscription: subscription
    });
  },




  receivedSubscriptions: function(subscriptions) {
    Dispatcher.dispatch({
      actionType: ApiConstants.RECEIVED_SUBSCRIPTIONS,
      subscriptions: subscriptions
    })
  }


};

