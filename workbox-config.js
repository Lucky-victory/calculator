module.exports = {
	globDirectory: 'www/',
	globPatterns: [
		'**/*.{woff2,woff,js,css,png,html}'
	],
	swDest: 'www/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};