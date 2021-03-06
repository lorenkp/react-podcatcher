import React from 'react';
import SubscriptionStore from '../../stores/SubscriptionStore';
import PodcastIndex from './PodcastIndex';
import NewReleasesButton from './NewReleasesButton';
import InProgressButton from './InProgressButton';

let listenerToken

function getSubscriptions() {

  return {
    subscriptions: SubscriptionStore.getSubscriptions()
  }
}

const SidebarView = React.createClass({
  getInitialState: function() {
    return getSubscriptions();
  },

  componentDidMount: function() {
    listenerToken = SubscriptionStore.addListener(this._onChange)
    $(document).scroll(function() {
      $('.sidebar').css({
        'left': -$(document).scrollLeft()
      })
    })
  },

  componentWillUnmount: function() {
    listenerToken.remove();
  },

  _onChange: function() {
    this.setState(getSubscriptions());
  },

  render: function() {

    // if (this.state.subscriptions.length < 1) {
    //   return null
    // }

    this.state.subscriptions.sort(function(a, b) {
      return b.collectionName - a.collectionName;
    });

    return (
      <div className="sidebar">
        <NewReleasesButton/>
        <InProgressButton/>
        <PodcastIndex podcasts={ this.state.subscriptions } />
      </div>
      )
  }
});

module.exports = SidebarView;