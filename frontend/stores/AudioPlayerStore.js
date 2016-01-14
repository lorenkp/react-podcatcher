import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import EpisodeStore from './EpisodeStore';
let AudioPlayerStore = new Store(Dispatcher);
const AudioPlayerConstants = require('../constants/AudioPlayerConstants');

// let _playerStatus = {
//   mp3Link: '',
//   timeElapsed: 0,
//   isSub: false,
//   playing: false,
//   loaded: false,
//   epiGUID: ''
// };

let _playerStatus = {};

function loadPodcast(podcastId, epiGUID) {
  // Object.keys(payload).forEach(function(attr) {
  //   _playerStatus[attr] = payload[attr]
  // });
  _playerStatus = EpisodeStore.getEpisode(podcastId, epiGUID);
  _playerStatus.loaded = false
}

AudioPlayerStore.getPlayingStatus = function() {
  return _playerStatus;
};

AudioPlayerStore.__onDispatch = function(action) {
  switch (action.actionType) {
    case AudioPlayerConstants.PLAY_PODCAST:
      loadPodcast(action.podcastId, action.epiGUID);
      AudioPlayerStore.__emitChange();
      break;
  }
};

module.exports = AudioPlayerStore;
