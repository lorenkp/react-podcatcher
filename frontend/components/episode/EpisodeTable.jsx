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
    const collectionId = this.props.params.id;
    const feedUrl = this.props.location.query.feedUrl;
    EpisodeActions.fetchEpisodes(collectionId, feedUrl);
  },

  componentDidUpdate: function(prevProps) {
    let oldId = prevProps.params.id
    let newId = this.props.params.id
    if (newId !== oldId) {
      this.setState(getEpisodes(newId)) || EpisodeActions.fetchEpisodes(newId,
        this.props.location.query.feedUrl)

    }
  },

  componentWillUnmount: function() {
    listenerToken.remove();
  },

  _onChange: function() {
    this.setState(getEpisodes(this.props.params.id));
  },

  render: function() {

    if (typeof this.state.episodes === 'undefined') {
      return null
    }


    let podcastId = this.props.params.id;

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