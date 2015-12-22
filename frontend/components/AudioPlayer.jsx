import React from 'react';

export default class AudioPlayer extends React.Component {
  render() {
    return (
      <div className="audio-player">
        <audio controls autoPlay src={ this.props.mp3Link } />
      </div>
      );
  }
}
