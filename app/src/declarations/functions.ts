import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import { SongInfo } from "./types";
import { CustomClusterAlgorithm } from "./classes";

export function parseScv(): void {
  const csvFilePath = path.resolve(__dirname, '../data/csv/Most Streamed Spotify Songs 2024.csv');
  const jsonFilePath = path.resolve(__dirname, '../data/json/Most Streamed Spotify Songs 2024.json');
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  const headers = [
    "Track",
    "Album Name",
    "Artist",
    "Release Date",
    "ISRC",
    "All Time Rank",
    "Track Score",
    "Spotify Streams",
    "Spotify Playlist Count",
    "Spotify Playlist Reach",
    "Spotify Popularity",
    "YouTube Views",
    "YouTube Likes",
    "TikTok Posts",
    "TikTok Likes",
    "TikTok Views",
    "YouTube Playlist Reach",
    "Apple Music Playlist Count",
    "AirPlay Spins",
    "SiriusXM Spins",
    "Deezer Playlist Count",
    "Deezer Playlist Reach",
    "Amazon Playlist Count",
    "Pandora Streams",
    "Pandora Track Stations",
    "Soundcloud Streams",
    "Shazam Counts",
    "TIDAL Popularity",
    "Explicit Track"];

  const clusterer = new CustomClusterAlgorithm(["YouTube Views", "TikTok Views", "Pandora Streams", "Spotify Streams", "Soundcloud Streams"]);

  parse(fileContent, {
    delimiter: ',',
    columns: headers,
    from_line: 2,
    on_record: (line) => {
      const song = { info: (line as SongInfo) };
      clusterer.createNewPoint(song);
    }
  }, (error) => {
    if (error) console.error(error);

    const json = clusterer.getClustersJson();

    fs.writeFileSync(jsonFilePath, json, { encoding: 'utf-8' });
  });
}