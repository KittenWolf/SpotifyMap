export type Song = {
	artist: string;	
	track: string;
	albumName: string;
	releaseDate: Date;
	ISRC: string;
	rank: number;
	score: number;

	spotifyStreams: bigint;
	spotifyPlaylistCount: bigint;
	spotifyPlaylistReach: bigint;
	spotifyPopularity: number;

	youtubeViews: bigint;
	youtubeLikes: bigint;
	youtubePlaylistReach: bigint;

	tiktokPosts: bigint;
	tiktokLikes: bigint;
	tiktokViews: bigint;

	deezerPlaylistCount: bigint;
	deezerPlaylistReach: bigint;

	pandoraStreams: bigint;
	pandoraTrackStations: bigint;

	airplaySpins: bigint;
	amazonPlaylistCount: bigint;
	applemusicPlaylistCount: bigint;
	siriousXMSpins: bigint;
	shazamCounts: bigint;
	soundcloudStreams: bigint;
	tidalPopularity: bigint;
	
	explicitTrack: boolean;
}