import React from 'react';
import SearchActions from '../../actions/SearchActions';
import SearchResultStore from '../../stores/searchResult';
import PodcastTable from './PodcastTable';
import PodcastDescription from './PodcastDescription';

let listenerToken

function getListing() {
  return {
    listing: SearchResultStore.getListing()
  }
}

var PodcastView = React.createClass({
  getInitialState: function() {
    return {
      listing: []
    }
  },

  componentDidMount: function() {
    listenerToken = SearchResultStore.addListener(this._onChange)
    SearchActions.fetchPodcastListing(this.props.params.id)
  },

  componentWillUnmount: function() {
    listenerToken.remove();
  },

  _onChange: function() {
    this.setState(getListing());
  },

  render: function() {

    if (Object.keys(this.state.listing).length < 1) {
      return null;
    }
    return (
      <div>
        <PodcastDescription description={ this.state.listing.description } />
        <PodcastTable listing={ this.state.listing.episodes } />
      </div>
      )
  }

});

module.exports = PodcastView;