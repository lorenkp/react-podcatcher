import React from 'react';
import Episode from './Episode';

var PodcastTable = React.createClass({
  render: function() {
    if (Object.keys(this.props.listing).length < 1) {
      return null;
    }
    return (
      <ul>
        { this.props.listing.map(function(episode, index) {
            return (
              <Episode key={ index } episodeInfo={ episode } />
              )
          }) }
      </ul>
      );
  }
});

module.exports = PodcastTable;