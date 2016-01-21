import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import SubscriptionStore from './SubscriptionStore';
let EpisodeStore = new Store(Dispatcher);
import EpisodeConstants from '../constants/EpisodeConstants';
import ApiConstants from '../constants/ApiConstants';
import SubscribeConstants from '../constants/SubscribeConstants';


let _episodes = {};

let newReleases = [];

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

function isEmpty() {
  return Object.keys(_episodes).length === 0;
}

EpisodeStore.getNewReleases = function() {
  if (Object.keys(_episodes).length < 1) {
    return
  }
  sortByDate()
  newReleases = [];
  const podIds = SubscriptionStore.getPodIds();
  podIds.forEach(function(id) {
    if (_episodes[id][0].subscription.played === false) {
      newReleases.push(_episodes[id][0]);
    }
  })
  return newReleases;
}

EpisodeStore.getInProgress = function() {
  if (isEmpty()) {
    return
  }
  let inProgress = []
  const podIds = SubscriptionStore.getPodIds();
  podIds.forEach(function(id) {
    _episodes[id].forEach(function(episode) {
      if (episode.subscription.played === true) {
        inProgress.push(episode);
      }
    });
  });

  inProgress.sort(function(a, b) {
    return new Date(b.pubDate) - new Date(a.pubDate);
  })

  return inProgress;
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
  // case SubscribeConstants.RECEIVED_NEW_RELEASES:
  //   addNewReleases(action.newReleases);
  //   EpisodeStore.__emitChange();
  //   break;
  }
};

module.exports = EpisodeStore;
