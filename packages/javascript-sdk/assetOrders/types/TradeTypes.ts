export type Trade = {
	amount: string; // String number of dollars, e.g. '1000' for $1,000.00
	date: string; // UTC date, e.g. '2024-12-21T01:11:14.887Z'
	symbol: string;
};

export type NetGain = {
	num_shares: number;
	entry_date: string;
	entry_price: number;
	days_held: number;
	exit_date: string;
	exit_price: number;
	net_gain: number;
	net_gain_rate: number;
};
