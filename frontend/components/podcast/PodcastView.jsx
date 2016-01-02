import React from 'react';
import PodcastActions from '../../actions/PodcastActions';
import PodcastStore from '../../stores/PodcastStore'
import SubscriptionStore from '../../stores/SubscriptionStore'
import PodcastTable from './PodcastTable';
import PodcastDescription from './PodcastDescription';
import AudioPlayer from '../AudioPlayer'

let podcastStoreToken;
let subscriptionStoreToken;

function getPodcast(id) {
  return {
    info: PodcastStore.getPodcast(id),
    subscribed: SubscriptionStore.checkSub(id)
  }
}

var PodcastView = React.createClass({
  getInitialState: function() {
    return getPodcast(this.props.params.id)
  },

  componentDidMount: function() {
    podcastStoreToken = PodcastStore.addListener(this._onChange)
    subscriptionStoreToken = SubscriptionStore.addListener(this._onChange)
    PodcastActions.fetchPodcast(this.props.params.id)
  },

  componentDidUpdate: function(prevProps) {
    let oldId = prevProps.params.id
    let newId = this.props.params.id
    if (newId !== oldId) {
      this.setState(getPodcast(newId)) || PodcastActions.fetchPodcast(newId)
    }
  },

  componentWillUnmount: function() {
    podcastStoreToken.remove();
    subscriptionStoreToken.remove();
  },

  _onChange: function() {
    this.setState(getPodcast(this.props.params.id));
  },

  render: function() {

    if (typeof this.state.info === 'undefined') {
      return null
    }

    return (
      <div>
        <PodcastDescription podcast={ this.state } />
        <div>
          { this.props.children }
        </div>
      </div>
      )
  }

});

module.exports = PodcastView;