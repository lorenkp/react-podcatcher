var React = require('react');

var SearchResultItem = React.createClass({
  render: function() {
    var title = this.props.podcast.collectionName;

    return (
      <li>{title}</li>
    );
  }

});

module.exports = SearchResultItem;
