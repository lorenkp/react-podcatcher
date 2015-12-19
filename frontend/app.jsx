import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search/searchBox';
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{ 'Podcast App' }</h1>
        <ul>
          <li>
            <Link to="/search">
            { 'Search' }
            </Link>
          </li>
        </ul>
        { this.props.children }
      </div>
      );
  }
}

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render((
    <Router>
      <Route path="/" component={ App }>
        <Route path="search" component={ Search } />
      </Route>
    </Router>),
    document.getElementById('root'));
});
