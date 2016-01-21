import Dispatcher from '../dispatcher/dispatcher';
import PodcastConstants from '../constants/PodcastConstants';
import EpisodeConstants from '../constants/EpisodeConstants';
import ApiUtil from '../util/apiUtil';

module.exports = {
  fetchEpisodes: function(collectionId, feedUrl) {
    ApiUtil.fetchEpisodes(collectionId, feedUrl);
  },

  updateEpisodeStatus: function(podcastId, epiGUID, subId, payload) {
    Dispatcher.dispatch({
      actionType: EpisodeConstants.UPDATE_EPISODE_STATUS,
      podcastId: podcastId,
      epiGUID: epiGUID,
      payload: payload
    });
    ApiUtil.updateEpisodeStatus(subId, payload);
  }
};