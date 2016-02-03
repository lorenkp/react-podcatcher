import React from 'react';
import EpisodeTable from '../episode/EpisodeTable';
import ApiUtil from '../../util/apiUtil';
import EpisodeStore from '../../store/EpisodeStore';

let episodeStoreToken;

function getNewReleases() {
  return EpisodeStore.getNewReleases();
}

const NewReleasesView = React.createClass({

  getInitialState: function() {
    return getNewReleases();
  },

  componentDidMount: function() {
    episodeStoreToken = EpisodeStore.addListener(this._onChange);
    ApiUtil.fetchNewReleases();
  },

  componentWillUnmount: function() {
    episodeStoreToken.remove();
  },

  _onChange: function() {
    this.setState(getNewReleases());
  },

  render: function() {
    return <EpisodeTable episodes={ this.state } />
  }
});

module.exports = NewReleasesView;
