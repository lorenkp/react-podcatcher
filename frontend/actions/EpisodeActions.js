import Dispatcher from '../dispatcher/dispatcher';
import PodcastConstants from '../constants/PodcastConstants';
import EpisodeConstants from '../constants/EpisodeConstants';
import ApiUtil from '../util/apiUtil';

module.exports = {
  // playPodcast: function(mp3Link) {
  //   Dispatcher.dispatch({
  //     actionType: PodcastConstants.PLAY_PODCAST,
  //     mp3Link: mp3Link
  //   });
  // },

  fetchEpisodes: function(collectionId, feedUrl) {
    ApiUtil.fetchEpisodes(collectionId, feedUrl);
  }
};