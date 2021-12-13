class AudioCue {

    static MAX_PLAYBACK_RATE = 10;

    constructor(name, theme, volume = 1, playbackRate = 1, currentTime = 0, loop = false) {
        this.name = name;
        this.theme = theme;
        this.volume = volume;
        this.playbackRate = playbackRate;
        this.currentTime = currentTime;
        this.loop = loop;

        // Internal variables
        this.audioObject = null;
        this.originalVolume = volume;
    }

    get name() {
        return this._name;
    }
    get theme() {
        return this._theme;
    }
    get volume() {
        return this._volume;
    }
    get playbackRate() {
        return this._playbackRate;
    }
    get loop() {
        return this._loop;
    }
    get currentTime() {
        return this._currentTime;
    }
    get audioObject() {
        return this._audioObject;
    }
    get originalVolume() {
        return this._originalVolume;
    }

    set name(name) {
        this._name = name;
    }
    set theme(theme) {
        this._theme = (theme == undefined) ? AudioType.All : theme;
    }
    set volume(volume) {
        this._volume = volume == undefined ||
            (volume >= 0 && volume <= 1) ? volume : 1;
    }
    set playbackRate(playbackRate) {
        this._playbackRate = playbackRate == undefined ||
            (playbackRate > 0 && playbackRate <= AudioCue.MAX_PLAYBACK_RATE) ? playbackRate : 1;
    }
    set loop(loop) {
        this._loop = loop;
    }
    set currentTime(currentTime) {
        this._currentTime = currentTime == undefined ||
            currentTime >= 0 ? currentTime : 1;
    }
    set audioObject(audioObject) {
        this._audioObject = audioObject;
    }
    set originalVolume(originalVolume) {
        this._originalVolume = originalVolume;
    }

    // Call after a full sound mute to reset to startup volume settings
    resetVolume() {
        this.volume = this.originalVolume;
    }
}

/**
 * 
 */
class SoundManager {

    /**
     * 
     * @param {*} id 
     * @param {*} notificationCenter 
     * @param {*} cueArray 
     */
    constructor(id, notificationCenter, cueArray) {
        this.id = id;
        this.notificationCenter = notificationCenter;
        this.cueArray = cueArray;

        this.initialize();
        this.registerForNotifications();
    }

    /**
     * 
     */
    initialize() {

        // Loop through the audio cue array
        for (let i = 0; i < this.cueArray.length; i++) {

            // Get the current audio cue
            let audioCue = this.cueArray[i];

            // Store the audio cue name
            let name = audioCue.name;

            // Get the matching audio object
            let audioObject = document.getElementById(name);

            // If an audio object is present
            if (audioObject) {

                // Initialize audio object in audio cue
                audioCue.audioObject = audioObject;
            }

            else {

                throw "Error: No audio object was found for cue [" + this.cueName + "]";
            }
        }
    }

    /**
     * 
     */
    registerForNotifications() {

        this.notificationCenter.register(
            NotificationType.Sound,             // Register for sound event
            this,                               // What object is listening for this event
            this.handleSoundNotification        // What function is called when a sound notification takes place
        );
    }

    /**
     * 
     * @param {Notification} notification 
     */
    handleSoundNotification(notification) {

        // Perform some action based on the notification action
        switch(notification.notificationAction) {

            case NotificationAction.Play:
                this.play(notification.notificationArguments[0]);
                break;

            case NotificationAction.Pause:
                this.pause(notification.notificationArguments[0]);
                break;

            case NotificationAction.SetVolume:
                this.setVolume(
                    notification.notificationArguments[0],
                    notification.notificationArguments[1]
                );
                break;
        }
    }

    /**
     * 
     * @param {*} name 
     * @returns 
     */
    findIndex(name) {

        // Loop through cue array
        for (let i = 0; i < this.cueArray.length; i++) {

            // If a matching cue is found
            if (this.cueArray[i].name === name) {

                // Return its index
                return i;
            }
        }

        // Return -1 to indicate that no matching cue was found
        return -1;
    }

    /**
     * 
     * @param {*} name 
     * @returns 
     */
    getAudioObject(name) {

        // Get the index of this audio cue from the audio cue array
        let index = this.findIndex(name);

        // Check if the audio cue exists
        if (index != -1) {

            // Get the audio cue
            let audioCue = this.cueArray[index];

            // Get the audio object
            let audioObject = audioCue.audioObject;

            // If an audio object is present
            if (audioObject) {

                // Return audio object
                return audioObject;
            }
        }

        // No audio object found
        return null;
    }

    /**
     * Play a given audio cue
     * 
     * @param {string} name 
     */
    play(name) {

        // Get the index of this audio cue from the audio cue array
        let index = this.findIndex(name);

        // Check if the audio cue exists
        if (index != -1) {

            // Get the audio cue
            let audioCue = this.cueArray[index];

            // Get the audio object
            let audioObject = audioCue.audioObject;

            // If an audio object is present
            if (audioObject) {

                // If the audio object is not already playing
                if (audioObject.paused) {
                    
                    // Set up the audio object
                    audioObject.currentTime = audioCue.currentTime;
                    audioObject.volume = audioCue.volume;
                    audioObject.playbackRate = audioCue.playbackRate;

                    // Play the audio object
                    audioObject.play();
                }
            }
        }

        else {

            throw "Error: No audio object was found for cue [" + this.cueName + "]";
        }
    }

    /**
     * Pause a given audio cue
     *  
     * @param {*} name 
     */
    pause(name) {

        // Get the audio object
        let audioObject = getAudioObject(name);

        // If an audio object is present
        if (audioObject) {

            // If theo audio object is not already playing
            if (!audioObject.paused) {

                // Pause the audio object
                cue.pause();
            }
        }
    }

    /**
     * 
     * @param {*} name 
     * @param {*} volume 
     */
    setVolume(name, volume) {

        // Get the audio cue
        let audioCue = this.cueArray[index];

        // Get the audio object
        let audioObject = getAudioObject(name);

        // If an audio object is present
        if (audioObject) {

            // Set audio object volume
            audioObject.volume = audioCue.volume = volume;
        }
    }

    /**
     * 
     * @param {*} theme 
     * @param {*} volume 
     */
    setVolumeByTheme(theme, volume) {

        // Loop through the cue array
        for (let i = 0; i < this.cueArray.length; i++) {

            // If a matching cue has been found
            if (this.cueArray[i].theme === theme) {

                // Retrieve the cue's audio object
                let audioObject = this.cueArray[i].audioObject;

                // If an audio object is present
                if (audioObject) {

                    // Set the audio object's volume
                    audioObject.volume = this.cueArray[i].volume = volume;
                }

                else {

                    throw "Error: No audio object was found for theme [" + theme + "]";
                }
            }
        }
    }

    /**
     * 
     * @param {*} volume 
     */
    setVolumeAll(volume) {

        // Loop through the cue array
        for (let i = 0; i < this.cueArray.length; i++) {

            // Retrieve the current cue's audio object
            let audioObject = this.cueArray[i].audioObject;

            // If an audio object is present
            if (audioObject) {

                // Set the audio object's volume
                audioObject.volume = this.cueArray[i].volume = volume;
            }

            else {

                throw "Error: Cue array may be empty or contain invalid objects!";
            }
        }
    }

    resetVolumeAll() {

        // Loop through the cueArray
        for (let i = 0; i < this.cueArray.length; i++) {

            // Get the current cue's audio object
            let audioObject = this.cueArray[i].audioObject;

            // If an audio object is present
            if (audioObject) {

                // Reset the audio object's volume
                audioObject.volume = this.cueArray[i].originalVolume;

                this.cueArray[i].ResetVolume();
            }

            else {

                throw "Error: Failed to reset all volumes!";
            }
        }
    }

    /**
     * Clear the cue array. Reset the cue array to an 
     * empty array
     * 
     */
    clear() {

        // Clear cue array
        this.cueArray = [];
    }

    /**
     * Get the length of the cueArray
     * 
     * @returns length of the cueArray
     */
    size() {

        return this.cueArray.length;
    }

    /**
     * 
     * @returns 
     */
    toString() {

        let str = "";

        // Loop through the cue array
        for (let i = 0; i < this.cueArray.length; i++) {

            // Convert cue array to string
            str += this.cueArray[i] + ",";
        }

        return str;
    }
}