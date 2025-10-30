export class Color {
    public red: number;
    public green: number;
    public blue: number;

    public constructor(r: number, g: number, b: number) {
        this.red = r;
        this.green = g;
        this.blue = b;
    }

    public getStyle() {
        return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
    }
}

// I think this is wrong because we assume fromEnd is greater than fromStart
export function mapLinear(fromStart: number, value: number, fromEnd: number, toStart: number, toEnd: number) {
    if (toStart === toEnd) {
        return toStart;
    }
    let ratio = (value - fromStart) / (fromEnd - fromStart);
    let toValue = toStart + ratio * (toEnd - toStart);
    return toValue;
}

export function interpolateColors(start: Color, end: Color, ratio: number) {
    return new Color(
        ratio * (end.red - start.red) + start.red,
        ratio * (end.green - start.green) + start.green,
        ratio * (end.blue - start.blue) + start.blue,
    );
}

export function multiColorGradient(colorStops: {color: Color, stopValue: number}[], ratio: number): Color {
    if (ratio <= 0) {
        return colorStops[0].color;
    } else if (ratio >= 1) {
        return colorStops[colorStops.length - 1].color;
    }

    let i = 0;
    while (colorStops[i].stopValue < ratio) {
        i++;
    }
    let lowerColorStop = colorStops[i-1];
    let upperColorStop = colorStops[i];
    let newRatio = mapLinear(lowerColorStop.stopValue, ratio, upperColorStop.stopValue, 0, 1);
    return interpolateColors(lowerColorStop.color, upperColorStop.color, newRatio);
}

// hue is 0 - 360 degrees, saturation is 0 to 1, lightness is 0 to 1
// created based on wikipedia: https://en.wikipedia.org/wiki/HSL_and_HSV
export function HSLToRGB(h: number, s: number, l: number): Color {
    let c = (1 - Math.abs(2 * l - 1)) * s; // c is chroma
    let h_prime = h / 60;
    let x = c * (1 - Math.abs(h_prime % 2 - 1));

    let tempColor: Color;
    if (0 <= h_prime && h_prime < 1) {
        tempColor = new Color(c, x, 0);
    }
    else if (1 <= h_prime && h_prime < 2) {
        tempColor = new Color(x, c, 0);
    }
    else if (2 <= h_prime && h_prime < 3) {
        tempColor = new Color(0, c, x);
    }
    else if (3 <= h_prime && h_prime < 4) {
        tempColor = new Color(0, x, c);
    }
    else if (4 <= h_prime && h_prime < 5) {
        tempColor = new Color(x, 0, c);
    }
    else if (5 <= h_prime && h_prime <= 6) {
        tempColor = new Color(c, 0, x);
    }

    let m = l - c / 2;
    return new Color(
        255 * (tempColor.red + m),
        255 * (tempColor.green + m),
        255 * (tempColor.blue + m),
    );
}

export function enumKeys<E>(e: E): (keyof E)[] {
    return Object.keys(e) as (keyof E)[];
}

export function getInputValueById(id: string): number {
    return (<HTMLInputElement> document.getElementById(id)).valueAsNumber;
}

export function distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
    // return Math.hypot(y2 - y1, x2 - x1);
}
