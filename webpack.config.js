const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './client/dist/index.js'),
    output:{
        path: path.resolve(__dirname, '/client/dist'),
        filename: './client/dist/bundle.js'
    },
    target: 'electron-renderer',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
};