'use strict';

let defaults = {
	port: 3000,
	modules: [
		{
			name: 'news_rss',
			disabled: 'false',
			position: 'bottom_middle',
			config: {
				url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
				type: 'scrolling', // scrolling or descriptive
			},
		},
		{
			name: 'messages',
			disabled: 'false',
			position: 'upper_third',
			config: {
				appId: '',
			},
		},
		{
			name: 'time_date',
			disabled: 'false',
			position: 'top_left',
			config: {},
		},
	],
};

module.exports = defaults;