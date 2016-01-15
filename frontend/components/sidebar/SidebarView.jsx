import React from 'react';
import SubscriptionStore from '../../stores/SubscriptionStore';
import PodcastIndex from './PodcastIndex';
import NewReleasesButton from './NewReleasesButton';

let listenerToken

function getSubscriptions() {

  return {
    subscriptions: SubscriptionStore.getSubscriptions()
  }
}

const Sidebar = React.createClass({
  getInitialState: function() {
    return getSubscriptions();
  },

  componentDidMount: function() {
    listenerToken = SubscriptionStore.addListener(this._onChange)
  },

  componentWillUnmount: function() {
    listenerToken.remove();
  },

  _onChange: function() {
    this.setState(getSubscriptions());
  },

  render: function() {

    if (this.state.subscriptions.length < 1) {
      return null
    }

    this.state.subscriptions.sort(function(a, b) {
      return b.collectionName - a.collectionName;
    });

    return (
      <div className="sidebar">
        <NewReleasesButton/>
        <PodcastIndex podcasts={ this.state.subscriptions } />
      </div>
      )
  }
});

module.exports = Sidebar;