import { Cluster, Point, Song } from "./types";

export class CanvasHandler {
	private readonly _callback: CallableFunction;
	private readonly _ctx: CanvasRenderingContext2D;
	private readonly _canvas: HTMLCanvasElement;
	private readonly _scene: HTMLElement | null;
	private _legend: HTMLElement | null;

	clusters: Cluster[] = [];
	colors = ["#FBCEB1", "#7FFFD4", "#E32636", "#F19CBB", "#A3DE83", "#307672"];

	scale = 0.00001;
	isDragging = false;
	dragStartPosition: Point = { x: 0, y: 0 };
	currentTransformedCursor: Point = { x: 0, y: 0 };

	constructor(canvas: HTMLCanvasElement, callback: CallableFunction) {
		const scene = document.getElementById("scene");
		const legend = document.getElementById("MapLegend");

		this._canvas = canvas;
		this._canvas.width = scene?.clientWidth ?? 800;
		this._canvas.height = scene?.clientHeight ?? 800;

		this._scene = scene;
		this._legend = legend;

		this._ctx = this._canvas.getContext("2d") as CanvasRenderingContext2D;
		this._callback = callback;

		this.initEvents();
	}

	//#region public
	renderClusters(): void {
		this.resetCanvas();

		this.clusters.forEach((cluster, i) => {
			this.renderCluster(cluster, this.colors[i] ?? "#373737");
		});
	}

	renderCluster(cluster: Cluster, color: string): void {
		cluster.songs.forEach(song => {
			this.renderSongMark(song, color);
		});
	}

	createMapLegend(): void {
		if (!this._legend) {
			const legend = document.createElement("div");
			legend.className = "map-legend";
			legend.id = "MapLegend";

			this._legend = legend;
			this._scene?.appendChild(legend);
		}

		this.clusters.forEach((cluster, i) => {
			this.createMapLegendItem(cluster.name, this.colors[i]);
		});
	}

	resetCanvas(): void {
		this._ctx.save();
		this._ctx.setTransform(1, 0, 0, 1, 0, 0);
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
		this._ctx.restore();
	}
	//#endregion

	//#region Private
	private getTransformedPoint(x: number, y: number): Point {
		const transform = this._ctx.getTransform();
		const transformedX = x - transform.e;
		const transformedY = y - transform.f;

		return {
			x: transformedX,
			y: transformedY
		};
	}

	private renderSongMark(mark: Song, color?: string): void {
		const circle = new Path2D();
		const centerX = this._canvas.width / 2;
		const centerY = this._canvas.height / 2;

		const x = centerX + (mark.point.x * this.scale);
		const y = centerY + (mark.point.y * this.scale);

		circle.arc(x, y, 3, 0, Math.PI * 2);

		this._ctx.fillStyle = color as string;
		this._ctx.fill(circle);

		mark.path2D = circle;
	}

	private createMapLegendItem(name: string, color: string): void {
		const clusterName = document.createElement("div");
		const clusterColor = document.createElement("div");

		clusterColor.style.width = "10px";
		clusterColor.style.height = "10px";
		clusterColor.style.backgroundColor = color;

		clusterName.className = "map-legend__item";
		clusterName.textContent = name;

		clusterName.appendChild(clusterColor);
		this._legend?.appendChild(clusterName);
	}

	//#region Events
	private initEvents(): void {
		this._canvas.addEventListener('click', this.onMouseClick.bind(this));
		this._canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
		this._canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
		this._canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
		this._canvas.addEventListener('wheel', this.onWheel.bind(this));
	}

	private onMouseClick(e: MouseEvent): void {		
		this.clusters.forEach(cluster => {
			cluster.songs.forEach(song => {
				if (song.path2D) {
					const isPointInPath = this._ctx.isPointInPath(song.path2D, e.offsetX, e.offsetY);

					if (isPointInPath) {
						this._callback(song.info);

						const sidebar = document.getElementById("sidebar");
						sidebar?.classList.replace('closed-sidebar', 'opened-sidebar');
					}
				}
			});
		});
	}

	private onMouseDown(e: MouseEvent): void {		
		this.isDragging = true;
		this.dragStartPosition = this.getTransformedPoint(e.offsetX, e.offsetY);
	}

	private onMouseMove(e: MouseEvent): void {		
		this.currentTransformedCursor = this.getTransformedPoint(e.offsetX, e.offsetY)

		if (this.isDragging == true) {			
			this._ctx.translate(this.currentTransformedCursor.x - this.dragStartPosition.x, this.currentTransformedCursor.y - this.dragStartPosition.y);
			this.renderClusters();
		}
	}

	private onMouseUp(): void {		
		this.isDragging = false;
	}

	private onWheel(e: WheelEvent): void {		
		const zoom = e.deltaY < 0 ? 1.1 : 0.9;

		this._ctx.translate(this.currentTransformedCursor.x, this.currentTransformedCursor.y);
		this._ctx.scale(zoom, zoom);
		this._ctx.translate(-this.currentTransformedCursor.x, -this.currentTransformedCursor.y);

		this.renderClusters();
		e.preventDefault();

	}
	//#endregion	
	//#endregion
}