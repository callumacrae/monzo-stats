import * as d3 from 'd3';
import d3Wrap from 'react-d3-wrap';

import styles from './SparkLine.scss';

const titleParser = d3.timeParse('%Y-%m');
const titleFormatter = d3.timeFormat('%B %Y');

const SparkLine = d3Wrap({
	initialize(svg) {
		d3.select(svg)
			.attr('class', 'spark-line');
	},
	update(svg, data, options) {
		const d3svg = d3.select(svg);

		const width = d3svg.attr('width');
		const height = d3svg.attr('height');

		// Calculate the start and end date of the month
		const date = titleParser(options.title);
		const year = date.getFullYear();
		const month = date.getMonth();
		const xScale = d3.scaleTime()
			.domain([new Date(year, month, 1), new Date(year, month + 1, 1)])
			.range([5, width - 5]);

		const yScale = d3.scaleLinear()
			.domain(d3.extent(data, (d) => d.account_balance))
			.range([height - 5, 5]);

		// Write the title
		d3svg.append('text')
			.attr('class', styles.title)
			.text(titleFormatter(date))
			.attr('x', 0)
			.attr('y', height / 2);

		// Calculate total spent and draw it
		const total = data.reduce((sum, d) => sum + Math.max(0, -d.amount), 0);
		d3svg.append('text')
			.attr('class', styles.total)
			.text('£' + Math.round(total / 100)) // todo: use correct currency
			.attr('x', width)
			.attr('y', height / 2);

		// Draw the line
		const line = d3.line()
			.x((d) => xScale(new Date(d.created)))
			.y((d) => yScale(d.account_balance));

		d3svg.append('path')
			.attr('class', styles.line)
			.attr('d', line(data));
	}
});

export default SparkLine;