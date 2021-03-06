import styled from 'styled-components';

import JiraLogo from './assets/logo-jira.png';
import BitbucketLogo from './assets/logo-bitbucket.png';
import ForecastLogo from './assets/logo-forecast.png';

export const StyledTip = styled.span`
	color: rgba(0, 0, 0, 0.35);
	font-weight: bolder;
	position: absolute;
	top: 36%;
	transition: opacity 0.25s;
	right: var(--spacing-small);
`;

export const StyledAccount = styled.div`
	background: ${props => {
		if (props.type === 'jira') {
			return `url(${JiraLogo}) no-repeat 10px 50% #205081`;
		} else if (props.type === 'bitbucket') {
			return `url(${BitbucketLogo}) no-repeat 10px 50% #205081`;
		} else if (props.type === 'forecast') {
			return `url(${ForecastLogo}) no-repeat 10px 50% #f36c00`;
		}
	}}
	background-size: auto 34px;
	border-radius: 5px;
	color: #ffffff;
	cursor: pointer;
	font-size: 14px;
	margin-bottom: var(--spacing-medium);
	padding: var(--spacing-medium);
	position: relative;
	text-transform: uppercase;
	transition: background 0.25s, color 0.25s;

	${StyledTip} {
		opacity: 0;
	}

	&:hover {
		background-color: ${props => {
			if (props.active) {
				return '#ff6666';
			} else {
				return `var(--color-text-positive)`;
			}
		}};

		${StyledTip} {
			opacity: 1;
		}

	}
`;
