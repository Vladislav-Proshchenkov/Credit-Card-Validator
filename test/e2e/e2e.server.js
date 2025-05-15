const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

const server = new WebpackDevServer(webpack(config), {
  static: {
    directory: path.join(__dirname, '../dist'),
  },
  compress: true,
  port: 9000,
});

server.start().then(() => {
  console.log('Server started on http://localhost:9000');
  if (process.send) {
    process.send('ok');
  }
});