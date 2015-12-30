import React from 'react';
import SubscriptionStore from '../../stores/SubscriptionStore'

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
        <ul>
          { this.state.subscriptions.map(function(podcast) {
              return (
                <li>
                  { podcast.collectionName }
                </li>
                )
            }) }
        </ul>
      </div>
      )
  }
});

module.exports = Sidebar;