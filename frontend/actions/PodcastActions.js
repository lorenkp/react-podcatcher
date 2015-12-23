import Dispatcher from '../dispatcher/dispatcher';
import PodcastConstants from '../constants/PodcastConstants';
import ApiUtil from '../util/apiUtil';

module.exports = {
  fetchPodcast: function(id) {
    ApiUtil.fetchPodcast(id)
  }
};