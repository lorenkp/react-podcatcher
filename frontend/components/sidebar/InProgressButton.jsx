import React from 'react';
import { Link } from 'react-router';

const InProgressButton = React.createClass({
  render: function() {
    return (
      <div>
        <Link to={ '/podcasts/in_progress' } className="new-releases"> In Progress
        </Link>
      </div>
      )
  }
});

module.exports = InProgressButton