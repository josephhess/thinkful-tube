
const store = (function(){
  let videos = [];
  const setVideos = (decoratedVideos) => {
    this.videos = decoratedVideos;
    // decoratedVideos.forEach((video,index) => {
    //   videos[index] = video;
    // });
  };
  return {
    videos: videos,
    setVideos: setVideos
  };
}());

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const decorateResponse = function(response) {
  return response.items.map(item => {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    };
  });
};

const fetchVideos = function(searchTerm, callback) {
  const query = {
    key: API_KEY,
    q: searchTerm,
    part: 'snippet', };
  return $.getJSON(BASE_URL, query, callback);
};

const generateVideoItemHtml = function(video) {
  return `
    <li data-id="${video.id}">
      <h3>${video.title}</h3>
      <a href="https://www.youtube.com/watch?v=${video.id}">
      <img src="${video.thumbnail}">
      </a>
    </li>
  `;
};

// const addVideosToStore = function(videos) {
//   console.log(videos);
//   store.setVideos(videos);
//   console.log(store)
// };

const render = function() {
  const htmlElements = store.videos.map(generateVideoItemHtml);
  $('.results').html(htmlElements);
};

const handleFormSubmit = function() {
  $('#js-search-form').submit(event => {
    event.preventDefault();

    const query = $('#search-term').val();
    $('#search-term').val('');
    fetchVideos(query, response => {
      const decoratedVideos = decorateResponse(response);
      console.log(decort)
      store.setVideos(decoratedVideos);
      console.log(store);
      render();
    });
  });
};

$(function () {
  handleFormSubmit();
});
