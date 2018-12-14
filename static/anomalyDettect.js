//Parameters
const s = document.getElementById('anomalyDettect');
const sourceVideo = s.getAttribute("data-source");  //the source video to use
const uploadWidth = s.getAttribute("data-uploadWidth") || 640; //the width of the upload file
const mirror = s.getAttribute("data-mirror") || false; //mirror the boundary boxes
const scoreThreshold = s.getAttribute("data-scoreThreshold") || 0.5;
const apiServer = s.getAttribute("data-apiServer") || window.location.origin + '/imagee';
//Video element selector
v = document.getElementById(sourceVideo);
//for starting events
let isPlaying = false,
    gotMetadata = false;

function show_gif(objects) {
     $("#target").attr("src","data:image/gif;base64," + objects);
  }

function startAnomalyDetection(file) {

    let xhr = new XMLHttpRequest();
    xhr.open('POST', apiServer, true);
    xhr.onload = function () {
        if (this.status === 200) {
			console.log(this.response);
            let objects = this.response;
			console.log(objects);
            //draw the boxes
            show_gif(objects);
        }
        else {
            console.error(xhr);
        }
    };
    xhr.send();
}

//Starting events

//check if metadata is ready - we need the video size
v.onloadedmetadata = () => {
    console.log("video metadata ready");
    gotMetadata = true;
    if (isPlaying){
        startAnomalyDetection();
    }

};

//see if the video has started playing
v.onplaying = () => {
    console.log("video playing");
    isPlaying = true;
    if (gotMetadata) {
        startAnomalyDetection();
    }

};
