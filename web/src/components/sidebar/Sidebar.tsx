import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { SongProps } from "../../lib/Song";

import "./Sidebar.css";
import Composition from "../Composition/Composition";

export default function Sidebar(props: SongProps) {
	function CloseSidebar() {
		const sidebar = document.getElementById('sidebar');
		sidebar?.classList.replace('opened-sidebar', 'closed-sidebar');
	}

	return (
		<div id="sidebar" className="sidebar closed-sidebar">
			<button id="close-sidebar-btn" className="btn _sm-icon-btn" type="button" title="Close sidebar button" onClick={CloseSidebar}>
				<FontAwesomeIcon icon={faClose} />
			</button>

			<Composition info={props.info}/>
		</div>
	);
}