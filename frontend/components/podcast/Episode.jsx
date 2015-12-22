import React from 'react';
import PodcastActions from '../../actions/PodcastActions';
import { Link } from 'react-router';

const Episode = React.createClass({
  handleClick: function() {
    const mp3Link = this.props.episodeInfo.enclosure.url;
    PodcastActions.playPodcast(mp3Link);
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
      <Link to={ link }>
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
      </Link>
      );
  }
});

module.exports = Episode;