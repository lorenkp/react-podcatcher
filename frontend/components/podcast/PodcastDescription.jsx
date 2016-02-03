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

    const {artistName, collectionName, artworkUrl600, description} = this.props.podcast.info;
    return (
      <div className="podcast-description">
        <SubscribeButton onToggle={ this.toggle } subState={ this.props.podcast.subscribed } />
        <div className="podcast-avatar">
          <img src={ artworkUrl600 }></img>
        </div>
        <div className="podcast-description-text">
          <h1>{ collectionName }</h1>
          <br/>
          <p>
            { artistName }
          </p>
          <br/>
          <p>
            { description }
          </p>
        </div>
      </div>
      )
  }
});

module.exports = PodcastDescription;