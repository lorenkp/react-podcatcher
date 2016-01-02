import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
let EpisodeStore = new Store(Dispatcher);
const EpisodeConstants = require('../constants/EpisodeConstants');


let _episodes = {};

function addEpisodes(episodes) {
  _episodes[episodes.description.id] = episodes.episodes
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
  }
};

module.exports = EpisodeStore;
