import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';
import styled from 'styled-components';
import Forecast from 'forecast-promise';

const StyledHeader = styled.h2`
	text-transform: uppercase;
	font-weight: normal;
`;

export default class OutTile extends React.Component {
	static get layout() {
		return { width: 1, height: 2 };
	}

	static get propTypes() {
		return { pollRate: PropTypes.number.isRequired };
	}

	static get defaultProps() {
		return { pollRate: 60 * 30 };
	}

	constructor(props) {
		super(props);
		this.state = {
			holidays: [],
		};
		bindMethods(this);
	}

	componentDidMount() {
		this.fetchHolidayBookings();

		const { pollRate } = this.props;
		this._interval = setInterval(this.fetchHolidayBookings, pollRate * 1000);
	}

	componentWillUnmount() {
		clearInterval(this._interval);
	}

	fetchHolidayBookings() {
		this.setState({
			holidays: [{ name: 'Dan Hughes', from: new Date(), to: new Date() }],
		});
	}

	render() {
		const { holidays } = this.state;
		return (
			<div className="OutTile">
				<StyledHeader>Out today</StyledHeader>
				{this.state.holidays.map((holiday, i) => <p key={i}>{holiday.name}</p>)}
			</div>
		);
	}
}