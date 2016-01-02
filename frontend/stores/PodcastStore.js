import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
let PodcastStore = new Store(Dispatcher);
const PodcastConstants = require('../constants/PodcastConstants');

let _podcasts = {};

function addPodcast(podcast) {
  _podcasts[podcast.collectionId] = podcast
}
PodcastStore.getPodcast = function(id) {
  return _podcasts[id];
}

PodcastStore.__onDispatch = function(action) {
  switch (action.actionType) {
    case PodcastConstants.RECEIVED_PODCAST:
      addPodcast(action.podcast);
      PodcastStore.__emitChange();
      break;
  }
};

module.exports = PodcastStore;