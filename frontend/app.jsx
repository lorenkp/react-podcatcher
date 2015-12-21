import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search/searchBox';
import PodcastShow from './components/podcast/PodcastShow';
import { Link, Router, Route } from 'react-router';

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
      <Route path="/search/:id" component={ PodcastShow } />
    </Router>),
    document.getElementById('root'));
});

// Re: PodcastShow -- It's effectively the same view; difference is that search/:id is not 
// pulling anything from db, because user hasn't necessarily subscribed 
// yet. podcast/:id uses this, but it's showing a subscribed podcast
