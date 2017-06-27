// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var geocodeAPI = "35e5548c618555b1a43eb4759d26b260";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(title, starYear) {
    var apiKey = "b1d19e116cfd40d789fc1f8a9404d128";
    var url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${title}&?being_date=${starYear}`

    return axios.get(url).then(function(response) {
        var articleTitle = response.data.response.docs;
        // If get get a result, return that result's formatted address property
      if (articleTitle) {
        return articleTitle;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getSaved: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postSaved: function(Title, Url) {
      return axios.post("/api", { title: Title, url: Url });
  }
};

// We export the API helper
module.exports = helper;
