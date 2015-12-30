import Dispatcher from '../dispatcher/dispatcher';
import SubscribeConstants from '../constants/SubscribeConstants';
import ApiUtil from '../util/apiUtil';

module.exports = {

  subscribe: function(podcast) {
    Dispatcher.dispatch({
      actionType: SubscribeConstants.ADD_SUBSCRIPTION,
      podcast_id: podcast.collectionId
    });
    ApiUtil.subscribe(podcast);
  },
  unsubscribe: function(podcast) {
    Dispatcher.dispatch({
      actionType: SubscribeConstants.REMOVE_SUBSCRIPTION,
      podcast_id: podcast.collectionId
    });
    ApiUtil.unsubscribe(podcast);
  }
}
