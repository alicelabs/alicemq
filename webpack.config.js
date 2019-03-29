const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './client/index.js'),
    output:{
        path: path.resolve(__dirname, 'client/dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join('client/dist')
    },
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
            },
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};