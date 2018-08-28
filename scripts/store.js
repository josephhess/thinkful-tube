const Store = (function(){
  let videos = [];
  const setVideos = function(decoratedVideos) {
    this.videos = decoratedVideos;
  };
  return {
    videos: videos,
    setVideos: setVideos
  };
}());