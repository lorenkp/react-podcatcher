import React from 'react';
import SubscribeButton from './SubscribeButton';
import SubscribeActions from '../../actions/SubscribeActions';

var PodcastDescription = React.createClass({
  toggle: function() {
    var podcast = this.props.podcast.info;
    if (this.props.podcast.subscribed) {
      SubscribeActions.unsubscribe(podcast);
    } else {
      SubscribeActions.subscribe(podcast);
    }
  },

  render: function() {
    if (typeof this.props.podcast.info === 'undefined') {
      return null
    }

    const {artistName, collectionName, artworkUrl600} = this.props.podcast.info;
    return (
      <div className="podcast-description">
        <img src={ artworkUrl600 }></img>
        <div className="podcast-description-text">
          <h1>{ collectionName }</h1>
          <p>
            { artistName }
          </p>
          <SubscribeButton onToggle={ this.toggle } subState={ this.props.podcast.subscribed } />
        </div>
      </div>
      )
  }
});

module.exports = PodcastDescription;