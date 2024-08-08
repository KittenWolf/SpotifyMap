import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { SongProps } from "../../lib/Song";

import "./Composition.css";

export default function Composition(props: SongProps) {
	return (
		<div className="composition-showcase">
			<div className="composition-showcase-body">
				<div className="composition-title">{props.info?.track}</div>
				<div className="composition-author">{props.info?.artist}</div>

				<div className="composition-showcase-footer">
					<PlatformStat value={props.info?.youtubeViews} icon={faYoutube} />
					<PlatformStat value={props.info?.tiktokViews} icon={faTiktok} />
				</div>
			</div>
		</div>
	);
}

type PlatformStatProps = {
	value?: bigint;
	icon: IconDefinition;
}

function PlatformStat(props: PlatformStatProps) {		
	const value = props.value ?? 0;

	return (
		<div className="composition-stats-block">
			<FontAwesomeIcon icon={props.icon} />
			<span>{String(value)} views</span>
		</div>
	);
}