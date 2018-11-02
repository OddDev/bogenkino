window.onload = function() {
	
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia = 
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;
        // ask for an audio input
        navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }
}
function didntGetStream() {
    alert('Stream generation failed.');
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