var React = require('react');
var ReactDOM = require('react-dom');


var SearchBox = require('./components/search/searchBox');


document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    <SearchBox />,
    document.getElementById('root')
  );
});
