const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        exclude: [path.resolve(__dirname, 'node_modules')],
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: [
      '*',
      '.mjs',
      '.js',
      '.vue',
      '.json',
      '.gql',
      '.graphql',
      '.ts',
    ],
  },
  target: 'node',
}
