import Dispatcher from '../dispatcher/dispatcher';
import AudioPlayerConstants from '../constants/AudioPlayerConstants';

module.exports = {

  updateTimeElapsed: function(epiGUID, time) {
    Dispatcher.dispatch({
      actionType: AudioPlayerConstants.UPDATE_TIME_ELAPSED,
      epiGUID: epiGUID,
      time: time
    })
  },

  pause: function() {
    Dispatcher.dispatch({
      actionType: AudioPlayerConstants.PAUSE
    })
  },

  play: function() {
    Dispatcher.dispatch({
      actionType: AudioPlayerConstants.PLAY
    })
  },

  loadPodcast: function(podcastId, epiGUID) {
    // start playing podcast immediately, with info that may have been
    // pulled from server. going to the server to set played, or see if there's
    // duration to know about

    Dispatcher.dispatch({
      actionType: AudioPlayerConstants.LOAD_PODCAST,
      podcastId: podcastId,
      epiGUID: epiGUID
    });
  }
};