// Create a class for component
// This is extend 
{
    class AudioPlayer extends HTMLElement {
        // Create a property which is toggle boolean
        playing = false;
        currentTime  = 0;
        duration = 0;
        
        constructor() {
            // Inherite method from parent
            super();

            // Set up the shadow element
            this.attachShadow({mode: 'open'});
            // Call render after attaching the method
            this.render();
            this.initializeAudio();
            this.attachEvents();
        }

        // Initialize
        initializeAudio() {
            // AudioContext() API allow us to chain nodes
            this.audioCtx = new AudioContext();

            // Controlls the analyzer
            // Create audio source
            this.track = this.audioCtx.createMediaElementSource(this.audio);

            // Attach the nodes
            this.track.connect(this.audioCtx.destination);
        }


        // Test
        attachEvents() {
            // bind directly this fucntion
            this.playPauseBtn.addEventListener('click', this.togglePlay.bind(this));


            // To get the audio duration which must listten to the loadedmetadata.
            this.audio.addEventListener('loadedmetadata', () => {
                this.progressBar.max = this.audio.duration;

                const secs = parseInt(`${this.duration % 60}`, 10); // Reminder seconds
                const mins = parseInt(`${this.duration/60}`, 10);
                this.durationEl.textContent = `${mins}:${secs}`;

                // this.durationEl.textContent = this.getTimeString(this.duration);
                // this.updateAudioTime();

                console.log('duration', this.audio.duration); // console the time
                console.log('currentTime', this.audio.currentTime); // console the time

            })
            
            // Time update event
            this.audio.addEventListener('timeupdate', () => {
                this.updateAudioTime(this.audio.currrentTime);
            })
        }

        // Toggle method into async method
       async togglePlay() {
            if (this.audioCtx.state === 'suspended') {
                await this.audioCtx.resume();
            }

            // If playing the audio then stop and boolean is false, otherwise play and true.
            if (this.playing) {
                this.audio.pause();
                this.playing = false;
                this.playPauseBtn.textContent = 'play'; // Change the text
            } else {
                this.audio.play();
                this.playing = true;
                this.playPauseBtn.textContent = 'pause';
            }
        }

        // Update time function
        updateAudioTime(time) {
            // Fisrt update current tiem property and progress bar of value
            this.currentTime = time;
            this.progressBar.value = this.currentTime;
            
        }

        // Render has become industry standard, render the object
        // Render the audio tag to HTML
        // render() create the element and select
        render() {
            this.shadowRoot.innerHTML = `
            <audio src="./assets/src/penguinmusic-modern-chillout-12641.mp3" controls></audio>
            <button class="play-btn" type="button">play</button>

            <!-- Indicators and range -->
            <div class="progress-indicator">
                <span class="current-time">0:00</span>
                <input class="progress-bar" type="range" max="100" value="0">
                <span class="duration">0:00</span>
            `;

            // Select the element
            this.audio = this.shadowRoot.querySelector('audio');
            this.playPauseBtn = this.shadowRoot.querySelector('.play-btn');
            this.progressIndicator = this.shadowRoot.querySelector('.progress-indicator');
            this.currentTimeEl = this.progressIndicator.children[0];
            this.progressBar = this.progressIndicator.children[1];
            this.durationEl = this.progressIndicator.children[2];

        }

    }
    // register the tag and define the methond and class
    customElements.define('audio-player', AudioPlayer);
}