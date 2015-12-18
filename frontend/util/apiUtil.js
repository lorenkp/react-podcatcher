var ApiActions = require('../actions/apiActions.js')

module.exports = {
  fetchSearchResults: function(query) {
    $.ajax({
      method: 'GET',
      url: 'api/search',
      data: {
        term: query
      },
      success: function(results) {
        ApiActions.receiveSearchResults(results);
      }
    })
  }
}
