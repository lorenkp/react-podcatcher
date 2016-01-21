import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search/searchBox';
import MainView from './components/podcast/MainView';
import { Router, Route } from 'react-router';
import PodcastApp from './components/PodcastApp'

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render((
    <Router>
      <Route path="/" component={ PodcastApp }>
        <Route path="podcasts/new_releases" component={ MainView } />
        <Route path="podcasts/in_progress" component={ MainView } />
        <Route path="podcasts/:id/episodes" component={ MainView } />
        <Route path="search" component={ Search } />
      </Route>
    </Router>),
    document.getElementById('root'));
});

// <Route path="episodes" component={ EpisodeTable } />

