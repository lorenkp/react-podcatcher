import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
let EpisodeStore = new Store(Dispatcher);
let EpisodeConstants = require('../constants/EpisodeConstants');
const ApiConstants = require('../constants/ApiConstants');
const SubscribeConstants = require('../constants/SubscribeConstants');
const AudioPlayerConstants = require('../constants/AudioPlayerConstants');


let _episodes = {};

function addEpisodes(episodes) {
  const podId = episodes[0].collectionId;
  _episodes[podId] = episodes;
}

function addInitialSubEpisodes(subscription) {
  subscription.forEach(function(podcast) {
    _episodes[podcast.podcast.collectionId] = podcast.episodes
  });
}

function sortByDate() {
  Object.keys(_episodes).forEach(function(podId) {
    _episodes[podId].sort(function(a, b) {
      return new Date(b.pubDate) - new Date(a.pubDate);
    });
  })
}

function addSubscription(podcast) {
  _episodes[Object.keys(podcast)].forEach(function(episode) {
    episode.subscription = {
      played: false,
      timeElapsed: 0,
      favorite: false
    }
  })
}

function updateEpisodeStatus(podcastId, epiGUID, payload) {
  let episode = findEpisode(podcastId, epiGUID);
  Object.keys(payload).forEach(function(e) {
    episode.subscription[e] = payload[e]
  })
}

function findEpisode(podcastId, epiGUID) {
  const episode = _episodes[podcastId].find(function(e) {
    return e.guid === epiGUID
  })
  return episode
}


EpisodeStore.getEpisodes = function(id) {
  sortByDate();
  return _episodes[id]
}

EpisodeStore.getEpisode = function(podcastId, epiGUID) {
  return findEpisode(podcastId, epiGUID);
}

EpisodeStore.__onDispatch = function(action) {
  switch (action.actionType) {
    case EpisodeConstants.RECEIVED_EPISODES:
      addEpisodes(action.episodes);
      EpisodeStore.__emitChange();
      break;
    case SubscribeConstants.ADD_SUBSCRIPTION:
      addSubscription(action.subscription);
      EpisodeStore.__emitChange();
      break;
    case ApiConstants.RECEIVED_SUBSCRIPTIONS:
      addInitialSubEpisodes(action.subscriptions);
      EpisodeStore.__emitChange();
      break;
    case EpisodeConstants.UPDATE_EPISODE_STATUS:
      updateEpisodeStatus(action.podcastId, action.epiGUID, action.payload);
      EpisodeStore.__emitChange();
      break;
  }
};

module.exports = EpisodeStore;
