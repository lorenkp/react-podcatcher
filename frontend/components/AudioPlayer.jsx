import React from 'react';

const AudioPlayer = React.createClass({
  componentDidMount: function() {
    const audioPlayer = document.getElementById('player')
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
