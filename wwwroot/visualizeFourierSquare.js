
let ctxSquare;animateSquare
let squareWave = [];
let squareSliderValue;
let timeSquare = 0;

function visualizeFourierSquare(canvasId, sliderValue) {
    ctxSquare = document.getElementById(canvasId).getContext('2d');
    squareSliderValue = sliderValue;
    animateSquare();
}

function drawSquare() {

    let x = 0;
    let y = 0;

    let padding = 123;

    ctxSquare.translate(padding, ctxSquare.canvas.height / 2);

    for (let i = 0; i < squareSliderValue; i++) {

        let prevX = x;
        let prevY = y;

        let n = i * 2 + 1;    // square wave

        let radius = 64 * (4 / (n * Math.PI));

        x += radius * Math.cos(n * timeSquare);
        y += radius * Math.sin(n * timeSquare);

        ctxSquare.strokeStyle = 'rgba(255, 255, 255, 0.42)';

        // circle
        ctxSquare.beginPath();
        ctxSquare.arc(prevX, prevY, radius, 0, Math.PI * 2);
        //ctx.arc(prevX, prevY, radius, 0, Math.PI * 2);
        ctxSquare.stroke();

        // line from center to radius
        ctxSquare.beginPath();
        ctxSquare.moveTo(prevX, prevY);
        ctxSquare.lineTo(x, y);
        ctxSquare.stroke();
    }

    squareWave.unshift(y);
    if (squareWave.length > 512) squareWave.pop();

    // line to wave
    ctxSquare.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    ctxSquare.beginPath();
    ctxSquare.moveTo(x, y);
    ctxSquare.lineTo(padding, squareWave[0]);
    ctxSquare.stroke();

    // wave
    ctxSquare.strokeStyle = 'rgba(255, 255, 255, 1)';
    ctxSquare.beginPath();
    for (let i = 0; i < squareWave.length; i++) {
        ctxSquare.lineTo(i + padding, squareWave[i]);
    }
    ctxSquare.stroke();

    ctxSquare.translate(-padding, -ctxSquare.canvas.height / 2);

    timeSquare += 0.01;
}

function squareSliderValueOnChange(sliderValue) {
    squareSliderValue = sliderValue;
}

function animateSquare() {
    window.requestAnimationFrame(animateSquare);
    ctxSquare.clearRect(0, 0, ctxSquare.canvas.width, ctxSquare.canvas.height);
    drawSquare();
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