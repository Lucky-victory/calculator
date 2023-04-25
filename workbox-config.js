
module.exports = {
  globDirectory: "www/",
  globPatterns: [
    "**/*.{woff,woff2,png,html,css,js,json}"
  ],
  swDest: "www/sw.js",
  ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
  runtimeCaching: [{
    urlPattern: /\.(?:png|woff|woff2|jpg|jpeg|svg|gif)$/,
    handler: "CacheFirst",
    options: {
      "cacheName": "assets"
    }
  }]
};
