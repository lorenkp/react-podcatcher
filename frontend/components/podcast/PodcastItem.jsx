import React from 'react';
import { Link } from 'react-router';
import { History } from 'react-router';
import SearchActions from '../../actions/SearchActions';

const SearchResultItem = React.createClass({
  mixins: [History],

  goToPodcastIndex: function() {
    const collectionId = this.props.podcast.collectionId
    const podcastIndex = 'podcasts/' + collectionId + '/episodes';
    this.history.push(podcastIndex)
    SearchActions.resetSearch();
  },

  render: function() {
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

module.exports = SearchResultItem;
