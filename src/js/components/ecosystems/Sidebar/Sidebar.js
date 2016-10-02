import React from 'react';
import classname from 'classname';

import { divideByInterval } from '../../../helpers/transactions';

import DurationSwitcher from '../../atoms/DurationSwitcher/DurationSwitcher';
import SparkLine from '../../graphs/SparkLine/SparkLine';

import styles from './Sidebar.scss';

const render = React.createClass({
	getInitialState() {
		return {
			divided: {}
		};
	},
	componentWillReceiveProps(nextProps) {
		this.setState({
			divided: divideByInterval(nextProps.transactions)
		});
	},
	render() {
		return (
			<aside className={classname(this.props.className, styles.sidebar)}>
				<h1>monzo.stats</h1>

				<DurationSwitcher />

				{ Object.keys(this.state.divided).reverse().map((interval) => (
					<SparkLine
						key={interval}
						data={this.state.divided[interval]}
						width={360}
						height={60}
						options={{ title: interval }}
					/>
				)) }
			</aside>
		);
	}
});

export default render;