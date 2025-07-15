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

    mod() {
        return Math.sqrt((this.real ^ 2) + (this.imaginary ^ 2))
    }

    // a + bi + c + di = (a+c) + (b+d)i
    static add(z: Complex, w: Complex) {
        return new Complex(z.real + w.real, z.imaginary + w.imaginary)
    }

    // a + bi - (c + di) = (a-c) + (b-d)i
    static sub(z: Complex, w: Complex) {
        return new Complex(z.real - w.real, z.imaginary - w.imaginary)
    }

    // (a + bi)(c + di) =(ac-bd) + (ad+bc)i 
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
        const csq = w.real * w.real
        const dsq = w.imaginary * w.imaginary
        return new Complex((ac + bd) / (csq + dsq), (bc - ad) / (csq + dsq))
    }

    stringify() {
        if (this.imaginary === 0) return `${this.real}`
        if (this.real === 0) return `${this.imaginary}i`
        if (this.imaginary < 0) return `${this.real} - ${Math.abs(this.imaginary)}i`
        return `${this.real} + ${this.imaginary}i`
    }
}


//* TEST 1: zw = real
// True if w = z*
function testA(z: Complex, w: Complex) {
    return Complex.mul(z, w).imaginary === 0
}

//* TEST 2: z + z* + w = imaginary
// true if, where w = x + yi and z = a + bi, -2a = x
function testB(z: Complex, w: Complex) {
    const zpluszstar = Complex.add(z, z.conjugate())
    return Complex.add(zpluszstar, w).real === 0
}

//* TEST 3: mod z = mod w 
function testC(z: Complex, w: Complex) {
    return z.mod() === w.mod()
}

function main() {
    let running = true
    let z: Complex, w: Complex
    let testResults = [false, false, false]
    let resString = ""
    let print = ""
    let iteration = 1
    z = new Complex(0, 0)
    w = new Complex(0, 0)
    while (running) {
        testResults[0] = testA(z, w)
        testResults[1] = testB(z, w)
        testResults[2] = testC(z, w)
        if (testResults[0]) resString += "A"
        if (testResults[1]) resString += "B"
        if (testResults[2]) resString += "C"
        print = `${z.stringify()} & ${w.stringify()}: ${resString}`
        if ((resString !== "C") && (resString !== "")) {
            if (!(z.stringify() === "0" && w.stringify() === "0")) {
                console.log(print)
                if (resString === "ABC") {
                    running = false
                }
            }

        }

        print = ""
        resString = ""
        z.update(randomIntFromInterval(1, Math.pow(2, 16)), randomIntFromInterval(1, Math.pow(2, 16)))
        w.update(randomIntFromInterval(1, Math.pow(2, 16)), randomIntFromInterval(1, Math.pow(2, 16)))
        testResults = [false, false, false]
        iteration++
    }
    console.log(`${iteration} iterations`)
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

main()