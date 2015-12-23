import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search/searchBox';
import PodcastView from './components/podcast/PodcastView';
import { Link, Router, Route } from 'react-router';
import EpisodeTable from './components/episode/EpisodeTable';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{ 'Podcast App' }</h1>
        <Link to={ 'search' }>
        { 'Search for Podcasts' }
        </Link>
      </div>
      );
  }
}

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render((
    <Router>
      <Route path="/" component={ App } />
      <Route path="/search" component={ Search } />
      <Route path="/search/:id" component={ PodcastView } />
      <Route path="/podcasts/:id" component={ PodcastView }>
        <Route path="episodes" component={ EpisodeTable } />
      </Route>
    </Router>),
    document.getElementById('root'));
});
