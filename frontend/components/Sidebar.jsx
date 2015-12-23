import React from 'react';

const Sidebar = React.createClass({
  render: function() {
    return (
      <div className="sidebar">
        <h1>{ 'sidebar' }</h1><span>Hello</span>
      </div>
      )
  }
});

module.exports = Sidebar;