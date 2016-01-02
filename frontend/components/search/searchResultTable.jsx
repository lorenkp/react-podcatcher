var React = require('react');
var PodcastItem = require('../podcast/PodcastItem');

var SearchResultTable = React.createClass({

  render: function() {
    if (Object.keys(this.props.results).length < 1) {
      return null;
    }

    return (
      <div className="search-result-list">
        { this.props.results.map(function(podcast, index) {
            return (
              <PodcastItem key={ index } podcast={ podcast } />
              );
          }) }
      </div>
      );
  }
});

module.exports = SearchResultTable;
