import React from 'react';
import SearchView from '../search/SearchView';

const TopbarView = React.createClass({
  render: function() {
    return (
      <div className="topbar">
        <SearchView />
      </div>
      )
  }
});

module.exports = TopbarView