import React from 'react';
import PropTypes from 'prop-types';

class CyberwareRowComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			Rating: 1
		};

		this.evil = eval;

		this.updateRating = this.updateRating.bind(this);
		this.calculateAvail = this.calculateAvail.bind(this);
	}

	generateRatingOptions() {
		const ratingOptions = [];

		for (let i = 1; i <= this.props.ware.rating; ++i) {
			ratingOptions.push(
				<option key={`${this.props.ware.name}-${i}`} value={i}>{i}</option>
			);
		}

		return ratingOptions;
	}

	updateRating(event) {
		const { value } = event.target;

		this.setState({
			Rating: +value
		});
	}

	calculateAvail() {
		const {rating, avail} = this.props.ware;

		if (rating && /Rating/.test(avail)) {
			const availSplit = avail.match(/Rating [*] \d+/),
				restriction = avail.match(/[R|F]$/),
				{Rating} = this.state;

			return (availSplit && `${this.evil((availSplit[0] || '').replace('Rating', Rating))}${(restriction && restriction[0]) || ''}`) || Rating;
		}

		return avail;
	}

	render() {
		const {name, ess, rating, cost, source, page} = this.props.ware;
		return (
			<tr>
				<td className="cyberware--buy">+</td>
				<td className="cyberware--name">{name}</td>
				<td className="cyberware--ess">{ess}</td>
				<td className="cyberware--rating">{rating ?
					<select onChange={this.updateRating}>
						{this.generateRatingOptions()}
					</select>
					: 'N/A'}</td>
				<td className="cyberware--avail">{this.calculateAvail()}</td>
				<td className="cyberware--cost">{cost}&yen;</td>
				<td className="cyberware--ref">{source} p{page}</td>
			</tr>
		);
	}
}

CyberwareRowComponent.propTypes = {
	ware: PropTypes.shape({
		name: PropTypes.string.isRequired,
		ess: PropTypes.string.isRequired,
		rating: PropTypes.string,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
	}).isRequired
};

export default CyberwareRowComponent;
