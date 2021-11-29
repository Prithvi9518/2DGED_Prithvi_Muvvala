class AssetDictionary {

    constructor(name) {
        this.name = name;
        this.contents = [];
    }

    add(id) {

        // Remove any leading/trailing whitespace and convert to lowercase for uniformity
        id = GDString.TrimToLower(id);

        // Look for the asset in the dictionary
        let index = this.contents.findIndex(asset => asset.id === id);

        // If not there, then load and push it into array, otherwise throw exception
        if (index == -1) {

            let htmlElement = document.getElementById(id);

            if (htmlElement) {

                this.contents.push(htmlElement);
            }

            else {

                throw "Asset with id [" + id + "] nas not been loaded. Check if asset loaded in HTML file!";
            }
        }
        else {

            throw "Asset with id [" + id + "] is already in the dictionary!";
        }
    }

    addArray(idArray) {

        for (let id of idArray) {
            this.add(id);
        }
    }

    find(id) {

        // Remove any leading/trailing whitespace and convert to lowercase just for uniformity
        id = GDString.TrimToLower(id);

        return this.contents.find(asset => asset.id === id);
    }

    remove(id) {

        // Remove any leading/trailing whitespace and convert to lowercase just for uniformity
        id = GDString.TrimToLower(id);

        // Look for the asset in the dictionary
        let index = this.contents.findIndex(asset => asset.id === id);

        // If there then splice the array and return true
        if (index != -1) {

            this.contents.splice(index, 1);
            return true;
        }
        else {

            return false;
        }
    }

    size() {
        return this.contents.length;
    }

    clear() {
        this.contents.splice(0, this.contents.length);
    }

    toString() {

        let string = "";

        for (let asset of this.contents) {
            string = string + asset.id + ",";
        }

        // Remove the leftover "," at the end
        string = string.substr(0, string.length - 1);

        return string;
    }
}