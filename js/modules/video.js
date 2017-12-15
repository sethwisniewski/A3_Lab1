var video = {
  // variables at the top
  videoPlayer : document.querySelector('video'),
  vidThumb : document.querySelectorAll('.vid-thumb'),
  volumeIndicator : document.querySelector('.vol-indicator'),

  volOn() {
    video.videoPlayer.muted = false;
    video.volumeIndicator.classList.replace('fa-volume-off', 'fa-volume-up');
  },

  volOff() {
    video.videoPlayer.muted = true;
    video.volumeIndicator.classList.replace('fa-volume-up', 'fa-volume-off');
  },

  popOverlay() {
    let overlay = document.querySelector('.vid-overlay');
    overlay.classList.add('show-overlay');

    overlay.querySelector('i').addEventListener('click', video.replayVideo);
  },

  replayVideo() {
    // rewind the video
    video.videoPlayer.currentTime = 0;
    video.videoPlayer.play();

    let overlay = document.querySelector('.vid-overlay');
    overlay.classList.remove('show-overlay');

    overlay.querySelector('i').removeEventListener('click', video.replayVideo);
  },

  fetchVideoThumbs() {
    //debugger;
    const url = './includes/functions.php?getVideos=true'

    fetch(url) //make an ajax call for the video thumbs
      .then((resp) => resp.json()) //convert result to json
      .then((data) => { video.loadVideoThumbs(data); })
      .catch(function(error) {
        console.log(error);
      });
  },

  loadVideoThumbs(data) {
    let thumbHolder = document.querySelector('.video-thumbs');

    data.forEach(thumb => {
      //create an li element for each new vid
      let docFrag =
      `<li class="vid-thumb" role="button" data-videopath="${thumb.path}">
        <img src="images/${thumb.placeholder}" alt="mini commercial" class="responsive">
      </li>`;

      thumbHolder.innerHTML += docFrag;
    });

    thumbHolder.querySelectorAll('li').forEach((thumb) => thumb.addEventListener('click', video.loadNewVideo));
  },

  loadNewVideo() {
    let videoPath = "video/" + this.dataset.videopath;

    video.videoPlayer.src = videoPath;
    video.videoPlayer.load();
    video.videoPlayer.play();

    let overlay = document.querySelector('.vid-overlay');
    overlay.classList.remove('show-overlay');

    video.volOn()
  },

  // then functionality
  init() {
    console.log('video module added');

    // add event handling
    video.videoPlayer.addEventListener('mouseover', video.volOn);
    video.videoPlayer.addEventListener('mouseout', video.volOff);
    video.videoPlayer.addEventListener('ended', video.popOverlay);

    video.fetchVideoThumbs();
  }
}

video.init();
