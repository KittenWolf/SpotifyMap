import React, { useEffect, useState } from 'react';
import { CanvasHandler } from './lib/CanvasHandler';
import { Point } from './lib/Point';
import { SongInfo, SongMark } from './lib/Song';

import Sidebar from './components/sidebar/Sidebar';
import Toolbar from './components/toolbar/Toolbar';
import axios from 'axios';

import './App.css';

function App() {
	const [data, setData] = useState<SongInfo[]>([]);
	const [activeInfo, setActiveInfo] = useState<SongInfo>();

	useEffect(() => {
		axios.get('/api/data')
			.then(
				result => {
					setData(result.data);
					initCanvasHandler();
				}
			);
	}, []);

	function initCanvasHandler() {
		const marks: SongMark[] = [];
		const canvas = document.getElementsByTagName('canvas')[0];

		data.forEach(obj => {
			const x = Math.random() * canvas.width;
			const y = Math.random() * canvas.height;

			marks.push(new SongMark(obj, new Point(x, y)));
		});

		const canvasHandler = new CanvasHandler(canvas, marks, setActiveInfo);

		canvasHandler.drawObjects();

		// console.log("Init canvas");		
	}

	return (
		<div className="App">
			<div className="page-wrapper">
				<Toolbar />
				<Sidebar info={activeInfo}/>

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
