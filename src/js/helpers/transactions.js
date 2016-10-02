export function divideByInterval(transactions, interval = 'month') {
	const groups = {};

	transactions.forEach((transaction) => {
		const group = transaction.created.slice(0, 7);

		if (!groups[group]) {
			groups[group] = [];
		}

		groups[group].push(transaction);
	});

	return groups;
}