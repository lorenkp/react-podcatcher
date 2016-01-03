import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import SubscribeConstants from '../constants/SubscribeConstants';
import ApiConstants from '../constants/ApiConstants';
import PodcastStore from './PodcastStore';
let SubscriptionStore = new Store(Dispatcher);

let _subscriptions = {}

function addSubscription(sub) {
  const podId = Object.keys(sub)[0];
  _subscriptions[podId] = sub[podId];
}

function removeSubscription(podcast_id) {
  delete _subscriptions[podcast_id]
}

function addInitialSubscriptions(subs) {
  subs.forEach(function(subPod) {
    _subscriptions[subPod.podcast.id] = subPod.id
  });
}

SubscriptionStore.getSubscription = function(id) {
  return _subscriptions[id];
}

SubscriptionStore.checkSub = function(id) {
  var subs = [];
  for (var key in _subscriptions) {
    if (_subscriptions.hasOwnProperty(key)) {
      subs.push(parseInt(key))
    }
  }
  return subs.indexOf(parseInt(id)) !== -1;
}

SubscriptionStore.getSubscriptions = function() {
  let podcasts = [];
  for (var key in _subscriptions) {
    if (_subscriptions.hasOwnProperty(key)) {
      podcasts.push(PodcastStore.getPodcast(parseInt(key)))
    }
  }
  return podcasts;
}

SubscriptionStore.__onDispatch = function(action) {
  switch (action.actionType) {
    case SubscribeConstants.ADD_SUBSCRIPTION:
      addSubscription(action.subscription);
      SubscriptionStore.__emitChange();
      break;
    case SubscribeConstants.REMOVE_SUBSCRIPTION:
      removeSubscription(action.podcast_id);
      SubscriptionStore.__emitChange();
      break;
    case ApiConstants.RECEIVED_SUBSCRIPTIONS:
      addInitialSubscriptions(action.subscriptions);
      SubscriptionStore.__emitChange();
      break;
  }
}

module.exports = SubscriptionStore;