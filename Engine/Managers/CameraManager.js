/**
 * This class is responsible for storing, updating, and returning the current active camera.
 * @author
 * @version 1.0
 * @class CameraManager
 */
class CameraManager {

  get activeCamera() {
    return this._cameras[this.activeCameraIndex];
  }
  get cameras() {
    return this._cameras;
  }
  get activeCameraIndex() {
    return this._activeCameraIndex;
  }

  set activeCamera(activeCamera) {
    this._activeCamera = activeCamera;
  }
  set cameras(cameras) {
    this._cameras = cameras;
  }
  set activeCameraIndex(index) {
    this._activeCameraIndex = index >= 0 ? index : 0;
  }

  constructor(id) {
    this.id = id;
    this.cameras = [];

    this.activeCameraIndex = -1;
  }

  add(camera) {

    if (camera instanceof Camera2D) {

      // Store the camera
      this.cameras.push(camera);

      // If for some reason we didnt set the index then set it to be the 
      // last camera added.
      if (this.activeCameraIndex == -1) {

        this.activeCameraIndex = this.cameras.length - 1;
      }
    }

    else {
      throw camera + " is not an instance of Camera2D!";
    }
  }

  remove(predicate) {
    this.cameras.splice(this.findIndex(predicate), 1);
  }

  removeAll() {
    this.cameras.splice(0, this.cameras.length);
    this.activeCameraIndex = -1;
  }

  findIndex(predicate) {
    return this.cameras.findIndex(predicate);
  }

  findAllIndices(predicate) {

    let j = 0;
    let foundIndices = [];

    for (let i = 0; i < this.cameras.length; i++) {

      if (predicate(this.cameras[i])) {

        foundIndices[j] = i;
      }

      j++;
    }

    // Return null if we found no matching cameras, otherwise return the array
    return foundIndices.length != 0 ? foundIndices : null;
  }

  sort(compareFunction) {
    this.cameras.sort(compareFunction);
  }

  // These are a subset of the method definitions (with some minor parameter changes) from ObjectManager

  /*

    Add(camera) { }
  
    FindIndex(predicate) { }
  
    FindIndices(predicate) { }
  
    RemoveFirstBy(predicate) { }
  
    RemoveAllBy(predicate) { }
  
    Sort(compareFunction) { }

  */

  update(gameTime) {

    // Should we be updating?
    if ((this.activeCamera.statusType & StatusType.Updated) != 0) {

      this.activeCamera.update(gameTime);
    }
  }
}