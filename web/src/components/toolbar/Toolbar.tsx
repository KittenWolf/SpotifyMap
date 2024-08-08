import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

import './Toolbar.css';

export default function Toolbar() {
	return (
		<div id="toolbar" className="toolbar">
			<BrushToolButton />
		</div>
	);
}

function BrushToolButton() {
	function OpenBrushTool() {
		const sidebar = document.getElementById('sidebar');
		sidebar?.classList.replace('closed-sidebar', 'opened-sidebar');
	}

	return (
		<button className="btn _sm-icon-btn _dark-btn" type="button" title="brush tools" onClick={OpenBrushTool}>
			<FontAwesomeIcon icon={faMusic} />
		</button>
	);
}