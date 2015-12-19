var React = require('react');

var SearchResultItem = React.createClass({

  handleClick: function(e) {
    e.preventDefault();
    this.props.onPodcastSelect;
  },

  render: function() {
    var podcast = this.props.podcast
    var title = podcast.collectionName;
    var artworkUrl = podcast.artworkUrl100;
    var artist = podcast.artistName;

    return (
      <a className="search-result-item" onClick={ this.handleClick }>
        <img src={ artworkUrl }></img>
        <div className="podcast-description">
          <p className="title">
            { title } </p>
          <p className="artist">
            { artist } </p>
        </div>
      </a>
      );
  }

});

module.exports = SearchResultItem;
