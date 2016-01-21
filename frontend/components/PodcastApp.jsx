import React from 'react';
import Sidebar from './sidebar/SidebarView'
import AudioPlayer from './AudioPlayer'
import SearchView from './search/SearchView';

const PodcastApp = React.createClass({
  render: function() {
    return (
      <div className="root">
        <div className="main">
          <Sidebar />
          <SearchView />
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