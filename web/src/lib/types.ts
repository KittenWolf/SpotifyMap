export type SongInfo = {
	"Track": string,
	"Album": string,
	"Name": string,
	"Artist": string
	"Release Date": Date,
	"ISRC": string,
	"All Time Rank": number,
	"Track Score": number,
	"Spotify Streams": number,
	"Spotify Playlist Count": number,
	"Spotify Playlist Reach": number,
	"Spotify Popularity": number,
	"YouTube Views": number,
	"YouTube Likes": number,
	"TikTok Posts": number,
	"TikTok Likes": number,
	"TikTok Views": number,
	"YouTube Playlist Reach": number,
	"Apple Music Playlist Count": number,
	"AirPlay Spins": number,
	"SiriusXM Spins": number,
	"Deezer Playlist Count": number,
	"Deezer Playlist Reach": number,
	"Amazon Playlist Count": number,
	"Pandora Streams": number,
	"Pandora Track Stations": number,
	"Soundcloud Streams": number,
	"Shazam Counts": number,
	"TIDAL Popularity": number,
	"Explicit Track": number
}

export type Point = {
	x: number;
	y: number;
}

export type Cluster = {
	name: string,
	songs: Song[],
	vector: Point
}

export type Song = {
	info: SongInfo;
	point: Point;
	path2D?: Path2D;
}
