/*
 * Class to store all sprite data for space invaders
 */
class SpriteData {

    static ENEMY_ONE_WIDTH = 22;
    static ENEMY_ONE_HEIGHT = 16;

    // Sprite position and dimensions on Sprite Sheet
    static ENEMY_ONE_FRAMES = [
        {
            // Animation Frame 1
            x: 0,                           // Source Position
            y: 0,
            width: this.ENEMY_ONE_WIDTH,    // Source Dimensions
            height: this.ENEMY_ONE_HEIGHT,
        },
        {
            // Animation Frame 2
            x: 0,                           // Source Position
            y: 16,
            width: this.ENEMY_ONE_WIDTH,    // Source Dimensions
            height: this.ENEMY_ONE_HEIGHT,
        },
    ];

    static ENEMY_TWO_WIDTH = 16;
    static ENEMY_TWO_HEIGHT = 16;

    // Sprite position and dimensions on Sprite Sheet
    static ENEMY_TWO_FRAMES = [
        {
            // Animation Frame 1
            x: 22,
            y: 0,
            width: this.ENEMY_TWO_WIDTH,
            height: this.ENEMY_TWO_HEIGHT,
        },
        {
            // Animation Frame 2
            x: 22,
            y: 16,
            width: this.ENEMY_TWO_WIDTH,
            height: this.ENEMY_TWO_HEIGHT,
        },
    ];

    static ENEMY_THREE_WIDTH = 24;
    static ENEMY_THREE_HEIGHT = 16;

    // Sprite position and dimensions on Sprite Sheet
    static ENEMY_THREE_FRAMES = [
        {
            // Animation Frame 1
            x: 38,
            y: 0,
            width: this.ENEMY_THREE_WIDTH,
            height: this.ENEMY_THREE_HEIGHT,
        },
        {
            // Animation Frame 2
            x: 38,
            y: 16,
            width: this.ENEMY_THREE_WIDTH,
            height: this.ENEMY_THREE_HEIGHT,
        },
    ];

    static BULLET_WIDTH = 7;
    static BULLET_HEIGHT = 12;

    // Sprite position and dimensions on Sprite Sheet
    static BULLET_FRAMES = [
        {
            x: 67,
            y: 20,
            width: this.BULLET_WIDTH,
            height: this.BULLET_HEIGHT
        },
        {
            x: 74,
            y: 20,
            width: this.BULLET_WIDTH,
            height: this.BULLET_HEIGHT
        },
    ];

    // Player Sprite position on Sprite Sheet
    static PLAYER_X = 62;
    static PLAYER_Y = 0;
    static PLAYER_WIDTH = 22;
    static PLAYER_HEIGHT = 16;

    // Barrier Sprite position on Sprite Sheet
    static BARRIER_X = 84;
    static BARRIER_Y = 8;
    static BARRIER_HEIGHT = 24;
    static BARRIER_WIDTH = 36;
}

class GameData {

    // Speed variables
    static PLAYER_SPEED = 0.2;
    static BULLET_SPEED = 0.25;

    // Measured in milliseconds
    static FIRE_INTERVAL = 750;
    static ENEMY_MOVE_INTERVAL = 500;

    // Audio cue array
    static AUDIO_CUE_ARRAY = [
        new AudioCue("sound_shoot", AudioType.Weapon, 1, 1, 0, false),
        new AudioCue("sound_bading", AudioType.Explosion, 1, 1, 0, false)
    ];
}