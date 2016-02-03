import Dispatcher from '../dispatcher/dispatcher';
import SearchResultsConstants from '../constants/searchResultsConstants';
import ApiUtil from '../util/apiUtil';

module.exports = {
  fetchSearchResults: function(query) {
    ApiUtil.fetchSearchResults(query);
  },

  resetSearch: function() {
    Dispatcher.dispatch({
      actionType: SearchResultsConstants.RESET_SEARCH
    })
  },

  searchTermChange: function(term) {
    Dispatcher.dispatch({
      actionType: SearchResultsConstants.SEARCH_TERM_CHANGE,
      term: term
    })
  },

  hideSearchResults: function() {
    Dispatcher.dispatch({
      actionType: SearchResultsConstants.HIDE_SEARCH_RESULTS
    })
  }
};