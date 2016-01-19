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

function getPodcast(id) {
  return {
    info: PodcastStore.getPodcast(id),
    subscribed: SubscriptionStore.checkSub(id),
    episodes: EpisodeStore.getEpisodes(id)
  }
}

function getNewReleases() {
  return {
    episodes: EpisodeStore.getNewReleases()
  }
}

function getInProgress() {
  return {
    episodes: EpisodeStore.getInProgress()
  }
}

const MainView = React.createClass({
  getInitialState: function() {
    // this.action = this.props.route.path;
    // switch (this.action) {
    //   case 'new_releases':
    //     return getNewReleases();
    //   case 'podcasts/:id/episodes':
    //     debugger
    //     return getPodcast(this.props.params.id);
    // }
    return {}
  },

  componentDidMount: function() {
    podcastStoreToken = PodcastStore.addListener(this._onChangePodcast);
    subscriptionStoreToken = SubscriptionStore.addListener(this._onChangePodcast);
    episodeStoreToken = EpisodeStore.addListener(this._onChangePodcast);
    this.findAction();
  },

  currentPath: function() {
    return this.props.route.path;
  },

  findAction: function() {
    switch (this.currentPath()) {
      case 'podcasts/:id/episodes':
        this.showPodcast()
        break;
      case 'podcasts/new_releases':
        this.showNewReleases();
        break;
      case 'podcasts/in_progress':
        this.showInProgress();
        break;
    // default:
    //   debugger
    //   const collectionId = this.props.params.id;
    //   const feedUrl = this.props.location.query.feedUrl;
    //   PodcastActions.fetchPodcast(this.props.params.id);
    //   EpisodeActions.fetchEpisodes(collectionId, feedUrl);
    //   break;
    }
  },

  showInProgress: function() {
    this.setState(getInProgress());
  },

  showPodcast: function() {
    let collectionId = this.props.params.id;
    let feedUrl = this.props.location.query.feedUrl;
    getPodcast(this.props.params.id);
    PodcastActions.fetchPodcast(collectionId);
    EpisodeActions.fetchEpisodes(collectionId, feedUrl);
  },

  showNewReleases: function() {
    this.setState(getNewReleases());
  },

  componentDidUpdate: function(prevProps) {
    let currentLocation = this.props.location.pathname
    let previousLocation = prevProps.location.pathname
    if (currentLocation !== previousLocation) {
      this.findAction();
    // this.setState(getPodcast(newId)) || PodcastActions.fetchPodcast(newId)
    }
  },

  componentWillUnmount: function() {
    podcastStoreToken.remove();
    subscriptionStoreToken.remove();
    episodeStoreToken.remove();
  },

  _onChangePodcast: function() {
    switch (this.currentPath()) {
      case 'podcasts/:id/episodes':
        this.setState(getPodcast(this.props.params.id));
        break;
      case 'podcasts/new_releases':
        this.setState(getNewReleases());
        break;
      case 'podcasts/in_progress':
        this.setState(getInProgress());
        break;
    }
  },

  showDescription: function() {
    if (this.currentPath() === 'podcasts/:id/episodes') {
      return <PodcastDescription podcast={ this.state } />
    }
  },

  render: function() {

    if (Object.keys(this.state).length === 0) {
      return null
    }
    return (
      <div>
        { this.showDescription() }
        <EpisodeTable episodes={ this.state.episodes } />
      </div>
      )
  }

});

module.exports = MainView;