import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
let PodcastAppStore = new Store(Dispatcher);
const PodcastAppConstants = require('../constants/PodcastAppConstants');

let episodePlayingStatus = {
  playing: false,
  mp3Link: ''
};

function updatePlayingStatus(mp3Link, toggle) {
  episodePlayingStatus.mp3Link = mp3Link;
  episodePlayingStatus.playing = toggle;
}

PodcastAppStore.getPlayingStatus = function() {
  return episodePlayingStatus;
};

PodcastAppStore.__onDispatch = function(action) {
  switch (action.actionType) {
    case PodcastAppConstants.UPDATE_PLAYING_STATUS:
      updatePlayingStatus(action.mp3Link, action.toggle);
      PodcastAppStore.__emitChange();
      break;
  }
};

module.exports = PodcastAppStore;
