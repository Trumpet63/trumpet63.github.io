let width = 720;
let height = 720;
let canvas = <HTMLCanvasElement> document.getElementById("mainCanvas");
canvas.width = width;
canvas.height = height;
let ctx = canvas.getContext("2d");

let fpsContainer = <HTMLDivElement> document.getElementById("fpsContainer");

class Mass {
    public x: number;
    public y: number;
    public vx: number;
    public vy: number;
    public linkedMasses: Mass[];

    public tempForceX: number;
    public tempForceY: number;

    public constructor(x: number, y: number, vx: number, vy: number) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.linkedMasses = [];
    }
};

let masses: Mass[] = [];

// this is an easier way for the programmer to specify links
let linkIndices: [number, number][] = [];

let massRadius = 25;
let numMasses = 6;
let circleRadius = 140;
let angleStepRad = 2 * Math.PI / numMasses;
let angle = 0;
for (let i = 0; i < numMasses; i++) {
    let x = width/2 + circleRadius * Math.sin(angle);
    let y = height/2 + circleRadius * Math.cos(angle);
    masses.push(new Mass(x, y, 0, 0));
    angle += angleStepRad;

    if (i > 0) {
        linkIndices.push([i-1, i]);
    }
}
linkIndices.push([numMasses - 1, 0]);

masses.push(new Mass(width/2, height/2, 0, 0));
for (let i = 0; i < numMasses; i++) {
    linkIndices.push([i, numMasses]);
}

masses[0].vx = 150;
masses[0].vy = 150;
masses[3].vx = -150;
masses[3].vy = -150;

let idealLength: number;
{
    let diff = {x: 0, y: 0};
    subtractInPlace(diff, masses[0], masses[1]);
    idealLength = magnitude(diff) - 2*massRadius;
}

// set up the linked masses according to the given links
let links: {a: Mass, b: Mass}[] = [];
for (let i = 0; i < linkIndices.length; i++) {
    links.push({a: masses[linkIndices[i][0]], b: masses[linkIndices[i][1]]});
}
for (let i = 0; i < linkIndices.length; i++) {
    masses[linkIndices[i][0]].linkedMasses.push(masses[linkIndices[i][1]]);
    masses[linkIndices[i][1]].linkedMasses.push(masses[linkIndices[i][0]]);
}

// simulation parameters
let dt = 0.000006944;
let k = 64; // spring constant
let m = 1; // mass

let springHeight = 16;
let springCanvas = document.createElement("canvas");
springCanvas.width = idealLength;
springCanvas.height = springHeight;
let sCtx = springCanvas.getContext("2d");
let initialX = 0;
let endX = idealLength;
let xStep = 0.1;
let scalar = (springHeight-1) / 2;
sCtx.fillStyle = "gray";
for (let x = 0; x < idealLength; x += xStep) {
    let y = scalar + scalar * Math.sin(0.4 * (x - initialX));
    sCtx.fillRect(x, y, 1, 1);
}

type Vector2 = {
    x: number;
    y: number;
}

function scaleInPlace(dest: Vector2, vector: Vector2, scalar: number) {
    dest.x = scalar * vector.x;
    dest.y = scalar * vector.y;
}

// Note: v1 - v2 will give a vector that points towards v1
function subtractInPlace(dest: Vector2, v1: Mass, v2: Mass): void {
    dest.x = v1.x - v2.x;
    dest.y = v1.y - v2.y;
}

function magnitude(v: Vector2) {
    return Math.sqrt(v.x*v.x + v.y*v.y);
}

function normalizeInPlace(v: Vector2): void {
    let scalar = 1 / Math.sqrt(v.x*v.x + v.y*v.y);
    v.x *= scalar;
    v.y *= scalar;
}

// Make the masses interactive
let heldMassIndex: number;
canvas.addEventListener("mousemove", (event: MouseEvent) => {
    if (heldMassIndex !== undefined) {
        let heldMass = masses[heldMassIndex];
        heldMass.x = event.offsetX;
        heldMass.y = event.offsetY;
    }
});
canvas.addEventListener("mousedown", (event: MouseEvent) => {
    let massRadiusSq = massRadius * massRadius;
    for (let i = 0; i < masses.length; i++) {
        let distanceSq = Math.pow(masses[i].x - event.offsetX, 2) + Math.pow(masses[i].y - event.offsetY, 2);
        if (distanceSq < massRadiusSq) {
            heldMassIndex = i;
            break;
        }
    }
    if (heldMassIndex !== undefined) {
        let heldMass = masses[heldMassIndex];
        heldMass.vx = 0;
        heldMass.vy = 0;
        heldMass.x = event.offsetX;
        heldMass.y = event.offsetY;
    }
});
window.addEventListener("mouseup", () => {
    heldMassIndex = undefined;
});

let previousTimeMillis: number;
let simulationTimeSeconds = 0;
let animationStartTimeMillis: number;
window.requestAnimationFrame(draw);
function draw(currentTimeMillis: number) {
    if (animationStartTimeMillis === undefined) {
        animationStartTimeMillis = currentTimeMillis;
    }
    let animationTimeSeconds = (currentTimeMillis - animationStartTimeMillis) / 1000;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    // simulate
    let numIterations = 0;
    if (animationTimeSeconds !== undefined) {
        if (animationTimeSeconds - simulationTimeSeconds > 1) {
            simulationTimeSeconds = animationTimeSeconds; // assume the user tabbed out
        }
        // loop the update until the simulation is up to date with the requested animation time
        while (simulationTimeSeconds < animationTimeSeconds) {
            // Sum the force that the springs apply to the connected masses
            for (let i = 0; i < masses.length; i++) {
                let mass = masses[i];
                mass.tempForceX = 0;
                mass.tempForceY = 0;
            }
            let massDiameter = 2 * massRadius;
            let smallValue = 0.001;
            for (let i = 0; i < links.length; i++) {
                let link = links[i];

                let diff = {x: 0, y: 0};
                subtractInPlace(diff, link.a, link.b);
                let diffMag = magnitude(diff);
                let springLength = diffMag - massDiameter;
                if (springLength < smallValue) {
                    springLength = smallValue;
                }
                let f = idealLength - springLength; // this is the displacement in the spring force
                // NOTE: I had written 1/springLength here before, which was wrong:
                let scalar = 1/diffMag;
                scaleInPlace(diff, diff, scalar); // now diff is a normalized direction vector

                link.a.tempForceX += diff.x * f;
                link.a.tempForceY += -diff.y * f; // negate because of the reversed y-axis
                link.b.tempForceX -= diff.x * f;
                link.b.tempForceY -= -diff.y * f; // negate because of the reversed y-axis
            }

            for (let i = 0; i < masses.length; i++) {
                if (i === heldMassIndex) {
                    continue;
                }
                let mass = masses[i];

                let ax = (k * mass.tempForceX - 0.5*mass.vx) / m;
                mass.vx += dt * ax;
                mass.x += dt * mass.vx;

                let ay = (k * mass.tempForceY - 0.5*mass.vy) / m;
                mass.vy += dt * ay;
                mass.y -= dt * mass.vy; // negate because of the reversed y-axis
            }

            simulationTimeSeconds += dt;
            numIterations++;
        }
    }

    // Collision check with walls
    for (let i = 0; i < masses.length; i++) {
        let mass = masses[i];
        let massLeftX = mass.x - massRadius;
        if (massLeftX < 0) {
            mass.x -= massLeftX;
            mass.vx = 0;
        }
        let massRightX = mass.x + massRadius;
        if (massRightX > width) {
            mass.x -= massRightX - width;
            mass.vx = 0;
        }
        let massTopY = mass.y - massRadius;
        if (massTopY < 0) {
            mass.y -= massTopY;
            mass.vy = 0;
        }
        let massBottomY = mass.y + massRadius;
        if (massBottomY > height) {
            mass.y -= massBottomY - height;
            mass.vy = 0;
        }
    }

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    // draw springs
    for (let i = 0; i < links.length; i++) {
        let link = links[i];
        let diff = {x: 0, y: 0};
        subtractInPlace(diff, link.b, link.a);
        let mag = magnitude(diff) - 2*massRadius;
        normalizeInPlace(diff);
        let angle = Math.atan2(diff.y, diff.x);
        scaleInPlace(diff, diff, massRadius);
        diff.x += link.a.x;
        diff.y += link.a.y;

        ctx.translate(diff.x, diff.y);
        ctx.rotate(angle);
        ctx.drawImage(
            springCanvas,
            0,
            -springHeight/2,
            mag,
            springHeight,
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    // draw masses
    for (let i = 0; i < masses.length; i++) {
        let mass = masses[i];
        ctx.beginPath();
        ctx.arc(mass.x, mass.y, massRadius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // draw fps
    if (previousTimeMillis !== undefined) {
        let fps = 1000 / (currentTimeMillis - previousTimeMillis);
        fpsContainer.innerText = "FPS: " + (Math.round(fps * 100) / 100);
    }

    previousTimeMillis = currentTimeMillis;
    window.requestAnimationFrame(draw);
}
