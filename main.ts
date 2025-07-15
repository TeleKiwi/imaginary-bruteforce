interface IComplex {
    real: number,
    imaginary: number
}

class Complex implements IComplex {
    real: number
    imaginary: number;

    constructor(r: number, i: number) {
        this.real = r
        this.imaginary = i
    }
    private setReal(r: number) {
        this.real = r
    }

    private setImaginary(i: number) {
        this.imaginary = i
    }

    update(r: number | null = null, i: number | null = null) {
        if (r !== null) {
            this.setReal(r)
        }
        if (i !== null) {
            this.setImaginary(i)
        }
    }

    // a + bi + c + di = (a+c) + (b+d)i
    static add(z: Complex, w: Complex) {
        return new Complex(z.real + w.real, z.imaginary + w.imaginary)
    }

    // a + bi - (c + di) = (a-c) + (b-d)i
    static sub(z: Complex, w: Complex) {
        return new Complex(z.real - w.real, z.imaginary - w.imaginary)
    }

    // (a + bi)(c + di) = (ac-bd) + (ad+bc)i 
    static mul(z: Complex, w: Complex) {
        const ac = z.real * w.real
        const bd = z.imaginary * w.imaginary
        const ad = z.real * w.imaginary
        const bc = z.imaginary * w.real
        return new Complex(ac - bd, ad + bc)
    }

    conjugate() { return new Complex(this.real, -this.imaginary) }

    //(a+bi)/(c+di) = (a+bi)(c-di)/(c+di)(c-di)
    // (thanks wolframalpha for the solution I did not want to work this out myself)
    // = ((ac+bd) / (c^2+d^2)) + ((bc-ad) / (c^2+d^2))i

    static div(z: Complex, w: Complex) {
        const ac = z.real * w.real
        const bd = z.imaginary * w.imaginary
        const ad = z.real * w.imaginary
        const bc = z.imaginary * w.real
        const csq = w.real ^ 2
        const dsq = w.imaginary ^ 2
        return new Complex((ac + bd) / (csq + dsq), (bc - ad) / (csq + dsq))
    }

    stringify() {
        if(this.imaginary === 0) return `${this.real}`
        if (this.real === 0) return `${this.imaginary}i`
        if(this.imaginary < 0) return `${this.real} - ${Math.abs(this.imaginary)}i`
        return `${this.real} + ${this.imaginary}i`
    }
}


//* TEST 1: 