import React from 'react';
import SearchActions from '../../actions/SearchActions';
import SearchResultStore from '../../stores/searchResult';
import Episode from '../Episode';

let listenerToken

function getListing() {
  return {
    listing: SearchResultStore.getListing()
  }
}


var PodcastShow = React.createClass({
  getInitialState: function() {
    return getListing()
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
        <h1>{ this.state.listing.pop() }</h1>
        <ul>
          { this.state.listing.map(function(episode, index) {
              return (
                <Episode key={ index } episodeInfo={ episode } />
                )
            }) }
        </ul>
      </div>
      )
  }

});

module.exports = PodcastShow;