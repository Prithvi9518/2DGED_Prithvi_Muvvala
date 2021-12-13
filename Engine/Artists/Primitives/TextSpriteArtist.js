/**
 * Render text based on text value, position, color, style, and opacity.
 * @author NMCG
 * @version 1.0
 * @class TextSpriteArtist
 */
 class TextSpriteArtist extends Artist {

  get alpha() {
    return this._alpha;
  }
  get text() {
    return this._text;
  }
  get fontType() {
    return this._fontType;
  }
  get fillStyle() {
    return this._fillStyle;
  }
  get textAlign() {
    return this._textAlign;
  }
  get fixedPosition() {
    return this._fixedPosition;
  }

  set alpha(alpha) {
    this._alpha = alpha;
  }
  set text(text) {
    this._text = text;
  }
  set fontType(fontType) {
    this._fontType = fontType;
  }
  set fillStyle(fillStyle) {
    this._fillStyle = fillStyle;
  }
  set textAlign(textAlign) {
    this._textAlign = textAlign;
  }
  set fixedPosition(fixedPosition) {
    this._fixedPosition = fixedPosition;
  }

  constructor(
    context,
    alpha = 1,
    text,
    fontType,
    fillStyle,
    textAlign,
    maxWidth,
    fixedPosition,
  ) {
    super(context, alpha);

    this.text = text;
    this.fontType = fontType;
    this.fillStyle = fillStyle;
    this.textAlign = textAlign;
    this.maxWidth = maxWidth;
    this.fixedPosition = fixedPosition;
  }

  update(gameTime, parent, camera) {

    // Your code here...
    // Does it cycle between fonts?
    // Does its align change over time?
    // Does the font colour change?
  }

  draw(gameTime, parent, activeCamera) {

    // Save whatever context settings were used before this (color, line, text styles)
    this.context.save();

    // If the position of this sprite is not fixed in place
    if (!this.fixedPosition) {

      // Apply the camera transformations to the scene 
      // (i.e. to enable camera zoom, pan, rotate)
      activeCamera.setContext(this.context);
    }

    // Access the transform for the parent that this artist is attached to
    let transform = parent.transform;

    // Set up style
    this.context.font = this.fontType;
    this.context.fillStyle = this.fillStyle;
    this.context.textAlign = this.textAlign;
    this.context.textBaseline = TextBaselineType.Top;
    this.context.globalAlpha = this.alpha;

    // Draw text
    this.context.fillText(
      this.text,
      transform.translation.x,
      transform.translation.y,
      this.maxWidth
    );

    // Restore context
    this.context.restore();
  }

  equals(other) {

    // TO DO ...
    throw "Not Yet Implemented";
  }

  toString() {

    // TO DO ...
    throw "Not Yet Implemented";
  }

  clone() {

    // TO DO ... 
    throw "Not Yet Implemented";

  }
}