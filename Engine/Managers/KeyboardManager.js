/**
 * Stores keyboard state and allows user to query key state through methods. See also Keys in constants.js.
 * @author Niall McGuinness
 * @version 1.0
 * @class KeyboardManager
 */
 
 class KeyboardManager {
 
    constructor() {
        this.keyState = {};
 
        window.addEventListener("keydown", (event) => {
            this.keyState[event.code] = true;
        });
 
        window.addEventListener("keyup", (event) => {
            delete this.keyState[event.code];
        });
    }
 
    /**
     * Returns true if the key corresponding to the code is pressed
     * @param {Number} code
     * @returns {Boolean} True if pressed, otherwise false
     */
    isKeyDown(code) {
        if (this.keyState[code]) {
            return true;
        }
        else {
            return false;
        }
    }
 
    /**
     * Returns true if the key corresponding to the code is up
     * @param {Number} code
     * @returns {Boolean} True if up, otherwise false
     */
    isKeyUp(code) {
        return !this.isKeyDown(code);
    }
 
    /**
     * Returns true if any key is pressed
     * @returns {Boolean} True if any pressed, otherwise false
     */
    isAnyKeyPressed() {
        return Object.entries(this.keyState).length != 0;
    }
 
    /**
     * Returns true if the keys provided in the array are pressed
     * @param {Array} codeArray An array of keyCodes
     * @returns {Boolean} True if keys in array are pressed, otherwise false
     */
    areKeysDown(codeArray) {
 
        if (codeArray) {
           
            let result = true;
            for (let i = 0; i < codeArray.length; i++) {
                result = result & this.isKeyDown(codeArray[i]);
            }
 
            return result;
        } else {
            
            throw "Error: keyCodesArray does not contain a valid array!";
        }
    }
}
