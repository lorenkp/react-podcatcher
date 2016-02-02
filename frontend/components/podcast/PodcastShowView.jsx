import React from 'react';
import PodcastActions from '../../actions/PodcastActions';
import EpisodeActions from '../../actions/EpisodeActions';
import PodcastStore from '../../stores/PodcastStore'
import EpisodeStore from '../../stores/EpisodeStore'
import SubscriptionStore from '../../stores/SubscriptionStore'
import PodcastDescription from './PodcastDescription';
import EpisodeTable from '../episode/EpisodeTable';

let podcastStoreToken;
let subscriptionStoreToken;
let episodeStoreToken;

function getPodcast() {
  let id = this.props.params.id;
  return {
    info: PodcastStore.getPodcast(id),
    subscribed: SubscriptionStore.checkSub(id),
    episodes: EpisodeStore.getEpisodes(id)
  }
}

// function getNewReleases() {
//   return {
//     episodes: EpisodeStore.getNewReleases()
//   }
// }

// function getInProgress() {
//   return {
//     episodes: EpisodeStore.getInProgress()
//   }
// }

const PodcastShowView = React.createClass({
  getInitialState: function() {
    // this.action = this.props.route.path;
    // switch (this.action) {
    //   case 'new_releases':
    //     return getNewReleases();
    //   case 'podcasts/:id/episodes':
    //     debugger
    //     return getPodcast(this.props.params.id);
    // }
    return getPodcast.bind(this)();
  },

  componentDidMount: function() {
    const id = this.props.params.id;
    const feedUrl = this.props.location.query.feedUrl

    podcastStoreToken = PodcastStore.addListener(this._onChange);
    subscriptionStoreToken = SubscriptionStore.addListener(this._onChange);
    episodeStoreToken = EpisodeStore.addListener(this._onChange);
    PodcastActions.fetchPodcast(id);
    EpisodeActions.fetchEpisodes(id, feedUrl);
  // this.findAction();
  },

  // currentPath: function() {
  //   return this.props.route.path;
  // },

  // findAction: function() {
  //   switch (this.currentPath()) {
  //     case 'podcasts/:id/episodes':
  //       this.showPodcast()
  //       break;
  //     case 'podcasts/new_releases':
  //       this.showNewReleases();
  //       break;
  //     case 'podcasts/in_progress':
  //       this.showInProgress();
  //       break;
  //   // default:
  //   //   debugger
  //   //   const collectionId = this.props.params.id;
  //   //   const feedUrl = this.props.location.query.feedUrl;
  //   //   PodcastActions.fetchPodcast(this.props.params.id);
  //   //   EpisodeActions.fetchEpisodes(collectionId, feedUrl);
  //   //   break;
  //   }
  // },

  // showInProgress: function() {
  //   this.setState(getInProgress());
  // },

  // showPodcast: function() {
  //   let collectionId = this.props.params.id;
  //   let feedUrl = this.props.location.query.feedUrl;
  //   getPodcast(this.props.params.id);
  //   PodcastActions.fetchPodcast(collectionId);
  //   EpisodeActions.fetchEpisodes(collectionId, feedUrl);
  // },

  // showNewReleases: function() {
  //   this.setState(getNewReleases());
  // },

  componentDidUpdate: function(prevProps) {
    let currentId = this.props.params.id;
    let previousId = prevProps.params.id;
    if (currentId !== previousId) {
      this.setState(getPodcast.bind(this)())
      PodcastActions.fetchPodcast(currentId);
      const feedUrl = this.props.location.query.feedUrl;
      EpisodeActions.fetchEpisodes(currentId, feedUrl);
    }
  },

  componentWillUnmount: function() {
    podcastStoreToken.remove();
    subscriptionStoreToken.remove();
    episodeStoreToken.remove();
  },

  _onChange: function() {
    // switch (this.currentPath()) {
    //   case 'podcasts/:id/episodes':
    //     this.setState(getPodcast(this.props.params.id));
    //     break;
    //   case 'podcasts/new_releases':
    //     this.setState(getNewReleases());
    //     break;
    //   case 'podcasts/in_progress':
    //     this.setState(getInProgress());
    //     break;
    // }
    this.setState(getPodcast.bind(this)())
  },

  // showDescription: function() {
  //   if (this.currentPath() === 'podcasts/:id/episodes') {
  //     return <PodcastDescription podcast={ this.state } />
  //   }
  // },

  render: function() {

    // if (Object.keys(this.state).length === 0) {
    //   return null
    // }
    return (
      <div>
        <PodcastDescription podcast={ this.state } />
        <EpisodeTable episodes={ this.state.episodes } />
      </div>
      )
  }

});

module.exports = PodcastShowView;