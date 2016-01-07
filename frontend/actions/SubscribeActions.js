import Dispatcher from '../dispatcher/dispatcher';
import SubscribeConstants from '../constants/SubscribeConstants';
import SubscriptionStore from '../stores/SubscriptionStore';
import ApiUtil from '../util/apiUtil';

module.exports = {

  subscribe: function(podcast) {
    let subscription = {};
    subscription[podcast.collectionId] = Date.now();
    Dispatcher.dispatch({
      actionType: SubscribeConstants.ADD_SUBSCRIPTION,
      subscription: subscription
    });
    ApiUtil.subscribe(podcast);
  },
  unsubscribe: function(podcast) {
    const podcastId = podcast.collectionId
    let subId = SubscriptionStore.getSubscriptionId(podcastId);
    Dispatcher.dispatch({
      actionType: SubscribeConstants.REMOVE_SUBSCRIPTION,
      podcast_id: podcastId
    });
    ApiUtil.unsubscribe(subId);
  }
}
