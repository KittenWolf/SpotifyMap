import { SongMark } from "./Song";

export class CanvasHandler {	
	private readonly _canvasObjects: SongMark[] = [];
	private readonly _callback: CallableFunction;
	private readonly _ctx: CanvasRenderingContext2D;

	readonly canvas: HTMLCanvasElement;

	constructor(canvas: HTMLCanvasElement, marks: SongMark[], callback: CallableFunction) {
		const scene = document.getElementById('scene');
		
		this.canvas = canvas;
		this.canvas.width = scene?.clientWidth ?? 800;
		this.canvas.height = scene?.clientHeight ?? 800;

		this._ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
		this._canvasObjects = marks;
		this._callback = callback;

		this.initMarkClickEvent();	
	}

	initMarkClickEvent(): void {
		this.canvas.addEventListener('click', (e) => {
			this._canvasObjects.forEach(obj => {
				if (obj.path2D) {
					const isPointInPath = this._ctx.isPointInPath(obj.path2D, e.offsetX, e.offsetY);

					if (isPointInPath) {
						this._callback(obj.info);
						this.refillObject(obj.path2D);
						// this.drawObject(obj, 'red');
					}
				}
			});
		});
	}

	refillObject(path2D: Path2D) {
		this._ctx.fillStyle = "#1db954" as string;
		this._ctx.fill(path2D);
	}

	drawObject(mark: SongMark, color?: string): void {
		const circle = new Path2D();

		circle.arc(mark.point.x, mark.point.y, 3, 0, Math.PI * 2);

		this._ctx.fillStyle = color as string;
		this._ctx.fill(circle);

		mark.path2D = circle;
	}

	drawObjects(): void {
		this.resetCanvas();

		this._canvasObjects.forEach(obj => {
			this.drawObject(obj, "#373737");
		});
	}

	resetCanvas(): void {
		this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}