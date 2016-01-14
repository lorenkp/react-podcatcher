import React from 'react';
import AudioPlayerActions from '../actions/AudioPlayerActions';
import AudioPlayerStore from '../stores/AudioPlayerStore'
import EpisodeStatusStore from '../stores/EpisodeStatusStore'
import EpisodeActions from '../actions/EpisodeActions'

let audioPlayerListenerToken;
let episodeStatusListenerToken;

let SECONDS_INCREASE = 10;

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

  // componentDidUpdate: function() {
  //   if (this.savingInterval) {
  //     this.stopSavingInterval();
  //   }
  // },

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
    if (!this.state.loaded) {
      this.player.currentTime = this.state.subscription.timeElapsed;
      this.state.loaded = true;
    }
  },

  startSavingInterval: function() {
    this.savingInterval = setInterval(function() {
      this.saveStatus()
    }.bind(this), SECONDS_INCREASE * 1000);
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
    return (
      <div className="audio-player">
        { this.isSubPodcast() }
      </div>
      );
  }
});

module.exports = AudioPlayer;
