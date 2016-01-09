import React from 'react';
import PodcastAppActions from '../../actions/PodcastAppActions';
import EpisodeActions from '../../actions/EpisodeActions';
import {Link} from 'react-router';

const Episode = React.createClass({
  handleClick: function() {
    const mp3Link = this.props.episodeInfo.url;
    PodcastAppActions.playPodcast(mp3Link, true);
    if (this.props.episodeInfo.subscription[0]) {
      EpisodeActions.updateEpisodeStatus({played: true, id: this.props.episodeInfo.subscription[0].id, collectionId: this.props.episodeInfo.collectionId, guid: this.props.episodeInfo.guid});
    }
  },

  played: function() {
    const subscription = this.props.episodeInfo.subscription[0];
    if (typeof this.props.episodeInfo.subscription[0] !== 'undefined' && subscription.played === false) {
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
      <div onClick={this.handleClick} className="episode-description">
        <div className="episode-date">
          <p>
            {month}
          </p>
          <p>
            {day}
          </p>
        </div>
        <span>{title}</span>
        {this.played()}
      </div>
    );
  }
});

module.exports = Episode;
