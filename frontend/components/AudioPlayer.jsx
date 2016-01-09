import React from 'react';
import EpisodeActions from '../actions/EpisodeActions';

function getPlayingState() {
}

const AudioPlayer = React.createClass({

// getInitialState: function() {
//   return getPlayingState();
// },

  componentDidMount: function() {
    let $player = $('#player');
    $player.on('play', function() {
      setInterval(function() {
        if (!$player.paused) {
          EpisodeActions
        }
      });
    })
  },

  render: function() {
    return (
      <div className="audio-player">
        <audio id="player" controls autoPlay src={ this.props.mp3Link } />
      </div>
      );
  }
});

module.exports = AudioPlayer;
