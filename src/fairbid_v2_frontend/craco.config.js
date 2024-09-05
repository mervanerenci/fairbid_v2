const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.output.path = path.resolve(__dirname, 'build');
            webpackConfig.output.publicPath = './';
            return webpackConfig;
          },
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@ui': path.resolve(__dirname, 'src/ui'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@layout': path.resolve(__dirname, 'src/layout'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@db': path.resolve(__dirname, 'src/db'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@fonts': path.resolve(__dirname, 'src/fonts'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@widgets': path.resolve(__dirname, 'src/widgets'),
            '@contexts': path.resolve(__dirname, 'src/contexts'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@app': path.resolve(__dirname, 'src/app'),
            '@features': path.resolve(__dirname, 'src/features'),
        },
    },
};