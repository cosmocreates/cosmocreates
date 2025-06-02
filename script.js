const BPM = 140;
const MINUTE_IN_SECONDS = 60;
const QUARTER_NOTE_INTERVAL = (MINUTE_IN_SECONDS / BPM) * 1000;
const QUARTERS_PER_MEASURE = 4;

const startMusicButton = document.getElementById('startMusicButton');
const pulseBackground = document.getElementById('pulse');
const music = new Audio('lax.mp3');

let quarterNotesElapsed = 0;
let measuresElapsed = 0;

music.loop = true;

const skipPulseMeasures = new Set([
    1, 9, 16, 17, 32, 33, 64, 73, 74, 75, 76, 77, 78, 79, 80,
    95, 96, 112, 121, 123, 125, 127, 128, 129, 130, 131, 132
]);

let spinningAnimationPlayed = false;

alert('Thanks for visiting! Enable sound for the best experience (Slight epilepsy warning)')

function startQuarterNoteClock() {
    let expected = performance.now() + QUARTER_NOTE_INTERVAL;

    function step() {
        const currentMeasure = Math.floor(quarterNotesElapsed / QUARTERS_PER_MEASURE) + 1;

        if (currentMeasure !== 31 && currentMeasure !== 32 && currentMeasure !== 33) {
            pulseBackground.style.animation = 'none';
            pulseBackground.offsetHeight;
        }

        if (!skipPulseMeasures.has(currentMeasure)) {
            pulseBackground.style.animation = `wahwah3 ${QUARTER_NOTE_INTERVAL}ms`;
        }

        if (currentMeasure === 32 && quarterNotesElapsed % QUARTERS_PER_MEASURE === 0 && !spinningAnimationPlayed) {
            pulseBackground.style.animation = 'wahwah5 3s'
            spinningAnimationPlayed = true;
        }

        const now = performance.now();
        const drift = now - expected;

        quarterNotesElapsed++;

        if (quarterNotesElapsed % QUARTERS_PER_MEASURE === 0) {
            measuresElapsed++;
            console.log(`Measure ${measuresElapsed}`);
        }

        expected += QUARTER_NOTE_INTERVAL;
        setTimeout(step, Math.max(0, QUARTER_NOTE_INTERVAL - drift));
    }

    setTimeout(step, QUARTER_NOTE_INTERVAL);
}

function startMusic() {
    music.play();
    startQuarterNoteClock();
    startMusicButton.remove();
}

startMusicButton.onclick = startMusic;
