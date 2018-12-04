/* global VideoList Store Api $*/

const VideoList = (function(){

  const generateListItemHtml = function(video) {
    return `
      <li data-id="${video.id}">
        <h3>${video.title}</h3>
        <a href="https://www.youtube.com/watch?v=${video.id}">
        <img src="${video.thumbnail}" alt="${video.description}">
        </a>
      </li>
    `;
  };

  const render = function() {
    const htmlElements = Store.videos.map(generateListItemHtml);
    const videoCount = `Your search returned ${htmlElements.length} results`;
    $('.count').html(videoCount);
    $('.results').html(htmlElements);
  };

  const decorateResponse = function(response) {
    return response.items.map(item => {
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        description: item.snippet.description
      };
    });
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

  const bindEventListeners = function(){
    handleFormSubmit();
  };

  return {
    render,
    bindEventListeners
  };

}());
