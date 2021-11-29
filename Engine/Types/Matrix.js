class Matrix {

    static DEFAULT_DECIMAL_PRECISION = 4;

    constructor(a11, a12, a13, a21, a22, a23, a31, a32, a33 = 1) {
        this.a11 = a11;
        this.a12 = a12;
        this.a13 = 0;

        this.a21 = a21;
        this.a22 = a22;
        this.a23 = 0;

        this.a31 = a31;
        this.a32 = a32;
        this.a33 = 1;
    }

    toString() {
        return "[" +
            this.a11 + "," + this.a12 + "," + this.a13 +
            this.a21 + "," + this.a22 + "," + this.a23 +
            this.a31 + "," + this.a32 + "," + this.a33 +
            "]"
    }

    multiply(other) {
        this.a11 = this.a11 * other.a11 + this.a12 * other.a21 + this.a13 * other.a31;
        this.a12 = this.a11 * other.a12 + this.a12 * other.a22 + this.a13 * other.a32;
        this.a13 = 0;

        this.a21 = this.a21 * other.a11 + this.a22 * other.a21 + this.a23 * other.a31;
        this.a22 = this.a21 * other.a12 + this.a22 * other.a22 + this.a23 * other.a32;
        this.a23 = 0;

        this.a31 = this.a31 * other.a11 + this.a32 * other.a21 + this.a33 * other.a31;
        this.a32 = this.a31 * other.a12 + this.a32 * other.a22 + this.a33 * other.a32;
        this.a33 = 1;
    }

    static Identity() {
        return new Matrix(
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        );
    }

    static CreateScale(scale) {
        return new Matrix(
            scale.X, 0, 0,
            0, scale.Y, 0,
            0, 0, 1
        );
    }

    static CreateRotation(rotationInRadians) {

        let cos = GDMath.ToFixed(Math.cos(rotationInRadians), Matrix.DEFAULT_DECIMAL_PRECISION, 10);
        let sin = GDMath.ToFixed(Math.sin(rotationInRadians), Matrix.DEFAULT_DECIMAL_PRECISION, 10);

        return new Matrix(
            cos, -1 * sin, 0,
            sin, cos, 0,
            0, 0, 1
        );
    }

    static CreateTranslation(translation) {
        return new Matrix(
            0, 0, 0,
            0, 0, 0,
            translation.X, translation.Y, 1
        );
    }

    static Multiply(m1, m2) {
        let a11 = m1.a11 * m2.a11 + m1.a12 * m2.a21 + m1.a13 * m2.a31;
        let a12 = m1.a11 * m2.a12 + m1.a12 * m2.a22 + m1.a13 * m2.a32;
        let a13 = 0;

        let a21 = m1.a21 * m2.a11 + m1.a22 * m2.a21 + m1.a23 * m2.a31;
        let a22 = m1.a21 * m2.a12 + m1.a22 * m2.a22 + m1.a23 * m2.a32;
        let a23 = 0;

        let a31 = m1.a31 * m2.a11 + m1.a32 * m2.a21 + m1.a33 * m2.a31;
        let a32 = m1.a31 * m2.a12 + m1.a32 * m2.a22 + m1.a33 * m2.a32;
        let a33 = 1;

        return new Matrix(a11, a12, a13, a21, a22, a23, a31, a32, a33);
    }
}