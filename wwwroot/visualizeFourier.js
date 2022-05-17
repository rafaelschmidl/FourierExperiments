
let ctx;
let signal;
let wave = [];
let time = 0;


function visualizeFourier(canvasId, _signal) {

    ctx = document.getElementById(canvasId).getContext('2d');

    signal = JSON.parse(_signal);

    animate();
}

function draw() {

    let x = 0;
    let y = 0;

    let padding = 123;

    ctx.translate(padding, ctx.canvas.height / 2);

    for (let i = 0; i < signal.length; i++) {

        let prevX = x;
        let prevY = y;

        let freq = signal[i].Freq;
        let amp = signal[i].Amp;
        let phase = signal[i].Phase + (Math.PI / 2);


        
        ////let n = i * 2 + 1;  // square wave
        //let n = i * 2 + 2;    // saw wave

        //let radius = 64 * (4 / (n * Math.PI));

        x += amp * Math.cos(freq * time + phase);
        y += amp * Math.sin(freq * time + phase);
        //x += raduis * Math.cos(n * time);
        //y += raduis * Math.sin(n * time);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)';

        // circle
        ctx.beginPath();
        ctx.arc(prevX, prevY, amp, 0, Math.PI * 2);
        //ctx.arc(prevX, prevY, radius, 0, Math.PI * 2);
        ctx.stroke();

        // line from center to radius
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    wave.unshift(y);
    if (wave.length > 512) wave.pop();

    // line to wave
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(padding, wave[0]);
    ctx.stroke();

    // wave
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    ctx.beginPath();
    for (let i = 0; i < wave.length; i++) {
        ctx.lineTo(i + padding, wave[i]);
    }
    ctx.stroke();

    ctx.translate(-padding, -ctx.canvas.height / 2);

    //const dt = (Math.PI * 2) / signal.length;
    //time += dt;
    time += 0.01;
}

function animate() {

    window.requestAnimationFrame(animate);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    draw();

    fps.displayFPS(ctx.canvas.width - 86, 42);
}

const fps = {
    startTime: 0,
    frameNumber: 0,
    getFPS: function() {
        this.frameNumber++;                                                                               
        let d = new Date().getTime(),
            currentTime = (d - this.startTime) / 1000,
            result = Math.floor((this.frameNumber / currentTime));
        if (currentTime > 1) {
            this.startTime = new Date().getTime();
            this.frameNumber = 0;
        }
        return result;
    },
    displayFPS: function(x, y) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
        ctx.font = "14px Arial";
        ctx.fillText("FPS: " + fps.getFPS().toString(), x, y);
    }
};