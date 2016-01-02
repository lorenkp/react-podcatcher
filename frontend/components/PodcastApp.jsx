import React from 'react';
import Sidebar from './sidebar/SidebarView'
import AudioPlayer from './AudioPlayer'
import PodcastAppStore from '../stores/PodcastAppStore';
import SearchView from './search/SearchView';
import { Link } from 'react-router';

let listenerToken

function getAppState() {
  return {
    playingState: PodcastAppStore.getPlayingStatus()
  }
}

const PodcastApp = React.createClass({
  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    listenerToken = PodcastAppStore.addListener(this._onChange)
  },

  componentWillUnmount: function() {
    listenerToken.remove();
  },

  _onChange: function() {
    this.setState(getAppState());
  },

  isPlaying: function() {
    let status = this.state.playingState;
    if (status.playing === true) {
      return <AudioPlayer mp3Link={ status.mp3Link } />
    }
  },

  render: function() {
    return (
      <div>
        <Sidebar />
        <SearchView />
        { this.isPlaying() }
        <div className="main-window">
          { this.props.children }
        </div>
      </div>
      )
  }
});

module.exports = PodcastApp;