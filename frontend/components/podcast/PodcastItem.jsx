import React from 'react';
import { Link } from 'react-router';
import { History } from 'react-router';
import SearchActions from '../../actions/SearchActions';

const PodcastItem = React.createClass({
  mixins: [History],

  goToPodcastIndex: function() {
    const collectionId = this.props.podcast.collectionId
    const podcastIndex = 'podcasts/' + collectionId + '/episodes';
    SearchActions.resetSearch();
    this.history.push(podcastIndex + '?feedUrl=' + this.props.podcast.feedUrl)
  },

  render: function() {
    if (typeof this.props.podcast === 'undefined') {
      return null
    }
    const collectionId = this.props.podcast.collectionId

    const podcast = this.props.podcast
    const title = podcast.collectionName;
    const artworkUrl = podcast.artworkUrl600;
    const artist = podcast.artistName;

    return (
      <div onClick={ this.goToPodcastIndex } className="podcast-item">
        <img src={ artworkUrl }></img>
        <div className="podcast-text">
          <p className="title">
            { title }
          </p>
          <p className="artist">
            { artist }
          </p>
        </div>
      </div>

      );
  }

});

module.exports = PodcastItem;
