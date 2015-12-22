import React from 'react';
import SearchActions from '../../actions/SearchActions';
import PodcastStore from '../../stores/PodcastStore'
import PodcastTable from './PodcastTable';
import PodcastDescription from './PodcastDescription';
import AudioPlayer from '../AudioPlayer'

let listenerToken

function getPodcast(id) {
  return {
    listing: PodcastStore.getPodcast(id),
  }
}

var PodcastView = React.createClass({
  getInitialState: function() {
    return getPodcast(this.props.params.id)
  },

  componentDidMount: function() {
    listenerToken = PodcastStore.addListener(this._onChange)
    SearchActions.fetchPodcast(this.props.params.id)
  },

  componentWillUnmount: function() {
    listenerToken.remove();
  },

  _onChange: function() {
    this.setState(getPodcast(this.props.params.id));
  },

  render: function() {

    if (Object.keys(this.state.listing).length < 1) {
      return null;
    }

    // if (this.state.audioPlayerStatus.podcastPlaying === true) {
    //   var player = <AudioPlayer mp3Link={ this.state.audioPlayerStatus.mp3Link } />
    // }

    return (
      <div>
        <PodcastDescription description={ this.state.listing.description } />
        <PodcastTable listing={ this.state.listing.episodes } podcastId={ this.props.params.id } />
      </div>
      )
  }

});

module.exports = PodcastView;