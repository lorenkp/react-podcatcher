import React from 'react';
import PodcastItem from '../podcast/PodcastItem';

const PodcastIndex = React.createClass({

  render: function() {
    return (
      <div className="sidebar-index">
        { this.props.podcasts.map(function(podcast, index) {
            return (
              <PodcastItem key={ index } podcast={ podcast } />
              )
          }) }
      </div>
      )
  }
});


module.exports = PodcastIndex;