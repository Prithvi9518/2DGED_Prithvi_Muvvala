class GDUtilities {

    /**
    * Returns true if "other" is non-null, not undefined and of type "target".
    *
    * @static
    * @param {JS/user-defined data type} target
    * @param {JS/user-defined data type} other
    * @returns True if target and other are the same data type, otherwise false
    * @memberof GDUtility
    */
    static IsSameTypeAsTarget(target, other) {

        if (other == null || other == undefined)
            throw "Error: Other object is null or undefined";

        if (other.constructor.name != target.constructor.name)
            throw "Error: Other object is type " + other.constructor.name + " and should be type " + target.constructor.name;

        //returns false if both point to the same object in RAM i.e. a shallow copy
        return target != other;
    }

    /**
     * Returns a random integer in the range min - max excluding the number excluded
     *
     * @static
     * @param {number} min Integer
     * @param {number} max Integer
     * @param {*} excluded An integer value to exclude (e.g. 0, -1, 10)
     * @returns Random integer
     * @memberof GDUtilities
     */
    static GetRandomInRangeExcluding(min, max, excluded) {
        let value = excluded;

        while (value == excluded) {
            value = Math.floor(Math.random() * (max - min + 1) + min);
        }

        return value;
    }

    /**
     * Randomly shuffles the elements in an array of any type (e.g. number, string)
     *
     * @static
     * @param {Array} array An array of values of any type
     * @returns Array of shuffled values
     * @memberof GDUtilities
     * @see https://www.geeksforgeeks.org/how-to-shuffle-an-array-using-javascript/
     * @author Geeksforgeeks
     * @since October 2020
     */
    static Shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {

            // Generate random number  
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }
}

/**
* Provides common math related functions.

* @author Niall Mcguinness
* @version 1.0
* @class GDMath
*/
class GDMath {

    /**
     * Returns degrees value in radians
     *
     * @static
     * @param {number} degrees Degrees value 
     * @returns Radians value
     * @memberof GDMath
     */
    static ToRadians(degrees) {
        degrees %= 360;
        
        return degrees * (Math.PI / 180);
    }

    /**
     * Returns radians value in degrees
     *
     * @static
     * @param {number} radians Radians value 
     * @returns Degrees value
     * @memberof GDMath
     */
    static ToDegrees(radians) {
        return Math.fround(radians * (180 / Math.PI));
    }

    /**
     * Converts a floating-point value to a fixed based precision in a specified base (e.g. 8, 16, 10)
     *
     * @static
     * @param {number} value Floating-point value to be converted
     * @param {number} precision Integer precision (e.g. 0, 1, 2)
     * @param {number} base Number base (e.g. 8,16,10)
     * @returns
     * @memberof GDMath
     */
    static ToFixed(value, precision, base) {
        if (value == 0) return 0;

        let pow = Math.pow(base || 10, precision);
        return Math.round(value * pow) / pow;
    }
}

class GDString {
    /**
     * Returns a string with the leading/trailing whitespace removed and converted to lowercase
     *
     * @static
     * @param {string} str User-defined string
     * @returns Converted string
     * @throws Exception if null, undefined or not a String
     * @memberof GDString
     */
    static TrimToLower(str) {
        //if invalid then throw exception
        if (this.IsValidString(str)) throw "Variable does not hold a valid string!";

        return str.trim().toLowerCase();
    }

    /**
     * Returns true if a valid string, otherwise false
     *
     * @static
     * @param {string} str User-defined string
     * @returns True if valid, otherwise false
     * @throws Exception if null, undefined or not a String
     * @memberof GDString
     */
    static IsValidString(str) {
        return str == null && str == undefined && new String(str) instanceof String;
    }
}

/**
 * Provides methods to manipulate the DOM
 *
 * @class HTMLDom
 */
class HTMLDom {
    /**
     * Sets text and shows a toast for a period of time in ms
     *
     * @static
     * @param {String} elementID  Valid div element ID
     * @param {String} text Text to set the innerHTML contents of the element to
     * @param {Number} durationInMs Time in ms to show the element
     * @memberof GDUtilities
     */
    static RevealToast(elementID, text, durationInMs) {
        let element = document.getElementById(elementID);
        element.innerHTML = text;
        element.style.display = "block";

        setTimeout(function (e) {
            element.style.display = "none";
        }, durationInMs);
    }

    /**
     * Hides a toast element
     *
     * @static
     * @param {String} elementID Valid div element ID
     * @memberof GDUtilities
     */
    static HideToast(elementID) {
        let element = document.getElementById(elementID);
        element.style.display = "none";
    }
}
