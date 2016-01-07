import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
let EpisodeStore = new Store(Dispatcher);
const EpisodeConstants = require('../constants/EpisodeConstants');


let _episodes = {};

function addEpisodes(episodes) {
  const podId = episodes[0].collectionId;
  _episodes[podId] = episodes;
}

function updateEpisodeStatus(status) {
  let episode = _episodes[status.collectionId].find(function(e) {
    return e.guid === status.guid
  })
  Object.keys(status).forEach(function(e) {
    episode.subscription[0][e] = status[e]
  })
}


EpisodeStore.getEpisodes = function(id) {
  return _episodes[id]
}

EpisodeStore.__onDispatch = function(action) {
  switch (action.actionType) {
    case EpisodeConstants.RECEIVED_EPISODES:
      addEpisodes(action.episodes);
      EpisodeStore.__emitChange();
      break;
    case EpisodeConstants.UPDATE_STATUS:
      updateEpisodeStatus(action.status)
      EpisodeStore.__emitChange();
      break;
  }
};

module.exports = EpisodeStore;
