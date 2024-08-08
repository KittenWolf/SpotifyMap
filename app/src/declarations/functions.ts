import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import { Song } from "./types";

export function parseScv(): void {
  const csvFilePath = path.resolve(__dirname, '../data/csv/Most Streamed Spotify Songs 2024.csv');
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
  const headers = [
    'track',
    'albumName',
    'artist',
    'releaseDate',
    'ISRC',
    'rank',
    'score',
    'spotifyStreams',
    'spotifyPlaylistCount',
    'spotifyPlaylistReach',
    'spotifyPopularity',
    'youtubeViews',
    'youtubeLikes',
    'tiktokPosts',
    'tiktokLikes',
    'tiktokViews',
    'youtubePlaylistReach',
    'applemusicPlaylistCount',
    'airplaySpins',
    'siriousXMSpins',
    'deezerPlaylistCount',
    'deezerPlaylistReach',
    'amazonPlaylistCount',
    'pandoraStreams',
    'pandoraTrackStations',
    'soundcloudStreams',
    'shazamCounts',
    'tidalPopularity',
    'explicitTrack'];

  parse(fileContent, {
    delimiter: ',',
    columns: headers,
  }, (error, result: Song[]) => {
    if (error) {
      console.error(error);
    }

    const jsonFilePath = path.resolve(__dirname, '../data/json/Most Streamed Spotify Songs 2024.json');

    fs.writeFileSync(jsonFilePath, JSON.stringify(result), { encoding: 'utf-8' });
  });
}
