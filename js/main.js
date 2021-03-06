navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;

function snapshot() {
	if (localMediaStream) {
		canvas.width = 400;
		canvas.height = 300;
		ctx.drawImage(video, 0, 0, 640, 480, 0, 0, 400, 300);
		document.querySelector('img').src = canvas.toDataURL('image/webp');
	}
}

var idx = 0;
var filters = ['grayscale', 'sepia', 'blur'];

function changeFilter() {
	var el = document.querySelector("video");
	el.className = "";
	var effect = filters[idx++ % filters.length];
	if (effect) {
		el.classList.add(effect);
	}
}

function downloadImage() {
	var img = document.getElementById('snapshot');
	window.location.href = img.src.replace('image/png', 'image/octet-stream');
}

document.getElementById("snapshot-button").addEventListener('click', snapshot, false);
document.getElementById('effect-button').addEventListener('click', changeFilter, false);
document.getElementById('download-button').addEventListener('click', downloadImage, false);


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

if (navigator.getUserMedia) {
	navigator.getUserMedia(vgaConstraints, success, errorCallback);
} else {
	fallback();
};
