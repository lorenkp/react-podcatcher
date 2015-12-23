import React from 'react';

var PodcastTable = React.createClass({
  render: function() {
    if (Object.keys(this.props.listing).length < 1) {
      return null;
    }
    var podcastId = this.props.podcastId
    return (
      <ul>
        { this.props.listing.map(function(episode, index) {
            return (
              <Episode key={ index } episodeInfo={ episode } podcastId={ podcastId }
              />
              )
          }) }
      </ul>
      );
  }
});

module.exports = PodcastTable;