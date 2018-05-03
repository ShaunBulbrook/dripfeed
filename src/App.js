import React, { Component } from 'react';
import bindMethods from 'yaab';
import styled from 'styled-components';

import Store from './Store';

import LocationTile from './components/LocationTile/LocationTile';
import OutTile from './components/OutTile/OutTile';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import Tasks from './components/Tasks/Tasks';
import Tile from './components/Tile/Tile';

import './App.css';
import 'weathericons/css/weather-icons.min.css';

import { colour } from './styles/variables';

const StyledContainer = styled.div`
	background-color: ${colour.background.fill};
`;

const store = new Store();

const offices = [
	{ name: 'Chicago', woeId: 2379574, locale: 'America/Chicago' },
	{ name: 'Reading', woeId: 22484804, locale: 'Europe/London' },
	{
		name: 'Hong Kong',
		woeId: 12467924,
		locale: 'Asia/Hong_Kong',
	},
	{
		name: 'Melbourne',
		woeId: 1103816,
		locale: 'Australia/Melbourne',
	},
];

export default class App extends Component {
	static get initialState() {
		return {
			issues: [],
			settings: [],
		};
	}

	constructor(props) {
		super(props);
		this.state = App.initialState;
		bindMethods(this);
	}

	componentDidMount() {
		const settings = store.get('settings');
		this.setState({
			settings,
		});
	}

	updateSettings(settings) {
		store.set('settings', settings);
		this.setState({ settings });
	}

	render() {
		const { settings } = this.state;

		return (
			<div className="App">
				<StyledContainer>
					{offices.map(office => (
						<Tile key={office.name} component={LocationTile} office={office} />
					))}
					<Tile component={Tasks} settings={settings} />
					<Tile component={OutTile} settings={settings} />
				</StyledContainer>
				<SettingsPanel settings={settings} onChange={this.updateSettings} />
			</div>
		);
	}
}
