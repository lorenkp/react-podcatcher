import React from 'react';
import PodcastAppActions from '../../actions/PodcastAppActions';
import { Link } from 'react-router';

const Episode = React.createClass({
  handleClick: function() {
    const mp3Link = this.props.episodeInfo.enclosure.url;
    PodcastAppActions.playPodcast(mp3Link, true);
  },

  render: function() {
    const episodeInfo = this.props.episodeInfo;
    const {title, pubDate, description, enclosure} = episodeInfo;
    const duration = episodeInfo['itunes:duration']
    const splitDate = pubDate.split(' ');
    const day = splitDate[1];
    const month = splitDate[2];
    const link = 'podcast/' + this.props.podcastId + '/' + window.btoa(this.props.episodeInfo.guid)

    return (
      <div onClick={ this.handleClick } className="episode-description">
        <div className="episode-date">
          <p>
            { month }
          </p>
          <p>
            { day }
          </p>
        </div>
        <span>{ title }</span>
        <span>{ duration }</span>
      </div>
      );
  }
});

module.exports = Episode;