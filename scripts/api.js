
const Api = (function() {

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const fetchVideos = function(searchTerm, callback) {
  const query = {
    key: API_KEY,
    q: searchTerm,
    part: 'snippet', };
  return $.getJSON(BASE_URL, query, callback);
}

return {
  fetchVideos : fetchVideos,
  }

}());
