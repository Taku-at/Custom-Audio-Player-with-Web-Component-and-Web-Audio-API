// Create a class for component
// This is extend 
{
    class AudioPlayer extends HTMLElement {
        constructor() {
            // Inherite method from parent
            super();

            // Set up the shadow element
            this.attachShadow( {mode: 'open'});
        }

        // Render has become industry standard
        render() {
            this.shadowRoot.innerHTML = `
            <audio src="./assets/src/penguinmusic-modern-chillout-12641.mp3" controls></audio>
            `
        }

    }
    // register the tag and define the methond and class
    customElements.define('audio-player', AudioPlayer)
}