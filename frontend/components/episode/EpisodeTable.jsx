import React from 'react';
import EpisodeStore from '../../stores/EpisodeStore'
import EpisodeActions from '../../actions/EpisodeActions';
import Episode from './Episode';

let listenerToken

function getEpisodes(id) {
  return {
    episodes: EpisodeStore.getEpisodes(id)
  }
}

const EpisodeTable = React.createClass({
  getInitialState: function() {
    return getEpisodes(this.props.params.id)
  },

  componentDidMount: function() {
    listenerToken = EpisodeStore.addListener(this._onChange)
    EpisodeActions.fetchEpisodes(this.props.params.id)
  },

  componentWillUnmount: function() {
    listenerToken.remove();
  },

  _onChange: function() {
    this.setState(getEpisodes(this.props.params.id));
  },

  render: function() {
    let podcastId = this.props.params.id;

    if (Object.keys(this.state.episodes).length < 1) {
      return null;
    }
    return (
      <div>
        { this.state.episodes.map(function(episode, index) {
            return (
              <Episode key={ index } episodeInfo={ episode } podcastId={ podcastId }
              />
              )
          }) }
      </div>
      )
  }
});

module.exports = EpisodeTable;