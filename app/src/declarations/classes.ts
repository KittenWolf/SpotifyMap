import HttpStatusCodes from '@src/configurations/HttpStatusCodes';
import { Cluster, Point, Song, SongInfo } from './types';

export class RouteError extends Error {
  status: HttpStatusCodes;
  constructor(status: HttpStatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}

export class CustomClusterAlgorithm {
  private readonly _clusters: Cluster[] = [];

  constructor(observations: string[]) {
    this.createClusters(observations);
  }

  getClustersJson(): string {  
    return JSON.stringify(this._clusters);
  }

  createNewPoint(song: Song) {
    let x = 0;
    let y = 0;

    for (let i = 0; i < this._clusters.length; i++) {
      const cluster = this._clusters[i];
      const key = cluster.name as keyof (SongInfo);
      const value = +song.info[key].toString().replace(/,/g, '');
      
      if (typeof +value === "number") {
        x += value * cluster.vector.x;
        y += value * cluster.vector.y;
      }
    }

    song.point = { x, y };

    this.setSongAssignment(song);
  }

  private setSongAssignment(song: Song) {
    let minDistance = Number.MAX_SAFE_INTEGER;
    let closestCluster: Cluster = this._clusters[0];

    this._clusters.forEach(cluster => {
      let distance = 0;

      if (song.point) {
        distance = this.euclideanDistance(cluster.vector, song.point);
      }

      if (distance < minDistance) {
        minDistance = distance;
        closestCluster = cluster;
      }
    });

    closestCluster.songs.push(song);  
  }

  private createClusters(observations: string[]) {
    const degree = 360 / observations.length;

    for (let i = 0; i < observations.length; i++) {      
      const x = Number(Math.cos(degree * i * Math.PI / 180).toFixed(2));
      const y = Number(Math.sin(degree * i * Math.PI / 180).toFixed(2));
  
      this._clusters.push({name: observations[i], songs: [], vector: { x, y }});
    }
  }

  private euclideanDistance(point1: Point, point2: Point): number {
    return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
  }
}

