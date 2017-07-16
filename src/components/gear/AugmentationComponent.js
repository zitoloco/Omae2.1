import React from 'react';
import cyberwareData from '../../data/cyberware.json';

class AugmentationComponent extends React.PureComponent {
	componentWillMount() {
		const checkCyberlimbLocation = (name) => {
				switch (true) {
				case /Leg|Foot|Liminal/.test(name):
					return 'leg';
				case /Arm|Hand/.test(name):
					return 'arm';
				case /Torso/.test(name):
					return 'torso';
				case /[S|s]kull/.test(name):
					return 'skull';
				default:
					return 'default';
				}
			},

			checkCyberlimbType = (name) => {
				switch (true) {
				case /Prosthetic/.test(name):
					return 'prosthetic';
				case /Synthetic/.test(name):
					return 'synthetic';
				case /Liminal/.test(name):
					return 'liminal';
				default:
					return 'obvious';
				}
			},

			organizeCyberlimbs = (cyberlimbObject, limb) => {
				const limbLocation = checkCyberlimbLocation(limb.name),
					limbType = checkCyberlimbType(limb.name);

				return {
					...cyberlimbObject,
					[limbLocation]: {
						...(cyberlimbObject[limbLocation] || {}),
						[limbType]: [
							...(
								(
									cyberlimbObject[limbLocation]
									&& cyberlimbObject[limbLocation][limbType]
								)
								|| []
								),
							limb
						]
					}
				};
			};

		this.cyberware = cyberwareData.reduce((memo, ware) => {
			return {
				...memo,
				[ware.category]: (
					ware.category === 'Cyberlimb' ?
					organizeCyberlimbs((memo.Cyberlimb || {}), ware)
					:
					[
						...(memo[ware.category] || []),
						ware
					]
				)
			};
		}, {});

		console.log(this.cyberware);
	}

	render() {
		return (
			<div className="augs">
				augs
			</div>
		);
	}
}

export default AugmentationComponent;