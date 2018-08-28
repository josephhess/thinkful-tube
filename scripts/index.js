

const decorateResponse = function(response) {
  return response.items.map(item => {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    };
  });
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

const addVideosToStore = function(videos) {
  console.log(videos);
  Store.setVideos(videos);
  console.log(Store)
};

const render = function() {
  const htmlElements = Store.videos.map(generateVideoItemHtml);
  $('.results').html(htmlElements);
};

const handleFormSubmit = function() {
  $('#js-search-form').submit(event => {
    event.preventDefault();

    const query = $('#search-term').val();
    $('#search-term').val('');
    Api.fetchVideos(query, response => {
      const decoratedVideos = decorateResponse(response);
      Store.setVideos(decoratedVideos);
      render();
    });
  });
};

$(function () {
  handleFormSubmit();
});
