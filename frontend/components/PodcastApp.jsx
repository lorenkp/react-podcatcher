import React from 'react';
import SidebarView from './sidebar/SidebarView';
import AudioPlayer from './AudioPlayer';
import TopbarView from './topbar/TopbarView';

const PodcastApp = React.createClass({
  render: function() {
    return (
      <div className="root">
        <TopbarView />
        <div className="main">
          <SidebarView />
          <div className="podcast-view">
            { this.props.children }
          </div>
        </div>
        <AudioPlayer />
      </div>
      )
  }
});

module.exports = PodcastApp;