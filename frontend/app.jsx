import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search/searchBox';
import PodcastShowView from './components/podcast/PodcastShowView';
import { Router, Route } from 'react-router';
import PodcastApp from './components/PodcastApp';
import ApiUtil from './util/apiUtil';

ApiUtil.fetchSubscriptions();


document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render((
    <Router>
      <Route path="/" component={ PodcastApp }>
        <Route path="podcasts/:id/episodes" component={ PodcastShowView } />
        <Route path="search" component={ Search } />
      </Route>
    </Router>),
    document.getElementById('root'));
});

// <Route path="episodes" component={ EpisodeTable } />

