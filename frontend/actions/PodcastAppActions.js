import Dispatcher from '../dispatcher/dispatcher';
import PodcastAppConstants from '../constants/PodcastAppConstants';

module.exports = {
  playPodcast: function(mp3Link, toggle) {
    Dispatcher.dispatch({
      actionType: PodcastAppConstants.UPDATE_PLAYING_STATUS,
      mp3Link: mp3Link,
      toggle: toggle
    })
  }
};