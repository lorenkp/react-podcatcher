import React from 'react';
import SubscriptionStore from '../../stores/SubscriptionStore';
import PodcastItem from '../podcast/PodcastItem';

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
    return (
      <div className="sidebar">
        { this.state.subscriptions.map(function(podcast, index) {
            return (
              <PodcastItem key={ index } podcast={ podcast } />
              )
          }) }
      </div>
      )
  }
});

module.exports = Sidebar;