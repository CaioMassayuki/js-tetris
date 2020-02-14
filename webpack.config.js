const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => ({
  entry: './newSrc',
  output: {
    filename: 'tetris.js'
  },
  plugins: [new HtmlWebpackPlugin({
    template: './newSrc/index.html'
  }), new webpack.ProgressPlugin()]
})
