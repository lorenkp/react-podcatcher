import React from 'react';

var PodcastDescription = React.createClass({
  render: function() {
    const {title, link, image, description} = this.props.description;
    const author = this.props.description['itunes:author'];
    return (
      <div className="podcast-description">
        <img src={ image }></img>
        <div className="podcast-description-text">
          <h1>{ title }</h1>
          <p>
            { author }
          </p>
          <p>
            <a href={ link }>
              { link }
            </a>
          </p>
          <p>
            { description }
          </p>
        </div>
      </div>

      )
  }

});

module.exports = PodcastDescription;