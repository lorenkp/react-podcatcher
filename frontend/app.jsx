import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search/searchBox';
import PodcastView from './components/podcast/PodcastView';
import { Router, Route } from 'react-router';
import EpisodeTable from './components/episode/EpisodeTable';
import PodcastApp from './components/PodcastApp'
import ApiUtil from './util/apiUtil';

ApiUtil.fetchSubscriptions();

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render((
    <Router>
      <Route path="/" component={ PodcastApp }>
        <Route path="/search" component={ Search } />
        <Route path="/podcasts/:id" component={ PodcastView }>
          <Route path="episodes" component={ EpisodeTable } />
        </Route>
      </Route>
    </Router>),
    document.getElementById('root'));
});
