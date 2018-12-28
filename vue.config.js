// TODO do we need this?
var webpack = require('webpack');

module.exports = {
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:4000',
        // maybe this option (proxying using vue js) is intended for development purposes only.
        // Consider using NGINX for proxying during in production.
        secure: false
      }
    }
  }
};
