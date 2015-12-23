import React from 'react';

var PodcastDescription = React.createClass({
  render: function() {
    const {artistName, collectionName, artworkUrl600} = this.props.description;
    return (
      <div className="podcast-description">
        <img src={ artworkUrl600 }></img>
        <div className="podcast-description-text">
          <h1>{ collectionName }</h1>
          <p>
            { artistName }
          </p>
        </div>
      </div>

      )
  }

});

module.exports = PodcastDescription;