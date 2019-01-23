window.onload = function() {

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();

    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }
    
    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
            // First get ahold of the legacy getUserMedia, if present
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
            // Some browsers just don't implement it - return a rejected promise with an error
            // to keep a consistent interface
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
        
            // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }
    
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(gotStream)
    .catch(didntGetStream);
}

function chromeMicPermission() {
    audioContext.resume().then(() => {
        console.log('Playback resumed successfully');
    });
}

function didntGetStream(error) {
    alert(`Stream genaration failed: ${error} on ${window.navigator.userAgent}`);
}
var mediaStreamSource = null;
function gotStream(stream) {
    // Create an AudioNode from the stream.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);
}
// Set video from input source to frame
function setVideo() {
    if (!document.querySelector('#vimeo-button').classList.contains('disabled')) {
        var options = {
            // get the digits from the URL representing the ID
            id: videoinput.value.match(/(\d)\w+/g),
            loop: true
        };
        var player = new Vimeo.Player('vimeo-video', options);
        player.on('play', function() {
            console.log('played the video!');
        });
    } else if (!document.querySelector('#file-button').classList.contains('disabled')) {
        const videoFile = document.querySelector('.wrapper .content .step .concept [type="file"]').files[0];
        document.querySelector('#html-video').setAttribute('src', URL.createObjectURL(videoFile));
    } else {
        throw new Error('Detected strange state. No feasible concept is selected.')
    }
}
// Stops the video on current frame
function stopVideo() {
    if (!document.querySelector('#vimeo-button').classList.contains('disabled')) {
        var iframe = document.querySelector('iframe');
        var player = new Vimeo.Player(iframe);
        player.pause();
    } else if (!document.querySelector('#file-button').classList.contains('disabled')) {
        document.querySelector('#html-video').pause();
    } else {
        throw new Error('Detected strange state. No feasible concept selected.');
    }
}
function onVideoConceptChange(event) {
    document.querySelectorAll('.video-concept-button, .concept').forEach(node => node.classList.toggle('disabled'));
}