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
    var options = {
        // get the digits from the URL representing the ID
        id: videoinput.value.match(/(\d)\w+/g)
    };
    var player = new Vimeo.Player('video', options);
    player.on('play', function() {
        console.log('played the video!');
    });
}
// Stops the video on current frame
function stopVideo() {
    var iframe = document.querySelector('iframe');
    var player = new Vimeo.Player(iframe);
    player.pause();
}