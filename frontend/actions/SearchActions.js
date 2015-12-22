import Dispatcher from '../dispatcher/dispatcher';
import SearchResultsConstants from '../constants/searchResultsConstants';
import ApiUtil from '../util/apiUtil';

module.exports = {
  fetchSearchResults: function(query) {
    ApiUtil.fetchSearchResults(query);
  },

  fetchPodcast: function(id) {
    ApiUtil.fetchPodcast(id)
  }
};