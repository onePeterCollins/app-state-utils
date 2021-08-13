const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, path.relative(__dirname, 'src/index.js')),

  optimization: {
    minimize: true,
  },

  output: {
    path: path.resolve(__dirname, path.relative(__dirname, 'prod/dist')),
    filename: 'index.js',
    library: {
      name: "app-state-utils",
      type: "umd"
    },
    libraryTarget: 'umd'
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
