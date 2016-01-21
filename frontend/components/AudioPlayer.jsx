import React from 'react';
import AudioPlayerActions from '../actions/AudioPlayerActions';
import AudioPlayerStore from '../stores/AudioPlayerStore'
import EpisodeStatusStore from '../stores/EpisodeStatusStore'
import EpisodeActions from '../actions/EpisodeActions'

let audioPlayerListenerToken;
let episodeStatusListenerToken;

const SAVE_INTERVAL = 10;

function getPlayingStatus() {
  return AudioPlayerStore.getPlayingStatus()
}

const AudioPlayer = React.createClass({

  getInitialState: function() {
    return getPlayingStatus();
  },

  componentDidMount: function() {
    audioPlayerListenerToken = AudioPlayerStore.addListener(this._onChange);
    episodeStatusListenerToken = EpisodeStatusStore.addListener(this._onChange)
  },

  componentWillUnmount: function() {
    audioPlayerListenerToken.remove();
    episodeStatusListenerToken.remove();
  },

  componentDidUpdate: function() {
    this.player = document.getElementById('player');
  },

  componentWillUpdate: function() {
    if (this.savingInterval) {
      this.saveStatus();
      this.stopSavingInterval();
    }
  },

  _onChange: function() {
    this.setState(getPlayingStatus());
  },

  handlePause: function() {
    this.saveStatus();
    this.stopSavingInterval();
  },

  setPlaybackPosition: function() {
    if (!this.state.playbackPositionLoaded) {
      this.player.currentTime = this.state.subscription.timeElapsed;
      this.state.playbackPositionLoaded = true;
    }
  },

  startSavingInterval: function() {
    this.savingInterval = setInterval(function() {
      this.saveStatus()
    }.bind(this), SAVE_INTERVAL * 1000);
  },

  saveStatus: function() {
    const podcastId = this.state.collectionId;
    const epiGUID = this.state.guid;
    const subId = this.state.subscription.id;
    EpisodeActions.updateEpisodeStatus(podcastId, epiGUID, subId, {
      timeElapsed: this.player.currentTime
    })
  // AudioPlayerActions.updateTimeElapsed(this.state.epiGUID, this.player.currentTime);
  },

  stopSavingInterval: function() {
    clearInterval(this.savingInterval);
  },

  handlePausePlay: function() {
    if (this.player.paused) {
      this.player.play()
      AudioPlayerActions.play();
    } else {
      this.player.pause();
      AudioPlayerActions.pause();
    }
  },

  isSubPodcast: function() {
    if (this.state.subscription) {
      return (
        <audio autoPlay onPlay={ this.startSavingInterval } onCanPlayThrough={ this.setPlaybackPosition }
        onPause={ this.handlePause } onEnded={ this.stopSavingInterval } id="player" controls src={ this.state.url }
        />
        )
    } else {
      return (
        <audio id="player" autoPlay controls src={ this.state.url } />
        )
    }
  },

  render: function() {
    if (Object.keys(this.state).length < 1) {
      return null
    }
    return (
      <div className="audio-player">
        <i onClick={ this.handlePausePlay } className={ this.state.paused ? "fa fa-play play-button" : "fa fa-pause play-button" }></i>
        <span className="skip_forward_button"></span>
        { this.isSubPodcast() }
      </div>
      );
  }
});

module.exports = AudioPlayer;
