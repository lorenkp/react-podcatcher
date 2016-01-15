import React from 'react';
import { Link } from 'react-router';

const NewReleasesButton = React.createClass({
  render: function() {
    return (
      <div>
        <Link to={ '/podcasts/new_releases' } className="new-releases"> New Releases
        </Link>
      </div>
      )
  }
});

module.exports = NewReleasesButton