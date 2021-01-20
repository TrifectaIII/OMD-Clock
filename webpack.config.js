const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: path.resolve(__dirname, './src/index.ts'),
    module: {
        rules: [
            //ts rule
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            //sass rule
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            //html rule
            {
                test: /\.html$/i,
                loader: 'file-loader',
                options : {
                    name: '[name].[ext]',
                },
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },
};