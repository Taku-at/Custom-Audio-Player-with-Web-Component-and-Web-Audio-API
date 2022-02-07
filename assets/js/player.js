// Create a class for component
// This is extend 
{
    class AudioPlayer extends HTMLElement {
        // Create a property which is toggle boolean
        playing = false;
        
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

        // Render has become industry standard, render the object
        // Render the audio tag to HTML
        // render() create the element and select
        render() {
            this.shadowRoot.innerHTML = `
            <audio src="./assets/src/penguinmusic-modern-chillout-12641.mp3" controls></audio>
            <button class="play-btn" type="button">play</button>
            `;

            // Select the element
            this.audio = this.shadowRoot.querySelector('audio');
            this.playPauseBtn = this.shadowRoot.querySelector('.play-btn');
        }

    }
    // register the tag and define the methond and class
    customElements.define('audio-player', AudioPlayer);
}