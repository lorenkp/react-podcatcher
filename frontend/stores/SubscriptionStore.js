import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import SubscribeConstants from '../constants/SubscribeConstants';
import PodcastStore from './PodcastStore';
let SubscribeStore = new Store(Dispatcher);

let _subscriptions = []

function addSubscription(podcast_id) {
  _subscriptions.push(podcast_id);
}

function removeSubscription(podcast_id) {
  let index = _subscriptions.indexOf(podcast_id);
  _subscriptions.splice(index, 1);
}

SubscribeStore.checkSub = function(id) {
  return _subscriptions.indexOf(parseInt(id)) !== -1;
}

SubscribeStore.getSubscriptions = function() {
  return (
  _subscriptions.map(function(el) {
    return PodcastStore.getPodcast(el)
  })
  )
}

SubscribeStore.__onDispatch = function(action) {
  switch (action.actionType) {
    case SubscribeConstants.ADD_SUBSCRIPTION:
      addSubscription(action.podcast_id);
      SubscribeStore.__emitChange();
      break;
    case SubscribeConstants.REMOVE_SUBSCRIPTION:
      removeSubscription(action.podcast_id);
      SubscribeStore.__emitChange();
      break;
  }
}

module.exports = SubscribeStore;