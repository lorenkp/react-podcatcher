import React from 'react';
import { Link } from 'react-router';

export default class PodcastApp extends React.Component {
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
