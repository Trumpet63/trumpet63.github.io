import { BASE_ARROW_SIZE, MAX_ARROW_SIZE, MIN_ARROW_SIZE } from ".";
import UI from "./ui_context";
import { distance, mapLinear } from "./util";

export class Arrow {
    public centerX: number;
    public centerY: number;
    public size: number;
    public rotation: number;
    public opacity: number;
    public velocityX: number;
    public velocityY: number;
    public angularVelocity: number;
    public radius: number; // this radius takes into account the fact that the (otherwise square) arrow can rotate

    public initialCenterX: number;
    public initialCenterY: number;
    public initialRotation: number;
    public pastArrowStateIndex: number;
    private logCounter: number = 0;

    public constructor(
        initialCenterX: number,
        initialCenterY: number,
        size: number,
        initialRotation: number,
        opacity: number,
        velocityX: number,
        velocityY: number,
        angularVelocity: number,
    ) {
        this.initialCenterX = initialCenterX;
        this.initialCenterY = initialCenterY;
        this.size = size;
        this.initialRotation = initialRotation;
        this.opacity = opacity;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.angularVelocity = angularVelocity;

        this.centerX = this.initialCenterX;
        this.centerY = this.initialCenterY;
        this.rotation = this.initialRotation;
        this.radius = this.size / 2 * Math.SQRT2;
    }

    public drawFromBase(ctx: CanvasRenderingContext2D, baseCanvas: HTMLCanvasElement) {
        ctx.save();
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate(this.rotation);
        ctx.translate(-this.centerX, -this.centerY);
        ctx.globalAlpha = this.opacity;
        let destinationSize = baseCanvas.width * (this.size / BASE_ARROW_SIZE);
        let topLeftX: number = this.centerX - destinationSize / 2;
        let topLeftY: number = this.centerY - destinationSize / 2;
        ctx.drawImage(
            baseCanvas,
            0,
            0,
            baseCanvas.width,
            baseCanvas.height,
            topLeftX,
            topLeftY,
            destinationSize,
            destinationSize);
        ctx.restore();
    }

    public getArrowTimeMillis(currentTimeMillis: number) {
        let millisOffset = mapLinear(MIN_ARROW_SIZE, this.size, MAX_ARROW_SIZE, -800, 0);
        return currentTimeMillis + millisOffset;
    }

    public draw(
        ctx: CanvasRenderingContext2D,
        audioSamples: Float32Array | number[],
        lineColor: string,
        lineWidth: number,
    ) {
        let thickness = this.size * 0.2;
        let topLeftX: number = this.centerX - this.size / 2;
        let topLeftY: number = this.centerY - this.size / 2;
        
        let topX: number = topLeftX + this.size / 2;
        let topY: number = topLeftY;
        let rightWingTopX: number = topLeftX + this.size;
        let rightWingTopY: number = topLeftY + this.size / 2;
        let rightWingBottomX: number = topLeftX + this.size - thickness * Math.SQRT1_2;
        let rightWingBottomY: number = topLeftY + this.size / 2 + thickness * Math.SQRT1_2;
        let rightArmpitX: number = topLeftX + this.size / 2 + thickness / 2;
        let rightArmpitY: number = topLeftY + thickness * Math.SQRT2 + thickness / 2;
        let baseRightX: number = topLeftX + this.size / 2 + thickness / 2;
        let baseRightY: number = topLeftY + this.size;
        let baseLeftX: number = topLeftX + this.size / 2 - thickness / 2;
        let baseLeftY: number = topLeftY + this.size;
        let leftArmpitX: number = topLeftX + this.size / 2 - thickness / 2;
        let leftArmpitY: number = topLeftY + thickness * Math.SQRT2 + thickness / 2;
        let leftWingBottomX: number = topLeftX + thickness * Math.SQRT1_2;
        let leftWingBottomY: number = topLeftY + this.size / 2 + thickness * Math.SQRT1_2;
        let leftWingTopX: number = topLeftX;
        let leftWingTopY: number = topLeftY + this.size / 2;

        let path: {x: number, y: number}[] = [];
        path.push({x: topX, y: topY});
        path.push({x: rightWingTopX, y: rightWingTopY});
        path.push({x: rightWingBottomX, y: rightWingBottomY});
        path.push({x: rightArmpitX, y: rightArmpitY});
        path.push({x: baseRightX, y: baseRightY});
        path.push({x: baseLeftX, y: baseLeftY});
        path.push({x: leftArmpitX, y: leftArmpitY});
        path.push({x: leftWingBottomX, y: leftWingBottomY});
        path.push({x: leftWingTopX, y: leftWingTopY});
        path.push({x: topX, y: topY});
        
        let pathLength = 0;
        let pathDistances = [];
        pathDistances.push(0);
        for (let i = 1; i < path.length; i++) {
            pathLength += distance(path[i-1].x, path[i-1].y, path[i].x, path[i].y);
            pathDistances.push(pathLength);
        }
        
        ctx.save();
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate(this.rotation);
        ctx.translate(-this.centerX, -this.centerY);
        ctx.globalAlpha = this.opacity;
        this.drawWaveformOnPath(
            ctx,
            audioSamples,
            lineColor,
            lineWidth,
            path,
            pathDistances,
            pathLength,
        );
        ctx.restore();
    }

    private drawWaveformOnPath(
        ctx: CanvasRenderingContext2D,
        audioSamples: Float32Array | number[],
        lineColor: string,
        lineWidth: number,
        path: {x: number, y: number}[],
        pathDistances: number[],
        pathLength: number,
    ) {
        let drawAmplitude = 80 * 0.2;
        // let drawAmplitude = 80 * UI.pathAmplitudeMultiplier;
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
        ctx.beginPath();
        for (let i = 0; i < audioSamples.length; i++) {
            // Do I want the last sample to be exactly at the end of the path?
            // If so, length - 1 is fine, otherwise maybe do length - 2
            let iDistance = mapLinear(0, i, audioSamples.length - 1, 0, pathLength);
            
            let j = 0;
            while (pathDistances[j] <= iDistance) {
                j++;
            }
            if (j >= pathDistances.length) {
                j = pathDistances.length - 1;
            }
    
            let centerX = mapLinear(pathDistances[j-1], iDistance, pathDistances[j], path[j-1].x, path[j].x);
            let centerY = mapLinear(pathDistances[j-1], iDistance, pathDistances[j], path[j-1].y, path[j].y);
            
            // If we define dx = x2 - x1 and dy = y2 - y1, then the normals are (-dy, dx) and (dy, -dx).
            // https://stackoverflow.com/questions/1243614/how-do-i-calculate-the-normal-vector-of-a-line-segment
            let sample = audioSamples[i];
            let currentPathLength = distance(path[j-1].x, path[j-1].y, path[j].x, path[j].y);
            let dy = (path[j-1].y - path[j].y) / currentPathLength;
            let dx = (path[j-1].x - path[j].x) / currentPathLength;
            let x = centerX - drawAmplitude * sample * dy;
            let y = centerY + drawAmplitude * sample * dx;
            if (i === 0) {
                ctx.moveTo(x, y);
            }
            else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        ctx.restore();
    }

    public isInsideRectangle(
        rect: {topLeftX: number, topLeftY: number, width: number, height: number},
    ): boolean {
        let margin = this.size / 2 * Math.SQRT2;
        return (rect.topLeftX - margin < this.centerX)
            && (rect.topLeftY - margin < this.centerY);
        // return (rect.topLeftX - margin < this.centerX) && (this.centerX < rect.topLeftX + rect.width + margin)
        //     && (rect.topLeftY - margin < this.centerY) && (this.centerY < rect.topLeftY + rect.height + margin);
    }
}
