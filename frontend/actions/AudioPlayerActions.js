import Dispatcher from '../dispatcher/dispatcher';
import AudioPlayerConstants from '../constants/AudioPlayerConstants';
import ApiUtil from '../util/apiUtil'

module.exports = {

  updateTimeElapsed: function(epiGUID, time) {
    Dispatcher.dispatch({
      actionType: AudioPlayerConstants.UPDATE_TIME_ELAPSED,
      epiGUID: epiGUID,
      time: time
    })
  },

  playNoSubPodcast: function(payload) {
    Dispatcher.dispatch({
      actionType: AudioPlayerConstants.PLAY_PODCAST,
      payload: payload
    });
  },

  playSubPodcast: function(payload) {
    // start playing podcast immediately, with info that may have been
    // pulled from server. going to the server to set played, or see if there's
    // duration to know about
    Dispatcher.dispatch({
      actionType: AudioPlayerConstants.PLAY_PODCAST,
      payload: payload
    });
    this.updateEpisodeStatus(payload);
  },

  updateEpisodeStatus: function(payload) {
    ApiUtil.updateEpisodeStatus(payload);
  }
};