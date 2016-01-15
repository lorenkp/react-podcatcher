import React from 'react';
import PodcastActions from '../../actions/PodcastActions';
// import EpisodeActions from '../../actions/EpisodeActions';
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
    subscribed: SubscriptionStore.checkSub(id)
  }
}

function getNewReleases() {
  return {
    episodes: SubscriptionStore.getNewReleases()
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
    // debugger
    podcastStoreToken = PodcastStore.addListener(this._onChangePodcast);
    subscriptionStoreToken = SubscriptionStore.addListener(this._onChangePodcast);
    // episodeStoreToken = EpisodeStore.addListener(this._onChange);
    this.action = this.props.route.path;

    this.findAction();

  },

  findAction: function() {
    switch (this.action) {
      case 'podcasts/:id/episodes':
        this.showPodcast()
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

  showPodcast: function() {
    getPodcast(this.props.params.id);
    PodcastActions.fetchPodcast(this.props.params.id);
  },

  componentDidUpdate: function(prevProps) {
    let oldId = prevProps.params.id
    let newId = this.props.params.id
    if (newId !== oldId) {
      this.setState(getPodcast(newId)) || PodcastActions.fetchPodcast(newId)
    }
  },

  componentWillUnmount: function() {
    podcastStoreToken.remove();
    subscriptionStoreToken.remove();
    episodeStoreToken.remove();
  },

  _onChangePodcast: function() {
    this.setState(getPodcast(this.props.params.id))
  // this.setState(getPodcast(this.props.params.id));
  },

  render: function() {
    if (Object.keys(this.state).length === 0) {
      return null
    }

    return (
      <div>
        <PodcastDescription podcast={ this.state } />
        <EpisodeTable />
      </div>
      )
  }

});

module.exports = MainView;