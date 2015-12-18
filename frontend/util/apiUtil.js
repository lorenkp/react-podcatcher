module.exports = {
  fetchSearchResults: function(query) {
    debugger
    $.ajax({
      method: 'GET',
      url: 'api/search',
      data: {
        term: query
      },
      success: function(results) {
        console.log(results);
      }
    })
  }
}
