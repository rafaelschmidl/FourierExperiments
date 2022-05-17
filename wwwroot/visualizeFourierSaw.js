
let ctxSaw;
let sawWave = [];
let sawSliderValue;
let timeSaw = 0;

function visualizeFourierSaw(canvasId, sliderValue) {
    ctxSaw = document.getElementById(canvasId).getContext('2d');
    sawSliderValue = sliderValue;
    animateSaw();
}

function drawSaw() {

    let x = 0;
    let y = 0;

    let padding = 123;

    ctxSaw.translate(padding, ctxSaw.canvas.height / 2);

    for (let i = 0; i < sawSliderValue; i++) {

        let prevX = x;
        let prevY = y;

        let n = i * 2 + 2;    // saw wave

        let radius = 64 * (4 / (n * Math.PI));

        x += radius * Math.cos(n * timeSaw);
        y += radius * Math.sin(n * timeSaw);

        ctxSaw.strokeStyle = 'rgba(255, 255, 255, 0.42)';

        // circle
        ctxSaw.beginPath();
        ctxSaw.arc(prevX, prevY, radius, 0, Math.PI * 2);
        //ctx.arc(prevX, prevY, radius, 0, Math.PI * 2);
        ctxSaw.stroke();

        // line from center to radius
        ctxSaw.beginPath();
        ctxSaw.moveTo(prevX, prevY);
        ctxSaw.lineTo(x, y);
        ctxSaw.stroke();
    }

    sawWave.unshift(y);
    if (sawWave.length > 512) sawWave.pop();

    // line to wave
    ctxSaw.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    ctxSaw.beginPath();
    ctxSaw.moveTo(x, y);
    ctxSaw.lineTo(padding, sawWave[0]);
    ctxSaw.stroke();

    // wave
    ctxSaw.strokeStyle = 'rgba(255, 255, 255, 1)';
    ctxSaw.beginPath();
    for (let i = 0; i < sawWave.length; i++) {
        ctxSaw.lineTo(i + padding, sawWave[i]);
    }
    ctxSaw.stroke();

    ctxSaw.translate(-padding, -ctxSaw.canvas.height / 2);

    timeSaw += 0.01;
}

function sawSliderOnChange(sliderValue) {
    sawSliderValue = sliderValue;
}

function animateSaw() {
    window.requestAnimationFrame(animateSaw);
    ctxSaw.clearRect(0, 0, ctxSaw.canvas.width, ctxSaw.canvas.height);
    drawSaw();
}

    //fps.displayFPS(ctxSaw.canvas.width - 86, 42);
//const fps = {
//    startTime: 0,
//    frameNumber: 0,
//    getFPS: function() {
//        this.frameNumber++;                                                                               
//        let d = new Date().getTime(),
//            currentTime = (d - this.startTime) / 1000,
//            result = Math.floor((this.frameNumber / currentTime));
//        if (currentTime > 1) {
//            this.startTime = new Date().getTime();
//            this.frameNumber = 0;
//        }
//        return result;
//    },
//    displayFPS: function(x, y) {
//        ctxSaw.fillStyle = 'rgba(255, 255, 255, 0.42)';
//        ctxSaw.font = "14px Arial";
//        ctxSaw.fillText("FPS: " + fps.getFPS().toString(), x, y);
//    }
//};