const {resolve, join} = require('path');
const OPT = require('./config');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = () => {
    return {
        plugins: [
            new FaviconsWebpackPlugin({
                // Your source logo
                logo: resolve(join(OPT.images, 'favicon', 'favicon.png')),
                // The prefix for all image files (might be a folder or a name)
                prefix: 'favicons/',
                // Emit all stats of the generated icons
                emitStats: false,
                // The name of the json containing all favicon information
                statsFilename: 'iconstats-[hash].json',
                // Generate a cache file with control hashes and
                // don't rebuild the favicons until those hashes change
                persistentCache: false,
                // Inject the html into the html-webpack-plugin
                inject: false,
                // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
                background: '#3a71c0',
                // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
                title: 'Webpack App',

                // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: false,
                    coast: false,
                    favicons: true,
                    firefox: false,
                    opengraph: false,
                    twitter: false,
                    yandex: false,
                    windows: true
                }
            }),
        ],
    };
};