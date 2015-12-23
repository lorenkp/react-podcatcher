import Dispatcher from '../dispatcher/dispatcher';
import PodcastConstants from '../constants/PodcastConstants';
import ApiUtil from '../util/apiUtil';

module.exports = {
  playPodcast: function(mp3Link) {
    Dispatcher.dispatch({
      actionType: PodcastConstants.PLAY_PODCAST,
      mp3Link: mp3Link
    })
  },

  fetchEpisodes: function(id) {
    ApiUtil.fetchEpisodes(id)
  }
};