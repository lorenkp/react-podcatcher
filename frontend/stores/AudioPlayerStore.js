import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import EpisodeStore from './EpisodeStore';
let AudioPlayerStore = new Store(Dispatcher);
const AudioPlayerConstants = require('../constants/AudioPlayerConstants');

let _playerStatus = {};

function loadPodcast(podcastId, epiGUID) {
  _playerStatus = {
    playbackPositionLoaded: false,
    paused: false
  }

  const episode = EpisodeStore.getEpisode(podcastId, epiGUID);
  Object.keys(episode).forEach(function(key) {
    _playerStatus[key] = episode[key];
  })
}

function markPlaying() {
  _playerStatus.paused = false;
}

function markPaused() {
  _playerStatus.paused = true;
}

AudioPlayerStore.getPlayingStatus = function() {
  return _playerStatus;
};

AudioPlayerStore.__onDispatch = function(action) {
  switch (action.actionType) {
    case AudioPlayerConstants.LOAD_PODCAST:
      loadPodcast(action.podcastId, action.epiGUID);
      AudioPlayerStore.__emitChange();
      break;
    case AudioPlayerConstants.PLAY:
      markPlaying();
      AudioPlayerStore.__emitChange();
      break;
    case AudioPlayerConstants.PAUSE:
      markPaused();
      AudioPlayerStore.__emitChange();
      break;
  }
};

module.exports = AudioPlayerStore;
