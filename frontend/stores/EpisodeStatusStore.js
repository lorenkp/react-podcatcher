import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
let EpisodeStatusStore = new Store(Dispatcher);
const ApiConstants = require('../constants/ApiConstants');
const AudioPlayerConstants = require('../constants/AudioPlayerConstants');

let _episodeStatuses = {};


function addInitialStatuses(subscriptions) {
  subscriptions.forEach(function(sub) {
    sub.episodes.forEach(function(episode) {
      _episodeStatuses[episode['guid']] = episode.subscription
    })
  })
}

function updateTimeElapsed(epiGUID, time) {
  _episodeStatuses[epiGUID]['timeElapsed'] = time;
}

EpisodeStatusStore.getTimeElapsed = function(GUID) {
  return _episodeStatuses[GUID]['timeElapsed'];
}

EpisodeStatusStore.__onDispatch = function(action) {
  switch (action.actionType) {
    case ApiConstants.RECEIVED_SUBSCRIPTIONS:
      addInitialStatuses(action.subscriptions);
      break;
    case AudioPlayerConstants.UPDATE_TIME_ELAPSED:
      updateTimeElapsed(action.epiGUID, action.time);
      EpisodeStatusStore.__emitChange()
      break;
  }
}

module.exports = EpisodeStatusStore;
