import React from 'react';
import AudioPlayerActions from '../actions/AudioPlayerActions';
import AudioPlayerStore from '../stores/AudioPlayerStore'
import EpisodeStatusStore from '../stores/EpisodeStatusStore'

let audioPlayerListenerToken;
let episodeStatusListenerToken;

let SECONDS_INCREASE = 3;

function getPlayingStatus() {
  return AudioPlayerStore.getPlayingStatus()
}

const AudioPlayer = React.createClass({

  getInitialState: function() {
    return getPlayingStatus();
  },

  componentDidMount: function() {
    this.player = document.getElementById('player');
    audioPlayerListenerToken = AudioPlayerStore.addListener(this._onChange);
    episodeStatusListenerToken = EpisodeStatusStore.addListener(this._onChange)
  },

  componentWillUnmount: function() {
    audioPlayerListenerToken.remove();
    episodeStatusListenerToken.remove();
  },

  _onChange: function() {
    this.setState(getPlayingStatus());
  },

  handlePause: function() {
    this.saveStatus();
    this.stopSavingInterval();
  },

  setPlaybackPosition: function() {
    if (!this.state.loaded) {
      this.player.currentTime = this.state.timeElapsed;
      this.state.loaded = true;
    }
  },

  startSavingInterval: function() {
    this.savingInterval = setInterval(function() {
      this.saveStatus()
    }.bind(this), SECONDS_INCREASE * 1000);
  },

  saveStatus: function() {
    debugger
    AudioPlayerActions.updateEpisodeStatus(getPlayingStatus());
  // AudioPlayerActions.updateTimeElapsed(this.state.epiGUID, this.player.currentTime);
  },

  stopSavingInterval: function() {
    clearInterval(this.savingInterval);
  },

  isSubPodcast: function() {
    if (this.state.isSub) {
      return (
        <audio onPlay={ this.startSavingInterval } onCanPlay={ this.setPlaybackPosition } id="player" autoPlay
        controls src={ this.state.mp3Link } />
        )
    } else {
      return (
        <audio id="player" autoPlay controls src={ this.state.mp3Link } />
        )
    }
  },

  render: function() {
    return (
      <div className="audio-player">
        <audio autoPlay onPlay={ this.startSavingInterval } onCanPlayThrough={ this.setPlaybackPosition }
        onPause={ this.handlePause } onEnded={ this.stopSavingInterval } id="player" controls
        src={ this.state.mp3Link } />
      </div>
      );
  }
});

module.exports = AudioPlayer;
