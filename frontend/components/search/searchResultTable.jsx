var React = require('react');
var SearchResultItem = require('./searchResultItem');

var SearchResultTable = React.createClass({
  render: function() {

    if (Object.keys(this.props.results).length < 1) {
      return null;
    }

    // var allResults = this.props.results;
    // var results = [];

    // allResults.forEach(function(result, index) {
    //   results.push(
    //     <SearchResultItem 
    //         key={index} 
    //         podcast={result} 
    //     />
    //   );
    // });

    return (
      <ul id="search-result-list">
        {this.props.results.map(function(result, index) {
          return <SearchResultItem key={index} podcast={result} />;
        })}
      </ul>
    );
  }
});

module.exports = SearchResultTable;
