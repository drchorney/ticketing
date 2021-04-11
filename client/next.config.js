// THIS FILE IS TO TRY TO FIX FILE WATCHING AUTO UPDATING THROUGH SCAFFOLD TO THE BROWSER
module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300;
    return config;
  }
};
