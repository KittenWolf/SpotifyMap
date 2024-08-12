import React, { useEffect, useState } from 'react';
import { CanvasHandler } from './lib/classes';
import { Cluster, SongInfo } from './lib/types';

import Sidebar from './components/sidebar/Sidebar';
import Toolbar from './components/toolbar/Toolbar';
// import axios from 'axios';

import data from './data/Most Streamed Spotify Songs 2024.json';
import './App.css';

function App() {
	const [clusters, setClusters] = useState<Cluster[]>([]);
	const [activeInfo, setActiveInfo] = useState<SongInfo>();

	useEffect(() => {
		fetchClusters();
	}, []);

	
	useEffect(() => {
		if (clusters.length === 0) {
			return;
		}
		
		initCanvasHandler();
	}, [clusters]);
	
	// For server side
	// async function fetchClusters() {
	// 	try {
	// 		const result = await axios.get('/api/data');
	// 		setClusters(result.data);
	// 	} catch (error) {
	// 		console.error('Error fetching data:', error);
	// 	}
	// }

	// For front side
	function fetchClusters() {
		setClusters(data as unknown as React.SetStateAction<Cluster[]>);
	}

	function initCanvasHandler() {
		const canvas = document.getElementsByTagName('canvas')[0];
		const canvasHandler = new CanvasHandler(canvas, setActiveInfo);

		clusters.forEach(cluster => {
			canvasHandler.clusters.push(cluster);
		});

		canvasHandler.createMapLegend();
		canvasHandler.renderClusters();	
	}

	return (
		<div className="App">
			<div className="page-wrapper">
				<Toolbar />
				<Sidebar info={activeInfo as SongInfo} />

				<div className="page-content">
					<div id="scene" className="scene">
						<canvas id="Map" className="SpotifyMap" width="100%" height="100%" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
