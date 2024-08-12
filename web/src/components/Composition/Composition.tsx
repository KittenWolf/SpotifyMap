import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { SongProps } from "../sidebar/Sidebar";
import { SongInfo } from "../../lib/types";

import "./Composition.css";

export default function Composition(props: SongProps) {
	const infoFields = [];

	for (const key in props.info) {
		const value = props.info[key as keyof SongInfo];
		infoFields.push(<InfoField key={key} infoKey={key} infoValue={value} />);
	}

	if (!props.info) {
		return (
			<div></div>
		)
	}
	else {
		return (
			<div className="composition-showcase">
				<div className="composition-showcase-body">
					<div className="composition-title">{props?.info["Track"]}</div>
					<div className="composition-author">{props?.info["Artist"]}</div>

					<div className="composition-showcase-footer">
						<PlatformStat value={props?.info["YouTube Views"]} icon={faYoutube} />
						<PlatformStat value={props?.info["TikTok Views"]} icon={faTiktok} />
					</div>
				</div>

				<div className="composition-showcase-extra">
					{infoFields}
				</div>
			</div>
		);
	}
}

type PlatformStatProps = {
	value?: number;
	icon: IconDefinition;
}

function PlatformStat(props: PlatformStatProps) {
	const { value, icon } = props;

	return (
		<div className="composition-stats-block">
			<FontAwesomeIcon icon={icon} />
			<span>{value} views</span>
		</div>
	);
}

type InfoFieldProps = {
	infoKey: string,
	infoValue: number | string | Date
}

function InfoField(props: InfoFieldProps) {
	const { infoKey, infoValue } = props;

	return (
		<div className="composition-showcase-extra__item">
			<span>{infoKey}</span>
			<span>{String(infoValue)}</span>
		</div>
	);
}