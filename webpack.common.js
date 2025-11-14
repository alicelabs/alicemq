const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './client/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    clean: true,
    publicPath: '/client/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      inject: 'body',
      scriptLoading: 'defer',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@components': path.resolve(__dirname, 'client/Components'),
      '@containers': path.resolve(__dirname, 'client/Containers'),
      '@utils': path.resolve(__dirname, 'client/utils'),
    },
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
          reuseExistingChunk: true,
          chunks: 'all',
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react-vendor',
          priority: 10,
          chunks: 'all',
        },
        mui: {
          test: /[\\/]node_modules[\\/](@mui|@emotion)[\\/]/,
          name: 'mui-vendor',
          priority: 9,
          chunks: 'all',
        },
        d3: {
          test: /[\\/]node_modules[\\/]d3[\\/]/,
          name: 'd3-vendor',
          priority: 8,
          chunks: 'all',
        },
      },
    },
  },
};
