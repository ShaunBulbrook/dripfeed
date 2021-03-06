import React from 'react';
import PropTypes from 'prop-types';
import bindMethods from 'yaab';

import {
	StyledPanel,
	Overlay,
	StyledPullTab,
	PanelContainer,
	StyledInput,
	ButtonContainer,
	StyledButton,
	StyledCancelButton,
} from './SettingsPanel.styles';

import Account from '../Account/Account';
import Modal from '../Modal/Modal';
import Header from '../Header/Header';
import Toggle, { ToggleContainer } from '../Toggle/Toggle';

export default class SettingsPanel extends React.Component {
	static get propTypes() {
		return {
			settings: PropTypes.array.isRequired,
			onChange: PropTypes.func.isRequired,
			onThemeChange: PropTypes.func.isRequired,
			theme: PropTypes.shape({ isDarkMode: PropTypes.bool.isRequired })
				.isRequired,
		};
	}

	constructor(props) {
		super(props);

		const { settings } = props;

		this.state = {
			settings,
			form: {},
			isOpen: false,
			modalIsVisible: false,
		};

		bindMethods(this);
	}

	componentWillReceiveProps(props) {
		const { settings } = props;
		this.setState({
			settings,
		});
	}

	toggleOpen() {
		this.setState(({ isOpen }) => ({
			isOpen: !isOpen,
		}));
	}

	showAccountAddModal(type) {
		this.setState(({ form }) => ({
			modalIsVisible: true,
			form: {
				...form,
				type,
			},
		}));
	}

	closeModal() {
		this.setState(({ form }) => ({
			modalIsVisible: false,
			form: { ...form, type: undefined },
		}));
	}

	addAccount() {
		this.setState(({ settings, form }) => ({
			settings: [...settings, form],
			form: {},
			modalIsVisible: false,
		}));
	}

	deleteAccount(account) {
		if (window.confirm(`Disconnect ${account.name}?`)) {
			this.setState(({ settings }) => ({
				settings: settings.filter(_ => _.name !== account.name),
			}));
		}
	}

	save() {
		this.setState(
			{
				isOpen: false,
			},
			() => this.props.onChange(this.state.settings)
		);
	}

	handleFormChange(event) {
		const { target } = event;
		const { name, value } = target;
		this.setState(({ form }) => ({
			form: {
				...form,
				[name]: value,
			},
		}));
	}

	render() {
		return (
			<React.Fragment>
				<StyledPanel isOpen={this.state.isOpen}>
					<StyledPullTab onClick={this.toggleOpen} isOpen={this.state.isOpen} />
					<PanelContainer>
						{this.state.settings.map((account, i) => (
							<Account
								key={i}
								type={account.type}
								name={account.name}
								onClick={() => this.deleteAccount(account)}
							/>
						))}
						<Header level={2}>Add accounts</Header>
						<Account
							type="jira"
							onClick={() => this.showAccountAddModal('jira')}
						/>
						<Account
							type="bitbucket"
							onClick={() => this.showAccountAddModal('bitbucket')}
						/>
						{this.state.settings.filter(account => account.type === 'forecast')
							.length === 0 && (
							<Account
								type="forecast"
								onClick={() => this.showAccountAddModal('forecast')}
							/>
						)}
						<button onClick={this.save}>Save</button>
						<Header level={2}>Settings</Header>
						<ToggleContainer>
							<Toggle
								id="theme-toggler"
								checked={this.props.theme.isDarkMode}
								onChange={e => this.props.onThemeChange(e.target.checked)}
								icons={false}
							/>
							<label htmlFor="theme-toggler">Theme</label>
						</ToggleContainer>
					</PanelContainer>
				</StyledPanel>
				<Overlay isOpen={this.state.isOpen} />
				<Modal
					isVisible={this.state.modalIsVisible}
					type={this.state.form.type}
				>
					<Header level={2} centered={true}>
						Add account
					</Header>
					<StyledInput
						onChange={this.handleFormChange}
						type="text"
						name="name"
						placeholder="Name"
					/>
					<StyledInput
						onChange={this.handleFormChange}
						type="text"
						name="base"
						placeholder="API base"
					/>
					<StyledInput
						onChange={this.handleFormChange}
						type="text"
						name="username"
						placeholder="Username"
					/>
					<StyledInput
						onChange={this.handleFormChange}
						type="password"
						name="password"
						placeholder="Password"
					/>
					<ButtonContainer>
						<StyledButton onClick={this.addAccount}>Add account</StyledButton>
						<StyledCancelButton className="Cancel" onClick={this.closeModal}>
							Cancel
						</StyledCancelButton>
					</ButtonContainer>
				</Modal>
				<Overlay isOpen={this.state.isOpen} />
			</React.Fragment>
		);
	}
}
