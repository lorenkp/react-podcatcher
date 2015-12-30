import React from 'react';
import { Link } from 'react-router';

const SearchResultItem = React.createClass({
  render: function() {
    const podcast = this.props.podcast
    const title = podcast.collectionName;
    const artworkUrl = podcast.artworkUrl600;
    const artist = podcast.artistName;
    const collectionId = podcast.collectionId;
    const searchLink = 'podcasts/' + collectionId + '/episodes';

    return (
      <div className="podcast-result">
        <Link to={ searchLink }>
        <img src={ artworkUrl }></img>
        <div>
          <p className="title">
            { title }
          </p>
          <p className="artist">
            { artist }
          </p>
        </div>
        </Link>
      </div>
      );
  }

});

module.exports = SearchResultItem;
