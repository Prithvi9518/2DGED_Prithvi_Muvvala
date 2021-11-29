/**
 * Render text based on text value, position, color, style, and opacity.
 * @author niall mcguinness
 * @version 1.0
 * @class TextArtist
 */
class TextArtist extends Artist {

  get text() {
    return this._text;
  }
  get maxWidth() {
    return this._maxWidth;
  }

  set text(value) {
    this._text = value;
  }
  set maxWidth(value) {
    this._maxWidth = value;
  }

  constructor(context, text, maxWidth, alpha = 1) {

    super(context, alpha);

    this.text = text;
    this.maxWidth = maxWidth;
  }

  /**
   * Currently unused as, unlike AnimatedSpriteArtist, we are drawing the same pixel data in each draw call.
   *
   * @param {GameTime} gameTime (unused)
   * @param {Sprite} parent (unused)
   * @memberof TextArtist
   */
  update(gameTime, parent) {

  }

  /**
   * Renders pixel data from spritesheet to canvas
   *
   * @param {GameTime} gameTime (unused)
   * @param {Sprite} parent Sprite object to which this artist is attached
   * @param {Camera2D} activeCamera (unused)
   * @memberof TextArtist
   */
  draw(gameTime, parent, activeCamera) {

    // Save whatever context settings were used before this (color, line, text styles)
    this.context.save();

    // Access the transform for the parent that this artist is attached to
    let transform = parent.transform;

    // Set transparency
    this.context.globalAlpha = this.alpha;

    // Add styles?

    // Draw the text
    this.context.fillText(
      this.text,
      transform.translation.x - transform.origin.x,
      transform.translation.y - transform.origin.y,
      this.maxWidth
    );

    // Restore whatever context settings were used before save() was called above
    this.context.restore();
  }

  clone() {

    // TO DO ...
    throw "Not Yet Implemented";
  }
}