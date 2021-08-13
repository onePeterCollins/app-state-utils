const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, path.relative(__dirname, 'src/index.js')),
  devtool: 'eval',

  output: {
    path: path.resolve(__dirname, path.relative(__dirname, 'prod/src')),
    filename: 'index.js',
    library: {
      name: "app-state-utils",
      type: "umd"
    },
    libraryTarget: 'umd'
  },

  performance: {
    hints: 'warning',
  },

  module: {
    rules: [
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                  cacheDirectory: true,
                  presets: [
                      ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
                      {
                          plugins: [
                              '@babel/plugin-transform-runtime'
                          ]
                      }
                  ]
              }
          }
      },
    ]
  }
}
