// Defines the actors that we find in our game
const ActorType = {
    /*
     * VERY IMPORTANT - The order of the actors below DEFINES the draw order!
     * Which means that if we were to set Background to 20 then it would be
     * the highest number and thus LAST thing to be drawn. That would mean we 
     * would NOT see anything EXCEPT the background sprite because it would 
     * be DRAWN OVER everything else.
     */

    Background: 0,
    Platform: 1,
    Decorator: 2,
    Pickup: 3,
    Interactable: 4,
    Projectile: 5,
    Enemy: 6,
    NPC: 7,
    Player: 8,
    Camera: 9,
    HUD: 10

    // Add as many actor types as your game needs here BUT remember that the 
    // assigned number will determine drawn sort order...
};

const StatusType = {
    Off: 0,     // 0000
    Drawn: 1,   // 0001
    Updated: 2, // 0010

    // Add more here as required but ENSURE they are 2^N values
    // It's important that the values are powers of two because we combine them 
    // using a Bitwise OR operation
    // For example, StatusType.Updated | StatusType.Drawn

    // Actor.StatusType = StatusType.Drawn | Status.Updated

    // Bitwise OR
    //   0001   1
    // | 0010   2
    //   0011   3

    // Bitwise AND
    //   0001   1
    // & 0010   2
    //   0000   0
};

const AudioType = {
    Background: 0,
    Menu: 1,
    Explosion: 2,
    WinLose: 3,
    Weapon: 4,
    All: 5,
    Move: 6,
};

const CollisionType = {
    Collidable: true,
    NotCollidable: false
};

// See: https://simon.html5.org/dump/html5-canvas-cheat-sheet.html
const LineCapType = {
    Butt: "butt",
    Round: "round",
    Square: "square"
};

const LineJoinType = {
    Bevel: "bevel",
    Round: "round",
    Miter: "miter"
};

const TextAlignType = {
    Start: "start",
    End: "end",
    Left: "left",
    Right: "right",
    Center: "center"
};

// See: https://www.w3schools.com/tags/canvas_textbaseline.asp
const TextBaselineType = {
    Top: "top",
    Bottom: "bottom",
    Middle: "middle",
    Alphabetic: "alphabetic",
    Hanging: "hanging"
};

// We use this to define colours for drawing to the screen
// For example, ClearScreen(Color.Black)
const Color = {
    Black: "#000000",
    White: "#FFFFFF",
    Grey: "#8B8680",
    CornFlowerBlue: "#6495ED",
    LightGreen: "#CACB63",
    DarkGreen: "#688318",

    // Add more colors that you use often here
    // Use https://html-color-codes.info/colors-from-image/ to determine hex codes 
    // for colors that you use in free 3rd party images/sprites that you find online
};

// Used by any entity which listens for key input
const Keys = {
    A: "KeyA",
    B: "KeyB",
    C: "KeyC",
    D: "KeyD",
    E: "KeyE",
    F: "KeyF",
    G: "KeyG",
    H: "KeyH",
    I: "KeyI",
    J: "KeyJ",
    K: "KeyK",
    L: "KeyL",
    M: "KeyM",
    N: "KeyN",
    O: "KeyO",
    P: "KeyP",
    Q: "KeyQ",
    R: "KeyR",
    S: "KeyS",
    T: "KeyT",
    U: "KeyU",
    V: "KeyV",
    W: "KeyW",
    X: "KeyX",
    Y: "KeyY",
    Z: "KeyZ",
    Enter: "Enter",
    Space: "Space",
    Numpad0: "Numpad0",
    Numpad1: "Numpad1",
    Numpad2: "Numpad2",
    Numpad3: "Numpad3",
    Numpad4: "Numpad4",
    Numpad5: "Numpad5",
    Numpad6: "Numpad6",
    Numpad7: "Numpad7",
    Numpad8: "Numpad8",
    Numpad9: "Numpad9",
    ArrowUp: "ArrowUp",
    ArrowDown: "ArrowDown",
    ArrowLeft: "ArrowLeft",
    ArrowRight: "ArrowRight",
};
