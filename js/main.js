navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

var video = document.querySelector('video#video1');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;

function snapshot() {
	if (localMediaStream) {
		ctx.drawImage(video, 0, 0);
		document.querySelector('img').src = canvas.toDataURL('image/webp');
	}
}

video.addEventListener('click', snapshot, false);

// Video Constraints
var hdConstraints = {
	video: {
		mandatory: {
			minWidth: 1280,
			minHeight: 720
		}
	},
	audio: true
};

var vgaConstraints = {
  video: {
    mandatory: {
      maxWidth: 640,
      maxHeight: 360
    }
  },
  audio: true
};

var idx = 0;
var filters = ['grayscale', 'sepia', 'blur'];

function success(stream) {
    video.src = window.URL.createObjectURL(stream);
    localMediaStream = stream;
}

function errorCallback(e) {
	console.log("navigator.getUserMedia error: ", e);
}

function fallback(error) {
	video.src = 'fallbackvideo.webm';
}

function changeFilter(e) {
	var el = e.target;
	el.className = "";
	var effect = filters[idx++ % filters.length];
	if (effect) {
		el.classList.add(effect);
	}
}

document.querySelector('video#video1').addEventListener(
	'click', changeFilter, false);

if (navigator.getUserMedia) {
	navigator.getUserMedia(vgaConstraints, success, errorCallback);
} else {
	fallback();
};
