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
    static add(c1: Complex, c2: Complex) {
        return new Complex(c1.real + c2.real, c1.imaginary + c2.imaginary)
    }

    // a + bi - (c + di) = (a-c) + (b-d)i
    static sub(c1: Complex, c2: Complex) {
        return new Complex(c1.real - c2.real, c1.imaginary - c2.imaginary)
    }

    // (a + bi)(c + di) = (ac-bd) + (ad+bc)i 
    static mul(c1: Complex, c2: Complex) {
        const ac = c1.real * c2.real
        const bd = c1.imaginary * c2.imaginary
        const ad = c1.real * c2.imaginary
        const bc = c1.imaginary * c2.real
        return new Complex(ac - bd, ad + bc)
    }

    conjugate() { return new Complex(this.real, this.imaginary) }

    //(a+bi)/(c+di) = (a+bi)(c-di)/(c+di)(c-di)
    // (thanks wolframalpha for the solution I did not want to work this out myself)
    // = ((ac+bd) / (c^2+d^2)) + ((bc-ad) / (c^2+d^2))i

    static div(c1: Complex, c2: Complex) {
        const ac = c1.real * c2.real
        const bd = c1.imaginary * c2.imaginary
        const ad = c1.real * c2.imaginary
        const bc = c1.imaginary * c2.real
        const csq = c2.real ^ 2
        const dsq = c2.imaginary ^ 2
        return new Complex((ac + bd) / (csq + dsq), (bc - ad) / (csq + dsq))

    }
}