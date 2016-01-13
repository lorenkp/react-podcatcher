import { Store } from 'flux/utils';
import AppDispatcher from '../dispatcher/dispatcher'
let SearchResultsStore = new Store(AppDispatcher);
import SearchResultsConstants from '../constants/searchResultsConstants'

var _results = [];
var _listing = [];
let resultsReceived = false;
var audioPlayerStatus = {};

function addResults(results) {
  _results = results;
  resultsReceived = true;
}

function addListing(listing) {
  _listing = listing;
}

function resetSearch() {
  _results = [];
  resultsReceived = false;
}

function updateAudioPlayer(flag, mp3Link) {
  audioPlayerStatus = {
    podcastPlaying: flag,
    mp3Link: mp3Link
  };
}

SearchResultsStore.getResults = function() {
  return (
  {
    results: _results,
    resultsReceived: resultsReceived
  }
  )
}

SearchResultsStore.getListing = function() {
  return _listing;
}

SearchResultsStore.getAudioPlayerStatus = function() {
  return audioPlayerStatus;
}

SearchResultsStore.__onDispatch = function(action) {
  switch (action.actionType) {
    case SearchResultsConstants.SEARCH_RESULTS_RECEIVED:
      addResults(action.results);
      SearchResultsStore.__emitChange();
      break;
    case SearchResultsConstants.PODCAST_LISTING_RECEIVED:
      addListing(action.podcast);
      SearchResultsStore.__emitChange();
      break;

    case SearchResultsConstants.RESET_SEARCH:
      resetSearch()
      SearchResultsStore.__emitChange();
      break;
  }
};

// case SearchResultsConstants.PLAY_PODCAST:
//   updateAudioPlayer(true, action.mp3Link);
//   SearchResultsStore.__emitChange();
//   break;

module.exports = SearchResultsStore;
