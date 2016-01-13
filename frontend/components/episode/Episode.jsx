import React from 'react';
import AudioPlayerActions from '../../actions/AudioPlayerActions';
import EpisodeActions from '../../actions/EpisodeActions';
import { Link } from 'react-router';

const Episode = React.createClass({
  handlePlay: function() {
    const mp3Link = this.props.episodeInfo.url;
    if (this.props.episodeInfo.subscription) {
      AudioPlayerActions.playSubPodcast({
        played: true,
        isSub: true,
        id: this.props.episodeInfo.subscription.id,
        collectionId: this.props.episodeInfo.collectionId,
        epiGUID: this.props.episodeInfo.guid,
        mp3Link: mp3Link,
        playing: true
      });
    } else {
      AudioPlayerActions.playNoSubPodcast({
        mp3Link: mp3Link,
        playing: true
      });
    }
  },

  played: function() {
    const subscription = this.props.episodeInfo.subscription
    if (subscription && subscription.played === false) {
      return 'Unplayed'
    }
  },

  render: function() {
    const episodeInfo = this.props.episodeInfo;
    const {title, pubDate, description} = episodeInfo;
    // const duration = episodeInfo['itunes:duration']
    const splitDate = pubDate.split(' ');
    const day = splitDate[1];
    const month = splitDate[2];
    const link = 'podcast/' + this.props.podcastId + '/' + window.btoa(this.props.episodeInfo.guid)

    return (
      <div onClick={ this.handlePlay } className="episode-description">
        <div className="episode-date">
          <p>
            { month }
          </p>
          <p>
            { day }
          </p>
        </div>
        <span>{ title }</span>
        { this.played() }
      </div>
      );
  }
});

module.exports = Episode;
