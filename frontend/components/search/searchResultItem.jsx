import React from 'react';
import { Link } from 'react-router';



const SearchResultItem = React.createClass({


  render: function() {
    const podcast = this.props.podcast
    const title = podcast.collectionName;
    const artworkUrl = podcast.artworkUrl100;
    const artist = podcast.artistName;
    const collectionId = podcast.collectionId;
    const searchLink = 'search/' + collectionId;
    return (
      <Link to={ searchLink }>
      <img src={ artworkUrl }></img>
      <div className="podcast-description">
        <p className="title">
          { title }
        </p>
        <p className="artist">
          { artist }
        </p>
      </div>
      </Link>
      );
  }

});

module.exports = SearchResultItem;
