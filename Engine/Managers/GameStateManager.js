/**
 * This class will listen for state changes (ammo, health, death, respawn) and update UI 
 * or respawn sprites, or restart game
 * 
 * @author
 * @version 1.0
 * @class GameStateManager
 */

class GameStateManager {

    constructor(id) {
        this.id = id;

        this.context = null;
        this.debugEnabled = false;
    }

    update(gameTime) {

    }
}