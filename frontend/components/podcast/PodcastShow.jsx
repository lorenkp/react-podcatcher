import React from 'react';
import SearchActions from '../../actions/SearchActions';
import SearchResultStore from '../../stores/searchResult';
import PodcastTable from './PodcastTable';

let listenerToken

function getListing() {
  return {
    listing: SearchResultStore.getListing()
  }
}


var PodcastShow = React.createClass({
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
    return (
      <div>
        <PodcastTable listing={ this.state.listing } />
      </div>
      )
  }

});

module.exports = PodcastShow;