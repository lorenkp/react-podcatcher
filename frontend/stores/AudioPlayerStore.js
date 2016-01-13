import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import EpisodeStatusStore from './EpisodeStatusStore';
let AudioPlayerStore = new Store(Dispatcher);
const AudioPlayerConstants = require('../constants/AudioPlayerConstants');

let _playerStatus = {
  mp3Link: '',
  timeElapsed: 0,
  isSub: false,
  playing: false,
  loaded: false,
  epiGUID: ''
};

function setPlayingStatus(payload) {
  Object.keys(payload).forEach(function(attr) {
    _playerStatus[attr] = payload[attr]
  });
}

AudioPlayerStore.getPlayingStatus = function() {
  EpisodeStatus
  return _playerStatus;
};

AudioPlayerStore.__onDispatch = function(action) {
  switch (action.actionType) {
    case AudioPlayerConstants.PLAY_PODCAST:
      setPlayingStatus(action.payload);
      AudioPlayerStore.__emitChange();
      break;
  }
};

module.exports = AudioPlayerStore;
