import React from 'react';
// import EpisodeStore from '../../stores/EpisodeStore'
// import SubscriptionStore from '../../stores/SubscriptionStore'
// import EpisodeActions from '../../actions/EpisodeActions';
import Episode from './Episode';

// let episodeListenerToken
// // let subscriptionListenerToken

// function getEpisodes(id) {
//   return {
//     episodes: EpisodeStore.getEpisodes(id)
//   }
// }

const EpisodeTable = React.createClass({
  // getInitialState: function() {
  //   return getEpisodes(this.props.params.id)
  // },

  // componentDidMount: function() {
  //   episodeListenerToken = EpisodeStore.addListener(this._onChange);
  //   // subscriptionListenerToken = SubscriptionStore.addListener(this._onChange);
  //   this.findAction();
  // },

  // findAction: function() {
  //   const action = this.props.route.path.split('/')[2];
  //   switch (action) {
  //     case 'new_releases':
  //       this.newReleases()
  //       break;
  //     default:
  //       const collectionId = this.props.params.id;
  //       const feedUrl = this.props.location.query.feedUrl;
  //       EpisodeActions.fetchEpisodes(collectionId, feedUrl);
  //       break;
  //   }
  // },

  // newReleases: function() {},

  // componentDidUpdate: function(prevProps) {
  //   let oldId = prevProps.params.id
  //   let newId = this.props.params.id
  //   if (newId !== oldId) {
  //     this.setState(getEpisodes(newId)) || EpisodeActions.fetchEpisodes(newId,
  //       this.props.location.query.feedUrl)
  //   }
  // },

  // componentWillUnmount: function() {
  //   episodeListenerToken.remove();
  // // subscriptionListenerToken.remove();
  // },

  // is the table being used to show a podcast, or a mixed feed
  // isPodcastShow: function() {
  //   return this.props.route.path === 'episodes';
  // },

  // _onChange: function() {
  //   this.setState(getEpisodes(this.props.params.id));
  // },

  render: function() {

    if (typeof this.props.episodes === 'undefined' || this.props.episodes.length < 1) {
      return null
    }
    // debugger

    const podcastId = this.props.episodes[0].collectionId;

    return (
      <div>
        { this.props.episodes.map(function(episode, index) {
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